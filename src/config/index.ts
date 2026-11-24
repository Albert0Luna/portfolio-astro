import type { CertificationItem, SiteConfig, SiteContent } from "../types/index";
import ecliptica from "../assets/ecliptica.jpg";
import fotoWeb from "../assets/foto-web.webp";
import innovaSocial2026 from "../assets/innova-social-2026.jpg";

const SHARED_CERTIFICATIONS_EN: CertificationItem[] = [
  {
    name: "Generative AI Adoption Program for IT Teams — QuantikLab (Mar 2026)",
  },
  {
    name: "Model Context Protocol (MCP): Advanced Topics — Anthropic (2026)",
  },
  {
    name: "AWS Certified Cloud Practitioner — Amazon Web Services (Jul 2025)",
    href: "https://www.credly.com/badges/7709c02c-2a2c-428e-825b-655874a86f41/public_url",
  },
  {
    name: "MongoDB Node.js Developer Path — MongoDB Inc. (Apr 2025)",
    href: "https://learn.mongodb.com/c/UhARMgERRzyn7bMzcpO_Zw",
  },
  {
    name: "MongoDB Advanced Schema Design Patterns & Anti-Patterns — MongoDB Inc. (Jul 2025)",
    href: "https://www.credly.com/badges/f8049746-611a-4b20-8310-fe3a6c0f9168/public_url",
  },
  {
    name: "GitHub Foundations — GitHub (Apr 2025)",
    href: "https://www.credly.com/badges/01317c41-b90c-4362-9206-78c357ff36df/public_url",
  },
];

const SHARED_CERTIFICATIONS_ES: CertificationItem[] = [
  {
    name: "Programa de Adopción de IA Generativa para Equipos de TI — QuantikLab (Mar 2026)",
  },
  {
    name: "Model Context Protocol (MCP): Advanced Topics — Anthropic (2026)",
  },
  {
    name: "AWS Certified Cloud Practitioner — Amazon Web Services (Jul 2025)",
    href: "https://www.credly.com/badges/7709c02c-2a2c-428e-825b-655874a86f41/public_url",
  },
  {
    name: "MongoDB Node.js Developer Path — MongoDB Inc. (Abr 2025)",
    href: "https://learn.mongodb.com/c/UhARMgERRzyn7bMzcpO_Zw",
  },
  {
    name: "MongoDB Advanced Schema Design Patterns & Anti-Patterns — MongoDB Inc. (Jul 2025)",
    href: "https://www.credly.com/badges/f8049746-611a-4b20-8310-fe3a6c0f9168/public_url",
  },
  {
    name: "GitHub Foundations — GitHub (Abr 2025)",
    href: "https://www.credly.com/badges/01317c41-b90c-4362-9206-78c357ff36df/public_url",
  },
];

export const SITE_CONFIG: SiteConfig = {
  title: "Gustavo Luna — Full-Stack & AI Engineer",
  titleEs: "Gustavo Luna — Ingeniero Full-Stack & IA",
  author: "Gustavo Luna",
  description:
    "Portfolio of Gustavo Luna, a Full-Stack & AI Engineer building end-to-end web platforms and production AI systems with Next.js, React, TypeScript, Python, FastAPI, PostgreSQL, and Docker.",
  descriptionEs:
    "Portafolio de Gustavo Luna, Ingeniero Full-Stack & IA creando plataformas web de extremo a extremo y sistemas de IA en producción con Next.js, React, TypeScript, Python, FastAPI, PostgreSQL y Docker.",
  siteLogo: "/profile-photo.webp",
  navLinks: [
    { text: "Experience", textEs: "Experiencia", href: "#experience" },
    { text: "Projects", textEs: "Proyectos", href: "#projects" },
    { text: "Awards", textEs: "Premios", href: "#awards" },
    { text: "About", textEs: "Sobre mí", href: "#about" },
  ],
  socialLinks: [
    { text: "LinkedIn", href: "https://www.linkedin.com/in/gustavo-alberto-r-a202b2231/" },
    { text: "Github", href: "https://github.com/Albert0Luna" },
  ],
  socialImage: "/profile-photo.webp",
};

export const SITE_CONTENT_EN: SiteContent = {
  hero: {
    name: "Gustavo Luna",
    specialty: "Full-Stack & AI Engineer · Next.js, React, Python & PostgreSQL",
    summary:
      "Computer Systems Engineer building end-to-end web products and production AI systems. I combine modern frontend engineering in Next.js, React, and TypeScript with scalable Python backends (FastAPI, Django), hexagonal architecture, relational databases (PostgreSQL, MySQL, SQL Server), Docker, and applied AI — from RAG pipelines and conversational agents to custom MCP servers and automated testing.",
    email: "albertorl1002@gmail.com",
    buttonText: "Get In Touch",
    projectsButtonText: "View Project",
  },
  experience: [
    {
      company: "Ciudad Maderas",
      position: "Sr. Analyst Programmer · Full-Stack, Python & AI Engineer",
      startDate: "October 2026",
      endDate: "Present",
      summary: [
        "Led the architecture and evolution of the corporate AI conversational agent (AgenteCM) in Python (FastAPI) into a modular monolith with hexagonal architecture — shrinking the main entrypoint from 2,294 to 219 lines and splitting the engine into 25 files automating 19 sales & after-sales business areas with direct CRM integration.",
        "Containerized dev and production environments with Docker and Docker Compose, migrating embeddings to Vertex AI (gemini-embedding-001) on Google Cloud Run — doubling document search accuracy from 46% to 92% and shrinking production image size by 76% (2.6 GB → 637 MB).",
        "Led technical QA and validation of a Text-to-SQL AI agent in Databricks Genie connected to SQL Server for financial reports (> $200M MXN), and optimized MySQL & SQL Server queries (~88 → 36 queries/turn), cutting median response latency from ~10 s to ~5–6 s.",
        "Implemented access control (Google Workspace SSO & roles), a 605-test pytest suite (in-memory SQLite), GitHub Actions CI/CD (import-linter, ruff), and a 96-scenario evaluation battery reaching 92/96 passing.",
      ],
      skills: [
        "Python",
        "FastAPI",
        "Docker",
        "Google Cloud Run",
        "Vertex AI",
        "MySQL",
        "SQL Server",
        "pytest",
        "ruff",
        "GitHub Actions",
      ],
    },
    {
      company: "Ciudad Maderas",
      position: "Jr. Analyst Programmer · Full-Stack & Internal Systems",
      startDate: "December 2025",
      endDate: "October 2026",
      summary: [
        "Designed, built, and maintained internal web modules, REST APIs, and CRUD workflows across React, PHP (Laravel, CodeIgniter), Python, SQL Server, and MySQL.",
        "Authored and optimized complex relational queries with multi-table JOINs, views, and stored procedures in SQL Server and MySQL for management dashboards and financial/operational rule validation.",
        "Built an automated technical-documentation workflow powered by custom MCP servers and dev agents (GRAL) that cut Pull Request documentation time by 92%, and trained teammates on rigorous AI-assisted code auditing.",
      ],
      skills: [
        "React",
        "Python",
        "Laravel",
        "CodeIgniter",
        "SQL Server",
        "MySQL",
        "MCP",
        "AI Agents",
      ],
    },
  ],
  projects: [
    {
      name: "Eclíptica",
      summary:
        "Full-stack personal finance web platform built with Next.js, React, TypeScript, Tailwind CSS, and Zod over a relational PostgreSQL architecture — featuring real-time income & budget tracking, secure authentication, RESTful endpoints, CRUD workflows, and interactive data visualizations.",
      date: "March 2025 – Present",
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Zod"],
      linkPreview: "https://ecliptica.appwrite.network/",
      image: ecliptica,
    },
  ],
  awards: [
    {
      title: "National Social Innovation Contest 2026 · University Edition",
      project: "Cuenta Conmigo",
      badge: "1st Place National · INNOVA + SOCIAL 2026",
      issuer: "Fundación Aliat",
      date: "November 2026 · Mexico City",
      role: "Lead Architect & Full-Stack / Python AI Developer",
      summary:
        "Awarded 1st place nationwide for designing and building a deterministic financial diagnostic engine, WhatsApp AI agent, and RAG observability platform with a React 18 backoffice — engineered to prevent arithmetic hallucinations while protecting user privacy.",
      highlights: [
        "Hexagonal Architecture (Ports & Adapters) in Python 3.11+ (mypy --strict), FastAPI, SQLAlchemy 2.0 (asyncpg), Pydantic v2 & Alembic, with Meta WhatsApp Cloud API webhooks and a JWT HS256 admin REST API.",
        "Pure Decimal deterministic financial engine (ROUND_HALF_UP) for Debt-to-Income (DTI), risk traffic-light scoring, and French amortization, plus HMAC-SHA256 E.164 phone anonymization.",
        "PostgreSQL 15+ (Supabase) with Row Level Security (RLS), fuzzy trigram search (pg_trgm GIN) over CONDUSEF SIPRES, vector search (pgvector HNSW + Vertex AI), and Banxico SIE reference rates.",
        "217 automated pytest tests, auditable RAG trace log (traza_interacciones_rag), and a React 18 + TypeScript + Tailwind CSS + Zod admin backoffice containerized with Docker for Google Cloud Run.",
      ],
      stack: [
        "Python",
        "FastAPI",
        "SQLAlchemy 2.0",
        "PostgreSQL",
        "pgvector",
        "Supabase",
        "React",
        "TypeScript",
        "Docker",
        "pytest",
      ],
      image: innovaSocial2026,
      imageAlt:
        "Gustavo Alberto Robles Luna holding the Fundación Aliat 1st Place National INNOVA + SOCIAL 2026 recognition certificate for Cuenta Conmigo",
    },
  ],
  about: {
    image: fotoWeb,
    greetingPrefix: "Hi! I'm",
    roleHighlight: "Full-Stack & AI Engineer",
    age: 24,
    experienceYears: "~1+ year",
    location: "Querétaro, México",
    degree: "Computer Systems Engineering",
    educationDetails: "UVEG · 2022 – 2026 · GPA 9.0/10",
    bioIntroPrefix: "I'm a",
    bioAgeLocationConnector: "years old, based in",
    bioEducationPrefix: "I graduated in",
    bioFocusPrefix: "and I build complete products combining",
    bioFocusHighlight: "Next.js & React, Python/FastAPI backends, PostgreSQL, and applied AI",
    languagesLabel: "Languages:",
    languages: ["Spanish (Native)", "English (B2)"],
    certificationsTitle: "Certifications",
    certifications: SHARED_CERTIFICATIONS_EN,
    focusTitle: "Full-Stack & AI Focus Areas",
    focusIntroPrefix: "I work end-to-end at the intersection of",
    focusIntroHighlight: "modern full-stack engineering and applied AI",
    focusIntroSuffix: ", pairing clean UX in Next.js/React with solid Python backends and measurable production impact.",
    focusItems: [
      { highlight: "Frontend & Full-Stack", suffix: " (Next.js, React, TypeScript, Node.js, Tailwind CSS)" },
      { highlight: "Python Backends & APIs", suffix: " (FastAPI, Django/DRF, Hexagonal Architecture)" },
      { highlight: "PostgreSQL & RAG", suffix: " (pgvector HNSW, pg_trgm GIN, RLS, SQL optimization)" },
      { prefix: "Custom ", highlight: "MCP servers", suffix: ", Docker/Cloud Run & pytest CI/CD (820+ tests)" },
    ],
    closingCta: "✨ Open to Full-Stack (Next.js / React / Python) & Applied AI challenges!",
  },
};

export const SITE_CONTENT_ES: SiteContent = {
  hero: {
    name: "Gustavo Luna",
    specialty: "Ingeniero Full-Stack & IA · Next.js, React, Python y PostgreSQL",
    summary:
      "Ingeniero en Sistemas Computacionales construyendo productos web de extremo a extremo y sistemas de IA en producción. Combino desarrollo frontend moderno con Next.js, React y TypeScript junto a backends escalables en Python (FastAPI, Django), arquitectura hexagonal, bases de datos relacionales (PostgreSQL, MySQL, SQL Server), Docker e IA aplicada — desde pipelines RAG y agentes conversacionales hasta servidores MCP propios y pruebas automatizadas.",
    email: "albertorl1002@gmail.com",
    buttonText: "Contáctame",
    projectsButtonText: "Ver Proyecto",
  },
  experience: [
    {
      company: "Ciudad Maderas",
      position: "Programador Analista Sr. · Ingeniero Full-Stack, Python e IA",
      startDate: "Octubre 2026",
      endDate: "Actualidad",
      summary: [
        "Lideré la arquitectura y evolución del asistente conversacional corporativo (AgenteCM) en Python (FastAPI) bajo arquitectura hexagonal — reduciendo el archivo principal de 2,294 a 219 líneas y modularizando el motor en 25 archivos para automatizar 19 áreas de ventas y postventa con integración directa al CRM interno.",
        "Contenericé los entornos con Docker y Docker Compose y migré embeddings a Vertex AI (gemini-embedding-001) en Google Cloud Run — duplicando la precisión documental del 46% al 92% y reduciendo el peso de la imagen productiva en un 76% (2.6 GB → 637 MB).",
        "Lideré el QA técnico y validación de un agente Text-to-SQL en Databricks Genie conectado a SQL Server para reportes financieros (> $200M MXN), y optimicé consultas en MySQL y SQL Server (~88 → 36 consultas/turno), bajando la latencia mediana de ~10 s a ~5–6 s.",
        "Implementé control de acceso (Google Workspace SSO y roles), 605 pruebas automatizadas con pytest (SQLite en memoria), CI/CD en GitHub Actions (import-linter, ruff) y una batería de evaluación de 96 escenarios con 92/96 de efectividad.",
      ],
      skills: [
        "Python",
        "FastAPI",
        "Docker",
        "Google Cloud Run",
        "Vertex AI",
        "MySQL",
        "SQL Server",
        "pytest",
        "ruff",
        "GitHub Actions",
      ],
    },
    {
      company: "Ciudad Maderas",
      position: "Programador Analista Jr. · Full-Stack y Sistemas Internos",
      startDate: "Diciembre 2025",
      endDate: "Octubre 2026",
      summary: [
        "Diseñé, programé y di mantenimiento evolutivo a módulos web internos, APIs REST y operaciones CRUD integrando React, PHP (Laravel, CodeIgniter), Python, SQL Server y MySQL.",
        "Elaboré y optimicé consultas relacionales complejas con múltiples JOINs, vistas y procedimientos almacenados en SQL Server y MySQL para tableros de control y validación de reglas operativas y financieras.",
        "Diseñé e implementé un flujo automatizado de documentación técnica con servidores MCP y agentes de desarrollo (GRAL) que redujo en un 92% el tiempo de documentación de Pull Requests, capacitando al equipo en auditoría técnica de código asistido por IA.",
      ],
      skills: [
        "React",
        "Python",
        "Laravel",
        "CodeIgniter",
        "SQL Server",
        "MySQL",
        "MCP",
        "AI Agents",
      ],
    },
  ],
  projects: [
    {
      name: "Eclíptica",
      summary:
        "Plataforma web full-stack de gestión financiera construida con Next.js, React, TypeScript, Tailwind CSS y Zod sobre un modelado relacional en PostgreSQL — con seguimiento de ingresos y presupuestos en tiempo real, autenticación segura, endpoints RESTful, operaciones CRUD y visualización dinámica de datos.",
      date: "Marzo 2025 – Actualidad",
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Zod"],
      linkPreview: "https://ecliptica.appwrite.network/",
      image: ecliptica,
    },
  ],
  awards: [
    {
      title: "Concurso Nacional de Innovación Social 2026 · Edición Universitario",
      project: "Cuenta Conmigo",
      badge: "1er Lugar Nacional · INNOVA + SOCIAL 2026",
      issuer: "Fundación Aliat",
      date: "Noviembre 2026 · Ciudad de México",
      role: "Arquitecto Principal y Desarrollador Full-Stack / Python IA",
      summary:
        "Reconocimiento de 1er lugar a nivel nacional por diseñar y construir un motor de diagnóstico financiero determinista, agente conversacional en WhatsApp y plataforma de observabilidad RAG con backoffice en React 18 — eliminando alucinaciones aritméticas y protegiendo la privacidad de los usuarios.",
      highlights: [
        "Arquitectura Hexagonal (Ports & Adapters) en Python 3.11+ (mypy --strict), FastAPI, SQLAlchemy 2.0 (asyncpg), Pydantic v2 y Alembic, integrando webhooks de Meta WhatsApp Cloud API y una REST API administrativa protegida con JWT HS256.",
        "Motor financiero determinista en Decimal (ROUND_HALF_UP) para razón Deuda-Ingreso (DTI), semáforo de riesgo y amortización francesa, además de anonimización criptográfica E.164 con HMAC-SHA256.",
        "PostgreSQL 15+ (Supabase) con Row Level Security (RLS), búsqueda difusa por trigramas (pg_trgm GIN) en SIPRES-CONDUSEF, búsqueda vectorial (pgvector HNSW + Vertex AI) y tasas de Banxico SIE vía REST API.",
        "217 pruebas automatizadas con pytest, bitácora auditable (traza_interacciones_rag) y backoffice en React 18, TypeScript, Tailwind CSS y Zod contenerizado con Docker para Google Cloud Run.",
      ],
      stack: [
        "Python",
        "FastAPI",
        "SQLAlchemy 2.0",
        "PostgreSQL",
        "pgvector",
        "Supabase",
        "React",
        "TypeScript",
        "Docker",
        "pytest",
      ],
      image: innovaSocial2026,
      imageAlt:
        "Gustavo Alberto Robles Luna sosteniendo el reconocimiento de Fundación Aliat por el 1er Lugar Nacional en INNOVA + SOCIAL 2026 con el proyecto Cuenta Conmigo",
    },
  ],
  about: {
    image: fotoWeb,
    greetingPrefix: "¡Hola! Soy",
    roleHighlight: "Ingeniero Full-Stack & IA",
    age: 24,
    experienceYears: "~1+ año",
    location: "Querétaro, México",
    degree: "Ingeniería en Sistemas Computacionales",
    educationDetails: "UVEG · 2022 – 2026 · Promedio 9.0/10",
    bioIntroPrefix: "Soy un",
    bioAgePrefix: "de",
    bioAgeLocationConnector: "años, resido en",
    bioEducationPrefix: "Egresé de",
    bioFocusPrefix: "y construyo productos completos combinando",
    bioFocusHighlight: "Next.js y React, backends en Python/FastAPI, PostgreSQL e IA aplicada",
    languagesLabel: "Idiomas:",
    languages: ["Español (Nativo)", "Inglés (B2)"],
    certificationsTitle: "Certificaciones",
    certifications: SHARED_CERTIFICATIONS_ES,
    focusTitle: "Full-Stack & Áreas de IA",
    focusIntroPrefix: "Trabajo de extremo a extremo en la intersección entre la",
    focusIntroHighlight: "ingeniería full-stack moderna y la IA aplicada",
    focusIntroSuffix: ", uniendo interfaces limpias en Next.js/React con backends sólidos en Python e impacto medible en producción.",
    focusItems: [
      { highlight: "Frontend y Full-Stack", suffix: " (Next.js, React, TypeScript, Node.js, Tailwind CSS)" },
      { highlight: "Backends en Python y APIs", suffix: " (FastAPI, Django/DRF, Arquitectura Hexagonal)" },
      { highlight: "PostgreSQL y RAG", suffix: " (pgvector HNSW, pg_trgm GIN, RLS, optimización SQL)" },
      { prefix: "Servidores ", highlight: "MCP propios", suffix: ", Docker/Cloud Run y pytest CI/CD (820+ tests)" },
    ],
    closingCta: "✨ ¡Abierto a nuevos retos Full-Stack (Next.js / React / Python) e IA Aplicada!",
  },
};
