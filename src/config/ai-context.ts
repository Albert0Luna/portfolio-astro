/**
 * Extra grounding for the "Luna AI" chat assistant (/api/chat).
 *
 * This is deliberately richer than what the site renders: the portfolio shows
 * headlines, this gives the assistant the depth to answer follow-up questions
 * ("what did he actually build?", "what was his role?") without guessing.
 *
 * Kept out of SITE_CONTENT_EN on purpose — nothing here is rendered on the
 * page, and this file is public (it ships in the server bundle), so it must
 * stay free of anything confidential to Gustavo's employers or their vendors.
 */
export const AI_DEEP_CONTEXT = `
## Deep dive: work at Ciudad Maderas (Jr. Analyst Programmer, Dec 2025 — present)

### 1. GRAL — automated documentation platform (own initiative, in production)
Gustavo designed and built GRAL ("Generador y Registro Automático de Logs"), an
internal platform that fully automates technical documentation for the software
development area. He took it end to end on his own: architecture, backend,
frontend, database, CLI tooling and the AI-agent integration.

- It was NOT an assigned ticket. He identified the problem himself and proposed
  the solution: documenting changes was manual work competing with development,
  so in practice it never got done. That left three recurring costs — nobody
  remembered why past decisions were made, knowledge stayed trapped with
  whoever wrote the code, and every new team member started blind.
- How it works: the developer finishes a change and asks for it in a single
  command ("document this commit" / "document this branch"). The system
  generates the document, creates the card in the internal tracker (Dashboard
  Maderas) with the code attached, assigns the responsible people, and files it
  in a searchable repository.
- Impact: documenting a change properly used to take up to an hour. With GRAL
  it takes under 5 minutes, including changelog, code and other parameters,
  generated automatically.
- Stack: OpenCode as the LLM runtime, Node.js for the custom MCP server, and
  agents defined in markdown.
- Tooling: Claude Code and OpenCode.
- He proposed and justified adopting OpenCode over GitHub Copilot for this
  workflow: cheaper to operate, easier to build MCP servers against, and better
  results for the use case.

### 2. Full redesign of Dashboard Maderas
Dashboard Maderas is the internal tracking platform used by the development
team. Gustavo redesigned it completely — views, logos, typography and color
palette — not a reskin.

- Why: while building GRAL (which integrates directly into this dashboard) he
  realised the existing design was outdated and needed to be reworked, both for
  UX/UI quality and to properly accommodate the new agent-driven functionality.
- Stack: React, Laravel.
- Tooling: Claude Code, OpenCode, and Figma via MCP integration.

### 3. QA / UAT of an AI data agent (Databricks)
Gustavo ran the validation and quality-control process for an AI agent built by
an external consultancy on Databricks, which lets business users query a client
portfolio in natural language.

- This went well beyond "asking the chatbot some questions". He first learned
  the full architecture — how the data originates, how it is transformed in SQL
  Server views, and how it lands in the Databricks tables the agent queries.
- With that understanding he designed a structured acceptance-test battery:
  deliberately built cases targeting the classic weak points of an AI agent over
  business data — misleading column names, date ambiguity, client homonyms,
  text values that look like nulls, and business traps such as commercial names
  that map to several internal keys.
- Every result was documented with its verification SQL against the source, so
  each finding was backed by reproducible evidence rather than opinion. This
  surfaced real, high-impact defects: non-deterministic results (the same
  question returning different figures across runs), confusion between two
  distinct address concepts, and improper mixing of business lines that must be
  reported separately.
- Once he had the technical schema, he traced root causes a level deeper and
  showed that many errors came from the data model itself — columns whose names
  did not match their contents, missing business definitions, and a timing gap
  between the data-refresh process and the snapshot the agent read from.
- He also traced an incorrect vendor diagnosis through undocumented legacy
  stored procedures in SQL Server, pinpointed the exact step where the value was
  computed, and demonstrated with concrete queries and figures where the
  analysis was wrong. That produced formal documentation (an inventory of the
  procedures, tables and functions involved) now used as shared technical
  reference.
- Notably, he corrected several of his own hypotheses mid-process when the
  evidence did not support them, rather than forcing a conclusion.
- Impact: prevented an AI agent reporting incorrect and inconsistent portfolio
  figures from reaching production, where it would have driven real financial
  decisions (collections prioritisation, risk assessment, figures presented to
  management). The deliverables — a reusable test battery, prioritised findings,
  and a clear remediation guide — are work that would normally fall to a
  dedicated AI-systems QA specialist or a data engineer.

## How to talk about this
- These are real, verifiable pieces of work. Describe them concretely; never
  inflate them, and never invent numbers, dates or clients beyond what is here.
- If asked to compare his projects, note that the portfolio's featured projects
  (Luna News, UniMart, Ecliptica) are personal/freelance products, while the
  work above is internal company work — different in kind, not simply "bigger"
  or "smaller".
`.trim();
