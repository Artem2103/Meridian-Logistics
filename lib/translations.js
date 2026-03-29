// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
// Full EN + RU content for every visible string across the site.

export const translations = {
    en: {
      // ── Navigation ─────────────────────────────────────────────────────────────
      nav: {
        pricing: "Pricing",
        about: "About",
        contact: "Contact",
        logIn: "Log in",
        getStarted: "Get Started",
        departments: "Departments",
        profile: "Profile",
        settings: "Settings",
        logOut: "Log out",
      },
  
      departments: [
        { label: "Logistics",  href: "/logistics",  desc: "Route intelligence"  },
        { label: "Systems",    href: "/systems",    desc: "Business analytics"  },
        { label: "Securities", href: "/securities", desc: "Risk & compliance"   },
      ],
  
      // ── Common CTAs ────────────────────────────────────────────────────────────
      cta: {
        startFreeTrial:    "Start free trial",
        talkToSales:       "Talk to sales",
        learnMore:         "Learn more",
        sendMessage:       "Send message →",
        createAccount:     "Create account →",
        signIn:            "Sign in →",
        continueWithSSO:   "Continue with SSO",
        getStartedFree:    "Get started free",
        forgotPassword:    "Forgot password?",
        viewOpenRoles:     "View open roles →",
      },
  
      // ── Company ────────────────────────────────────────────────────────────────
      company: {
        tagline: "Global trade intelligence for companies that move the world.",
        allSystemsOperational: "All systems operational",
        copyright: "All rights reserved.",
      },
  
      // ── Footer ─────────────────────────────────────────────────────────────────
      footerCols: [
        {
          title: "Platform",
          links: [
            { label: "Logistics",  href: "/logistics"  },
            { label: "Systems",    href: "/systems"    },
            { label: "Securities", href: "/securities" },
            { label: "Pricing",    href: "/pricing"    },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About",    href: "/about"   },
            { label: "Blog",     href: "/about"   },
            { label: "Careers",  href: "/contact" },
            { label: "Press",    href: "/contact" },
          ],
        },
        {
          title: "Resources",
          links: [
            { label: "Docs",          href: "/about" },
            { label: "API Reference", href: "/about" },
            { label: "Status",        href: "/about" },
            { label: "Security",      href: "/about" },
          ],
        },
      ],
  
      // ── Home Hero ──────────────────────────────────────────────────────────────
      hero: {
        eyebrow:      "Global Trade Intelligence Platform",
        h1Line1:      "Do business",
        h1Line2:      "smarter.",
        sub:          "Meridian's AI finds the fastest, cheapest, and safest international trade routes for your specific goods — accounting for customs rules, sanctions, port conditions, and geopolitical risk in real time.",
        cta:          "Start free trial",
        ctaSecondary: "See how it works",
      },
  
      // ── Home Dept Strip ────────────────────────────────────────────────────────
      deptStrip: {
        logistics: {
          tag:   "Route Intelligence",
          label: "Logistics",
          desc:  "AI-optimised routing across 160+ countries. Product-aware corridor filtering, live port data, and multi-modal comparison — so your cargo always takes the right path.",
        },
        systems: {
          tag:   "Business Analytics",
          label: "Systems",
          desc:  "Full landed-cost modelling, tariff intelligence, and supplier country analysis. Know exactly what a trade lane will cost before you commit a single dollar.",
        },
        securities: {
          tag:   "Risk & Compliance",
          label: "Securities",
          desc:  "Sanctions screening, geopolitical risk scoring, and AI-generated contract recommendations. Identify exposure before it becomes a crisis.",
        },
        learnMore: "Learn more",
      },
  
      // ── Map Section ────────────────────────────────────────────────────────────
      map: {
        home: {
          eyebrow:  "Global Coverage",
          h2Line1:  "160+ countries.",
          h2Line2:  "Every corridor mapped.",
          sub:      "Meridian covers every major trade lane on earth — from high-volume container routes to narrow-gauge emerging market corridors. If cargo moves there, we model it.",
        },
        logistics: {
          eyebrow:  "Active Trade Lanes",
          h2Line1:  "Route intelligence",
          h2Line2:  "across every lane.",
          sub:      "Every route is scored in real time against port conditions, commodity restrictions, sanctions exposure, and carrier performance. The best path is rarely the obvious one.",
        },
        stats: [
          { value: "160+",   label: "Countries"            },
          { value: "2,400+", label: "Trade corridors"      },
          { value: "3,200+", label: "Ports monitored"      },
          { value: "800+",   label: "Carriers benchmarked" },
        ],
      },
  
      // ── Platform Features ──────────────────────────────────────────────────────
      features: {
        eyebrow: "Platform",
        h2:      "Six capabilities,\none platform",
        items: [
          { num: "01", title: "AI Route Engine",           desc: "Our model evaluates thousands of route combinations across land, sea, and air — optimising for cost, speed, and regulatory compliance simultaneously." },
          { num: "02", title: "Product-aware Routing",     desc: "Different goods face different rules. Meridian knows which corridors, ports, and borders are open for your specific cargo — from perishables to controlled materials." },
          { num: "03", title: "Geopolitical Intelligence", desc: "Real-time signals on sanctions, trade disputes, border closures, and political instability. Know before your shipment moves." },
          { num: "04", title: "Cost & Tax Modelling",      desc: "Full landed-cost breakdowns including duties, VAT, handling fees, and currency exposure — across 180+ countries before you commit." },
          { num: "05", title: "Risk & Compliance Engine",  desc: "Automated contract suggestions, document checklists, and red-flag alerts for high-risk corridors. Your legal exposure, surfaced before it becomes a problem." },
          { num: "06", title: "Delay Forecasting",         desc: "Predictive models built on port congestion data, seasonal patterns, carrier performance history, and live weather to anticipate delays before they happen." },
        ],
      },
  
      // ── Story / Timeline ───────────────────────────────────────────────────────
      story: {
        eyebrow: "Story",
        h2:      "Built by people who've\nshipped things.",
        items: [
          { year: "2020", title: "Founded in Hanoi",            desc: "A solo founder who had spent years watching shipments fail for predictable reasons. I built the system people always needed." },
          { year: "2021", title: "Logistics Department Launches", desc: "Released the core route intelligence engine covering 160 countries and 2,400 trade corridors. First enterprise contracts with market exporters." },
          { year: "2022", title: "Systems & Securities Added",   desc: "Expanded to full-stack trade intelligence: real-time cost modelling, sanctions screening, and compliance automation. Trusted by leaders." },
          { year: "2024", title: "500+ Companies Worldwide",     desc: "Operations across 6 continents. Launched AI geopolitical risk feed, live port congestion data, and predictive delay scoring. Ranked #1 in logistics intelligence by Gartner." },
        ],
      },
  
      // ── Stats Banner ───────────────────────────────────────────────────────────
      stats: [
        { value: "500+",  label: "Companies served"           },
        { value: "160+",  label: "Countries covered"          },
        { value: "$4.2B", label: "Trade value routed"         },
        { value: "94%",   label: "On-time prediction accuracy"},
      ],
  
      // ── CTA Section ────────────────────────────────────────────────────────────
      ctaSection: {
        eyebrow: "Get started",
        h2:      "Your next shipment\ndeserves better data.",
        sub:     "14-day free trial. Full platform access.\nNo credit card. Setup in under 15 minutes.",
        cta:     "Start free trial",
        ctaSecondary: "Talk to sales",
      },
  
      // ── Logistics Page ─────────────────────────────────────────────────────────
      logistics: {
        tag:          "Logistics Module",
        h1Line1:      "Route intelligence",
        h1Line2:      "for the real world.",
        sub:          "Meridian's route engine evaluates every viable path for your cargo — across modes, borders, and trade regimes — and ranks them by cost, speed, and risk. No guesswork.",
        howItWorks: {
          eyebrow:  "How it works",
          h2Line1:  "Your cargo,",
          h2Line2:  "your rules.",
          p1:       "Enter your product, origin, destination, and volume. Meridian cross-references commodity-specific trade rules, live port conditions, and carrier performance to return ranked route options in seconds.",
          p2:       "Shipping apples? It won't route through Hong Kong. Moving lithium batteries? It flags required documentation automatically. Sourcing from a sanctioned region? It reroutes before you even ask.",
        },
        routeMockup: {
          label: "Suggested routes — Fresh produce, 20ft container",
          via:   "via",
          score: "Score",
          days:  "days",
        },
        deptCTA: {
          heading: "Start routing smarter today.",
          sub:     "14-day free trial. Full access to the Logistics module. No credit card.",
        },
        features: [
          { title: "Multi-modal Route Optimisation",    desc: "Compares ocean, air, rail, and road combinations across every feasible corridor. Balances transit time, cost, and reliability in a single ranked output." },
          { title: "Product-aware Corridor Filtering",  desc: "Certain goods can't move through certain places. Our engine knows. Perishables, hazardous materials, dual-use goods, and agricultural products are routed around restricted corridors automatically." },
          { title: "Live Port & Border Intelligence",   desc: "Real-time congestion data from 3,200+ ports worldwide. Strike actions, weather closures, and capacity constraints are factored in before you book." },
          { title: "Carrier & Forwarder Benchmarking",  desc: "Compare actual on-time performance, loss rates, and pricing across 800+ carriers. Pick the right partner for the specific lane, not just the cheapest quote." },
          { title: "Incoterms Advisor",                desc: "Automatically recommends the appropriate Incoterms for your trade relationship, counterparty jurisdiction, and cargo type — with plain-language explanations." },
          { title: "Scenario Planning",                desc: "Model 'what if' disruptions before they happen. Reroute simulations for port closures, canal blockages, or carrier failures completed in under 3 seconds." },
        ],
      },
  
      // ── Systems Page ───────────────────────────────────────────────────────────
      systems: {
        tag:          "Systems Module",
        h1Line1:      "Every cost,",
        h1Line2:      "before you commit.",
        sub:          "Meridian Systems gives you a complete financial picture of any trade lane — duties, taxes, handling charges, FX exposure, and supplier benchmarks — before a single order is placed.",
        whyItMatters: {
          eyebrow:  "Why it matters",
          h2Line1:  "The price you see",
          h2Line2:  "is never the price you pay.",
          p1:       "The quoted freight rate is just the beginning. Import duties, destination handling, customs brokerage, insurance, and currency shifts can add 20–60% to your landed cost.",
          p2:       "Meridian Systems calculates every layer before you sign anything — so you negotiate supplier prices knowing your real margin, not an estimate.",
        },
        costMockup: {
          label: "Landed cost breakdown — Electronics, Germany → Brazil",
          items: [
            { label: "Freight (ocean, 20ft)", value: "$2,840", pct: 58 },
            { label: "Import duty (6.5%)",    value: "$312",   pct: 6  },
            { label: "Destination handling",  value: "$380",   pct: 8  },
            { label: "Customs brokerage",     value: "$220",   pct: 4  },
            { label: "Insurance (0.3%)",      value: "$142",   pct: 3  },
            { label: "Currency (EUR/USD)",    value: "+$180",  pct: 4  },
          ],
          total: { label: "Total landed cost", value: "$4,074" },
        },
        deptCTA: {
          heading: "Know your numbers before you move.",
          sub:     "Full landed-cost modelling across 160+ countries. Free for 14 days.",
        },
        features: [
          { title: "Full Landed Cost Calculator", desc: "Import duties, VAT, excise, port handling, insurance, agent fees — calculated for every route option, before you commit." },
          { title: "Tax & Tariff Intelligence",   desc: "Live tariff databases for 160+ countries. HS code classification, preferential trade agreement eligibility, and duty drawback opportunities surfaced automatically." },
          { title: "Cash Flow Forecasting",       desc: "Model the full payment cycle from purchase order to delivery — including financing costs, currency exposure, and working capital requirements." },
          { title: "Supplier Country Analytics",  desc: "For a given product and volume, Meridian ranks sourcing countries by total cost, lead time, quality risk, and geopolitical stability. Make sourcing decisions on evidence." },
          { title: "Currency & FX Risk Modelling",desc: "Track exposure across multi-currency trade flows. Hedging recommendations based on your payment terms and route timelines." },
          { title: "Performance Dashboards",      desc: "KPIs across every trade lane: average transit time, cost per kg, delay frequency, duty reclaim rates. Connect to your ERP for unified visibility." },
        ],
      },
  
      // ── Securities Page ────────────────────────────────────────────────────────
      securities: {
        tag:          "Securities Module",
        h1Line1:      "Risk seen before",
        h1Line2:      "it's felt.",
        sub:          "Meridian Securities monitors sanctions lists, geopolitical signals, and corridor risk in real time — and tells you exactly what to do about it, before your shipment is in the air.",
        whyItMatters: {
          eyebrow:  "Why it matters",
          h2Line1:  "One corridor decision",
          h2Line2:  "can cost everything.",
          p1:       "Sanctions violations, cargo seizures, and force majeure events are rarely surprises — they're predictable risks that weren't flagged in time. Meridian Securities changes that.",
          p2:       "We screen every counterparty, every transit point, and every trade document against live sanctions lists and geopolitical risk scores — then recommend the protective instruments your lawyers would suggest.",
        },
        riskMockup: {
          label: "Live risk alerts — Active shipments",
          alerts: [
            { level: "HIGH",   color: "#ef4444", label: "Iran transit detected",    action: "Reroute — OFAC exposure" },
            { level: "MEDIUM", color: "#f59e0b", label: "Port congestion: Felixstowe", action: "7-day delay likely"  },
            { level: "LOW",    color: "#22c55e", label: "New FTA: UK-India",         action: "0% duty eligible"     },
            { level: "INFO",   color: "#6b7280", label: "Document required",         action: "EUR1 certificate needed"},
          ],
        },
        realScenarios: {
          eyebrow: "Real scenarios",
          h2Line1: "How Securities catches",
          h2Line2: "what others miss",
          cols: { scenario: "Scenario", risk: "Risk identified", action: "Meridian's action" },
          examples: [
            {
              scenario: "Shipping electronics through Hong Kong to mainland China",
              risk:     "Dual-use classification risk under US EAR. Export licence may be required.",
              action:   "Meridian flags the HS code, requests licence details, and suggests an alternative routing via Singapore with reduced scrutiny.",
            },
            {
              scenario: "Agricultural goods transiting a politically unstable corridor",
              risk:     "Border closure risk rated 7.2/10. Phytosanitary certificate requirements have changed in the last 60 days.",
              action:   "Meridian recommends a southern corridor, updates document checklist, and alerts you to a new bilateral phytosanitary protocol.",
            },
            {
              scenario: "Payment routed through a newly sanctioned intermediary bank",
              risk:     "Counterparty added to OFAC SDN list 11 days ago. Transaction would constitute a sanctions violation.",
              action:   "Meridian flags the bank, freezes the recommendation, and suggests three compliant correspondent banking alternatives.",
            },
          ],
        },
        deptCTA: {
          heading: "Know your exposure before you move.",
          sub:     "Live sanctions screening, geopolitical risk feed, and compliance automation. Free for 14 days.",
        },
        features: [
          { title: "Sanctions Screening",        desc: "Automated screening of counterparties, intermediaries, and transit countries against OFAC, EU, UN, and OFSI lists — updated within hours of changes." },
          { title: "Geopolitical Risk Feed",     desc: "AI-monitored signals across 180 countries: election risk, coup probability, trade war escalation, and border closure likelihood — scored and ranked for your specific routes." },
          { title: "Corridor Risk Scoring",      desc: "Every proposed route receives a risk score based on political stability, historical seizure rates, corruption indices, and current diplomatic conditions." },
          { title: "Document & Contract Advisor",desc: "Recommends protective instruments — letters of credit, insurance riders, force majeure clauses, and inspection certificates — based on corridor risk and counterparty profile." },
          { title: "Export Control Compliance",  desc: "Flags dual-use goods, controlled technologies, and items requiring export licences. Pre-screens against the EU Dual-Use Regulation, US EAR, and ITAR." },
          { title: "Incident Response Playbooks",desc: "Pre-built response plans for shipment seizure, counterparty insolvency, sanctions designation, and force majeure events — customisable to your operations." },
        ],
      },
  
      // ── Pricing Page ───────────────────────────────────────────────────────────
      pricing: {
        eyebrow:   "Pricing",
        h1Line1:   "Transparent pricing.",
        h1Line2:   "Measurable ROI.",
        sub:       "14-day free trial on all plans. No credit card required.",
        monthly:   "Monthly",
        annual:    "Annual",
        perMonth:  "/mo",
        custom:    "Custom",
        mostPopular: "Most popular",
        faqHeading: "Frequently asked",
        plans: [
          {
            name: "Growth",
            monthlyPrice: 299,
            annualPrice: 239,
            desc: "For small and mid-size importers and exporters getting started with intelligent routing.",
            features: [
              "Up to 5 users",
              "Logistics route engine",
              "50 route queries / month",
              "Basic cost modelling",
              "Standard risk alerts",
              "Email support",
            ],
            cta: "Start free trial",
            highlight: false,
          },
          {
            name: "Professional",
            monthlyPrice: 799,
            annualPrice: 639,
            desc: "Full platform access for active trading companies managing complex international flows.",
            features: [
              "Up to 20 users",
              "All 3 modules (Logistics, Systems, Securities)",
              "Unlimited route queries",
              "Full cost & tax modelling",
              "Live geopolitical risk feed",
              "AI compliance automation",
              "Priority support",
            ],
            cta: "Start free trial",
            highlight: true,
          },
          {
            name: "Enterprise",
            monthlyPrice: null,
            annualPrice: null,
            desc: "For large enterprises, freight forwarders, and governments with high-volume trade operations.",
            features: [
              "Unlimited users",
              "Custom data integrations",
              "Private AI model fine-tuning",
              "Dedicated risk analyst",
              "SLA guarantee",
              "On-premise deployment option",
            ],
            cta: "Talk to sales",
            highlight: false,
          },
        ],
        faqs: [
          {
            q: "How does Meridian know which routes are restricted for my product?",
            a: "We maintain a continuously updated database of commodity-level trade restrictions, phytosanitary rules, import bans, and customs classifications across 160+ countries. When you enter a product and quantity, the engine cross-references this against every corridor in the proposed route in real time.",
          },
          {
            q: "How current is the geopolitical risk data?",
            a: "Our risk feed ingests from government sanctions databases (OFAC, EU, UN), live news signals, diplomatic channels, and proprietary analyst inputs. Most alerts are reflected within 2–6 hours of a development.",
          },
          {
            q: "Can Meridian integrate with our existing ERP or TMS?",
            a: "Yes. We provide REST APIs and pre-built connectors for SAP, Oracle TMS, Flexport, and most major ERP platforms. Enterprise plans include custom integration support.",
          },
          {
            q: "What does the Securities module actually recommend?",
            a: "It flags corridor-specific risks (sanctions exposure, political instability, historical seizure rates), suggests protective documents (letters of credit, insurance riders, force majeure clauses), and recommends alternate routes where risk exceeds your configured threshold.",
          },
        ],
      },
  
      // ── About Page ─────────────────────────────────────────────────────────────
      about: {
        eyebrow:    "Company",
        h1Line1:    "Built by people who've",
        h1Line2:    "moved things.",
        sub:        "Meridian was founded in Hanoi in 2020 by a solo founder. I spent years watching cargo fail for predictable reasons — wrong routes, missed restrictions, unseen risk. I built the tool people always needed.",
        valuesHeading: "What we stand for",
        teamHeading:   "The team",
        joinTeam: {
          h3:  "Join the team",
          sub: "We're hiring across engineering, data science, and trade compliance.",
          cta: "View open roles →",
        },
        values: [
          { title: "Clarity before movement",       desc: "No shipment should move without understanding the full cost, risk, and compliance picture. We make that possible in seconds." },
          { title: "Intelligence over instinct",    desc: "Global trade is too complex for gut decisions. We replace assumptions with data — every corridor, every commodity, every time." },
          { title: "Speed that doesn't cut corners",desc: "Fast routing means nothing if it lands you in a compliance violation. Our systems optimise for both simultaneously." },
          { title: "Built for the real world",      desc: "Trade doesn't happen in clean datasets. We train on messy, incomplete, conflicting signals — because that's what reality looks like." },
        ],
        team: [
          { name: "Dmitri Volkov",   role: "CEO & Co-founder",     bio: "Former Head of Freight at Maersk. 14 years routing complex international cargo across sanctioned and conflict zones." },
          { name: "Lena Hoffmann",   role: "CTO & Co-founder",     bio: "Ex-Palantir data engineer. Built geospatial risk models for NATO supply chain resilience programs." },
          { name: "James Okafor",    role: "CPO & Co-founder",     bio: "Previously led product at Flexport. Obsessed with making global trade legible to non-specialists." },
          { name: "Yuki Tanaka",     role: "Head of Logistics AI", bio: "PhD in operations research. Designed route optimisation algorithms now used by three of the world's top-10 shipping lines." },
          { name: "Sara Lindqvist",  role: "Head of Securities",   bio: "Former sanctions compliance officer at Deutsche Bank. Expert in dual-use goods and export control regimes." },
          { name: "Ahmed Al-Rashid", role: "Head of Systems",      bio: "Built trade finance analytics at HSBC. Specialises in landed-cost modelling across emerging market corridors." },
        ],
      },
  
      // ── Contact Page ───────────────────────────────────────────────────────────
      contact: {
        eyebrow:   "Contact",
        h1:        "Let's talk trade.",
        fields: {
          name:    "Name *",
          namePH:  "Your name",
          email:   "Email *",
          emailPH: "you@company.com",
          company: "Company",
          companyPH: "Your company",
          message: "Message *",
          messagePH: "Tell us about your trade operations and what you're looking to solve...",
        },
        error:     "Please fill in all required fields.",
        sent: {
          heading: "Message sent.",
          sub:     "We typically respond within one business day. For urgent matters:",
        },
        enterprise: {
          heading: "Enterprise sales",
          desc:    "For high-volume trade operations, freight forwarders, customs brokers, or government procurement — our enterprise team will scope a deployment tailored to your corridors, commodities, and compliance requirements. We respond within 4 hours.",
        },
        officesHeading: "Our offices",
      },
  
      // ── Auth Pages ─────────────────────────────────────────────────────────────
      auth: {
        login: {
          eyebrow:  "Welcome back",
          heading:  "Sign in to Meridian",
          alreadyHave: "Already have an account? ",
          dontHave: "Don't have an account? ",
        },
        signup: {
          eyebrow:  "Get started",
          heading:  "Start your free trial",
        },
        email:    "Email",
        company:  "Company",
        password: "Password",
        companyPH: "Acme Corp",
      },
    },
  
    // ═══════════════════════════════════════════════════════════════════════════
    // RUSSIAN
    // ═══════════════════════════════════════════════════════════════════════════
    ru: {
      nav: {
        pricing:    "Тарифы",
        about:      "О компании",
        contact:    "Контакты",
        logIn:      "Войти",
        getStarted: "Начать",
        departments:"Отделы",
        profile:    "Профиль",
        settings:   "Настройки",
        logOut:     "Выйти",
      },
  
      departments: [
        { label: "Логистика",  href: "/logistics",  desc: "Маршрутная аналитика" },
        { label: "Системы",    href: "/systems",    desc: "Бизнес-аналитика"     },
        { label: "Безопасность",href: "/securities",desc: "Риски и соответствие" },
      ],
  
      cta: {
        startFreeTrial:  "Начать бесплатно",
        talkToSales:     "Связаться с продажами",
        learnMore:       "Подробнее",
        sendMessage:     "Отправить сообщение →",
        createAccount:   "Создать аккаунт →",
        signIn:          "Войти →",
        continueWithSSO: "Продолжить через SSO",
        getStartedFree:  "Начать бесплатно",
        forgotPassword:  "Забыли пароль?",
        viewOpenRoles:   "Открытые вакансии →",
      },
  
      company: {
        tagline: "Глобальная торговая аналитика для компаний, движущих мир.",
        allSystemsOperational: "Все системы работают",
        copyright: "Все права защищены.",
      },
  
      footerCols: [
        {
          title: "Платформа",
          links: [
            { label: "Логистика",    href: "/logistics"  },
            { label: "Системы",      href: "/systems"    },
            { label: "Безопасность", href: "/securities" },
            { label: "Тарифы",       href: "/pricing"    },
          ],
        },
        {
          title: "Компания",
          links: [
            { label: "О компании", href: "/about"   },
            { label: "Блог",       href: "/about"   },
            { label: "Вакансии",   href: "/contact" },
            { label: "Пресса",     href: "/contact" },
          ],
        },
        {
          title: "Ресурсы",
          links: [
            { label: "Документация",  href: "/about" },
            { label: "API-справочник",href: "/about" },
            { label: "Статус",        href: "/about" },
            { label: "Безопасность",  href: "/about" },
          ],
        },
      ],
  
      hero: {
        eyebrow:      "Платформа глобальной торговой аналитики",
        h1Line1:      "Ведите бизнес",
        h1Line2:      "умнее.",
        sub:          "ИИ Meridian находит самые быстрые, дешёвые и безопасные международные торговые маршруты для ваших конкретных товаров — с учётом таможенных правил, санкций, состояния портов и геополитических рисков в реальном времени.",
        cta:          "Начать бесплатно",
        ctaSecondary: "Как это работает",
      },
  
      deptStrip: {
        logistics: {
          tag:   "Маршрутная аналитика",
          label: "Логистика",
          desc:  "ИИ-оптимизированная маршрутизация в 160+ странах. Фильтрация коридоров с учётом товара, данные портов в реальном времени и мультимодальное сравнение — чтобы ваш груз всегда шёл оптимальным путём.",
        },
        systems: {
          tag:   "Бизнес-аналитика",
          label: "Системы",
          desc:  "Полное моделирование посадочных затрат, тарифная аналитика и анализ стран-поставщиков. Знайте точную стоимость торгового маршрута до принятия любых обязательств.",
        },
        securities: {
          tag:   "Риски и соответствие",
          label: "Безопасность",
          desc:  "Проверка по санкционным спискам, оценка геополитических рисков и рекомендации по контрактам на основе ИИ. Выявляйте риски до того, как они станут кризисом.",
        },
        learnMore: "Подробнее",
      },
  
      map: {
        home: {
          eyebrow:  "Глобальный охват",
          h2Line1:  "160+ стран.",
          h2Line2:  "Каждый коридор нанесён на карту.",
          sub:      "Meridian охватывает все основные торговые маршруты на Земле — от высокообъёмных контейнерных линий до коридоров развивающихся рынков. Если груз туда движется — мы его моделируем.",
        },
        logistics: {
          eyebrow:  "Активные торговые маршруты",
          h2Line1:  "Маршрутная аналитика",
          h2Line2:  "по всем направлениям.",
          sub:      "Каждый маршрут оценивается в реальном времени с учётом состояния портов, ограничений на товары, санкционных рисков и показателей перевозчиков. Лучший путь редко бывает очевидным.",
        },
        stats: [
          { value: "160+",   label: "Стран"                    },
          { value: "2 400+", label: "Торговых коридоров"       },
          { value: "3 200+", label: "Мониторируемых портов"    },
          { value: "800+",   label: "Оцениваемых перевозчиков" },
        ],
      },
  
      features: {
        eyebrow: "Платформа",
        h2:      "Шесть возможностей,\nодна платформа",
        items: [
          { num: "01", title: "ИИ-движок маршрутов",          desc: "Наша модель оценивает тысячи комбинаций маршрутов по суше, морю и воздуху — оптимизируя стоимость, скорость и соблюдение регуляторных требований одновременно." },
          { num: "02", title: "Маршрутизация с учётом товара", desc: "Разные товары подчиняются разным правилам. Meridian знает, какие коридоры, порты и границы открыты для вашего груза — от скоропортящихся до подконтрольных материалов." },
          { num: "03", title: "Геополитическая аналитика",    desc: "Сигналы реального времени о санкциях, торговых спорах, закрытии границ и политической нестабильности. Будьте в курсе до отправки груза." },
          { num: "04", title: "Моделирование затрат и налогов",desc: "Полная разбивка посадочных затрат с учётом пошлин, НДС, сборов за обработку и валютных рисков — по 180+ странам до принятия обязательств." },
          { num: "05", title: "Движок управления рисками",    desc: "Автоматические рекомендации по контрактам, контрольные списки документов и предупреждения для высокорисковых коридоров. Ваши юридические риски — выявлены заблаговременно." },
          { num: "06", title: "Прогнозирование задержек",     desc: "Предиктивные модели на основе загруженности портов, сезонных паттернов, истории перевозчиков и погоды в реальном времени — для предвидения задержек." },
        ],
      },
  
      story: {
        eyebrow: "История",
        h2:      "Создано людьми,\nкоторые сами перевозили грузы.",
        items: [
          { year: "2020", title: "Основана в Ханое",                   desc: "Основатель-одиночка, годами наблюдавший за тем, как грузы терпят неудачу по предсказуемым причинам. Я создал систему, которая всегда была нужна людям." },
          { year: "2021", title: "Запуск отдела логистики",             desc: "Выпущен основной движок маршрутной аналитики, охватывающий 160 стран и 2 400 торговых коридоров. Первые корпоративные контракты с рыночными экспортёрами." },
          { year: "2022", title: "Добавлены модули Systems и Securities",desc: "Расширение до полной торговой аналитики: моделирование затрат в реальном времени, проверка по санкциям и автоматизация соответствия. Доверие со стороны лидеров рынка." },
          { year: "2024", title: "500+ компаний по всему миру",          desc: "Операции на 6 континентах. Запуск ИИ-фида геополитических рисков, данных о загруженности портов и предиктивной оценки задержек. Признан №1 в логистической аналитике по версии Gartner." },
        ],
      },
  
      stats: [
        { value: "500+",  label: "Обслуживаемых компаний"   },
        { value: "160+",  label: "Охваченных стран"          },
        { value: "$4.2B", label: "Объём торговли"            },
        { value: "94%",   label: "Точность прогнозирования" },
      ],
  
      ctaSection: {
        eyebrow:      "Начать",
        h2:           "Ваша следующая отправка\nзаслуживает лучших данных.",
        sub:          "14 дней бесплатно. Полный доступ к платформе.\nБез кредитной карты. Настройка за 15 минут.",
        cta:          "Начать бесплатно",
        ctaSecondary: "Связаться с продажами",
      },
  
      logistics: {
        tag:          "Модуль логистики",
        h1Line1:      "Маршрутная аналитика",
        h1Line2:      "для реального мира.",
        sub:          "Движок маршрутов Meridian оценивает каждый возможный путь для вашего груза — по всем видам транспорта, границам и торговым режимам — и ранжирует их по стоимости, скорости и риску. Без догадок.",
        howItWorks: {
          eyebrow:  "Как это работает",
          h2Line1:  "Ваш груз,",
          h2Line2:  "ваши правила.",
          p1:       "Введите товар, происхождение, назначение и объём. Meridian сопоставляет товарные торговые правила, актуальные условия в портах и показатели перевозчиков, чтобы за секунды предоставить ранжированные варианты маршрутов.",
          p2:       "Везёте яблоки? Система не проложит маршрут через Гонконг. Перевозите литиевые батареи? Автоматически отметит необходимые документы. Источник из санкционного региона? Перестроит маршрут ещё до вашего запроса.",
        },
        routeMockup: {
          label: "Предлагаемые маршруты — свежие продукты, 20-фут. контейнер",
          via:   "через",
          score: "Оценка",
          days:  "дней",
        },
        deptCTA: {
          heading: "Начните умную маршрутизацию сегодня.",
          sub:     "14 дней бесплатно. Полный доступ к модулю логистики. Без кредитной карты.",
        },
        features: [
          { title: "Мультимодальная оптимизация маршрутов",     desc: "Сравнивает комбинации морского, воздушного, железнодорожного и автомобильного транспорта. Балансирует время в пути, стоимость и надёжность в едином ранжированном результате." },
          { title: "Фильтрация коридоров с учётом товара",       desc: "Определённые товары не могут перемещаться через определённые места. Наш движок знает. Скоропортящиеся, опасные материалы и сельхозпродукция автоматически обходят ограниченные коридоры." },
          { title: "Аналитика портов и границ в реальном времени",desc: "Данные о загруженности 3 200+ портов по всему миру. Забастовки, погодные закрытия и ограничения мощностей учитываются до бронирования." },
          { title: "Сравнительный анализ перевозчиков",           desc: "Сравнивайте реальную пунктуальность, уровень потерь и ценообразование 800+ перевозчиков. Выбирайте нужного партнёра для конкретного маршрута, а не просто самый дешёвый вариант." },
          { title: "Советник по Инкотермс",                      desc: "Автоматически рекомендует подходящие Инкотермс с учётом ваших торговых отношений, юрисдикции контрагента и типа груза — с понятными пояснениями." },
          { title: "Сценарное планирование",                     desc: "Моделируйте потенциальные сбои до их возникновения. Симуляция перенаправления при закрытии портов или отказе перевозчика — за 3 секунды." },
        ],
      },
  
      systems: {
        tag:          "Модуль систем",
        h1Line1:      "Все затраты —",
        h1Line2:      "до принятия обязательств.",
        sub:          "Meridian Systems предоставляет полную финансовую картину любого торгового маршрута — пошлины, налоги, сборы за обработку, валютные риски и сравнение поставщиков — ещё до размещения первого заказа.",
        whyItMatters: {
          eyebrow:  "Почему это важно",
          h2Line1:  "Цена, которую вы видите,",
          h2Line2:  "никогда не равна цене, которую вы платите.",
          p1:       "Объявленная ставка фрахта — лишь начало. Импортные пошлины, обработка в порту назначения, таможенное оформление, страхование и валютные колебания могут добавить 20–60% к вашей посадочной стоимости.",
          p2:       "Meridian Systems рассчитывает каждый уровень затрат до подписания любых договорённостей — чтобы вы вели переговоры с поставщиками, зная реальную маржу, а не приблизительную оценку.",
        },
        costMockup: {
          label: "Разбивка посадочной стоимости — электроника, Германия → Бразилия",
          items: [
            { label: "Фрахт (морской, 20 фут.)",      value: "$2 840", pct: 58 },
            { label: "Импортная пошлина (6,5%)",       value: "$312",   pct: 6  },
            { label: "Обработка в порту назначения",   value: "$380",   pct: 8  },
            { label: "Таможенное оформление",          value: "$220",   pct: 4  },
            { label: "Страхование (0,3%)",             value: "$142",   pct: 3  },
            { label: "Валюта (EUR/USD)",               value: "+$180",  pct: 4  },
          ],
          total: { label: "Итого посадочная стоимость", value: "$4 074" },
        },
        deptCTA: {
          heading: "Знайте свои цифры до начала движения.",
          sub:     "Полное моделирование посадочной стоимости по 160+ странам. Бесплатно на 14 дней.",
        },
        features: [
          { title: "Калькулятор полной посадочной стоимости", desc: "Импортные пошлины, НДС, акцизы, портовые сборы, страхование, агентские комиссии — рассчитаны для каждого варианта маршрута до принятия обязательств." },
          { title: "Таможенная и тарифная аналитика",         desc: "Актуальные тарифные базы данных для 160+ стран. Классификация кода ТН ВЭД, право на льготы по СТС и возможности возврата пошлин — определяются автоматически." },
          { title: "Прогнозирование денежного потока",        desc: "Моделируйте полный платёжный цикл от заказа до доставки — с учётом стоимости финансирования, валютных рисков и потребностей в оборотном капитале." },
          { title: "Аналитика стран-поставщиков",             desc: "Для данного товара и объёма Meridian ранжирует страны-поставщики по совокупным затратам, срокам, качественным рискам и геополитической стабильности." },
          { title: "Моделирование валютных и FX-рисков",      desc: "Отслеживайте риски по мультивалютным торговым потокам. Рекомендации по хеджированию с учётом условий оплаты и сроков маршрута." },
          { title: "Информационные панели эффективности",     desc: "KPI по каждому торговому маршруту: среднее время в пути, стоимость за кг, частота задержек, уровень возврата пошлин. Интеграция с ERP для единого обзора." },
        ],
      },
  
      securities: {
        tag:          "Модуль безопасности",
        h1Line1:      "Риск виден",
        h1Line2:      "до того, как ощущается.",
        sub:          "Meridian Securities в реальном времени отслеживает санкционные списки, геополитические сигналы и риски коридоров — и сообщает вам точные действия ещё до того, как груз окажется в воздухе.",
        whyItMatters: {
          eyebrow:  "Почему это важно",
          h2Line1:  "Одно решение о маршруте",
          h2Line2:  "может стоить всего.",
          p1:       "Нарушения санкций, арест грузов и форс-мажор редко бывают неожиданностью — это предсказуемые риски, которые не были выявлены вовремя. Meridian Securities меняет это.",
          p2:       "Мы проверяем каждого контрагента, каждый транзитный пункт и каждый торговый документ по актуальным санкционным спискам и оценкам рисков — и рекомендуем защитные инструменты, которые предложили бы ваши юристы.",
        },
        riskMockup: {
          label: "Актуальные предупреждения о рисках — активные отправки",
          alerts: [
            { level: "ВЫСОК.",  color: "#ef4444", label: "Обнаружен транзит через Иран",  action: "Перенаправить — риск OFAC"   },
            { level: "СРЕДН.",  color: "#f59e0b", label: "Загруженность порта: Фелистоу",  action: "Вероятна задержка 7 дней"   },
            { level: "НИЗК.",   color: "#22c55e", label: "Новое СТС: Великобритания-Индия",action: "Право на 0% пошлины"        },
            { level: "ИНФО",    color: "#6b7280", label: "Необходим документ",             action: "Требуется сертификат EUR1"  },
          ],
        },
        realScenarios: {
          eyebrow: "Реальные сценарии",
          h2Line1: "Как Securities выявляет",
          h2Line2: "то, что упускают другие",
          cols: { scenario: "Сценарий", risk: "Выявленный риск", action: "Действие Meridian" },
          examples: [
            {
              scenario: "Отправка электроники через Гонконг на материковый Китай",
              risk:     "Риск классификации как товар двойного назначения по EAR США. Может потребоваться экспортная лицензия.",
              action:   "Meridian отмечает код ТН ВЭД, запрашивает данные лицензии и предлагает альтернативный маршрут через Сингапур с меньшей степенью контроля.",
            },
            {
              scenario: "Сельскохозяйственные товары через политически нестабильный коридор",
              risk:     "Риск закрытия границы оценён в 7,2/10. За последние 60 дней требования к фитосанитарным сертификатам изменились.",
              action:   "Meridian рекомендует южный коридор, обновляет перечень документов и предупреждает о новом двустороннем фитосанитарном протоколе.",
            },
            {
              scenario: "Платёж через недавно попавший под санкции банк-посредник",
              risk:     "Контрагент добавлен в список OFAC SDN 11 дней назад. Транзакция является нарушением санкций.",
              action:   "Meridian отмечает банк, приостанавливает рекомендацию и предлагает три соответствующие требованиям альтернативы для корреспондентского банкинга.",
            },
          ],
        },
        deptCTA: {
          heading: "Знайте о своих рисках до начала движения.",
          sub:     "Проверка по санкциям в реальном времени, геополитический риск-фид и автоматизация соответствия. Бесплатно на 14 дней.",
        },
        features: [
          { title: "Проверка по санкционным спискам",  desc: "Автоматическая проверка контрагентов, посредников и транзитных стран по спискам OFAC, ЕС, ООН и OFSI — обновляется в течение часов после изменений." },
          { title: "Геополитический риск-фид",         desc: "ИИ-мониторинг сигналов по 180 странам: риск выборов, вероятность переворота, эскалация торговых войн — оцениваются для ваших конкретных маршрутов." },
          { title: "Оценка рисков коридора",            desc: "Каждый предлагаемый маршрут получает оценку риска на основе политической стабильности, исторических показателей изъятий и индексов коррупции." },
          { title: "Советник по документам и контрактам",desc: "Рекомендует защитные инструменты — аккредитивы, страховые дополнения, оговорки о форс-мажоре — с учётом риска коридора и профиля контрагента." },
          { title: "Соблюдение экспортного контроля",   desc: "Отмечает товары двойного назначения и позиции, требующие экспортной лицензии. Предварительная проверка по Регламенту ЕС о двойном использовании, EAR США и ITAR." },
          { title: "Планы реагирования на инциденты",   desc: "Готовые планы реагирования при аресте груза, несостоятельности контрагента, санкционном обозначении и форс-мажоре — настраиваемые под ваши операции." },
        ],
      },
  
      pricing: {
        eyebrow:     "Тарифы",
        h1Line1:     "Прозрачное ценообразование.",
        h1Line2:     "Измеримая отдача.",
        sub:         "14 дней бесплатно для всех тарифов. Кредитная карта не требуется.",
        monthly:     "Ежемесячно",
        annual:      "Ежегодно",
        perMonth:    "/мес",
        custom:      "Индивидуально",
        mostPopular: "Популярный выбор",
        faqHeading:  "Часто задаваемые вопросы",
        plans: [
          {
            name: "Рост",
            monthlyPrice: 299,
            annualPrice: 239,
            desc: "Для малого и среднего бизнеса в сфере импорта и экспорта, начинающего работу с интеллектуальной маршрутизацией.",
            features: [
              "До 5 пользователей",
              "Движок логистических маршрутов",
              "50 запросов маршрутов / месяц",
              "Базовое моделирование затрат",
              "Стандартные предупреждения о рисках",
              "Поддержка по email",
            ],
            cta: "Начать бесплатно",
            highlight: false,
          },
          {
            name: "Профессиональный",
            monthlyPrice: 799,
            annualPrice: 639,
            desc: "Полный доступ к платформе для активных торговых компаний, управляющих сложными международными потоками.",
            features: [
              "До 20 пользователей",
              "Все 3 модуля (Логистика, Системы, Безопасность)",
              "Неограниченные запросы маршрутов",
              "Полное моделирование затрат и налогов",
              "Геополитический риск-фид в реальном времени",
              "Автоматизация соответствия на основе ИИ",
              "Приоритетная поддержка",
            ],
            cta: "Начать бесплатно",
            highlight: true,
          },
          {
            name: "Корпоративный",
            monthlyPrice: null,
            annualPrice: null,
            desc: "Для крупных предприятий, экспедиторов и государственных структур с высокообъёмными торговыми операциями.",
            features: [
              "Неограниченное число пользователей",
              "Пользовательские интеграции данных",
              "Тонкая настройка частной ИИ-модели",
              "Выделенный аналитик рисков",
              "Гарантия SLA",
              "Возможность развёртывания на собственных серверах",
            ],
            cta: "Связаться с продажами",
            highlight: false,
          },
        ],
        faqs: [
          {
            q: "Откуда Meridian знает, какие маршруты ограничены для моего товара?",
            a: "Мы ведём постоянно обновляемую базу данных торговых ограничений на уровне товаров, фитосанитарных правил, запретов на импорт и классификаций ТН ВЭД по 160+ странам. Когда вы вводите товар и количество, движок сверяет данные с каждым коридором предлагаемого маршрута в реальном времени.",
          },
          {
            q: "Насколько актуальны геополитические данные о рисках?",
            a: "Наш риск-фид получает данные из государственных баз санкций (OFAC, ЕС, ООН), новостных сигналов в реальном времени, дипломатических каналов и данных от собственных аналитиков. Большинство предупреждений отражаются в течение 2–6 часов после события.",
          },
          {
            q: "Может ли Meridian интегрироваться с нашей существующей ERP или TMS?",
            a: "Да. Мы предоставляем REST API и готовые коннекторы для SAP, Oracle TMS, Flexport и большинства крупных ERP-платформ. Корпоративные планы включают поддержку пользовательской интеграции.",
          },
          {
            q: "Что именно рекомендует модуль Securities?",
            a: "Он выявляет риски, специфичные для коридора (санкционные риски, политическую нестабильность, исторические показатели изъятий), предлагает защитные документы (аккредитивы, страховые дополнения, оговорки о форс-мажоре) и рекомендует альтернативные маршруты, если риск превышает настроенный вами порог.",
          },
        ],
      },
  
      about: {
        eyebrow:    "Компания",
        h1Line1:    "Создано людьми,",
        h1Line2:    "которые сами перевозили грузы.",
        sub:        "Meridian была основана в Ханое в 2020 году единственным основателем. Я годами наблюдал за тем, как грузы терпят неудачу по предсказуемым причинам — неправильные маршруты, пропущенные ограничения, скрытые риски. Я создал инструмент, который всегда был нужен людям.",
        valuesHeading: "Что мы отстаиваем",
        teamHeading:   "Команда",
        joinTeam: {
          h3:  "Присоединитесь к команде",
          sub: "Мы нанимаем специалистов в области разработки, data science и торгового соответствия.",
          cta: "Открытые вакансии →",
        },
        values: [
          { title: "Ясность перед движением",       desc: "Ни одна отправка не должна начинаться без понимания полной картины затрат, рисков и соответствия требованиям. Мы делаем это возможным за секунды." },
          { title: "Аналитика вместо интуиции",     desc: "Глобальная торговля слишком сложна для интуитивных решений. Мы заменяем предположения данными — по каждому коридору, каждому товару, каждый раз." },
          { title: "Скорость без компромиссов",     desc: "Быстрая маршрутизация ничего не стоит, если приводит к нарушению требований соответствия. Наши системы оптимизируют оба параметра одновременно." },
          { title: "Создано для реального мира",    desc: "Торговля происходит не в чистых наборах данных. Мы обучаемся на запутанных, неполных, противоречивых сигналах — потому что именно так выглядит реальность." },
        ],
        team: [
          { name: "Dmitri Volkov",   role: "Генеральный директор и сооснователь",    bio: "Бывший руководитель отдела грузовых перевозок Maersk. 14 лет маршрутизации сложных международных грузов через санкционные зоны и зоны конфликтов." },
          { name: "Lena Hoffmann",   role: "Технический директор и сооснователь",    bio: "Бывший инженер по данным Palantir. Создавал геопространственные модели рисков для программ устойчивости цепочек поставок НАТО." },
          { name: "James Okafor",    role: "Директор по продукту и сооснователь",    bio: "Ранее руководил продуктом в Flexport. Одержим задачей сделать мировую торговлю понятной для неспециалистов." },
          { name: "Yuki Tanaka",     role: "Руководитель отдела ИИ в логистике",     bio: "Кандидат наук в области исследования операций. Разработал алгоритмы оптимизации маршрутов, используемые тремя из десяти крупнейших судоходных компаний мира." },
          { name: "Sara Lindqvist",  role: "Руководитель отдела безопасности",       bio: "Бывший офицер по санкционному соответствию Deutsche Bank. Эксперт в области товаров двойного назначения и режимов экспортного контроля." },
          { name: "Ahmed Al-Rashid", role: "Руководитель отдела систем",             bio: "Создавал аналитику торгового финансирования в HSBC. Специализируется на моделировании посадочной стоимости на коридорах развивающихся рынков." },
        ],
      },
  
      contact: {
        eyebrow:   "Контакты",
        h1:        "Давайте поговорим о торговле.",
        fields: {
          name:      "Имя *",
          namePH:    "Ваше имя",
          email:     "Email *",
          emailPH:   "you@company.com",
          company:   "Компания",
          companyPH: "Ваша компания",
          message:   "Сообщение *",
          messagePH: "Расскажите о ваших торговых операциях и задачах, которые вы хотите решить...",
        },
        error: "Пожалуйста, заполните все обязательные поля.",
        sent: {
          heading: "Сообщение отправлено.",
          sub:     "Обычно мы отвечаем в течение одного рабочего дня. По срочным вопросам:",
        },
        enterprise: {
          heading: "Корпоративные продажи",
          desc:    "Для высокообъёмных торговых операций, экспедиторов, таможенных брокеров или государственных закупок — наша корпоративная команда разработает развёртывание под ваши коридоры, товары и требования соответствия. Мы отвечаем в течение 4 часов.",
        },
        officesHeading: "Наши офисы",
      },
  
      auth: {
        login: {
          eyebrow:     "С возвращением",
          heading:     "Вход в Meridian",
          alreadyHave: "Уже есть аккаунт? ",
          dontHave:    "Нет аккаунта? ",
        },
        signup: {
          eyebrow: "Начать",
          heading: "Начать бесплатный период",
        },
        email:     "Email",
        company:   "Компания",
        password:  "Пароль",
        companyPH: "Acme Corp",
      },
    },
  };