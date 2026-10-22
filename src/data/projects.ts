// Case study content. Text marked "TODO" is a placeholder to replace.
// Drop images into public/assets/projects/<slug>/ and set `cover` / `gallery`;
// projects without a cover render a colored placeholder.

export type ProjectSection = {
  heading: string;
  body: string;
  images?: string[];
};

export type Project = {
  slug: string;
  title: string;
  label: string;
  year?: string;
  summary: string;
  role: string;
  stack: string[];
  color: string;
  featured?: boolean;
  cover?: string;
  /** Cover is a screenshot: show it inside a browser window instead of edge to edge. */
  coverFrame?: boolean;
  /** Tailwind object-position for the cover, e.g. "object-left-top". Defaults to "object-top". */
  coverPosition?: string;
  links: {
    live?: string;
    github?: string;
    other?: { label: string; url: string };
  };
  sections: ProjectSection[];
};

export const projects: Project[] = [
  // {
  //   slug: "true-khmer",
  //   title: "True Khmer",
  //   label: "Web app · Production",
  //   summary:
  //     "Admin and volunteer platform: content moderation, applicant management, a forum and a launchpad for opportunities.",
  //   role: "Frontend — admin panel, moderation tools, admin auth, saved items",
  //   stack: ["React Router v7", "TypeScript", "Tailwind", "shadcn/ui", "Zod"],
  //   color: "#13273F",
  //   featured: true,
  //   links: {},
  //   sections: [
  //     {
  //       heading: "Overview",
  //       body: "True Khmer is a production platform where admins and volunteers manage content, applicants, a community forum and a launchpad of opportunities. I worked on the frontend of the admin side.",
  //     },
  //     {
  //       heading: "The problem",
  //       body: "TODO: What made moderation and applicant management hard before? Who are the admins and what slowed them down?",
  //     },
  //     {
  //       heading: "What I built",
  //       body: "The admin panel, moderation tools, admin authentication and saved items. Forms and API data are validated with Zod, and the UI is built with shadcn/ui on top of React Router v7.",
  //     },
  //     {
  //       heading: "Result",
  //       body: "TODO: Outcome — what's live, what changed for admins, anything you learned.",
  //     },
  //   ],
  // },
  {
    slug: "sneak-a-tab",
    title: "Sneak-a-Tab",
    label: "Game",
    summary:
      'A single-player Godot game inspired by "Alt + Tab": look busy at work while secretly playing a game behind your boss\'s back.',
    role: "Solo dev",
    stack: ["Godot"],
    color: "#4464a8",
    featured: true,
    cover: "/assets/projects/sneak-a-tab/cover.png", // placeholder: title screen
    coverFrame: true,
    links: {
      other: {
        label: "Play on itch.io",
        url: "https://dainroth.itch.io/sneak-a-tab",
      },
    },
    sections: [
      {
        heading: "Overview",
        body: 'Sneak-a-Tab is a single-player game I built in Godot. It\'s inspired by "Alt + Tab", a game by Jerbob on itch.io. I rebuilt the core of it from scratch to learn the engine.',
      },
      {
        heading: "The idea",
        body: "You play an office worker who has a report to write. But she doesn't want to work. She wants to play a game on her work computer. The problem is that her boss walks around the office, and if he sees the game on her screen, she's fired.\n\nThat's the joke of the whole game.",
      },
      {
        heading: "Goals",
        body: "• Learn Godot. I was new to it, and I wanted to at least make a game that's actually playable.\n• Recreate the main part of the game that inspired me.\n• Make it feel as silly as the original.",
      },
      {
        heading: "How it plays",
        body: "Three keys: Space types the report, Shift swaps between the work tab and the game tab, and E spins her chair around so she can look behind her.\n\nThe work tab is the safe one. When you type, a progress bar fills up and the boss is happy to see it. The game tab is a Flappy Bird minigame.\n\nThe boss walks patrol routes around the office, and some of them go right past your desk. Sometimes he stops and says something silly. When you face the monitor the camera is zoomed in, and when you spin away it zooms out to show the office. That's how you check where he is.",
      },
      {
        heading: "Challenges",
        body: "Layering the art. The scene is made of separate pictures: the character, the chair, the desk, the monitor. They have to be stacked in the right order, or she appears in front of something she should be behind.\n\nThe camera. I wanted it to zoom in on the monitor and zoom out when she spins. She can face four directions, and the camera has to follow each one smoothly. A lot of this was not one bug with one fix.\n\nThe boss. He looks simple, but he's several systems in one. He walks a route, he stops, he talks, and the game has to know if he can see your screen.\n\nThe minigame. For Flappy Bird I followed a YouTube tutorial. My part was making it fit inside my game, so it runs as a tab on the monitor and swaps with the work tab.",
      },
    ],
  },
  {
    slug: "ey-kor-ban",
    title: "Ey Kor Ban",
    label: "Web app · In progress",
    summary:
      "A playful decision maker: can't pick what to eat or do? Drop your options into a wheel or a slot machine and let fate decide.",
    role: "Solo — design and full-stack development",
    stack: ["Next.js", "TypeScript", "Node.js"],
    color: "#9FD8C2",
    featured: true,
    cover: "/assets/projects/ey-kor-ban/cover.png", // placeholder: landing page
    coverFrame: true,
    coverPosition: "object-left-top",
    links: { live: "https://eykorban.vercel.app/" },
    sections: [
      {
        heading: "Overview",
        body: "Ey Kor Ban is a playful website for when you're having a hard time deciding something, like what to eat or what to do. Drop your options into the wheel or the slot machine, spin it, and let fate decide.",
      },
      {
        heading: "The idea",
        body: "It came from my friend Lyviss. He asked me to build it for him as a fun thing to use when he can't decide what to do, or when he wants to run a giveaway with a spinning wheel.",
      },
      {
        heading: "How it works",
        body: "Put whatever you're choosing between into the wheel or the slot. Each item can have its own sub-items, so a choice can go two levels deep.\n\nFor example, add \"Burger\" as an item, with Burger King, McDonald's and Jollibee as its sub-items. Spin once to land on burgers, then again to pick where.",
      },
      {
        heading: "What's next",
        body: "Nothing's set in stone yet. We'll see where it goes.",
      },
    ],
  },
  {
    slug: "4ps-pizza",
    title: "Pizza 4P's",
    label: "School project · Full-stack",
    summary:
      "A restaurant brand storytelling site with accounts, table reservations and a live menu, built as my school final project.",
    role: "Design, frontend, backend + auth",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind",
      "shadcn/ui",
      "Framer Motion",
      "Node/Express",
      "MongoDB",
    ],
    color: "#D64561",
    featured: true,
    cover: "/assets/projects/4ps-pizza/cover.webp", // placeholder: landing page
    coverFrame: true,
    coverPosition: "object-left",
    links: { github: "https://github.com/dainroth/4Ps-Pizza-web" }, // TODO: live link once deployed
    sections: [
      {
        heading: "Overview",
        body: "A restaurant brand storytelling website inspired by Madie, built as my school final project. Visitors can read the brand's story, browse the menu, find the restaurant, and log in to book a table.",
      },
      {
        heading: "Features",
        body: '• Accounts: register and log in, with passwords hashed using bcrypt and JWT-based sessions.\n• Protected routes: the reservation pages only open while you\'re logged in.\n• Table reservations: book by venue, date, time, party size and service type (Inside, Outside, Pizza Counter or Semi-Private), then view or cancel your bookings under "My Reservations".\n• Dynamic menu: items come from the backend, grouped by category, in a horizontally scrolling, animated card layout.\n• Brand pages: Story, Visit (with an embedded map), and a landing page that leads into reservations.',
      },
      {
        heading: "Build",
        body: "The frontend is React and TypeScript on Vite, styled with Tailwind and shadcn/ui components, with React Router for pages, Framer Motion for the animations and Axios for API calls. Login state lives in a global AuthContext.\n\nThe backend is Node and Express with MongoDB Atlas through Mongoose. It's split into routes, controllers and models for users, menu items and reservations, with a middleware that checks the JWT on protected requests.",
      },
      {
        heading: "Scope",
        body: "I followed a full-stack tutorial for the overall structure, but built the authentication and the menu display from scratch. The cart and admin panel from the tutorial were left out on purpose, to keep the focus on those parts.",
      },
      {
        heading: "A note on the content",
        body: "This is a learning project. The menu items, reviews and location are placeholder data styled after Pizza 4P's for reference. It isn't affiliated with or representing the real brand.",
      },
    ],
  },
  {
    slug: "retrack",
    title: "ReTrack",
    label: "Web app · Competition prototype",
    summary:
      "Smart recycling for Phnom Penh: scan waste with AI, find the nearest drop-off point, and earn EcoPoints for what you recycle.",
    role: "UI design, helping a friend's competition team",
    stack: ["React", "Vite", "OpenStreetMap"],
    color: "#2f9e5b",
    cover: "/assets/projects/retrack/cover.png", // placeholder: landing page
    coverFrame: true,
    links: { live: "https://re-track-five.vercel.app/" },
    sections: [
      {
        heading: "Overview",
        body: "ReTrack is a waste management app for Phnom Penh, with the tagline \"Connecting People to a Cleaner Future\". You scan what you're throwing away, the AI tells you how to sort it, the map shows you the nearest drop-off point, and you earn EcoPoints for every item you keep out of landfill.\n\nA friend's team built it for a competition and asked me to help with the UI.",
      },
      {
        heading: "The problem",
        body: "Cambodia generated about 546,000 tonnes of plastic waste in 2022. Only 5% was properly managed and less than 2% was recycled (UNDP, 2026).\n\nThe team's own survey of 154 people showed why. 78.4% had thrown recyclables into regular trash because they didn't know where or how to recycle them, and 54.1% found it hard to find a working drop-off point. The root causes were poor sorting, an inconvenient recycling system, low awareness, and not knowing where the nearest recycling center is.",
      },
      {
        heading: "My part",
        body: "Before designing anything, I went through the project with my friend: how each feature works, and who it's for. The main users are university students and young people living in Phnom Penh, often in apartments or condos. They care about the environment, but recycling feels like too much effort.\n\nThat shaped the UI. It needed to be quick and friendly, work well on a phone, and make every small action feel rewarding. Along the way we also added a few new features to the app.",
      },
      {
        heading: "What's in the app",
        body: '• Scan: point your camera at an item and the AI identifies it and tells you how to dispose of it.\n• Recycling map: drop-off stations across Phnom Penh, filterable by material, with distance, opening hours and a button to log your drop-off.\n• Learning hub: short local guides on sorting waste, plus a daily eco quiz. Reading them earns points too.\n• EcoPoints & rewards: points turn into real rewards from partners, like a coffee voucher or a reusable bottle.\n• Your impact: a monthly "Wrapped" recap of how much you recycled, ready to share.',
      },
    ],
  },
  {
    slug: "the-koi",
    title: "The KOI Redesign",
    label: "UX / UI design",
    summary:
      "A UX study of The KOI's app: learning how people actually use it, then designing a better version.",
    role: "Team project: UX research and UI design",
    stack: ["Figma", "Adobe Illustrator"],
    color: "#F2A7B8",
    links: {
      other: {
        label: "Figma file",
        url: "https://www.figma.com/design/9IXfoziQVTHEVGKxXmKX5s/KOI-Final?node-id=0-1&t=HQRy67vvMuzi5yBv-1",
      },
    },
    sections: [
      {
        heading: "Overview",
        body: "We took the app for The KOI, the bubble tea brand, and set out to understand the experience of the people using it. Then we used what we learned to design a better version of it, in Figma and Illustrator.",
      },
      // DRAFT: written without specifics. Swap in real findings when you have them.
      {
        heading: "Understanding the users",
        body: "Before designing anything, we went through the app ourselves and looked at it from a customer's point of view: what they open it for, the steps they take, and where those steps feel slow or confusing. Those moments became the list of things worth fixing.",
      },
      {
        heading: "The redesign",
        body: "We then reworked the screens around what people actually come to the app to do, making the main tasks quicker to reach and easier to follow, while keeping the look true to The KOI's brand. The Figma file shows the screens and how they evolved.",
      },
      {
        heading: "What I took from it",
        body: "This project taught me to start from the user instead of the screen. Asking \"what is this person trying to do?\" first makes the design decisions much easier, and it's a habit I still bring to my frontend work.",
      },
    ],
  },
  {
    slug: "portfolio",
    title: "This Portfolio",
    label: "Web app",
    year: "2026",
    summary:
      "My personal portfolio — a playground for layout, type and motion.",
    role: "Design and development",
    stack: ["Next.js", "Tailwind", "Framer Motion", "TypeScript", "Figma"],
    color: "#F2CF63",
    links: {
      live: "https://sakhanmonirothna.vercel.app/",
      github: "https://github.com/dainroth",
    },
    sections: [
      {
        heading: "Overview",
        body: "The site you're on. Built with Next.js, Tailwind and Framer Motion, with Lenis smooth scrolling.",
      },
      {
        heading: "Details",
        body: "• The home intro is drawn like a Figma frame: a cursor drags a selection box open, and the content is revealed by a clip-path that grows with it.\n• The desk objects in the intro can be dragged around, kept inside their panel with Framer Motion's drag constraints.\n• Moving between pages, four colored panels sweep over the screen. One click listener on the document catches internal links, so every link gets the transition without wrapping each one.\n• On the About page, a cursor roams the page and changes what it says for each section.\n• It all respects reduced motion: with that setting on, animations skip straight to their final state.",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
