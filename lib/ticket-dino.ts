// Ticket Dino product page content. Target query: "event ticketing software"
// (India). Every feature claim maps to shipped code in the bookasloth/ticket-dino
// repo (Zoho Payments, Resend email, QR tickets, atomic inventory). No customer
// counts, ratings or testimonials until real ones exist.
//
// Pricing: 2% per ticket sold, unlimited events (see lib/case-studies-products.ts).

export const td = {
  path: "/products/ticket-dino",
  meta: {
    title: "Event Ticketing Software in India | Ticket Dino",
    description:
      "Ticket Dino is event ticketing and management software for organizers in India: tiered tickets, coupons, UPI and card payments, QR e-tickets and gate check-in.",
  },
  hero: {
    eyebrow: "Ticket Dino, by Timewheel",
    title: "Event ticketing that holds",
    titleAccent: "when the doors open.",
    // Answer-first block (the passage AI answers lift). Keep it under 60 words.
    answer:
      "Ticket Dino is event ticketing and management software for organizers in India. Publish an event, sell tiered tickets with coupons and add-ons, deliver QR e-tickets by email, and scan attendees in at the gate. The checkout can never oversell a seat, and the attendee count updates live.",
    primaryLabel: "Book a demo",
    primaryHref: "/book-a-demo",
    secondaryLabel: "How we built it",
    secondaryHref: "/case-studies/ticket-dino",
    chips: [
      "UPI, cards and netbanking",
      "QR e-tickets by email",
      "Scan-to-check-in at the gate",
      "2% per ticket sold, unlimited events",
    ],
    // Decorative storefront-style sample shown inside the hero ticket. Not a
    // claim; it only illustrates what an e-ticket looks like.
    mock: {
      tag: "E-ticket",
      event: "Neon Nights, Live",
      rows: [
        { label: "Date", value: "Sat, 22 Nov, 7:00 PM" },
        { label: "Venue", value: "Auditorium 1" },
        { label: "Type", value: "General admission" },
      ],
      code: "TD 4F9A 22",
    },
  },
  problem: {
    number: "01",
    label: "THE PROBLEM",
    title: "Ticketing breaks in the ten minutes around the event.",
    body: "Selling the first ticket is easy. What breaks is the on-sale rush, the queue at the door, and the organizer trying to answer \u201chow many are still coming\u201d from a report that arrives the next day. That window is where events are actually lost.",
    items: [
      {
        name: "The last seat sells twice",
        desc: "Two people tap Buy at the same moment, both payments clear, and one of them has no seat. Every popular on-sale has this race, and a spreadsheet can't stop it.",
      },
      {
        name: "A queue forms at the gate",
        desc: "Printing an attendee list and ticking names off by hand is slow, easy to fake and impossible to correct once the doors are open.",
      },
      {
        name: "Numbers arrive too late",
        desc: "How many tickets are left, how many people walked in, how much was collected, you only know after the event, when it's too late to act.",
      },
      {
        name: "Money scattered across screenshots",
        desc: "UPI screenshots, half-matched to names, reconciled by hand. Discounts and group bookings make the mess worse.",
      },
    ],
  },
  solution: {
    number: "02",
    label: "THE SOLUTION",
    title: "Engineered for the on-sale rush and the door.",
    body: "Ticket Dino is built around the two moments that decide an event, and around one guarantee: a seat is sold exactly once. Everything else, tickets, coupons, delivery, check-in, flows from there.",
    cards: [
      {
        icon: "inventory",
        name: "Inventory that can't oversell",
        items: [
          "Capacity held and released atomically inside the database, never read-then-written by the app",
          "A 10-minute hold on every checkout, so a dropped payment doesn't strand a seat",
        ],
      },
      {
        icon: "checkout",
        name: "A checkout that finishes",
        items: [
          "Mobile-first and resumable, so a lost connection mid-payment doesn't lose the sale",
          "Server-verified price with GST and booking fee, no buyer account required",
        ],
      },
      {
        icon: "delivery",
        name: "Tickets that arrive instantly",
        items: [
          "A QR e-ticket emailed within a minute of payment, with a downloadable PDF",
          "Add-to-calendar and a WhatsApp share link on every order",
        ],
      },
      {
        icon: "gate",
        name: "A door that moves",
        items: [
          "Camera QR scanning with a live attendee count as people come through",
          "Duplicates, void tickets and wrong events are rejected on the spot",
        ],
      },
    ],
  },
  compare: {
    number: "03",
    label: "HONEST COMPARISON",
    title: "Payment links and spreadsheets vs Ticket Dino",
    body: "A payment link is fine for a small meetup. It stops being fine the moment two people can buy the same seat, the gate needs to move, or you need the numbers while the event is still happening. Here is where each one wins.",
    columns: ["", "Payment links & spreadsheets", "Ticket Dino"],
    rows: [
      ["Selling in tiers", "One price and one link, or several links tracked by hand", "Tiered tickets, early-bird price steps and group discounts"],
      ["The last seat", "Two buyers can pay for the same seat", "Guaranteed inventory: the last seat sells exactly once"],
      ["Discounts", "Manual codes, reconciled afterwards", "Percent or flat coupons with caps, limits and per-ticket scoping"],
      ["Checkout", "Buyer pays, then sends you a screenshot", "Mobile checkout with UPI, cards and netbanking, no account needed"],
      ["Ticket delivery", "You forward a confirmation by hand", "QR e-ticket emailed automatically, with a PDF copy"],
      ["The gate", "Print a list and tick names off", "Scan QR codes; duplicates and wrong events are rejected"],
      ["Attendee numbers", "Counted the day after", "Live sold, checked-in and collected figures during the event"],
      ["Attendee data", "A list stranded in one person's sheet", "A searchable order list and a logged CSV export you own"],
    ],
    verdict:
      "Stay on a payment link for a 20-person meetup. Move to Ticket Dino when the last seat has to sell once, the gate has to move, and you need the numbers before the hall empties.",
  },
  features: {
    number: "04",
    label: "WHAT'S INSIDE",
    title: "Everything a show needs. In one place.",
    body: "Each piece is built for a real event, from the on-sale rush to the moment the doors close. Hover or tap any card to see what's under it.",
    items: [
      {
        icon: "ticket",
        name: "Events and ticket types",
        desc: "Publish an event with a poster, venue, date and FAQs, then sell it through as many ticket types as you need.",
        bullets: ["Capacity and sale window per ticket type", "Max tickets per order", "Draft, published and sold-out states"],
      },
      {
        icon: "coupon",
        name: "Coupons and price steps",
        desc: "Run early-bird pricing and discounts without touching a spreadsheet, and let demand do the upselling.",
        bullets: ["Percent or flat coupons with caps and use limits", "Coupons scoped to specific ticket types", "Early-bird unlock and group discounts"],
      },
      {
        icon: "payments",
        name: "Checkout and payments",
        desc: "A short, mobile checkout that finishes, with the price worked out on the server every time.",
        bullets: ["UPI, cards and netbanking", "Live breakdown of subtotal, discount, fee and GST", "Free tickets issued instantly, no payment step"],
      },
      {
        icon: "qr",
        name: "QR e-tickets and delivery",
        desc: "The moment payment clears, the buyer gets a ticket they can show at the door, and so does their whole group.",
        bullets: ["QR e-ticket emailed automatically", "Downloadable PDF ticket", "Add-to-calendar and WhatsApp share"],
      },
      {
        icon: "scan",
        name: "Gate check-in",
        desc: "One scan per attendee, on a phone, with no paper list and no double entry.",
        bullets: ["Camera QR scanning with an iOS fallback", "Manual code entry and vibration feedback", "Valid, already-scanned and wrong-event results"],
      },
      {
        icon: "admin",
        name: "Admin and controls",
        desc: "A console for the people running the show, with the numbers that matter during the event, not after it.",
        bullets: ["Owner, manager and gate-staff roles", "Order search, refunds and revenue totals", "Attendee CSV export, logged and rate-limited"],
      },
    ],
    alsoLabel: "Also inside",
    also: [
      "Add-ons and extras at checkout",
      "Booking-fee configuration",
      "GST on tickets and fees",
      "Per-event FAQs",
      "Refund policy per event",
      "Poster uploads",
      "Publish and unpublish",
      "Google Maps venue",
      "UTM tracking",
      "Concurrency-tested inventory",
    ],
  },
  process: {
    number: "05",
    label: "HOW IT WORKS",
    title: "From an empty page to a sold event.",
    body: "You don't need a developer, an account for buyers or a spreadsheet behind the scenes. Most events go live in an afternoon.",
    steps: [
      {
        name: "Create the event",
        desc: "Add the title, poster, date and venue, export the details your buyers need.",
      },
      {
        name: "Set up tickets",
        desc: "Create ticket types with prices and capacity, add coupons, price steps and add-ons, and open a sale window.",
      },
      {
        name: "Go live",
        desc: "Share one link. Checkout handles payment, holds and GST, and sends each buyer a QR e-ticket by email.",
      },
      {
        name: "Open the doors",
        desc: "Gate staff scan QRs at the door and watch the checked-in count move while the event is still running.",
      },
    ],
    notes: ["No buyer account needed", "No per-event setup fee", "Runs on any phone browser"],
  },
  audiences: {
    number: "06",
    label: "WHO IT'S FOR",
    title: "Built for anyone whose event has to work",
    items: [
      {
        name: "Venues and auditoriums",
        desc: "Halls and theatres running a season of ticketed shows, with a box office, tiered seating and a door that has to move.",
      },
      {
        name: "Festivals and concerts",
        desc: "Organizers selling on a spike, when thousands of buyers hit at once and every seat has to be accounted for.",
      },
      {
        name: "Workshops and academies",
        desc: "Training providers selling limited seats, early-bird pricing and group bookings, and tracking who actually turned up.",
      },
      {
        name: "Organizers and promoters",
        desc: "Independent event runners who want one link, clean attendee data and a live count, not a folder of screenshots.",
      },
    ],
  },
  faq: {
    number: "07",
    label: "FAQ",
    title: "Questions, answered.",
    items: [
      {
        q: "What is Ticket Dino?",
        a: "Ticket Dino is event ticketing and management software, built by Timewheel in Nagpur for organizers in India. It covers tiered ticket sales, coupons and add-ons, UPI and card payments, QR e-ticket delivery, gate check-in and attendee data, so one link handles the whole event.",
      },
      {
        q: "How much does Ticket Dino cost?",
        a: "The published model is 2% per ticket sold, with unlimited events, real-time attendee analytics and QR check-in included. There is no per-event setup fee, so an event that sells little costs little and a big event doesn't get taxed for succeeding.",
      },
      {
        q: "Can Ticket Dino oversell a show?",
        a: "No. Capacity is held and released atomically inside the database, and the app never reads a count and then writes it back. Every checkout takes a ten-minute hold, and the inventory is tested against 200 buyers hitting the same ticket at once, so the last seat is sold exactly once.",
      },
      {
        q: "How do attendees receive their tickets?",
        a: "The moment payment clears, the buyer gets an email with a QR e-ticket and a downloadable PDF, plus an add-to-calendar link and a WhatsApp share button. Every ticket in the order gets its own QR code, so a group can arrive and be scanned separately.",
      },
      {
        q: "Which payment methods are supported?",
        a: "Buyers pay in rupees by UPI, cards or netbanking, and free tickets are issued instantly with no payment step. Prices, discounts, booking fees and GST are recalculated on the server, so amounts shown in the browser are never trusted.",
      },
      {
        q: "Can I check attendees in at the gate?",
        a: "Yes. Assigned gate staff scan QR codes with a phone camera, with a fallback scanner for older iOS versions and manual code entry if a screen won't scan. Each result shows valid, already checked in, or wrong event, and the attendee count updates live.",
      },
      {
        q: "Can I run early-bird pricing and group discounts?",
        a: "Yes. You can set sale windows, early-bird price steps that unlock after another tier sells out, automatic group discounts by quantity, and percent or flat coupons with caps and use limits, all scoped to the ticket types you choose.",
      },
      {
        q: "Does Ticket Dino handle GST and refunds?",
        a: "GST is applied to tickets and to the booking fee, and the checkout shows the full breakdown before payment. Refunds are recorded against an order, void the tickets and restore capacity if the event hasn't started yet, and email the buyer automatically.",
      },
    ],
  },
  final: {
    title: "Sell the show out without watching the seats.",
    body: "Tell us about your next event, and about the last one that went sideways. We'll show you the same event running on Ticket Dino.",
    primaryLabel: "Book a demo",
    primaryHref: "/book-a-demo",
    secondaryLabel: "How we built it",
    secondaryHref: "/case-studies/ticket-dino",
  },
};
