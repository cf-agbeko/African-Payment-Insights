const APIStore = (function () {
  const SUPABASE_URL = "https://rpgwsladflioxwzhejxf.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_HnRcKH46GRle0F1gGh0aSQ_FoOdx0hF";

  let supabase = null;
  function client() {
    if (supabase) return supabase;
    if (typeof window === "undefined" || !window.supabase) {
      throw new Error(
        "Supabase client library not loaded — make sure the <script> tag for " +
          "@supabase/supabase-js is included BEFORE js/data-store.js on this page."
      );
    }
    if (SUPABASE_URL.includes("YOUR-PROJECT-REF") || SUPABASE_ANON_KEY.includes("YOUR-ANON-PUBLIC-KEY")) {
      throw new Error(
        "Supabase isn't configured yet — open js/data-store.js and replace " +
          "SUPABASE_URL and SUPABASE_ANON_KEY with your own project's values " +
          "(Project Settings -> API in the Supabase dashboard)."
      );
    }
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return supabase;
  }

  const CATEGORIES = [
    { slug: "infrastructure", label: "Infrastructure & Switches", icon: "🌐" },
    { slug: "merchant-b2b", label: "Merchant & B2B Digitization", icon: "🤝" },
    { slug: "crossborder-web3", label: "Cross-Border & Web3", icon: "🪙" },
    { slug: "market-profiles", label: "Market Profiles", icon: "🗺️" },
    { slug: "policy", label: "Policy & Regulation", icon: "📜" },
  ];

  function categoryLabel(slug) {
    const c = CATEGORIES.find((c) => c.slug === slug);
    return c ? c.label : slug;
  }

  function categoryIcon(slug) {
    const c = CATEGORIES.find((c) => c.slug === slug);
    return c ? c.icon : "•";
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function seedArticles() {
    return [
      {
        id: "definitive-map-instant-payment-schemes",
        title: "The Definitive Map of Instant Payment Schemes in Africa: Who is Actually Succeeding?",
        category: "infrastructure",
        author: "Editorial Team",
        date: "2026-06-02",
        readTime: 8,
        featured: true,
        excerpt:
          "Traditional card rails are too expensive, and basic mobile wallets are reaching saturation. We map the rise of Account-to-Account (A2A) networks transforming the continental retail landscape.",
        body:
          "## The hook and the paradox\n" +
          "Western fintech grew up around the credit card: a slow-moving rail with high interchange fees, chargeback protection, and rewards points built for a consumer who already has a bank account. Africa's payment story never had that starting point. Instead, the continent's rails grew up around USSD menus and Account-to-Account (A2A) transfers that move value directly between wallets and bank accounts, with no card network sitting in the middle taking a cut.\n\n" +
          "That difference is not cosmetic. Interchange-fee models built for a Visa or Mastercard economy simply do not work for a micro-merchant selling tomatoes for the equivalent of a few cents a bundle. The rails that are winning across the continent are the ones built for that reality from day one.\n\n" +
          "## Where the rails stand\n" +
          "According to the newest AfricaNenda SIIPS 2025/2026 benchmarks, **36 live national Instant Payment Systems (IPS)** are now running across **31 countries**, together clearing more than **64 billion transactions**. A growing subset of these systems now qualify as \"fully interoperable\" — meaning a transfer initiated from any bank or licensed mobile wallet can land in any other, instantly, regardless of which institution issued it.\n\n" +
          "- East Africa remains the digital leader, combining high IPS maturity with the deepest mobile money penetration on the continent.\n" +
          "- Francophone West Africa is defined by its own mobile money war between telecom-led wallets, discussed in our regional deep-dive.\n" +
          "- Southern Africa is converging on a blended model — part card, part A2A — as historic ATM and card infrastructure slowly gives ground to real-time transfer rails.\n\n" +
          "## Regional showcases\n" +
          "**Nigeria's NIBSS Instant Payments (NIP)** is the continent's gold standard for bank-led interoperability, settling an enormous volume of transfers between banks in real time. **South Africa's PayShap** is doing the harder work of converting a historically cash- and ATM-dominant market into an A2A-first one. **Rwanda's eKash** is notable for weaving microfinance institutions and savings cooperatives directly into the national instant payment rail, rather than treating them as an afterthought.\n\n" +
          "## The strategic takeaways\n" +
          "For founders, the lesson is blunt: stop building another standalone consumer wallet. The real opportunity sits one layer up — value-added software for lending, tax, and payroll that plugs directly into these regional IPS switches rather than competing with them. For investors, the more durable exit potential is not in the wallet layer at all; it is in the data-rich API ecosystems growing on top of the rails.",
      },
      {
        id: "stablecoins-b2b-settlement",
        title: "Beyond the Hype: How African SMEs Use Stablecoins for B2B Settlement",
        category: "crossborder-web3",
        author: "Editorial Team",
        date: "2026-06-09",
        readTime: 6,
        featured: false,
        excerpt:
          "Stablecoins have evolved from speculative retail trade instruments into vital corporate treasury tools designed to bypass local currency devaluation and extreme FX scarcity.",
        body:
          "## The hook and the problem\n" +
          "Cross-border trade within Africa still runs into the same wall: up to **8–10% of a transaction's value** can be lost to fees and spreads, central banks in several markets are chronically short of hard-currency dollars, and a standard SWIFT transfer can take **three to five days** to clear. For an importer whose margin is already thin, that is not a rounding error — it is the difference between a profitable order and a loss.\n\n" +
          "## The mechanics of stablecoin settlement\n" +
          "The workaround that has quietly become standard practice among SME treasurers looks like this: convert local fiat into a dollar-pegged stablecoin such as USDT or USDC, move it across a low-cost blockchain network (commonly Tron or Polygon) in well under a minute, and have the recipient convert it back into their own local currency on the other end — whether that vendor sits in Asia, Europe, or another African trade hub. Fees on this route run closer to **0.1–1%**, against SWIFT's 8–10%, and settlement happens in minutes rather than days.\n\n" +
          "## The regulatory landscape\n" +
          "Regulators have largely moved on from outright bans toward structured oversight. South Africa's licensed Crypto Asset Service Provider framework is the clearest example of a regulator choosing to supervise this flow rather than push it underground, and several other central banks are now exploring stablecoin rails specifically as a release valve for chronic dollar shortages rather than as a threat to monetary policy.\n\n" +
          "## Why this matters for operators\n" +
          "This is not retail speculation. It is treasury infrastructure — a practical, increasingly regulated answer to a hard-currency problem that legacy correspondent banking has never solved for African trade corridors.",
      },
      {
        id: "francophone-africa-underreported-battle",
        title: "Francophone Africa: The Most Under-Reported Battle in Tech",
        category: "market-profiles",
        author: "Editorial Team",
        date: "2026-06-16",
        readTime: 7,
        featured: false,
        excerpt:
          "Francophone West Africa represents the most intensely contested mobile money landscape on earth, completely disrupted by the ongoing Wave vs. Orange Money price wars.",
        body:
          "## The hook and the disruption\n" +
          "When the US-backed mobile money startup Wave entered Francophone West Africa with a flat **1% transaction fee**, it broke open a market that had been run for years as a telecom-led duopoly. Incumbent operators, whose pricing had gone unchallenged for a decade, were forced to slash their own fee structures by as much as **80%** in response. Few markets anywhere in the world have seen a pricing war this fast or this steep.\n\n" +
          "## Why Francophone Africa was ripe for disruption\n" +
          "The structural setup made this possible. Eight countries across the West African Economic and Monetary Union (WAEMU) share a single currency, the CFA Franc, and a single banking regulator, the BCEAO. That shared monetary and regulatory backbone makes cross-border scaling meaningfully simpler here than in Anglophone Africa, where every country brings its own currency and its own regulator to the table.\n\n" +
          "## The pivot to ecosystem status\n" +
          "Simple peer-to-peer transfers, the product category that started this whole war, are now a razor-thin margin business for everyone involved. The players still standing are pivoting hard toward super-app architecture: merchant payment networks, automated bill and utility payments, and micro-insurance products bundled into the same wallet. P2P got people into the system; the super-app is how operators plan to keep them, and start making money from them, for the next decade.",
      },
      {
        id: "second-wave-african-fintech-data-credit",
        title: "The Second Wave of African Fintech: From Simple Transactions to Credit Depth",
        category: "merchant-b2b",
        author: "Editorial Team",
        date: "2026-06-23",
        readTime: 6,
        featured: true,
        excerpt:
          "M-Pesa and mobile wallets brought millions into the formal financial system. The next decade of growth depends on something harder: turning transaction data into real credit.",
        body:
          "For a long time, the global story of African fintech was simple: M-Pesa, mobile wallets, and peer-to-peer (P2P) transfers. It was a brilliant first wave that successfully brought millions into the formal financial ecosystem. Globally, more than **$2.1 trillion** flowed through mobile money platforms, with Africa remaining the undisputed capital, driving **$1.4 trillion** — nearly 66% — of that total volume.\n\n" +
          "But transactional inclusion is no longer the final goal. The industry has officially transitioned from basic access to active, daily usage. Basic peer-to-peer transfers are high-volume but razor-thin on margins. For the ecosystem to sustain its projected **13x revenue expansion by 2030**, fintechs are pivoting to what we call the Second Wave: B2B digitization, unified data, and credit depth.\n\n" +
          "## The core problem: shallow credit markets\n" +
          "Despite record-breaking mobile money penetration, formal credit remains incredibly shallow. Even in mature fintech markets like Kenya, Ghana, and Nigeria, **more than 50% of credit** continues to circulate through informal channels. Traditional banks still demand the kind of heavy, physical collateral that micro-merchants and gig workers simply do not have.\n\n" +
          "## Solving the data-to-credit pipeline\n" +
          "To close that gap, fintech operators are turning ordinary transaction data into underwriting infrastructure. Through Open Banking initiatives and API frameworks, platforms are now capturing:\n\n" +
          "- **Alternative data sets** — telecom and utility payment history, merchant inventory turnover, and daily digital receipts.\n" +
          "- **Privacy-compliant analytics** — banks and fintech startups collaborating on behavior patterns rather than raw database access, to offer immediate, risk-adjusted working capital.\n" +
          "- **AI credit scoring** — real-time risk models that let micro-lenders approve thin-file, variable-income applicants without taking on outsized default risk.\n\n" +
          "## What's next?\n" +
          "The companies that dominate the remainder of the decade will be the ones building the plumbing beneath the surface: interoperable data networks, regulatory-friendly cross-border rails, and merchant-facing software stacks that make money work smarter, not just move faster.",
      },
      {
        id: "open-banking-sme-credit-gap",
        title: "Can Open Banking Solve the African SME Credit Gap?",
        category: "policy",
        author: "Editorial Team",
        date: "2026-06-27",
        readTime: 4,
        featured: false,
        excerpt:
          "Regulators across the continent are drafting Open Banking frameworks in the hope of unlocking SME lending. The early evidence is promising, but the gap is bigger than one policy can close.",
        body:
          "## Why regulators are moving now\n" +
          "Open Banking rules force banks to share customer transaction data, with consent, through standardized APIs. For African regulators, the appeal is straightforward: small and medium enterprises generate mountains of transaction data through mobile money and card terminals, but almost none of it reaches a credit bureau. Formal Open Banking frameworks are meant to turn that dormant data into something a lender can actually underwrite against.\n\n" +
          "## What early frameworks get right\n" +
          "Where implemented well, Open Banking rules are pairing consent-based data sharing with clear liability rules for banks and third-party providers, which gives fintech lenders enough legal certainty to build real underwriting products on top of the data rather than one-off pilots.\n\n" +
          "## Where the gap remains\n" +
          "Policy alone does not fix a market where more than half of all SME credit still moves through informal channels. Enforcement capacity, inconsistent data standards between countries, and the sheer cost of building compliant infrastructure all slow adoption. Open Banking is a necessary piece of the puzzle — not a complete answer on its own.",
      },
    ];
  }

  function seedPosts() {
    return [
      {
        id: "seed-post-1",
        authorName: "African Payments Insights",
        authorRole: "Editorial Team",
        date: "2026-07-14",
        body:
          "Worth a read from Gideon Akakpo on why tech alone isn't what moves the needle for African fintech adoption — infrastructure, trust, and distribution matter just as much as the app itself. Sharing for context; full discussion is on LinkedIn.",
        sourceUrl:
          "https://www.linkedin.com/posts/gideon-akakpo-39194369_tech-isnt-the-only-driver-for-africa-ugcPost-7497358717961584640-ZWF8/",
        sourceLabel: "View original post on LinkedIn",
      },
    ];
  }

  function articleToRow(a) {
    return {
      id: a.id,
      title: a.title,
      category: a.category,
      author: a.author,
      date: a.date,
      read_time: a.readTime,
      featured: !!a.featured,
      excerpt: a.excerpt,
      body: a.body,
    };
  }

  function rowToArticle(r) {
    return {
      id: r.id,
      title: r.title,
      category: r.category,
      author: r.author,
      date: r.date,
      readTime: r.read_time,
      featured: r.featured,
      excerpt: r.excerpt,
      body: r.body,
    };
  }

  function postToRow(p) {
    return {
      id: p.id,
      author_name: p.authorName,
      author_role: p.authorRole || null,
      date: p.date,
      body: p.body,
      source_url: p.sourceUrl || null,
      source_label: p.sourceLabel || null,
    };
  }

  function rowToPost(r) {
    return {
      id: r.id,
      authorName: r.author_name,
      authorRole: r.author_role,
      date: r.date,
      body: r.body,
      sourceUrl: r.source_url,
      sourceLabel: r.source_label,
    };
  }

  let seedChecked = false;

  async function ensureSeeded() {
    if (seedChecked) return;
    seedChecked = true;

    const sb = client();

    const { count: articleCount, error: articleCountErr } = await sb
      .from("articles")
      .select("id", { count: "exact", head: true });
    if (articleCountErr) {
      console.error("APIStore: could not check articles table", articleCountErr);
      return;
    }
    if (!articleCount) {
      const { error } = await sb.from("articles").insert(seedArticles().map(articleToRow));
      if (error) console.error("APIStore: failed to seed articles", error);
    }

    const { count: postCount, error: postCountErr } = await sb
      .from("posts")
      .select("id", { count: "exact", head: true });
    if (postCountErr) {
      console.error("APIStore: could not check posts table", postCountErr);
      return;
    }
    if (!postCount) {
      const { error } = await sb.from("posts").insert(seedPosts().map(postToRow));
      if (error) console.error("APIStore: failed to seed posts", error);
    }
  }

  async function getAll() {
    await ensureSeeded();
    const { data, error } = await client().from("articles").select("*").order("date", { ascending: false });
    if (error) {
      console.error("APIStore: failed to load articles", error);
      return [];
    }
    return data.map(rowToArticle);
  }

  async function getById(id) {
    const { data, error } = await client().from("articles").select("*").eq("id", id).maybeSingle();
    if (error || !data) return null;
    return rowToArticle(data);
  }

  async function getByCategory(categorySlug) {
    const all = await getAll();
    return all.filter((a) => a.category === categorySlug);
  }

  async function getFeatured() {
    const all = await getAll();
    return all.filter((a) => a.featured);
  }

  async function save(article) {
    if (!article.id) {
      article.id = slugify(article.title) + "-" + Date.now().toString(36);
    }
    const { error } = await client().from("articles").upsert(articleToRow(article));
    if (error) console.error("APIStore: failed to save article", error);
    return article;
  }

  async function remove(id) {
    const { error } = await client().from("articles").delete().eq("id", id);
    if (error) console.error("APIStore: failed to delete article", error);
  }

  /* ---------------- Posts API ---------------- */

  async function getAllPosts() {
    await ensureSeeded();
    const { data, error } = await client().from("posts").select("*").order("date", { ascending: false });
    if (error) {
      console.error("APIStore: failed to load posts", error);
      return [];
    }
    return data.map(rowToPost);
  }

  async function getPostById(id) {
    const { data, error } = await client().from("posts").select("*").eq("id", id).maybeSingle();
    if (error || !data) return null;
    return rowToPost(data);
  }

  async function savePost(post) {
    if (!post.id) {
      post.id = "post-" + Date.now().toString(36);
    }
    const { error } = await client().from("posts").upsert(postToRow(post));
    if (error) console.error("APIStore: failed to save post", error);
    return post;
  }

  async function removePost(id) {
    const { error } = await client().from("posts").delete().eq("id", id);
    if (error) console.error("APIStore: failed to delete post", error);
  }

  async function resetToSeed() {
    const sb = client();
    await sb.from("articles").delete().neq("id", "__never__");
    await sb.from("posts").delete().neq("id", "__never__");
    await sb.from("articles").insert(seedArticles().map(articleToRow));
    await sb.from("posts").insert(seedPosts().map(postToRow));
  }

  return {
    CATEGORIES,
    categoryLabel,
    categoryIcon,
    slugify,
    getAll,
    getById,
    getByCategory,
    getFeatured,
    save,
    remove,
    getAllPosts,
    getPostById,
    savePost,
    removePost,
    resetToSeed,
  };
})();
