// Case-study content for each project — rendered in the list rows, the
// hover-preview modal, and the click-to-open ProjectDetail overlay.
const projects = [
  {
    title: "Mufti Jeans",
    subtitle: "Adobe Commerce · Product Architecture & Swatches",
    src: "mufti.webp",
    color: "#1F2A44",
    link: "https://www.muftijeans.in/",
    overview: [
      "Contributed to the Adobe Commerce platform powering Mufti Jeans by building backend functionality, improving product architecture, and enhancing configurable product experiences.",
      "Worked across catalog management, event-driven modules, authentication, and frontend/backend data synchronization.",
    ],
    contributions: [
      "Developed and customized Adobe Commerce modules to extend platform functionality.",
      "Implemented event-driven observers for customer activity and business workflows.",
      "Improved configurable product architecture with dynamic color and size swatches.",
      "Resolved authentication, session management, and API-related backend issues.",
      "Fixed frontend rendering inconsistencies between PLP, PDP, and backend data.",
      "Performed testing, debugging, and deployment on staging environments before production releases.",
    ],
    tech: ["Adobe Commerce (Magento 2)", "PHP", "JavaScript", "MySQL", "Git"],
  },
  {
    title: "PriMedEq",
    subtitle: "Magento 2.4.8 Marketplace Migration · PHP 8.4",
    src: "primedeq.webp",
    color: "#12343B",
    link: "https://www.primedeq.com/",
    overview: [
      "Migrated a production Magento marketplace from legacy infrastructure to Magento 2.4.8 with PHP 8.4 while ensuring compatibility, stability, and minimal downtime.",
      "The project involved dependency upgrades, module compatibility, and resolving migration-related issues.",
    ],
    contributions: [
      "Migrated the platform from an older Magento/PHP stack to Magento 2.4.8 with PHP 8.4.",
      "Updated custom modules and third-party extensions for compatibility.",
      "Resolved deprecated PHP functionality and framework-related issues.",
      "Fixed frontend and backend regressions introduced during migration.",
      "Performed extensive testing to ensure marketplace stability after deployment.",
      "Assisted in production rollout and post-migration issue resolution.",
    ],
    tech: ["Magento 2.4.8", "PHP 8.4", "Composer", "MySQL", "JavaScript", "Git"],
  },
  {
    title: "Order Integration API",
    subtitle: "Magento 2 REST Module · Service Contracts & OAuth",
    src: "orderapi.webp",
    color: "#141516",
    link: null,
    overview: [
      "Designed and developed a secure Magento 2 REST API module to streamline order integration with external systems.",
      "The implementation followed Magento's Service Contract architecture while supporting authenticated and guest workflows.",
    ],
    contributions: [
      "Built custom REST endpoints using Magento Service Contracts.",
      "Implemented OAuth-based authentication for secure API access.",
      "Added comprehensive request validation and exception handling.",
      "Designed APIs for customer and guest order workflows.",
      "Improved API maintainability through modular architecture.",
      "Assisted external teams with API integration and debugging.",
    ],
    tech: ["Magento 2", "PHP", "REST API", "OAuth", "Service Contracts", "JSON"],
  },
  {
    title: "Charak Pharma",
    subtitle: "WordPress Security Forensics & Platform Upgrade",
    src: "charak.webp",
    color: "#1D3A2F",
    link: null,
    overview: [
      "Restored a compromised WordPress e-commerce website by identifying security vulnerabilities, removing malicious code, and upgrading the platform to a secure and stable environment.",
    ],
    contributions: [
      "Recreated the production environment locally for safe investigation.",
      "Identified and removed malicious code injections from themes and plugins.",
      "Investigated AJAX communication failures affecting site functionality.",
      "Fixed coupon validation workflows and backend business logic.",
      "Upgraded WordPress dependencies and improved plugin compatibility.",
      "Enhanced overall platform stability and security.",
    ],
    tech: ["WordPress", "PHP", "AJAX", "JavaScript", "MySQL"],
  },
  {
    title: "Butterfly",
    subtitle: "GA4 E-commerce Analytics · Data Layer Engineering",
    src: "butterfly.webp",
    color: "#3A2634",
    link: null,
    overview: [
      "Implemented Google Analytics 4 e-commerce tracking by engineering accurate data layer events across the customer purchase journey, enabling reliable analytics and conversion reporting.",
    ],
    contributions: [
      "Integrated Google Analytics 4 into the e-commerce platform.",
      "Engineered data layer events across the purchase journey — view_item, add_to_cart, begin_checkout and the full purchase flow.",
      "Ensured accurate product, pricing, and variant data.",
      "Validated analytics events using browser debugging tools.",
      "Improved reporting accuracy for marketing and business teams.",
    ],
    tech: ["Google Analytics 4", "GTM", "JavaScript", "Data Layer", "Adobe Commerce"],
  },
  {
    title: "Parkinson's Therapy",
    subtitle: "React · Flask · NLP — Smart India Hackathon",
    src: "parkinsons.webp",
    color: "#EFE8D3",
    link: null,
    overview: [
      "Developed an intelligent therapy platform for Parkinson's disease patients during Smart India Hackathon 2023.",
      "The application combined interactive therapy exercises with an NLP-powered chatbot to improve patient engagement and accessibility.",
    ],
    contributions: [
      "Built responsive frontend interfaces using React.",
      "Developed backend services with Flask.",
      "Integrated an NLP chatbot for real-time patient assistance.",
      "Designed interactive therapy modules focused on improving motor skills.",
      "Collaborated in a multidisciplinary team during the hackathon.",
      "Shortlisted at the college level for Smart India Hackathon 2023.",
    ],
    tech: ["React", "Flask", "Python", "NLP", "REST API"],
  },
];

export default projects;
