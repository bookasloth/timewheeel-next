-- Blog editor (2026-10-11): posts written in the admin console instead of
-- markdown files, modelled on the adetc blog admin. Run once in the Supabase
-- SQL Editor, BEFORE merging the PR that ships /admin/blog. Idempotent.
--
--   blog_authors         bylines (E-E-A-T): name, title, bio, photo, links.
--   blog_posts           one row per post: rich-text body, SEO/social fields,
--                        FAQ, TL;DR, takeaways, approved comments, schedule.
--   blog_post_revisions  a snapshot of the post before each save that touches
--                        a published post, so any version can be restored.
--   blog_redirects       old slugs of renamed posts, so links keep working.
--   blog-images          public storage bucket for covers and inline images.
--   memberships.role     gains 'writer': can use the blog editor, nothing else.
--
-- Security: anyone may read published posts whose publish time has passed
-- (that is what makes scheduling safe), authors and redirects. Every write goes
-- through server actions that check the caller is an admin or writer and then
-- use the service key, so there are no insert/update/delete policies at all.

-- ------------------------------------------------------------ writer role
alter table public.memberships drop constraint if exists memberships_role_check;
alter table public.memberships
  add constraint memberships_role_check check (role in ('member', 'writer', 'admin'));

-- ------------------------------------------------------------ shared trigger
create or replace function public.blog_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ------------------------------------------------------------ authors
create table if not exists public.blog_authors (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique check (char_length(name) between 1 and 120),
  title       text not null default '' check (char_length(title) <= 160),
  bio         text not null default '' check (char_length(bio) <= 1500),
  photo       text not null default '',
  url         text not null default '',
  same_as     text[] not null default '{}',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists blog_authors_touch on public.blog_authors;
create trigger blog_authors_touch before update on public.blog_authors
  for each row execute function public.blog_touch_updated_at();

insert into public.blog_authors (name, title, bio) values
  ('Shubham N Datarkar', 'Founder, Timewheel',
   'Shubham founds and leads Timewheel, a Nagpur product studio that builds its own software and runs SEO, AI-search and growth for businesses across India. He writes from hands-on work shipping products and measuring what actually moves rankings and revenue.'),
  ('Timewheel', 'Product studio + growth team',
   'Timewheel builds and runs its own software products, and brings that engineering muscle to marketing, SEO and AI-search for businesses across India.')
on conflict (name) do nothing;

-- ------------------------------------------------------------ posts
create table if not exists public.blog_posts (
  id                  uuid primary key default gen_random_uuid(),
  slug                text not null unique
                        check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) <= 120),
  title               text not null check (char_length(title) between 1 and 200),
  excerpt             text not null default '' check (char_length(excerpt) <= 600),
  category            text not null default '' check (char_length(category) <= 60),
  tags                text[] not null default '{}',
  author_id           uuid references public.blog_authors (id) on delete set null,
  cover               text not null default '',
  cover_alt           text not null default '',
  content_html        text not null default '',
  tldr                text not null default '' check (char_length(tldr) <= 1200),
  takeaways           text[] not null default '{}',
  faq                 jsonb not null default '[]'::jsonb,   -- [{q, a}]
  comments            jsonb not null default '[]'::jsonb,   -- approved: [{author, date, body, isAuthor}]
  -- SEO / social
  meta_title          text not null default '',
  meta_description    text not null default '',
  og_title            text not null default '',
  og_description      text not null default '',
  og_image            text not null default '',
  og_image_alt        text not null default '',
  canonical           text not null default '',
  robots              text not null default 'index,follow'
                        check (robots in ('index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow')),
  focus_keyword       text not null default '',
  secondary_keywords  text[] not null default '{}',
  -- publishing: published + a future published_at = scheduled
  status              text not null default 'draft' check (status in ('draft', 'published')),
  published_at        timestamptz,
  created_by          uuid references auth.users (id) on delete set null,
  updated_by          uuid references auth.users (id) on delete set null,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists blog_posts_live_idx on public.blog_posts (status, published_at desc);
create index if not exists blog_posts_tags_idx on public.blog_posts using gin (tags);

drop trigger if exists blog_posts_touch on public.blog_posts;
create trigger blog_posts_touch before update on public.blog_posts
  for each row execute function public.blog_touch_updated_at();

-- ------------------------------------------------------------ revisions
create table if not exists public.blog_post_revisions (
  id          uuid primary key default gen_random_uuid(),
  post_id     uuid not null references public.blog_posts (id) on delete cascade,
  snapshot    jsonb not null,
  note        text,
  created_by  uuid references auth.users (id) on delete set null,
  created_at  timestamptz not null default now()
);
create index if not exists blog_post_revisions_post_idx on public.blog_post_revisions (post_id, created_at desc);

-- ------------------------------------------------------------ redirects
create table if not exists public.blog_redirects (
  from_slug   text primary key,
  post_id     uuid not null references public.blog_posts (id) on delete cascade,
  created_at  timestamptz not null default now()
);

-- ------------------------------------------------------------ RLS
alter table public.blog_authors        enable row level security;
alter table public.blog_posts          enable row level security;
alter table public.blog_post_revisions enable row level security;
alter table public.blog_redirects      enable row level security;

drop policy if exists blog_posts_public_read on public.blog_posts;
create policy blog_posts_public_read on public.blog_posts
  for select to anon, authenticated
  using (status = 'published' and published_at is not null and published_at <= now());

drop policy if exists blog_authors_public_read on public.blog_authors;
create policy blog_authors_public_read on public.blog_authors
  for select to anon, authenticated using (true);

drop policy if exists blog_redirects_public_read on public.blog_redirects;
create policy blog_redirects_public_read on public.blog_redirects
  for select to anon, authenticated using (true);
-- blog_post_revisions: no policies. Only the service key reads or writes it.

revoke all on public.blog_authors, public.blog_posts, public.blog_post_revisions, public.blog_redirects
  from anon, authenticated;
grant select on public.blog_authors, public.blog_posts, public.blog_redirects to anon, authenticated;
grant all on public.blog_authors, public.blog_posts, public.blog_post_revisions, public.blog_redirects
  to service_role;

-- ------------------------------------------------------------ images
-- Public bucket: covers and inline images are served straight from Supabase.
-- Raster images only (SVG can carry script), 5 MB each. Uploads use one-time
-- signed URLs minted by a server action after the admin/writer check, so no
-- storage policies are needed.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('blog-images', 'blog-images', true, 5242880,
        array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'])
on conflict (id) do update
  set public = true,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- ------------------------------------------------------------ existing post
-- The one markdown post (content/blog) moves into the editor: same URL,
-- same content. Its FAQ section becomes the structured FAQ field.
insert into public.blog_posts
  (slug, title, excerpt, category, tags, author_id, cover, cover_alt, content_html, takeaways, faq, comments,
   meta_title, meta_description, og_title, og_description, status, published_at, created_at)
values
  ($tw$top-10-digital-marketing-companies-nagpur$tw$, $tw$Top 10 Digital Marketing Companies in Nagpur (2026)$tw$, $tw$Ten agencies that actually serve Nagpur businesses, what each is genuinely good at, and a clear #1 at the end, counted down from 10 to 1.$tw$, $tw$Digital Marketing$tw$, array[$tw$Digital Marketing$tw$,$tw$Nagpur$tw$,$tw$SEO$tw$,$tw$Agencies$tw$]::text[],
   (select id from public.blog_authors where name = $tw$Shubham N Datarkar$tw$),
   $tw$/blog/top-10-digital-marketing-companies-nagpur.png$tw$, $tw$Top 10 Digital Marketing Companies in Nagpur (2026)$tw$, $tw$<p><strong>The top digital marketing companies in Nagpur for 2026 are Timewheel, Walnut Folks and Nagpur Soft Tech</strong>: Timewheel first for product-led, AI-search-ready marketing; Walnut Folks for international brand-led growth; Nagpur Soft Tech for a long, low-risk track record. The full ranking of ten, what each is best for, and what they cost, is below.</p>
<p><em>Last updated: September 2026.</em></p>
<p>Picking a digital marketing agency in Nagpur is harder than it should be. Every website claims &quot;best&quot; and &quot;award-winning,&quot; few show pricing, and fewer still prove results. This ranked list cuts through the noise: ten agencies that genuinely serve Nagpur businesses, what each is actually good at, and a clear #1 at the end, counted down from 10 to 1.</p>
<p><strong>Short answer:</strong> for most Nagpur businesses in 2026, start with local SEO, insist on a written scope and no lock-in, and shortlist a specialist in your priority channel. Our overall pick is Timewheel; Nagpur Soft Tech and Walnut Folks are strong alternatives.</p>
<h2>Top 10 digital marketing companies in Nagpur at a glance</h2>
<table><thead><tr><th>Rank</th><th>Agency</th><th>Best for</th><th>Since</th><th>Proof point</th></tr></thead><tbody><tr><td>1</td><td><strong>Timewheel</strong></td><td>Product-led, AI-search (GEO/AEO) marketing</td><td>n/a</td><td>10+ own products shipped, incl. Book A Sloth</td></tr><tr><td>2</td><td>Walnut Folks</td><td>International brand-led growth</td><td>2018</td><td>Marketing delivered across 6 countries</td></tr><tr><td>3</td><td>Nagpur Soft Tech</td><td>Long, low-risk track record</td><td>10+ yrs</td><td>350+ clients, 4.8★ Google</td></tr><tr><td>4</td><td>Digital Dreams Inc</td><td>Longevity and stability</td><td>2014</td><td>10+ years, survived multiple algorithm eras</td></tr><tr><td>5</td><td>Biz Traffics</td><td>High-volume campaign engine</td><td>n/a</td><td>786 projects, 4.7★ (59 reviews)</td></tr><tr><td>6</td><td>Mediaforum</td><td>Mid-market search + paid</td><td>2018</td><td>Named medical and real-estate clients</td></tr><tr><td>7</td><td>IFox Media</td><td>Creative and paid media</td><td>n/a</td><td>Roster across clinics, wellness, finance</td></tr><tr><td>8</td><td>Addinfi Digitech</td><td>Reach beyond Nagpur</td><td>n/a</td><td>Nagpur/Pune/England, 4.5★, 50+ clients</td></tr><tr><td>9</td><td>God Inc Ads Work</td><td>Education and healthcare</td><td>2021</td><td>Named school and hospital clients</td></tr><tr><td>10</td><td>Digital Platter</td><td>Dependable all-round generalist</td><td>2016</td><td>Social, SEO, SEM and ORM under one roof</td></tr></tbody></table>
<h2>How we ranked them</h2>
<p>We weighted four things: proof of results (real clients, ratings, case data), depth of service (SEO, paid ads, social, content, web, not just one), transparency (clear pricing and no lock-in), and 2026-readiness (are they built for AI search, not just Google?). Reputation matters, but a wall of &quot;5 stars&quot; with no verifiable work counts for little. Where a fair comparison of Nagpur agencies exists, the strongest names recur across independent lists, a good sanity check on who&#x27;s actually delivering, as roundups like <a href="https://sanjayshenoy.com/digital-marketing-agencies-in-nagpur/">Sanjay Shenoy&#x27;s Nagpur agency list</a> show.</p>
<h2>10. Digital Platter</h2>
<p><strong>Digital Platter is a dependable Nagpur generalist, founded in 2016, best for businesses that want steady social and search under one roof.</strong> Based in Vivekanand Nagar, it covers social media marketing, SEO, SEM, online reputation management and content marketing. It&#x27;s a reasonable pick if you want one team handling the basics rather than a specialist in any single channel.</p>
<h2>9. God Inc Ads Work</h2>
<p><strong>God Inc Ads Work, founded in 2021 in Itwari, is best for education and healthcare businesses wanting a hungry local partner.</strong> It runs SEO, social media, print, content creation and email/SMS campaigns, with named local clients including a Nagpur school and a hospital, per <a href="https://www.webhopers.in/top-10-digital-marketing-companies-in-nagpur">WebHopers&#x27; Nagpur roundup</a>.</p>
<h2>8. Addinfi Digitech</h2>
<p><strong>Addinfi Digitech is best for businesses that want a Nagpur agency with reach beyond the city, it operates across Nagpur, Pune and England.</strong> It holds a 4.5-star Google rating and lists 50+ clients across SEM, social, Google Ads and content. The multi-location footprint is a plus if you&#x27;re scaling outside Maharashtra.</p>
<h2>7. IFox Media</h2>
<p><strong>IFox Media is best for brands that need global-standard creative and paid media.</strong> A Nagpur-based agency serving clients well beyond the city, it leans into online reputation management, AdWords, Facebook marketing, SEM and SEO, with a roster spanning clinics, wellness and finance. Strong on ads and creative; confirm SEO depth if organic is your priority.</p>
<h2>6. Mediaforum</h2>
<p><strong>Mediaforum, founded in 2018 in Abhyankar Nagar, is best for established local businesses wanting measurable mid-market search and paid campaigns.</strong> It covers SEO, PPC, social and email marketing, with named clients in medical and real estate, a safe option for campaign management without frills.</p>
<h2>5. Biz Traffics</h2>
<p><strong>Biz Traffics is best for businesses wanting a proven, high-volume campaign engine, it reports 786 projects completed and a 4.7-star rating across 59 Google reviews.</strong> The Pratap Nagar agency spans SEO, SEM, social, influencer and PPC work. That throughput signals a team used to running many campaigns at once.</p>
<h2>4. Digital Dreams Inc</h2>
<p><strong>Digital Dreams Inc, established June 2014, is best for businesses that value longevity and stability.</strong> One of the older digital marketing agencies in Nagpur, it offers SEO, social, PPC, email and local SEO. A decade in a fast-moving field is real signal, it has survived multiple algorithm eras, which most agencies don&#x27;t.</p>
<h2>3. Nagpur Soft Tech</h2>
<p><strong>Nagpur Soft Tech is best for businesses that want a low-risk, long-track-record partner, 10+ years in market, 350+ clients and a 4.8-star Google rating.</strong> Founded by Sunil Patle, it&#x27;s arguably the most established pure-play name on this list, covering SEO, SMM, PPC and web design. The combination of tenure, client volume and rating makes it a safe choice over the newest tactics.</p>
<h2>2. Walnut Folks</h2>
<p><strong>Walnut Folks is Nagpur&#x27;s standout growth-focused agency, founded in 2018 by Hitesh Lalwani and Sahiba Dhandhania, it has delivered marketing across 6 countries.</strong> That&#x27;s an unusually international footprint for a Nagpur firm, as noted in <a href="https://hivepulsemedia.com/top-10-digital-marketing-companies-nagpur.html">HivePulse Media&#x27;s 2026 comparison</a>, which also puts typical Nagpur agency packages starting around ₹8,000/month. If you want a brand-led growth partner with global exposure, Walnut Folks is the one to beat.</p>
<h2>1. Timewheel</h2>
<p><strong>Timewheel is our #1 <a href="/digital-marketing-company-in-nagpur">digital marketing company in Nagpur</a> for 2026 because it&#x27;s the only one that builds and runs its own software products, then brings that engineering muscle to your marketing.</strong></p>
<p>Most Nagpur agencies rent tools and run campaigns. Timewheel has shipped 10+ products of its own, including <a href="https://bookasloth.com">Book A Sloth</a>, a live booking platform, which means it understands conversion, speed and product, not just ad spend.</p>
<p>Three things set it apart for 2026:</p>
<ul>
<li><strong>AI-search (GEO/AEO) built in.</strong> Google is no longer the only search box: customers ask ChatGPT, Gemini and AI Overviews too. Timewheel offers a <a href="/seo-company-in-nagpur">free AI + SEO audit</a> that scores your visibility across both classic search and AI engines, so you see exactly where you stand before you pay a rupee. Almost no Nagpur agency even measures this yet.</li>
<li><strong>Transparent pricing and no lock-in.</strong> Clear bands instead of a mystery quote, month-to-month retainers, and full ownership of your code, domain and data, the opposite of the black-box, long-contract model.</li>
<li><strong>Purpose-built pages, not one homepage.</strong> Dedicated, conversion-focused landing pages for <a href="/seo-company-in-nagpur">SEO</a> and <a href="/web-development-company-in-nagpur">web development</a>, each with a live audit tool, proof of the &quot;measure first, promise later&quot; approach.</li>
</ul>
<p>For a Nagpur business that wants marketing run by a team that can also fix the website, the funnel and the product experience behind it, Timewheel is the most complete option in the city.</p>
<h2>What digital marketing costs in Nagpur</h2>
<p>Expect roughly ₹8,000–₹40,000+ per month depending on scope. Typical tiers:</p>
<table><thead><tr><th>Package tier</th><th>Typical monthly fee</th><th>Best for</th></tr></thead><tbody><tr><td>Entry / local SEO</td><td>~₹8,000–₹15,000</td><td>Small businesses; Google Business Profile + local SEO to start</td></tr><tr><td>Growth / multi-channel</td><td>~₹15,000–₹30,000</td><td>SEO, paid ads and social run together</td></tr><tr><td>Full-funnel / e-commerce</td><td>₹30,000–₹40,000+</td><td>High-competition SEO or e-commerce retainers</td></tr></tbody></table>
<p>Local SEO and Google Business Profile work is usually the fastest-moving, highest-ROI place to start; paid ads add speed but keep costing while they run. Ask any agency for a written scope so you know exactly what the monthly fee buys.</p>
<h2>How to choose the right agency for your business</h2>
<p>Match the agency to your goal, not to its star rating. Pick a specialist in your priority channel (SEO vs paid vs social), insist on seeing real client results or a live audit of your own site, confirm you&#x27;ll own your accounts and data, and favour month-to-month terms until trust is earned. For small businesses and startups, a hungry local team or a product-minded partner beats a big enterprise shop that treats you as a small account.</p>
<h2>Conclusion: who should you actually call?</h2>
<p>If you want the safest long-track-record option, call Nagpur Soft Tech; if you want brand-led growth with international polish, call Walnut Folks. But for 2026, where AI search, site speed and transparent, ownable systems decide who wins, <strong>Timewheel is the pick</strong>, because it&#x27;s the only agency here that builds the products it markets and shows you your scores before it asks for the retainer.</p>
<p>Three things you can do this week: run a free AI + SEO audit of your own site to get an objective baseline; write down your one priority (leads, calls, bookings) so agencies quote to that, not to vanity metrics; and shortlist two agencies from this list, then ask both for a written scope and a no-lock-in trial.</p>$tw$, array[$tw$Ten Nagpur agencies ranked on proof, service depth, transparency and 2026 AI-search readiness, not star ratings.$tw$,$tw$Budgets run roughly ₹8,000–₹40,000+/month; local SEO is usually the fastest, highest-ROI place to start.$tw$,$tw$Timewheel ranks #1 for building its own products and measuring AI-search visibility before asking for a retainer.$tw$]::text[],
   $tw$[{"q":"Which is the best digital marketing company in Nagpur in 2026?","a":"For 2026 we rank Timewheel first, because it pairs full-funnel marketing with its own software products, AI-search (GEO) optimisation and transparent, no-lock-in pricing. Long-established alternatives like Nagpur Soft Tech and growth-focused Walnut Folks are strong choices too."},{"q":"How much do digital marketing companies in Nagpur charge?","a":"Typically ₹8,000 to ₹40,000+ per month. Entry-level packages for small businesses start around ₹8,000/month, while full-funnel, e-commerce or high-competition SEO retainers cost more. Always get the scope in writing."},{"q":"What services do Nagpur digital marketing companies offer?","a":"Most cover SEO, Google Ads/PPC, social media marketing, content creation, email/SMS and website development. Stronger agencies add local SEO, Google Business Profile management and, increasingly, AI-search (GEO/AEO) visibility."},{"q":"Which agency is best for small businesses and startups in Nagpur?","a":"A hungry local team or a product-minded partner usually beats a large enterprise shop. Look for month-to-month terms, clear pricing, and a focus on local SEO first, the fastest, highest-ROI channel for most small Nagpur businesses."},{"q":"What is GEO and why does it matter for Nagpur businesses in 2026?","a":"GEO (Generative Engine Optimisation) is being visible when customers ask AI tools like ChatGPT, Gemini or Google's AI Overviews instead of typing a classic search. It depends on machine-readable content and structured data, and most Nagpur agencies don't measure it yet, which makes it an easy edge to win."},{"q":"How long does digital marketing take to show results in Nagpur?","a":"Paid ads can drive traffic within days; SEO and local SEO typically show first movement around 90 days, with meaningful results building over 6–12 months. Anyone promising overnight #1 rankings is overselling."}]$tw$::jsonb, $tw$[]$tw$::jsonb,
   '', $tw$The 10 best digital marketing companies in Nagpur for 2026, ranked, with real specialties, pricing context and how to pick the right agency for your business.$tw$, $tw$$tw$, $tw$We ranked Nagpur's 10 best digital marketing agencies for 2026, who they are, what they do best, and who actually earns the #1 spot.$tw$,
   'published', $tw$2026-09-12T00:00:00+05:30$tw$::timestamptz, $tw$2026-09-12T00:00:00+05:30$tw$::timestamptz)
on conflict (slug) do nothing;
