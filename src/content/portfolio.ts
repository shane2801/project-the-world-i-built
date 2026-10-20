import { loadPortfolio } from './loadPortfolio.ts';

// Name, biography, education and contact details updated from owner messages, 2026-10-19.
// SRC-11: docs/KAVISH MUTHOORA.docx; paragraph provenance in areas/data.md.
// Owner authorized use of résumé details. Missing details stay explicitly pending;
// chapter mappings for the EV project and Java game are provisional.
// The 39/23 banking-entity discrepancy is deliberately omitted.
const authoredPortfolio: unknown = {
  "reviewStatus": "approved",
  "name": "Shane Muthoora",
  "headline": "Software Engineer at Accenture | FinTech & AI | Freelance Software Consultant",
  "introduction": "I'm a Software Engineer specializing in custom AI solutions and full-stack development, with a strong background in FinTech systems, intelligent automation, and a growing interest in robotics. At Accenture, I contribute to the development of a SEPA payment platform for major European banks, where I help build scalable, secure backend systems using Java and enterprise technologies.\n\nOn the side, I run my own business delivering end-to-end AI and software solutions for clients across sectors. From predictive analytics and natural language processing to full-featured web platforms, I handle both the technical architecture and client delivery — ensuring every solution is tailored, scalable, and aligned with business needs.\n\nMy experience spans designing responsive frontends (React, HTML/CSS/JS), building robust APIs and backends (Java, Spring, Python, Flask/Django), and implementing intelligent systems powered by machine learning. I've led projects involving transformer-based NLP, data visualization, and automation tools, and I'm particularly passionate about bridging AI with real-world applications — including robotics and smart systems.\n\nDriven by curiosity and practical impact, I bring a cross-functional skill set and entrepreneurial mindset to every project. I thrive in dynamic environments where tech meets business, and I'm always exploring new ways AI and software can solve real-world problems.\n\nLet's connect if you're looking to build AI-powered platforms, explore intelligent automation, or collaborate on full-stack and emerging tech projects.",
  "currentPhaseId": "france",
  "contacts": [
    {
      "label": "kavish.muthoora@accenture.com",
      "href": "mailto:kavish.muthoora@accenture.com"
    },
    {
      "label": "WhatsApp: +44 7943 258425",
      "href": "https://wa.me/447943258425"
    },
    {
      "label": "LinkedIn",
      "href": "https://www.linkedin.com/in/kavishmuthoora"
    },
    {
      "label": "shane.codes",
      "href": "https://shane.codes"
    },
    {
      "label": "GitHub",
      "href": "https://github.com/shane2801"
    }
  ],
  "phases": [
    {
      "id": "mauritius",
      "title": "Mauritius — Foundations",
      "location": "Mauritius",
      "period": "January 2011–January 2018",
      "order": 0,
      "description": "Secondary education in Science and Mathematics at Royal College Curepipe, Mauritius, completing the School Certificate (O-Levels) and Higher School Certificate (A-Levels).",
      "skillIds": [],
      "themeId": "theme-mauritius",
      "characterStateId": "character-mauritius"
    },
    {
      "id": "birmingham",
      "title": "Birmingham — Learning and research",
      "location": "University of Birmingham",
      "period": "Graduated 2022 · Research April 2022–January 2023",
      "order": 1,
      "description": "Computer science education and healthcare NLP research at the University of Birmingham.",
      "skillIds": [
        "java",
        "python",
        "nlp"
      ],
      "themeId": "theme-birmingham",
      "characterStateId": "character-birmingham"
    },
    {
      "id": "freelance",
      "title": "Kóryos — Independent consulting",
      "location": "Clients across the UK, UAE, Canada, Kuwait and Mauritius",
      "period": "July 2022–Present",
      "order": 2,
      "description": "Independent technology consulting across AI, enterprise software, e-commerce and business automation.",
      "skillIds": [
        "react",
        "spring-boot",
        "node",
        "flask",
        "django"
      ],
      "themeId": "theme-freelance",
      "characterStateId": "character-freelance"
    },
    {
      "id": "abu-dhabi",
      "title": "Abu Dhabi — Engineering leadership",
      "location": "Abu Dhabi",
      "period": "September 2024–February 2025",
      "order": 3,
      "description": "Software engineering leadership and solutions architecture at Energy Solutions Sole Proprietorship LLC.",
      "skillIds": [
        "react",
        "spring-boot",
        "mysql",
        "docker",
        "kubernetes",
        "aws",
        "cicd"
      ],
      "themeId": "theme-abu-dhabi",
      "characterStateId": "character-abu-dhabi"
    },
    {
      "id": "france",
      "title": "France — Enterprise banking",
      "location": "France-linked banking work · Based in Mauritius",
      "period": "February 2025–Present",
      "order": 4,
      "description": "Java technical architecture at Accenture for the Crédit Agricole Group. This chapter describes the banking context, not a verified relocation to France.",
      "skillIds": [
        "java",
        "java-ee",
        "opf",
        "oidc",
        "angular",
        "rest"
      ],
      "themeId": "theme-france",
      "characterStateId": "character-france"
    }
  ],
  "experiences": [
    {
      "id": "accenture-architect",
      "phaseId": "france",
      "role": "Java Technical Architect",
      "organization": "Accenture",
      "period": "February 2025–Present",
      "responsibilities": [
        "Lead technical development for an enterprise payment platform supporting the Crédit Agricole Group across France and Europe.",
        "Design payment functionality for SCT, SDD, domestic, European and international processing, including EPC SEPA Rulebook adaptations.",
        "Develop bespoke Open Payment Framework components, CRE production and enterprise payment integrations.",
        "Architect and maintain customized OIDC authentication and fine-grained role-based authorization.",
        "Modernize a Java EE / Struts platform towards API-driven architecture with Angular front ends.",
        "Resolve production issues and collaborate with architects, analysts, QA and international stakeholders."
      ],
      "skillIds": [
        "java",
        "java-ee",
        "opf",
        "oidc",
        "angular",
        "rest"
      ]
    },
    {
      "id": "energy-solutions-lead",
      "phaseId": "abu-dhabi",
      "role": "Head of Software Engineering & Solutions Architect",
      "organization": "Energy Solutions Sole Proprietorship LLC",
      "period": "September 2024–February 2025",
      "responsibilities": [
        "Lead software delivery for expansion into AI and enterprise software, from technical proposal through implementation.",
        "Lead technical and commercial responses to public-sector tenders and enterprise RFPs.",
        "Design and deliver an accommodation management platform supporting multiple residential complexes.",
        "Manage sprint planning, stakeholders, architecture and hands-on delivery.",
        "Design cloud-native applications using React, Spring Boot, MySQL, Docker, Kubernetes and AWS, with CI/CD workflows."
      ],
      "skillIds": [
        "react",
        "spring-boot",
        "mysql",
        "docker",
        "kubernetes",
        "aws",
        "cicd"
      ]
    },
    {
      "id": "koryos-consultant",
      "phaseId": "freelance",
      "role": "Independent Technology Consultant — Technology Strategy, Architecture & AI",
      "organization": "Kóryos",
      "period": "July 2022–Present",
      "responsibilities": [
        "Founded and operate a consultancy serving clients across the UK, UAE, Canada, Kuwait and Mauritius.",
        "Deliver AI, enterprise software, e-commerce and automation platforms across healthcare, education, retail and commercial sectors.",
        "Develop responsive React applications and backend services using Spring Boot, Node.js, Flask and Django.",
        "Deliver multilingual platforms for English, French and Arabic markets.",
        "Manage SEO, caching, deployment automation, cloud hosting, DNS, domains and email services."
      ],
      "skillIds": [
        "react",
        "spring-boot",
        "node",
        "flask",
        "django"
      ]
    },
    {
      "id": "birmingham-research",
      "phaseId": "birmingham",
      "role": "Research Associate — AI & Computational Systems",
      "organization": "University of Birmingham",
      "period": "April 2022–January 2023",
      "responsibilities": [
        "Conduct NLP research analysing over 300,000 healthcare reviews from NHS and Google datasets.",
        "Lead data collection, preprocessing and experiment design.",
        "Build NLP pipelines using transformers, topic modelling and sentiment analysis.",
        "Produce Tableau and Power BI dashboards and collaborate with researchers across multiple universities."
      ],
      "skillIds": [
        "python",
        "nlp",
        "topic-modelling",
        "tableau",
        "power-bi"
      ]
    }
  ],
  "projects": [
    {
      "id": "ev-charger-management",
      "phaseId": "france",
      "title": "EV Charger Management & Booking",
      "description": "An EV charger booking system with an internal AI agent, analytics and recommendations. Chapter placement is provisional.",
      "tags": [
        "EV charging",
        "AI",
        "Hackathon"
      ],
      "presentationKind": "ai",
      "importance": "medium",
      "problem": "Detailed problem statement pending.",
      "solution": "A booking management system for an EV charger, with AI integration.",
      "architecture": "Architecture details pending.",
      "contribution": "Individual contribution details pending.",
      "technologies": [],
      "impact": "Second place in the 2026 Accenture Hackathon.",
      "media": [],
      "links": [],
      "skillIds": []
    },
    {
      "id": "accommodation-management",
      "phaseId": "abu-dhabi",
      "experienceId": "energy-solutions-lead",
      "title": "Accommodation Management Platform",
      "description": "Enterprise housing management with role-based access, reporting, analytics, occupancy management and operational workflows.",
      "tags": [
        "Enterprise software",
        "Housing",
        "AI analytics"
      ],
      "presentationKind": "software",
      "importance": "major",
      "problem": "Manage accommodation operations across multiple residential complexes.",
      "solution": "A complete housing management platform with operational workflows and reporting.",
      "architecture": "Architecture details pending.",
      "contribution": "Designed and delivered the platform.",
      "technologies": [],
      "impact": "Measured outcomes pending.",
      "media": [],
      "links": [],
      "skillIds": []
    },
    {
      "id": "ai-healthcare-analytics",
      "phaseId": "birmingham",
      "experienceId": "birmingham-research",
      "title": "AI Healthcare Analytics",
      "description": "NLP analysis of over 300,000 patient reviews using transformer architectures, topic modelling and data visualisation.",
      "tags": [
        "AI",
        "Healthcare",
        "Research"
      ],
      "presentationKind": "ai",
      "importance": "major",
      "problem": "Analyse patient feedback from healthcare reviews.",
      "solution": "Transformer-based NLP, topic modelling and advanced data visualisation.",
      "architecture": "An NLP analysis pipeline; detailed architecture pending.",
      "contribution": "Led data collection, preprocessing and experiment design.",
      "technologies": [
        "Transformer models",
        "Topic modelling"
      ],
      "impact": "Analysed over 300,000 reviews. Further research outcomes pending.",
      "media": [],
      "links": [],
      "skillIds": [
        "nlp",
        "topic-modelling"
      ]
    },
    {
      "id": "java-multiplayer-game",
      "phaseId": "birmingham",
      "title": "Java Multiplayer Game",
      "description": "A Java hide-and-seek game with multiplayer and single-player modes and AI-controlled characters. Chapter placement is provisional.",
      "tags": [
        "Game development",
        "Java",
        "AI"
      ],
      "presentationKind": "software",
      "importance": "medium",
      "problem": "Detailed problem statement pending.",
      "solution": "A hide-and-seek game supporting multiplayer and AI-controlled characters.",
      "architecture": "Architecture details pending.",
      "contribution": "Individual contribution details pending.",
      "technologies": [
        "Java"
      ],
      "impact": "Outcomes pending.",
      "media": [],
      "links": [],
      "skillIds": [
        "java"
      ]
    }
  ],
  "skills": [
    {
      "id": "java",
      "name": "Java"
    },
    {
      "id": "python",
      "name": "Python"
    },
    {
      "id": "javascript",
      "name": "JavaScript"
    },
    {
      "id": "typescript",
      "name": "TypeScript"
    },
    {
      "id": "sql",
      "name": "SQL"
    },
    {
      "id": "html-css",
      "name": "HTML5 / CSS3"
    },
    {
      "id": "java-ee",
      "name": "Java EE"
    },
    {
      "id": "spring",
      "name": "Spring Framework"
    },
    {
      "id": "spring-boot",
      "name": "Spring Boot"
    },
    {
      "id": "node",
      "name": "Node.js (Express)"
    },
    {
      "id": "flask",
      "name": "Flask"
    },
    {
      "id": "django",
      "name": "Django"
    },
    {
      "id": "rest",
      "name": "REST APIs"
    },
    {
      "id": "oidc",
      "name": "OIDC authentication"
    },
    {
      "id": "react",
      "name": "React"
    },
    {
      "id": "nextjs",
      "name": "Next.js"
    },
    {
      "id": "wordpress",
      "name": "WordPress"
    },
    {
      "id": "angular",
      "name": "Angular"
    },
    {
      "id": "oracle",
      "name": "Oracle"
    },
    {
      "id": "mysql",
      "name": "MySQL"
    },
    {
      "id": "postgresql",
      "name": "PostgreSQL"
    },
    {
      "id": "mongodb",
      "name": "MongoDB"
    },
    {
      "id": "aws",
      "name": "AWS"
    },
    {
      "id": "docker",
      "name": "Docker"
    },
    {
      "id": "kubernetes",
      "name": "Kubernetes"
    },
    {
      "id": "git",
      "name": "Git"
    },
    {
      "id": "cicd",
      "name": "CI/CD"
    },
    {
      "id": "opf",
      "name": "Open Payment Framework"
    },
    {
      "id": "nlp",
      "name": "Natural Language Processing"
    },
    {
      "id": "topic-modelling",
      "name": "Topic modelling"
    },
    {
      "id": "tensorflow",
      "name": "TensorFlow"
    },
    {
      "id": "pytorch",
      "name": "PyTorch"
    },
    {
      "id": "scikit-learn",
      "name": "Scikit-Learn"
    },
    {
      "id": "pandas",
      "name": "Pandas"
    },
    {
      "id": "tableau",
      "name": "Tableau"
    },
    {
      "id": "power-bi",
      "name": "Power BI"
    }
  ],
  "achievements": [
    {
      "id": "first-class-degree",
      "phaseId": "birmingham",
      "title": "BSc Computer Science",
      "description": "University of Birmingham · October 2018–July 2022\nFirst Class Honours · GPA: 4.0\n\nDissertation: Investigating and evaluating NHS services through patient feedback using data science and machine learning (NLP).\n\nCoursework: Mathematical Foundations of Computer Science; Java; Data Structures and Algorithms; Logic and Computation; Artificial Intelligence; Advanced Functional Programming; Mathematical Modelling; Security and Networks; Software Engineering; Game Development; Systems Programming in C/C++; Security of Real World Systems; Neural Computation; Robotics; Mobile and Ubiquitous Computing.",
      "links": []
    },
    {
      "id": "consultancy-delivery",
      "phaseId": "freelance",
      "experienceId": "koryos-consultant",
      "title": "10+ production software platforms",
      "description": "Delivered across healthcare, education, retail and commercial sectors.",
      "links": []
    },
    {
      "id": "ev-hackathon-award",
      "phaseId": "france",
      "title": "Second place — 2026 Accenture Hackathon",
      "description": "EV charger management, booking and AI integration. Chapter placement is provisional.",
      "links": []
    },
    {
      "id": "royal-college-education",
      "phaseId": "mauritius",
      "title": "A-Levels & O-Levels",
      "description": "Royal College Curepipe, Mauritius · January 2011–January 2018\nA-Levels and O-Levels · Science and Mathematics\nMathematics: A · Physics: A · Chemistry: B · French: A · English: B\n\nSeven years at a selective state-funded school, completing the School Certificate (O-Levels) and Higher School Certificate (A-Levels).\n\nActivities: Fundraising for children affected by autism through Autisme Maurice; caring for dogs at MSPCA Mauritius and PDSA Rubery; Alliance Française tests with “très bien” / “very good” honours.",
      "links": []
    }
  ]
};

export const portfolio = loadPortfolio(authoredPortfolio);
// Facts are owner-supplied; presentation and incomplete project details await review.
export const contentIsDraft = true;
