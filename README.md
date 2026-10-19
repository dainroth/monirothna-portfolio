This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                  # Routes only (Next.js App Router)
│   ├── layout.tsx        # Root layout, fonts, metadata
│   ├── page.tsx          # "/"        → HomeView
│   ├── aboutMe/page.tsx  # "/aboutMe" → AboutView
│   ├── not-found.tsx
│   └── globals.css
├── components/
│   ├── layout/           # Header, Navigation, Footer (shared page chrome)
│   ├── sections/         # Page sections: Hero, About, Stack, WorkExperience, Projects, WorkFlow
│   ├── views/            # Full page compositions used by routes (HomeView, AboutView)
│   └── ui/               # Reusable building blocks (Folder, LogoLoop, RotatingText, SmoothScroll, IntroOverlay)
└── lib/                  # Helpers (cn)
public/assets/            # Images, videos, CV
```

Imports use the `@/` alias, which points to `src/` (e.g. `import Header from "@/components/layout/Header"`).

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
