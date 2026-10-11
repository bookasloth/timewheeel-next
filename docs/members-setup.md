# Member accounts: setup and operations

Visitors can create a Timewheel account (Google or email + password) and use:

| Page | What it is |
| --- | --- |
| `/register`, `/login`, `/forgot-password`, `/reset-password` | Sign-up, login, password reset |
| `/members` | Dashboard: membership, latest posts, new downloads |
| `/members/community` | Members-only forum: topics, posts, replies |
| `/members/free-downloads` | Files every member can download |
| `/members/premium-downloads` | Premium files + the upgrade panel |
| `/members/account` | Name, sign-in method, password, membership, delete account |
| `/members/admin` | Admins only: upload downloads, manage members and Premium |

Everything is Supabase (project `nefmwittrybufjqhpxip`): Supabase Auth for accounts,
Postgres + RLS for data (`supabase/migrations/0006_members.sql`), and a private Storage
bucket `member-downloads` for files. The browser never talks to Supabase directly;
session cookies are httpOnly.

## One-time setup (in this order)

### 1. Run the migration

Supabase dashboard > SQL Editor > paste `supabase/migrations/0006_members.sql` > Run.
It is idempotent. It creates the tables, policies, the storage bucket and the
Premium payment trigger, and adds `user_id` + `premium_days` to `payments`.

### 2. Google sign-in

Google Cloud console, project `timewheel-511216`:

1. **Google Auth Platform > Branding**: app name `Timewheel`, support email
   `team@timewheel.co.in`, logo `public/brand/png/timewheel-app-icon-512.png`
   (Google wants 120x120 or larger, square), home page `https://timewheel.co.in`,
   privacy policy `https://timewheel.co.in/legal/privacy`, terms
   `https://timewheel.co.in/legal/terms`, authorized domain `timewheel.co.in`.
2. **Audience**: External. After testing, click **Publish app**.
3. **Data access**: only `openid`, `.../auth/userinfo.email`, `.../auth/userinfo.profile`.
   These are non-sensitive, so there is no security review, only brand verification.
4. **Clients > Create client**: type **Web application**, name **Timewheel**.
   - Authorized JavaScript origins: `https://timewheel.co.in`, `http://localhost:3000`
   - Authorized redirect URI: `https://nefmwittrybufjqhpxip.supabase.co/auth/v1/callback`
5. Copy the Client ID and Client secret (keep the secret out of chat and git).

Supabase > Authentication > Sign In / Providers > **Google**: enable, paste both, save.

### 3. Supabase Auth settings

Authentication > **URL Configuration**:
- Site URL: `https://timewheel.co.in`
- Redirect URLs: `https://timewheel.co.in/**`, `http://localhost:3000/**`
  (add `https://*-timewheel.vercel.app/**` style preview URLs only if you test previews)

Authentication > Sign In / Providers > **Email**: enabled, **Confirm email ON**,
minimum password length 8. Turn on leaked-password protection if your plan has it.

Authentication > **SMTP Settings** (required: Supabase's built-in mailer only sends to
your own team and a few emails an hour, so real visitors would never get the link).
Use the Workspace mailbox, which lands in Gmail's Primary tab:
- Host `smtp.gmail.com`, port `465`, username `team@timewheel.co.in`,
  password = a Google app password for team@ (same kind as `SMTP_PASS` on Vercel)
- Sender email `team@timewheel.co.in`, sender name `Timewheel`

Then Authentication > Rate Limits: raise "emails per hour" to something like 100.

### 4. Email templates (recommended)

The default templates work, but their links only finish in the same browser that
started the sign-up. These versions work on any device (route: `app/auth/confirm`).
Authentication > Emails > Templates:

**Confirm sign up**, subject `Confirm your Timewheel account`:
```html
<h2>Confirm your email</h2>
<p>Thanks for joining Timewheel. Click below to confirm your address and open your member area.</p>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=%2Fmembers%3Fwelcome%3D1">Confirm my email</a></p>
<p>If you didn't create an account, you can ignore this email.</p>
```

**Reset password**, subject `Reset your Timewheel password`:
```html
<h2>Reset your password</h2>
<p>Click below to choose a new password. The link works once and expires in an hour.</p>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=%2Freset-password">Set a new password</a></p>
<p>If you didn't ask for this, ignore this email. Your password stays the same.</p>
```

**Change email address**:
```html
<h2>Confirm your new email</h2>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email_change&next=%2Fmembers%2Faccount">Confirm this address</a></p>
```

### 5. Vercel environment variables

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://nefmwittrybufjqhpxip.supabase.co` (falls back to `SUPABASE_URL`) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase > Settings > API keys > publishable key. **Required**: without it the login pages say accounts aren't switched on yet. |
| `SUPABASE_SECRET_KEY` | already set (admin pages, downloads, account deletion) |
| `MEMBERS_ADMIN_EMAILS` | optional, comma-separated. Defaults to `team@timewheel.co.in` |
| `PREMIUM_PRICE_INR` | optional. Unset = no online checkout; the Premium page shows "Ask us about Premium" |
| `PREMIUM_DAYS` | optional, default `365` |

Premium checkout also needs the existing Zoho Payments variables (it reuses `/pay`'s flow).

### 6. Become an admin

Sign up on the live site with `team@timewheel.co.in` (Google is quickest). Any address
in `MEMBERS_ADMIN_EMAILS` is an admin once its email is verified. To make someone else an
admin, use **Make admin** on `/members/admin/members`.

## How things work

- **Premium.** A member has Premium while `memberships.premium_until` is in the future.
  It's granted three ways: (1) a Zoho payment from `/members/premium-downloads`. When the
  `payments` row flips to paid, the `payments_grant_premium` trigger extends Premium by
  `premium_days` in the same transaction, so it can't be lost or doubled. (2) Admin buttons
  (+30 days, +1 year, Lifetime, Remove). (3) Admins always have access. Premium doesn't
  auto-renew; buying again extends from the current expiry.
- **Downloads.** Admins upload on `/members/admin`. Files go straight from the browser to
  the private bucket through a one-time signed URL (no Vercel 4.5 MB limit; 50 MB per file
  on the free Supabase plan). `/api/members/downloads/<id>` checks tier, logs the download
  and redirects to a 60-second signed link.
- **Community.** Plain text with auto-linked URLs (`rel="nofollow ugc"`). Members create and
  delete their own posts and replies; RLS enforces authorship and locked threads. Admins can
  pin, lock and delete anything from the thread page. Posting is rate limited
  (5 posts / 10 min, 20 replies / 10 min per member).
- **Navbar.** "Log in" turns into "My account" via a non-secret `tw_member` hint cookie, so
  marketing pages stay static.
- **Not indexed.** `/members`, `/auth` and `/api/members` are disallowed in robots.txt and
  every auth/member page is `noindex`.

## Testing locally

`npm run dev` with `.env.local` uses the real project. To test without touching
production, run a local Supabase (`npx supabase start`), apply migrations 0001, 0003,
0004, 0005 and 0006, and point `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` and `SUPABASE_SECRET_KEY` at it. Sign-up emails
land in Mailpit (`supabase status` shows the URL). On recent Supabase CLI versions,
run `grant all on public.rate_limits, public.payments to service_role;` locally,
because new local projects no longer grant table access to the service role by default.
