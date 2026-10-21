// Indian Sports Club product page content. Reframed to match Bharat Army style,
// whilst being a home for fans across all Indian sports.

export const isc = {
  path: "/products/indian-sports-club",
  meta: {
    title: "Join The Indian Sports Club | Multi-Sport Community For Indian Sports",
    description:
      "Join The Indian Sports Club - a multi-sport community for fans of cricket, football, kabaddi, hockey, badminton, tennis, volleyball and more. Register for free and be part of the ISC family.",
  },
  hero: {
    eyebrow: "INDIAN SPORTS CLUB",
    title: "JOIN THE ISC FAMILY",
    titleAccent: "One Community. All Sports.",
    // Answer-first block
    answer:
      "The Indian Sports Club is India's multi-sport community. Follow your favourite clubs and teams across cricket, football, kabaddi, hockey, badminton, tennis, volleyball and more. Register for free and be part of the roar.",
    primaryLabel: "Register Now",
    primaryHref: "/register",
    secondaryLabel: "See What You Get",
    secondaryHref: "#benefits",
    // Phone feed mock in the hero.
    panel: {
      app: "Indian Sports Club",
      season: "ISC Family · Live Now",
      items: [
        {
          kind: "result",
          label: "Full Time",
          title: "City FC 2 : 1 Greenfield FC",
          meta: "Football · League",
        },
        {
          kind: "fixture",
          label: "Next Up",
          title: "Hawks vs Warriors",
          meta: "Kabaddi · Super League",
        },
        {
          kind: "fixture",
          label: "Coming Up",
          title: "Blazers vs Strikers",
          meta: "Badminton · Doubles",
        },
      ],
      statLabel: "The ISC Family",
      stats: [
        { value: "All", label: "Sports" },
        { value: "India", label: "Wide" },
        { value: "1", label: "Family" },
      ],
    },
  },
  audiences: {
    label: "WHO IS IT FOR",
    title: "For Every Fan. For Every Sport.",
    titleLead: "For Every Fan.",
    titleAccent: "For Every Sport.",
    body: "The Indian Sports Club is for every fan who lives and breathes sport. From cricket and football to kabaddi, hockey, badminton, tennis, volleyball, kho-kho and beyond — if you cheer from the stands, roar from your home, or live every moment with your team, you belong in the ISC Family.",
    sports: [
      "Cricket",
      "Football",
      "Kabaddi",
      "Hockey",
      "Badminton",
      "Tennis",
      "Volleyball",
      "Kho-Kho",
    ],
    modes: [
      {
        icon: "stands",
        name: "From the stands",
        desc: "Matchday regulars who bring the noise, wave the flag and sing for ninety minutes.",
      },
      {
        icon: "home",
        name: "From your home",
        desc: "Living-room fans who never miss a ball, a rally or a last-minute winner.",
      },
      {
        icon: "team",
        name: "With your team",
        desc: "Supporters who live every high and low of the season, whatever the sport.",
      },
    ],
  },
  benefits: {
    number: "01",
    label: "WHY JOIN",
    title: "More Than A Community. A Family.",
    body: "Brought together by the love of sport. If you live for the game, no matter which sport it is, there's a place for you in the ISC Family.",
    items: [
      {
        name: "Your Home For Every Sport",
        desc: "Follow clubs and teams across cricket, football, kabaddi, hockey, badminton, tennis, volleyball and many more, all in one place.",
      },
      {
        name: "Fixtures, Results & Standings",
        desc: "Never miss a match. Stay updated with fixtures, live results and points tables for the teams and clubs you follow.",
      },
      {
        name: "Unforgettable Events & Watch Parties",
        desc: "Be part of ISC watch parties, screenings and community events with fans who cheer just as loud as you do.",
      },
      {
        name: "Priority Access & Registrations",
        desc: "Get first dibs on tournament registrations, ground slots and community events when they go live.",
      },
      {
        name: "Exclusive Content & Updates",
        desc: "Stay in the loop with match-day updates, club news and behind-the-scenes stories made for true fans.",
      },
      {
        name: "Built On Camaraderie",
        desc: "Connect with fans, players and clubs across India. Share the highs, the lows and everything in between, as one united family.",
      },
    ],
  },
  solution: {
    number: "02",
    label: "THE SOLUTION",
    title: "One club, one fanclub, online and on the ground",
    body: "The Indian Sports Club brings fans, teams and clubs together across all sports — cricket, football, kabaddi, hockey, badminton, tennis, volleyball and more. Follow what you love, stay updated with fixtures and results, and be part of the community both online and off the field.",
    lead: {
      icon: "play",
      name: "Follow Every Sport",
      items: [
        "Fixtures, results and live points tables for all sports",
        "Tournaments, leagues and watch parties",
        "One home for every team you support",
      ],
      tableLabel: "Top Leagues",
      table: [
        { pos: "1", team: "Football", pts: "Live" },
        { pos: "2", team: "Cricket", pts: "Live" },
        { pos: "3", team: "Kabaddi", pts: "Live" },
      ],
    },
    cards: [
      {
        icon: "teams",
        name: "Teams & Clubs",
        items: [
          "Follow your favourite clubs and teams across sports",
          "Get updates tailored to what you follow",
          "Build your own ISC family of teams",
        ],
      },
      {
        icon: "events",
        name: "Events & Community",
        items: [
          "Unforgettable watch parties and member events",
          "Stay updated with fixtures and results",
          "Connect with fans who share your passion",
        ],
      },
      {
        icon: "admin",
        name: "Your ISC Card & Access",
        items: [
          "Free Virtual ISC Card when you register",
          "Priority access to registrations and events",
          "Stay in the loop with exclusive updates",
        ],
      },
    ],
  },
  compare: {
    number: "03",
    label: "HONEST COMPARISON",
    title: "WhatsApp group vs the fanclub app",
    body: "WhatsApp is great for chats. A true multi-sport fanclub keeps you updated with fixtures, results and events without the noise — no matter which sport you follow.",
    columns: ["", "WhatsApp group", "Indian Sports Club"],
    score: { us: "9", them: "2", note: "what matters for true fans" },
    rows: [
      ["Stay updated", "Messages get lost in chat", "Curated updates for the sports and clubs you follow"],
      ["Fixtures & results", "Shared as photos/text that scroll away", "All fixtures, results and standings in one place"],
      ["Events & watch parties", "Buried in group chatter", "Dedicated updates so you never miss them"],
      ["Following multiple sports", "Hard to track across groups", "One account for cricket, football, kabaddi, hockey, badminton, tennis, volleyball & more"],
      ["Community", "Constant notifications & noise", "A focused fanclub built for fans, not spam"],
      ["Your identity", "Just another number in a group", "Your free Virtual ISC Card & personal profile"],
    ],
  },
  features: {
    number: "04",
    label: "WHAT'S INSIDE",
    title: "Everything a club needs. Built to work together.",
    body: "From fixtures and results to events and community — everything you need as a fan, brought together for all sports you love.",
    items: [
      {
        icon: "fixtures",
        name: "Fixtures and results",
        desc: "Follow schedules for every sport, check results as they happen and track standings for your favourite teams.",
        bullets: ["Multi-sport calendars", "Live results & standings", "Shareable match pages"],
      },
      {
        icon: "teams",
        name: "Teams and clubs",
        desc: "Follow all the clubs and teams you support across cricket, football, kabaddi, hockey, badminton, tennis, volleyball and more.",
        bullets: ["Follow multiple sports & clubs", "Personalised feed of updates", "Never miss your team's matches"],
      },
      {
        icon: "tournaments",
        name: "Tournaments and leagues",
        desc: "Stay on top of tournaments and leagues across every sport with schedules, brackets and results in one place.",
        bullets: ["Multi-sport tournaments", "Leagues & knockout formats", "Latest results & fixtures"],
      },
      {
        icon: "membership",
        name: "ISC Community",
        desc: "Be part of India's multi-sport community. Register for free, get your Virtual ISC Card and connect with fans who share your passion.",
        bullets: ["Free registration", "Virtual ISC Card", "Fan-first community for all sports"],
      },
      {
        icon: "bookings",
        name: "Events & Watch Parties",
        desc: "Join ISC watch parties, screenings and community events. Get first dibs on upcoming events when they go live.",
        bullets: ["Watch parties & screenings", "Community events", "Priority access for fans"],
      },
      {
        icon: "admin",
        name: "Stay Updated",
        desc: "Get match-day updates, club news and exclusive content tailored to the sports and teams you follow.",
        bullets: ["Match-day alerts", "Club news & updates", "Exclusive fan content"],
      },
    ],
    alsoLabel: "Also inside",
    also: [
      "Multi-sport support (cricket, football, kabaddi, hockey, badminton, tennis, volleyball & more)",
      "Personalised feed",
      "Virtual ISC Card",
      "Watch parties & community events",
      "Fixtures, results & standings",
      "Follow unlimited clubs & teams",
      "Google sign-in",
    ],
  },
  sports: {
    number: "05",
    label: "OUR SPORTS",
    title: "One Family. Every Sport.",
    titleLead: "One Family.",
    titleAccent: "Every Sport.",
    body: "From the thunder of a cricket crowd to the roar of football, the chants of kabaddi, the precision of hockey, and the rallies of badminton and tennis — every sport has its place in the ISC Family. If it's played in India, it belongs here.",
    items: [
      "Cricket",
      "Football",
      "Kabaddi",
      "Hockey",
      "Badminton",
      "Tennis",
      "Volleyball",
      "Basketball",
      "Table Tennis",
      "Squash",
      "Athletics",
      "Kho-Kho",
      "Handball",
      "Wrestling",
      "And Many More",
    ],
  },
  howToJoin: {
    number: "03",
    label: "HOW TO JOIN",
    title: "Become A Part Of The ISC Family",
    body: "Registering with the Indian Sports Club takes less than a minute. No fees, no hassle. Just join the roar.",
    steps: [
      {
        name: "Register For Free",
        desc: "Click Register Now and create your ISC account in seconds with your basic details.",
      },
      {
        name: "Get Your ISC Card",
        desc: "As soon as you register, you'll get your free Virtual ISC Card inside your account.",
      },
      {
        name: "Follow What You Love",
        desc: "Follow your favourite clubs, teams and sports to get fixtures, results and updates tailored to you.",
      },
      {
        name: "Live The Game",
        desc: "Join the community, turn up for events and cheer with the ISC Family across every sport.",
      },
    ],
  },
  faq: {
    number: "04",
    label: "FAQ",
    title: "Frequently Asked Questions",
    items: [
      {
        q: "What is The Indian Sports Club?",
        a: "The Indian Sports Club (ISC) is India's multi-sport community. A home for fans of cricket, football, kabaddi, hockey, badminton, tennis, volleyball and more. We bring fans, clubs and players together as one family.",
      },
      {
        q: "Does ISC only cover Cricket?",
        a: "No. ISC is a multi-sport community. We cover all major Indian sports and grassroots clubs, giving every sport a place to call home.",
      },
      {
        q: "Is registration free?",
        a: "Yes. Registering for the Indian Sports Club is completely free.",
      },
      {
        q: "Is the ISC Card physical or virtual?",
        a: "The ISC Card is virtual. You'll find it in your ISC account as soon as you register.",
      },
      {
        q: "How do I register for Indian Sports Club?",
        a: "Just click 'Register Now' on this page. It takes less than a minute to create your free account and join the ISC Family.",
      },
      {
        q: "What happens after I register?",
        a: "Once you register, you'll get your Virtual ISC Card, be able to follow your favourite clubs and sports, and start receiving updates tailored to what you follow.",
      },
      {
        q: "Can I follow multiple sports and clubs?",
        a: "Yes. You can follow as many sports, teams and clubs as you want, all from one account.",
      },
    ],
  },
  final: {
    title: "One Family. All Sports. Join Us.",
    body: "No matter which sport you live for, there's a place for you in the ISC Family. Register for free and join the roar today.",
    primaryLabel: "Register Now",
    primaryHref: "/register",
    secondaryLabel: "Talk To Us",
    secondaryHref: "/contact",
  },
};
