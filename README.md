HEAD
# Meridian — Next.js Website

Business intelligence SaaS website. Black & white theme, Syne + DM Sans typography.

## Project Structure

```
meridian/
├── styles/
│   └── globals.css          # CSS variables, fonts, animations, utility classes
│
├── lib/
│   └── constants.js         # All site content: copy, nav links, features, team, etc.
│
├── components/
│   ├── Header.jsx            # Sticky header with nav + Log in / Get Started
│   ├── Footer.jsx            # Footer with columns + status indicator
│   │
│   ├── ui/                  # Generic, reusable UI primitives
│   │   ├── LogoMarquee.jsx   # Infinite scrolling client logo strip
│   │   ├── Timeline.jsx      # Scroll-animated vertical timeline (Aceternity-style)
│   │   └── FAQAccordion.jsx  # Expandable FAQ list
│   │
│   └── sections/            # Page-specific layout sections
│       ├── HeroSection.jsx   # Full-screen hero with outline headline
│       ├── FeaturesSection.jsx # 2×3 feature grid
│       └── CTASection.jsx    # Bottom conversion section
│
└── pages/                   # Next.js pages router
    ├── _app.jsx              # Global CSS injection
    ├── index.jsx             # Home (hero + marquee + features + timeline + stats + CTA)
    ├── pricing.jsx           # Pricing tiers + billing toggle + FAQ
    ├── about.jsx             # Story + values + team + careers CTA
    ├── contact.jsx           # Contact form + office locations
    ├── login.jsx             # Sign in page
    └── get-started.jsx       # Sign up / free trial page
```

## Setup

```bash
# Install dependencies
npm install next react react-dom

# Run development server
npm run dev

# Build for production
npm run build && npm start
```

## Fonts

Loaded from Google Fonts in `globals.css`:
- **Syne** (400–800) — display, headings, logo. Close to Palantir / OpenAI geometric grotesque.
- **DM Sans** (300–600) — body text, UI labels, buttons.

## Customisation

All site copy, team data, pricing plans, nav links, and client logos live in
`lib/constants.js` — update that one file to rebrand for any project.

To add a new page:
1. Create `pages/your-page.jsx`
2. Import `Header` and `Footer`
3. Add the route to `NAV_LINKS` in `lib/constants.js` if needed

## 21st.dev Components

The following 21st.dev components are re-implemented here from scratch
(no external dependency needed, but you can swap them in):

```bash
# Original hero + header
npx shadcn@latest add https://21st.dev/r/sshahaider/hero-1

# Original timeline
npx shadcn@latest add https://21st.dev/r/aceternity/timeline
```
=======
# Meridian-Logistics
unicorn fr
4bed1a7c49a55cec14ddb0b5271c0017296cdf40
