// Case-study content for each project - rendered in the list rows, the
// hover-preview modal, and the click-to-open ProjectDetail overlay.
//
// Order matters: the home page features the first FEATURED_COUNT entries (see
// Projects.jsx), so the opening set is deliberately balanced between
// professional production work and self-directed projects rather than sorted by
// client size. The Work page renders its own table and indexes into this array
// by position via each row's `detail` key - update both together.
const projects = [
  {
    title: "Mufti Mobile App",
    subtitle: "React Native · TypeScript · GraphQL - Production iOS & Android",
    src: "muftiapp.webp",
    color: "#101A2E",
    link: null,
    overview: [
      "A cross-platform React Native e-commerce app for the Mufti brand, running on iOS and Android against a GraphQL commerce backend. I work on it as part of the app team, shipping features on my own branch through pull-request review.",
      "The app covers the full shopping journey - category browsing, search and filtering, configurable size/colour variants, guest and authenticated carts, wishlists, OTP login, hosted checkout, payments, order history, returns and loyalty - with push notifications, analytics and deep linking on top.",
    ],
    contributions: [
      "Built and shipped UI features in React Native with TypeScript, typed navigation via React Navigation, and Apollo Client against the GraphQL API.",
      "Implemented scroll-to-top for the home tab icon and brand logo using a module-level shared handle, so the global tab bar - mounted outside the navigator tree, with no prop path to the home ScrollView - could still drive it.",
      "Traced why both buttons appeared dead: React Navigation treats navigating to an already-focused route as a no-op, so the fix belonged in a scroll handler, not the navigator.",
      "Found the app ships two separate header components - a home-only header and a shared one used by 24 other screens - which stopped an edit that would have changed logo behaviour app-wide.",
      "Relocated account deletion into an accordion after proving the Settings-screen duplicate was registered but never navigated to, avoiding an edit to dead code, and chose the data-driven implementation after verifying the existing link handler already accepted an undefined href.",
      "Kept changes reviewable - single-purpose commits, no drive-by refactors, local dev toggles deliberately excluded from the diff - and resolved branch divergence by proving a suspicious '20 commits ahead' was measured against a stale remote ref rather than lost work.",
    ],
    tech: ["React Native", "TypeScript", "GraphQL", "Apollo Client", "React Navigation", "Redux Toolkit", "Git"],
  },
  {
    title: "Parkinson's Therapy",
    subtitle: "React 19 · TypeScript · Offline-First PWA - Healthcare Platform",
    src: "parkinsons.webp",
    color: "#EFE8D3",
    link: "https://parkinson-therapy.vercel.app/",
    overview: [
      "A therapy platform for people with Parkinson's disease, rebuilt from an abandoned hackathon codebase into a production-ready healthcare application on React 19, TypeScript and Vite.",
      "I took it on because the original idea was good and the code was unusable - and because accessibility, offline behaviour and adaptive difficulty are constraints you cannot fake your way past. Tablet-first, touch-optimised, and installable so a patient's session survives a dropped connection.",
    ],
    contributions: [
      "Rebuilt the project as React 19 + TypeScript + Vite - deleting ~450k lines of vendored dead code and removing real security debt (a hardcoded API key, insecure HTTP script loads), shrinking the repository from 19 MB to under 1 MB.",
      "Designed a healthcare design system with light, dark and high-contrast token sets plus accessibility settings - font scale, target size and reduced motion - cascading app-wide.",
      "Built the data layer behind a repository seam (IndexedDB now, backend-ready later) with zod validation and a reusable contract-test suite, so swapping the storage engine does not touch the domain.",
      "Engineered a pluggable game engine with a lazy exercise registry and five therapeutic exercises, including two webcam modes on one shared motion detector with consent-first, on-device-only camera handling.",
      "Implemented a transparent adaptive-difficulty recommender that eases quickly and hardens slowly to keep patients in a success zone, always overridable by the user.",
      "Built progress dashboards with day-streak logic and a hand-rolled accessible SVG trend chart - zero charting dependencies - plus a caregiver overview and print/CSV therapy report export that is PII-minimal by construction.",
      "Hardened it as an installable offline PWA with route-based code splitting and an opt-in update flow.",
      "Backed it with 131 unit tests, 18 Playwright end-to-end journeys, an axe accessibility audit in CI, and a 375px no-horizontal-overflow regression suite.",
    ],
    tech: ["React 19", "TypeScript", "Vite", "IndexedDB", "zod", "PWA", "Playwright", "Accessibility (WCAG)"],
  },
  {
    title: "Order Integration API",
    subtitle: "REST API Design · OAuth 1.0a · Idempotent Processing",
    src: "orderapi.webp",
    color: "#141516",
    link: null,
    overview: [
      "A production REST integration service (~100 files) that lets external systems drive the full order lifecycle - create, status, invoice, shipment and tracking - against a live commerce platform.",
      "The interesting part was not the endpoints but the failure modes: what happens when the same order is posted twice, when a downstream call times out mid-write, and when nobody can tell you afterwards what the caller actually sent.",
    ],
    contributions: [
      "Designed the service on service contracts, dependency injection and the repository pattern, with immutable data objects at the boundary and no core overrides.",
      "Made order creation idempotent so a retried or duplicated request cannot produce a second order under concurrency.",
      "Built full request/response audit logging with an admin log grid, configurable retry (three attempts by default) driven by both cron and CLI, and a cron-based log cleanup.",
      "Diagnosed a persistent 401 to a platform change - opaque integration tokens were no longer accepted as Bearer credentials - and moved the client to OAuth 1.0a with HMAC-SHA256, restoring authenticated access.",
      "Ran an adversarial audit of the module against vendor source before release and fixed two critical defects: a search-results interface return-type incompatibility that would have thrown on every getList(), and a retry envelope-unwrap bug that made the entire retry feature inert.",
      "Rebuilt the shipment and tracking handlers around an explicit order-item→quantity map after finding the platform's factory silently returns an empty shipment when passed an empty items array.",
      "Verified all five endpoints plus every validation and error path in Postman, and separated genuine module defects from platform behaviour so the client was not chasing phantom bugs.",
    ],
    tech: ["PHP 8", "REST API", "OAuth 1.0a (HMAC-SHA256)", "Service Contracts", "MySQL", "Postman", "Cron & CLI"],
  },
  {
    title: "HideOut",
    subtitle: "Svelte 5 · Babylon.js · WebRTC - 3D Multiplayer Game",
    src: "hideout.webp",
    color: "#14202B",
    link: null,
    overview: [
      "A browser-based 3D multiplayer prop-hunt game, built to find out whether I could design a real-time system with clean architectural boundaries rather than the tangle that game code usually becomes.",
      "It runs peer-to-peer over WebRTC with no game server, renders in Babylon.js, and installs as an offline-capable PWA.",
    ],
    contributions: [
      "Structured the codebase in five deliberate layers - engine-agnostic core simulation, game domain logic, Babylon.js renderer, WebRTC/WebSocket networking, and a Svelte 5 UI - so the simulation can be tested with no renderer and no network attached.",
      "Implemented an entity-component-system architecture with dependency injection, finite state machines, object pooling and a deterministic PRNG, so every client evolves identical state from identical inputs.",
      "Built the peer-to-peer networking layer over WebRTC with WebSocket fallback, and persisted player state locally in IndexedDB.",
      "Covered the simulation with Vitest unit tests and the app with Playwright end-to-end tests.",
    ],
    tech: ["Svelte 5", "TypeScript", "Babylon.js", "WebRTC", "IndexedDB", "Vitest", "Playwright", "PWA"],
  },
  {
    title: "Mealoria",
    subtitle: "Next.js · React 19 · Firebase · Claude API",
    src: "mealoria.webp",
    color: "#F0EAE0",
    link: null,
    overview: [
      "A meal-tracking web app on the Next.js App Router that estimates nutrition from a plain-language description of what you ate, so logging a meal costs one sentence instead of a form.",
      "I built it to work through a full authenticated, real-time product on modern Next.js - and to integrate an LLM as a normal backend dependency, with the validation and failure handling that implies.",
    ],
    contributions: [
      "Built the app on Next.js (App Router) with React 19 and TypeScript, with server-side middleware guarding authenticated routes.",
      "Integrated Firebase Authentication, Firestore and Storage for real-time sync across devices and private group sharing.",
      "Integrated the Anthropic Claude API for nutrition estimation from free-text meal entries.",
      "Implemented a summary dashboard, a monthly overview and an auto-suggest entry field that speeds up repeat meals.",
      "Kept the whole app type-safe end to end - shared TypeScript models across UI, data access and API boundaries.",
    ],
    tech: ["Next.js (App Router)", "React 19", "TypeScript", "Firebase Auth", "Firestore", "Claude API", "Tailwind CSS"],
  },
  {
    title: "PriMedEq",
    subtitle: "Platform Migration · PHP 8.4 · 100% Legacy Module Estate",
    src: "primedeq.webp",
    color: "#12343B",
    link: "https://www.primedeq.com/",
    overview: [
      "A full migration of a live multi-vendor marketplace onto a current platform version and PHP 8.4, without losing a working storefront along the way.",
      "Migrations are unglamorous and extremely revealing: every assumption a codebase quietly depends on surfaces at once. This one finished with 100% of the legacy module estate carried over rather than a list of things left behind.",
    ],
    contributions: [
      "Migrated the platform to the current major version on PHP 8.4, completing 100% of the legacy module estate rather than dropping unsupported modules.",
      "Automated large-scale refactors with Rector, replaced removed Zend APIs with Laminas equivalents, and migrated an admin category tree from ExtJS to jQuery/jsTree.",
      "Upgraded and re-certified third-party dependencies - marketplace, search (ElasticSuite/OpenSearch), payment gateways, helpdesk, SEO and theme modules.",
      "Restored seller registration, product save, RFQ and checkout flows broken by the version jump, and root-caused a checkout tax regression to a collect()/fetch() inconsistency that left stale per-item tax behind on virtual carts.",
      "Fixed a silent quote-request failure by proving from git history that the save controller had never invoked its own send method - turning what looked like a regression into a first-time implementation - then instrumented the shared email helper to log template path and exception instead of swallowing every error, making a whole class of silent failures traceable.",
      "Diagnosed a git synchronisation failure between staging and live as a file-mode-only difference (100755 → 100644) rather than divergent code, and proved a non-fast-forward rejection was a content-free merge with an identical tree - establishing a safe rebase path with zero conflict risk.",
      "Documented every fix in a runbook with before/after per file, verification evidence, and an honest record of which commands were and were not run.",
    ],
    tech: ["PHP 8.4", "Rector", "Laminas", "Composer", "MySQL", "OpenSearch", "JavaScript", "Git"],
  },
  {
    title: "Notekeep",
    subtitle: "React · Express · PostgreSQL - Full-Stack CRUD",
    src: "notekeep.webp",
    color: "#16261F",
    link: null,
    overview: [
      "A note-taking application built end to end - React frontend, Express API, PostgreSQL storage - as a deliberate exercise in owning every layer of a relational full-stack app in JavaScript rather than PHP.",
      "Small on purpose: the value was in wiring the whole path from a click to a row and back without a framework hiding the middle.",
    ],
    contributions: [
      "Built the frontend in React with hooks and Material-UI, including an expandable note-creation form with Zoom/Fab interactions.",
      "Built a RESTful Express API over Node.js with body-parser and CORS, and consumed it from the client with Axios.",
      "Designed the PostgreSQL schema and wrote the queries behind it using the pg driver, with configuration through environment variables rather than hardcoded credentials.",
      "Implemented full create/read/delete flows with the client and server as genuinely separate deployable pieces.",
    ],
    tech: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "Axios", "Material-UI"],
  },
  {
    title: "Aerocade",
    subtitle: "Phaser 3 · WebRTC · Deterministic Simulation",
    src: "aerocade.webp",
    color: "#1B1A2E",
    link: null,
    overview: [
      "A LAN multiplayer browser game for up to eight players, built as a monorepo around one hard constraint: the simulation package has zero dependencies and no idea it is being rendered or networked.",
      "The problem I wanted was network synchronisation - keeping eight clients agreeing on the same world state without a central authority to arbitrate every frame.",
    ],
    contributions: [
      "Split the project into three yarn-workspace packages - a dependency-free deterministic simulation, a Phaser-rendering PWA client, and a Node.js LAN bridge server.",
      "Implemented a deterministic fixed-timestep game loop with client-side prediction and host-authoritative networking, so latency does not desynchronise players.",
      "Built peer-to-peer transport over a WebRTC mesh with a WebSocket fallback for hostile networks.",
      "Added procedural art generation to keep the asset pipeline and download size small, and made the client offline-first.",
    ],
    tech: ["TypeScript", "Vite", "Phaser 3", "Babylon.js", "WebRTC", "WebSocket", "Node.js", "Monorepo"],
  },
  {
    title: "Mufti Jeans",
    subtitle: "Storefront Engineering · Variant Architecture",
    src: "mufti.webp",
    color: "#1F2A44",
    link: "https://www.muftijeans.in/",
    overview: [
      "Backend and storefront work on the commerce platform behind Mufti Jeans, focused on how configurable products are modelled and how accurately that model reaches the customer.",
      "Most of the engineering value here was in reconciling three views of the same product - the admin rule, the API resolver, and the rendered page - which disagreed more often than anyone expected.",
    ],
    contributions: [
      "Built a colour and size variant selector across listing and product pages that swaps product imagery, recomputes variant pricing and rewrites the canonical URL on selection.",
      "Implemented event-driven observers for customer activity and business workflows.",
      "Diagnosed why product-detail related products showed far fewer items than the equivalent listing page, isolating three independent gates that run after the merchandising rule and are invisible in the admin preview.",
      "Identified the price index as a silent hard gate - the join is an INNER JOIN, so two unindexed products vanished from every other product's related list - and established that a reindex has no visible effect until the dependent caches are flushed, removing a repeatable source of false negatives.",
      "Corrected my own earlier verification after finding the method being inspected bypassed the collection the template actually renders, and retracted a root-cause finding once I proved the suspect data existed only in the local database.",
      "Resolved authentication, session-management and API defects, and fixed rendering inconsistencies between listing pages, product pages and backend data.",
      "Documented the surface divergence each change introduced and kept rollback backups before touching shared code.",
    ],
    tech: ["PHP", "JavaScript", "Knockout.js", "jQuery", "MySQL", "GraphQL", "Git"],
  },
  {
    title: "Butterfly",
    subtitle: "GA4 E-commerce Analytics · Data Layer Engineering",
    src: "butterfly.webp",
    color: "#3A2634",
    link: null,
    overview: [
      "End-to-end Google Analytics 4 e-commerce instrumentation, engineering the data layer across the entire purchase journey so the business could trust its own conversion reporting again.",
      "Analytics work is only as good as its weakest event - one wrong variant price and every downstream report quietly lies.",
    ],
    contributions: [
      "Integrated GA4 into the commerce platform and engineered 9+ data-layer events across the customer journey - search, view_item_list, view_item, add_to_cart, remove_from_cart, view_cart, begin_checkout, add_shipping_info and add_payment_info.",
      "Ensured product, pricing and variant payloads were accurate at every event rather than only at page load.",
      "Validated every event with browser debugging tools before sign-off.",
      "Restored reporting accuracy for the marketing and business teams, who had been working from broken conversion data.",
    ],
    tech: ["JavaScript", "Google Analytics 4", "GTM", "Data Layer", "E-commerce"],
  },
  {
    title: "Charak Pharma",
    subtitle: "Security Forensics · Malware Recovery · Platform Upgrade",
    src: "charak.webp",
    color: "#1D3A2F",
    link: null,
    overview: [
      "Recovery of a compromised production WordPress e-commerce site: finding what had been injected, where it was still hiding, and how it got in - then upgrading the platform out of the state that allowed it.",
      "The site was live throughout, so every step had to be investigated safely and proven before it touched production.",
    ],
    contributions: [
      "Recreated the production environment locally so the compromise could be investigated without risk to the live site.",
      "Traced malicious script injections to a specific plugin and cleared obfuscated code from both the codebase and the database - not just the visible theme files.",
      "Upgraded PHP from 7.4 to 8.4 and WordPress core, then audited and upgraded every plugin and theme rather than only the ones that broke.",
      "Investigated AJAX communication failures affecting site functionality and fixed broken coupon validation and backend business logic.",
      "Left the platform on a supported, patched stack instead of a cleaned-up version of the same vulnerable one.",
    ],
    tech: ["PHP 8.4", "WordPress", "MySQL", "AJAX", "JavaScript", "Security Forensics"],
  },
  {
    title: "Duet",
    subtitle: "React · Firebase Auth Forensics · Firestore Security Rules",
    src: "duet.webp",
    color: "#2B1A28",
    link: null,
    overview: [
      "A private shared-space app for couples - messaging, memories, plans and small games - built on Firebase with a deliberately zero-cost infrastructure footprint.",
      "Its most useful chapter was a debugging one: Google sign-in was broken in a way that produced no useful error, and the real answer sat across three unrelated causes.",
    ],
    contributions: [
      "Diagnosed broken Google sign-in through Cross-Origin-Opener-Policy severing the popup handshake, Chrome third-party storage partitioning, and a Firebase project mismatch - isolating the root cause to a half-provisioned project with no Firestore database behind it.",
      "Reworked the auth flow to popup-with-redirect fallback, added a same-origin-allow-popups COOP header, and surfaced real Firebase error codes instead of a generic message.",
      "Migrated to a correctly provisioned project and replaced open test-mode Firestore rules with deployed security rules plus a composite index - closing a real data-exposure hole, not a theoretical one.",
      "Fixed a mobile notifications dropdown that clipped off-viewport and bled the header behind it, using an opaque popover variant and viewport-anchored positioning.",
      "Built the wider app with React Native/Expo and Next.js clients over Firestore, with Cloudflare Workers for serverless backend work.",
    ],
    tech: ["React", "Next.js", "TypeScript", "Firebase Auth", "Firestore", "Cloudflare Workers", "PWA"],
  },
  {
    title: "SizeWise",
    subtitle: "TypeScript · Chrome Extension (Manifest V3)",
    src: "sizewise.webp",
    color: "#1E2430",
    link: null,
    overview: [
      "A browser extension that recommends clothing sizes from your own measurements while you shop, instead of leaving you to interpret a different size chart on every site.",
      "Built partly because online sizing is genuinely broken, and partly to work inside a platform I had not used before - the extension sandbox, where your code runs as a guest on someone else's page.",
    ],
    contributions: [
      "Built the extension on Manifest V3 in TypeScript, using a service worker as the background context rather than a persistent page.",
      "Injected content scripts into retail product pages to read sizing information in place and surface a recommendation inline.",
      "Handled cross-origin communication between content scripts and the service worker under Manifest V3's stricter permissions model.",
      "Stored user measurements locally and matched them against per-site sizing data to produce measurement-aware recommendations.",
    ],
    tech: ["TypeScript", "Chrome Manifest V3", "Service Workers", "Content Scripts", "Web Storage"],
  },
  {
    title: "Leaf Identification",
    subtitle: "Python · TensorFlow · CNN - Smart India Hackathon",
    src: "plantid.webp",
    color: "#17281C",
    link: null,
    overview: [
      "An image-classification system that identifies medicinal plant species from a photograph of a leaf and returns information about its medicinal use - built as a Smart India Hackathon submission.",
      "My first real deep-learning project, and the one that taught me how much of machine learning is actually data handling.",
    ],
    contributions: [
      "Built and trained a convolutional neural network in TensorFlow/Keras to classify leaf species from images.",
      "Prepared and preprocessed a publicly available leaf dataset, using OpenCV for image processing before training.",
      "Evaluated model performance across species and iterated on preprocessing to improve classification accuracy.",
      "Paired identification with a medicinal-information lookup so the output was useful to a non-expert, not just a class label.",
    ],
    tech: ["Python", "TensorFlow", "Keras", "CNN", "OpenCV", "NumPy"],
  },
];

// How many entries the home page features. The remainder stay available to the
// Work page's table, which indexes into this array directly.
export const FEATURED_COUNT = 8;

export default projects;
