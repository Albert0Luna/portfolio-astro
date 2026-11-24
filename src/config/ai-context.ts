/**
 * Extra grounding for the "Luna AI" chat assistant (/api/chat).
 *
 * Kept out of SITE_CONTENT_EN on purpose — nothing here is rendered directly
 * on the page, and it gives Luna AI deeper technical context without drifting
 * from the portfolio.
 */
export const AI_DEEP_CONTEXT = `
## Core Technical Stack (Full-Stack + Backend Python + Applied AI)
- Frontend & Full-Stack: Next.js, React (18+), TypeScript, JavaScript, Tailwind CSS, Zod, Node.js, Astro.
- Backend languages & frameworks: Python (3.11+), FastAPI, Django, Django REST Framework (DRF), Node.js, PHP (Laravel, CodeIgniter).
- APIs & Architecture: RESTful APIs, CRUD operations, modular/hexagonal architecture (Ports & Adapters), Pydantic v2 schema validation, webhooks, WhatsApp Cloud API, JWT HS256, Google Workspace SSO & RBAC.
- Databases & ORMs: PostgreSQL 15+ (Supabase, pgvector HNSW, pg_trgm GIN, Row Level Security), MySQL, SQL Server, MongoDB, Django ORM, SQLAlchemy 2.0 (AsyncSession + asyncpg), Alembic, Databricks (Genie / Text-to-SQL), complex SQL (JOINs, indexes, views, stored procedures).
- Quality, Testing & VCS: 820+ automated tests with pytest (pytest-asyncio, pytest-cov), ruff, mypy --strict, import-linter, Git, Pull Request reviews, GitHub Actions CI/CD.
- Containers & Cloud: Docker, Docker Compose, Google Cloud Platform (Cloud Run, Cloud Storage, Vertex AI), AWS (Certified Cloud Practitioner).
- Applied AI: production conversational agents, RAG pipelines, custom MCP (Model Context Protocol) servers, OpenCode/Claude Code agent workflows, deterministic + LLM hybrid guardrails, technical auditing of AI-assisted code.

## Deep dive: Sr. Analyst Programmer at Ciudad Maderas (Oct 2026 — present)

### 1. AgenteCM — Hexagonal Backend Architecture, Cloud Run & Performance
- Led the architecture and evolution of the corporate AI conversational agent in Python (FastAPI) into a modular monolith with Hexagonal Architecture: reduced the main entrypoint from 2,294 lines down to 219 lines and split the chat engine into 25 focused files across domain, application, and adapter layers, automating 19 sales and after-sales business areas with direct CRM integration.
- Containerized dev and production environments with Docker & Docker Compose and migrated embeddings to Vertex AI (gemini-embedding-001) on Google Cloud Run — doubling document search accuracy from 46% to 92% and shrinking production Docker image size by 76% (2.6 GB → 637 MB).
- Led technical QA & validation of a Text-to-SQL AI agent in Databricks Genie connected to SQL Server to verify financial reports (> $200M MXN), and optimized MySQL & SQL Server queries (~88 → 36 queries/turn), lowering median latency from ~10 s to ~5–6 s per message.
- Implemented Google Workspace SSO & role-based access control, a 605-test pytest suite (in-memory SQLite), GitHub Actions CI/CD (import-linter, ruff), and a 96-scenario evaluation battery achieving 92/96 passing.

## Deep dive: Jr. Analyst Programmer at Ciudad Maderas (Dec 2025 — Oct 2026)

### 2. Full-Stack Internal Modules, SQL & GRAL (MCP Documentation Workflow)
- Built and maintained internal web modules, REST APIs, and CRUD workflows across React, PHP (Laravel, CodeIgniter), Python, SQL Server, and MySQL.
- Designed and built GRAL, an automated Pull Request & technical documentation workflow powered by custom Node.js MCP servers and agents (OpenCode / Claude Code) that reduced PR documentation time by 92% (from up to ~1 hour to under 5 minutes), and trained teammates on AI-assisted code validation.
- Also led the full UX/UI redesign of the internal tracking dashboard (React + Laravel).

## Deep dive: Featured Project & National Award

### 3. Eclíptica — Full-Stack Personal Finance Web Platform (Featured Project)
- Built end-to-end with Next.js, React, TypeScript, Tailwind CSS, and Zod on the frontend and a PostgreSQL relational backend with RESTful endpoints, secure authentication, strict data validation, and CRUD workflows for transactions, budgets, and real-time analytics.
- Demo: https://ecliptica.appwrite.network/

### 4. Cuenta Conmigo — 🏆 1st Place National INNOVA + SOCIAL 2026 (Award / Recognition)
- Awarded 1st Place nationwide by Fundación Aliat (Mexico City, November 3, 2026) in the University Edition of the National Social Innovation Contest (INNOVA + SOCIAL 2026).
- Role: Lead Architect & Full-Stack / Python AI Developer.
- Hexagonal Architecture (Ports & Adapters) in Python 3.11+ (mypy --strict), FastAPI, SQLAlchemy 2.0 (AsyncSession + asyncpg), Pydantic v2, and Alembic migrations, with Meta WhatsApp Cloud API webhooks (/webhook/whatsapp) and JWT HS256 admin API (/api/v1/admin/*).
- Pure Python Decimal (ROUND_HALF_UP) deterministic financial engine (zero arithmetic hallucinations) computing Debt-to-Income (DTI), risk traffic-light scoring, and French amortization, plus E.164 phone anonymization via HMAC-SHA256 (phone_hash).
- PostgreSQL 15+ (Supabase) with Row Level Security (RLS), fuzzy trigram search (pg_trgm GIN) over CONDUSEF SIPRES, vector search (pgvector 768 dims HNSW + Vertex AI gemini-embedding-001), and Banxico SIE reference rates (httpx).
- 217 automated pytest tests, auditable RAG trace log (traza_interacciones_rag), and a React 18 + TypeScript + Tailwind CSS + Zod admin backoffice containerized with Docker Compose for Google Cloud Run.

## How to talk about this
- Present Gustavo as a versatile Full-Stack & AI Engineer strong in BOTH frontend/full-stack (Next.js, React, TypeScript, Node.js) AND backend/AI (Python, FastAPI, Django, PostgreSQL, Docker, Cloud Run, RAG, MCP).
- Note that Gustavo speaks Spanish (native) and English (B2); do NOT mention French.
- If asked about featured projects, highlight Eclíptica (full-stack web platform) and mention Cuenta Conmigo as his award-winning 1st Place National INNOVA + SOCIAL 2026 system.
- Never invent numbers, employers, dates, or credentials beyond what is listed above.
`.trim();
