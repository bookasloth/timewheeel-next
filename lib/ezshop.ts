// EZShop product page content. Every feature claim below is backed by the
// RabbitShop codebase (D:\My Development\RabbitShop); see the PR notes for
// the file behind each one. No store counts, ratings or testimonials: none
// exist yet. ponytail: no pricing block, no plans are defined in the product.
// Live: owner confirmed real-account payments/notifications tested (2026-10-11).

export const ez = {
  path: "/products/ezshop",
  meta: {
    title: "Online Store Builder for Brands & Shops in India, EZShop",
    description:
      "EZShop is an online store builder for Indian D2C brands and local shops: UPI, cards and COD via Razorpay, GST invoices, WhatsApp updates, zero order commission.",
  },
  hero: {
    kicker: "Live now · EZShop by Timewheel",
    title: "Online store builder for D2C brands and local shops in India",
    // Answer-first definition, the block AI answers quote. Keep it under 60 words.
    definition:
      "EZShop is an online store builder for Indian D2C brands and local shops that want to sell online. You get your own branded store with UPI, card and Cash on Delivery payments through Razorpay, GST invoices, WhatsApp order updates and Shiprocket shipping, on your own domain and accounts, with no commission on your orders.",
    primaryLabel: "Book a demo",
    primaryHref: "/book-a-demo",
    secondaryLabel: "Talk to us",
    secondaryHref: "/contact",
    chips: ["UPI, cards & COD", "GST invoices", "WhatsApp updates", "Shiprocket", "Your own domain"],
  },
  problem: {
    number: "01",
    label: "WHY SELLERS SWITCH",
    title: "Selling on DMs and marketplaces works until it doesn't.",
    body: "Most Indian brands and shops start selling on Instagram, WhatsApp or a marketplace. Each one gets you orders, and each one leaves something you can't fix on your own.",
    items: [
      {
        name: "Orders live in chats",
        desc: "Prices sent one DM at a time, payment screenshots to check, addresses copied by hand, and no record of what is left in stock.",
      },
      {
        name: "The customer isn't yours",
        desc: "On a marketplace the buyer, the reviews and the rules belong to the marketplace, and your product sits next to a competitor's.",
      },
      {
        name: "GST and COD by hand",
        desc: "Invoices typed in a spreadsheet, CGST and IGST worked out per order, and COD offered to PIN codes your courier can't reach.",
      },
      {
        name: "No home for your brand",
        desc: "Without your own website, every ad, reel and repeat customer sends traffic to someone else's platform.",
      },
    ],
  },
  features: {
    number: "02",
    label: "WHAT YOU GET",
    title: "What does an EZShop online store include?",
    body: "Everything to list products, take payment, ship and stay GST-compliant, run from one admin panel without touching code.",
    items: [
      {
        icon: "store",
        name: "Your branded storefront",
        desc: "A mobile-first store with your logo, colours and homepage, plus the search and SEO setup Google needs to find your products.",
        bullets: [
          "Homepage sections: hero, collections, new arrivals, categories",
          "Search, sort and filter by category, price and stock",
          "Sitemap, robots.txt and product schema built in",
        ],
      },
      {
        icon: "box",
        name: "Products, variants & stock",
        desc: "Sizes, colours or pack sizes as variants, each with its own SKU, price, sale price, weight and stock count.",
        bullets: [
          "Categories, collections and image galleries",
          "Stock history with a reason for every change",
          "Low-stock warning on the dashboard",
        ],
      },
      {
        icon: "card",
        name: "UPI, cards & Cash on Delivery",
        desc: "Razorpay checkout for UPI, cards and net banking, and COD with your own minimum, maximum and fee. Guests can check out without an account.",
        bullets: [
          "Payment verified on the server before an order is confirmed",
          "Coupons: percentage or flat, minimum order, usage limits",
          "Stock held during checkout so the last unit isn't sold twice",
        ],
      },
      {
        icon: "receipt",
        name: "GST invoices & credit notes",
        desc: "GST-inclusive prices with CGST and SGST or IGST worked out from the delivery state, and a GST rate and HSN code on every product.",
        bullets: [
          "Sequential invoice numbers per financial year",
          "Credit notes issued automatically on refunds",
          "Business buyers can add their GSTIN at checkout",
        ],
      },
      {
        icon: "truck",
        name: "Shipping & Shiprocket",
        desc: "Flat rate, free shipping above a cart value, weight slabs and state-wise surcharges. Connect Shiprocket to book a courier in one click.",
        bullets: [
          "AWB, label and pickup from the order page",
          "Tracking updates mark orders shipped and delivered",
          "Block PIN codes you can't serve, or just block COD there",
        ],
      },
      {
        icon: "message",
        name: "WhatsApp & email updates",
        desc: "Customers who opt in get WhatsApp messages through AiSensy, and everyone gets email through Brevo or your own SMTP.",
        bullets: [
          "Order placed, shipped, delivered, cancelled, refunded",
          "Failed messages retried without blocking the order",
          "Signed order-status link, no login needed",
        ],
      },
    ],
  },
  admin: {
    number: "03",
    label: "RUN THE STORE",
    title: "One admin panel for orders, refunds and your team.",
    body: "Your team works from one place, and each person sees only what their role allows.",
    items: [
      "Dashboard with revenue, orders, average order value and pending orders",
      "Order filters, status history, notes and printable packing slips",
      "Full and partial refunds through Razorpay, manual refunds for COD",
      "Customer list with order history and saved addresses",
      "Owner, admin and staff roles, with an activity log of every change",
      "CSV export of orders, customers and products",
      "Edit policy pages, menus, footer and SEO titles yourself",
    ],
  },
  audiences: {
    number: "04",
    label: "WHO IT'S FOR",
    title: "Built for D2C brands and for local shops going online.",
    items: [
      {
        name: "D2C brands",
        lede: "An online store for D2C brands that run ads and want repeat customers on their own website.",
        points: [
          "Your domain, your customer data, your checkout",
          "GST invoices and credit notes without a spreadsheet",
          "Shiprocket and COD rules for pan-India delivery",
          "Coupons for launches, influencers and returning buyers",
        ],
      },
      {
        name: "Local shops going online",
        lede: "For boutiques, kirana, bakery, gift and electronics stores that want to take their shop online without learning code.",
        points: [
          "Put your counter catalogue online with photos and prices",
          "Accept UPI and Cash on Delivery from day one",
          "WhatsApp updates your customers already read",
          "Block PIN codes you don't deliver to",
        ],
      },
    ],
  },
  compare: {
    number: "05",
    label: "HONEST COMPARISON",
    title: "EZShop vs Shopify, marketplaces and Instagram DMs",
    body: "Each option suits a different seller. This is how they differ on the points Indian sellers ask us about most.",
    columns: ["", "EZShop", "Shopify", "Marketplaces", "Instagram / WhatsApp DMs"],
    rows: [
      {
        name: "Who owns the customer",
        values: ["You", "You", "The marketplace", "You, in chats"],
      },
      {
        name: "Commission on each order",
        values: ["None from EZShop", "Plan fees; check current pricing", "Marketplace fees apply", "None"],
      },
      {
        name: "GST invoices",
        values: ["Built in", "Via settings or apps", "Marketplace handles its own", "Manual"],
      },
      {
        name: "COD rules by PIN code",
        values: ["Built in", "Via apps", "Marketplace decides", "Manual"],
      },
      {
        name: "WhatsApp order updates",
        values: ["Built in (AiSensy)", "Via apps", "Marketplace sends its own", "Manual"],
      },
      {
        name: "Themes and app store",
        values: ["Fixed sections, no app store", "Large theme and app store", "None", "None"],
      },
      {
        name: "Source code",
        values: ["Yours (single-store licence)", "Hosted, not yours", "Not yours", "Not applicable"],
      },
    ],
    note: "Shopify and marketplace fees change often; check their current pricing pages. Razorpay charges its own gateway fee on online payments whichever platform you use.",
  },
  fit: {
    title: "EZShop is probably not the right fit if you…",
    items: [
      "Sell outside India or in currencies other than INR (EZShop is India and INR only)",
      "Need a drag-and-drop page builder or a large theme marketplace",
      "Need product reviews, wishlists or abandoned-cart reminders today (planned, not built yet)",
      "Run several stores or warehouses from one account",
    ],
  },
  process: {
    number: "06",
    label: "HOW TO GO LIVE",
    title: "How do I take my shop online with EZShop?",
    body: "Four steps from a call to your first paid order. Timewheel can do the setup for you.",
    steps: [
      {
        name: "Book a demo",
        desc: "Tell us what you sell, where you ship and how you take payment today.",
      },
      {
        name: "Connect your accounts",
        desc: "Razorpay (KYC done), your domain, and optionally Shiprocket, AiSensy and Brevo, all in your name.",
      },
      {
        name: "Add products and settings",
        desc: "Products and variants, GSTIN, shipping and COD rules, branding, homepage and policy pages, all from the admin panel.",
      },
      {
        name: "Test, then go live",
        desc: "Place a test order in Razorpay test mode, check the email and WhatsApp messages, then switch to live payments.",
      },
    ],
  },
  related: {
    title: "Related from Timewheel",
    links: [
      { label: "Shopify development company in Nagpur", href: "/shopify-development-company-in-nagpur" },
      { label: "Website design for local businesses", href: "/website-design-company-in-nagpur" },
      { label: "Book A Sloth appointment booking software", href: "/products/book-a-sloth" },
    ],
  },
  faq: {
    number: "07",
    label: "FAQ",
    title: "Questions, answered.",
    items: [
      {
        q: "What is EZShop?",
        a: "EZShop is an online store builder from Timewheel for Indian D2C brands and local shops. It gives you your own branded store with Razorpay payments (UPI, cards, net banking), Cash on Delivery, GST invoices, Shiprocket shipping and WhatsApp order updates, running on your own domain and accounts.",
      },
      {
        q: "How do I take my local shop online in India?",
        a: "Pick a store builder that supports UPI and Cash on Delivery, add your products with photos and prices, set your delivery charges and the PIN codes you serve, add policy pages, and connect a payment gateway such as Razorpay. With EZShop, Timewheel can set all of this up for you.",
      },
      {
        q: "Is EZShop a Shopify alternative for Indian brands?",
        a: "Yes, for brands that sell only in India and want GST invoices, COD rules and WhatsApp updates built in, with no commission from EZShop on orders. Shopify is the better choice if you need its large theme and app store or sell internationally.",
      },
      {
        q: "Is EZShop live?",
        a: "Yes. EZShop is live: Razorpay payments, email and WhatsApp order updates are tested end to end on live accounts. Book a demo and Timewheel will set up your store.",
      },
      {
        q: "Does EZShop support UPI, cards and Cash on Delivery?",
        a: "Yes. Online payments go through Razorpay, which covers UPI, cards and net banking, and every payment is verified on the server before the order is confirmed. Cash on Delivery can be switched on with a minimum and maximum order value, a COD fee, and blocked PIN codes.",
      },
      {
        q: "Does EZShop generate GST invoices?",
        a: "Yes. Prices are GST-inclusive, CGST and SGST or IGST is worked out from the delivery state, and each product carries its own GST rate and HSN code. Invoices are numbered in sequence per financial year, credit notes are issued on refunds, and GST can be switched off if you are not registered.",
      },
      {
        q: "Can customers get order updates on WhatsApp?",
        a: "Yes. Customers who opt in get WhatsApp messages through AiSensy when an order is placed, shipped, delivered, cancelled or refunded. You need an AiSensy account with approved message templates. Email updates go out through Brevo or your own SMTP.",
      },
      {
        q: "Does EZShop take a commission on my sales?",
        a: "No. EZShop charges no commission per order. Razorpay charges its own gateway fee on online payments, and hosting, domain, Shiprocket and WhatsApp messages are billed by those providers directly to your accounts.",
      },
      {
        q: "Can I use my own domain name?",
        a: "Yes. Your store runs on your own domain, for example yourbrand.in, and the store data, customer list and accounts stay in your name.",
      },
      {
        q: "How does shipping work?",
        a: "You can charge a flat rate, offer free shipping above a cart value, add weight slabs and state-wise surcharges, and block PIN codes you can't deliver to. With Shiprocket connected, staff book a courier, get the AWB and label, and tracking updates mark orders shipped and delivered.",
      },
      {
        q: "How much does EZShop cost?",
        a: "Pricing depends on your store and how much setup you want Timewheel to do, so we quote it after a short call. Book a demo and we will share the cost along with what your provider accounts will cost.",
      },
    ],
  },
  final: {
    title: "Open your online store with EZShop.",
    body: "Tell us what you sell. We'll show you the store, the admin panel and what it takes to go live.",
    primaryLabel: "Book a demo",
    primaryHref: "/book-a-demo",
    secondaryLabel: "Talk to us",
    secondaryHref: "/contact",
  },
};
