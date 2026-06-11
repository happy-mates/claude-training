// Happy Mates — Resource Hub data model
// Bilingual strings use { en, da }. Technical link labels stay English.

import type { Course, Resource } from "./types";

const GH = "https://github.com/happy-mates";

// ── Main resource cards (3 repos + Teams) ───────────────────────────────────
export const RESOURCES: Resource[] = [
  {
    id: "training",
    cat: "build",
    icon: "rocket",
    accent: { from: "#3b82f6", to: "#14b8a6", tint: "rgb(59 130 246 / .1)", fg: "#2563eb" },
    tag: { en: "Hands-on", da: "Praktisk" },
    title: { en: "Claude API Training", da: "Claude API-træning" },
    repo: "claude-partner-network-training",
    one: {
      en: "Hands-on notebooks for building your first things with the Claude API.",
      da: "Praktiske notebooks til at bygge dine første ting med Claude API'et.",
    },
    contents: {
      en: [
        { icon: "terminal", label: "Python · venv + anthropic + python-dotenv" },
        { icon: "key-round", label: "Bring your own ANTHROPIC_API_KEY" },
        { icon: "notebook", label: "Jupyter notebooks, starting with the basics" },
      ],
      da: [
        { icon: "terminal", label: "Python · venv + anthropic + python-dotenv" },
        { icon: "key-round", label: "Brug din egen ANTHROPIC_API_KEY" },
        { icon: "notebook", label: "Jupyter-notebooks, starter helt fra bunden" },
      ],
    },
    clone: `git clone ${GH}/claude-partner-network-training.git`,
    video: {
      src: "https://www.youtube-nocookie.com/embed/VLkRZgWHrpo?start=17",
      title: { en: "Claude API Training walkthrough", da: "Claude API-træning gennemgang" },
    },
    links: [
      { label: { en: "Open repo", da: "Åbn repo" }, href: `${GH}/claude-partner-network-training`, primary: true, icon: "github" },
      { label: { en: "001 · Basic request", da: "001 · Basis-kald" }, href: `${GH}/claude-partner-network-training/blob/main/001_request.ipynb`, icon: "notebook-pen" },
    ],
  },
  {
    id: "architect",
    cat: "certify",
    icon: "graduation-cap",
    accent: { from: "#f97316", to: "#f59e0b", tint: "rgb(249 115 22 / .12)", fg: "#ea580c" },
    tag: { en: "Study guide", da: "Studieguide" },
    title: { en: "Claude Certified Architect — Foundations", da: "Claude Certified Architect — Foundations" },
    repo: "claude-certified-architect",
    one: {
      en: "The full study guide in nine languages — Markdown, PDF, and interactive practice tests.",
      da: "Den komplette studieguide på ni sprog — Markdown, PDF og interaktive øvetests.",
    },
    contents: {
      en: [
        { icon: "languages", label: "9 language guides — Markdown + PDF" },
        { icon: "file-check", label: "Interactive practice tests (EN · JA · KO · RU · ZH)" },
        { icon: "award", label: "Curated list of 13 free Anthropic Academy courses" },
      ],
      da: [
        { icon: "languages", label: "9 sprogguider — Markdown + PDF" },
        { icon: "file-check", label: "Interaktive øvetests (EN · JA · KO · RU · ZH)" },
        { icon: "award", label: "Kurateret liste med 13 gratis Anthropic Academy-kurser" },
      ],
    },
    note: {
      en: "Access via the Anthropic Partner Network (verified partner email) — free for the first 5,000 partner employees, then $99.",
      da: "Adgang via Anthropic Partner Network (verificeret partner-mail) — gratis for de første 5.000 partneransatte, derefter $99.",
    },
    langs: [
      { code: "EN", file: "guide_en" }, { code: "ES", file: "guide_es" }, { code: "RU", file: "guide_ru" },
      { code: "ZH", file: "guide_zh" }, { code: "JA", file: "guide_ja" }, { code: "KO", file: "guide_ko" },
      { code: "AR", file: "guide_ar" }, { code: "HE", file: "guide_he" }, { code: "UR", file: "guide_ur" },
    ],
    langBase: `${GH}/claude-certified-architect/blob/main/pdf/`,
    links: [
      { label: { en: "Open repo", da: "Åbn repo" }, href: `${GH}/claude-certified-architect`, primary: true, icon: "github" },
      { label: { en: "Request access", da: "Anmod om adgang" }, href: "https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request", icon: "ticket" },
      { label: { en: "Partner Network", da: "Partner Network" }, href: "https://claude.com/partners", icon: "users" },
    ],
  },
  {
    id: "architect2",
    cat: "certify",
    icon: "compass",
    accent: { from: "#6366f1", to: "#a855f7", tint: "rgb(99 102 241 / .12)", fg: "#6366f1" },
    tag: { en: "Exam prep", da: "Eksamensforb." },
    title: { en: "Architect — Domain Study Guide", da: "Architect — domæne\u00adstudieguide" },
    repo: "claude-certified-architect2",
    one: {
      en: "Domain-by-domain prep with code examples, anti-patterns, and practice questions.",
      da: "Domæne-for-domæne med kodeeksempler, anti-mønstre og øvespørgsmål.",
    },
    contents: {
      en: [
        { icon: "list-checks", label: "5 exam domains, fully weighted" },
        { icon: "file-text", label: "Built-and-deployed website + auto-generated PDF" },
        { icon: "calendar-days", label: "Scenarios, decision frameworks & a 4-week plan" },
      ],
      da: [
        { icon: "list-checks", label: "5 eksamensdomæner med vægtning" },
        { icon: "file-text", label: "Bygget website + auto-genereret PDF" },
        { icon: "calendar-days", label: "Scenarier, beslutningsmodeller & 4-ugers plan" },
      ],
    },
    exam: [
      { k: { en: "Questions", da: "Spørgsmål" }, v: "60" },
      { k: { en: "To pass", da: "Beståelse" }, v: "720/1000" },
      { k: { en: "Scenarios", da: "Scenarier" }, v: "4 of 6" },
    ],
    domains: [
      { n: "1", w: 27, t: { en: "Agentic architecture & orchestration", da: "Agentarkitektur & orkestrering" }, f: "d1-agentic-architecture" },
      { n: "2", w: 18, t: { en: "Tool design & MCP integration", da: "Tool-design & MCP-integration" }, f: "d2-tool-design-mcp" },
      { n: "3", w: 20, t: { en: "Claude Code configuration & workflows", da: "Claude Code-opsætning & workflows" }, f: "d3-claude-code-config" },
      { n: "4", w: 20, t: { en: "Prompt engineering & structured output", da: "Prompt engineering & struktureret output" }, f: "d4-prompt-engineering" },
      { n: "5", w: 15, t: { en: "Context management & reliability", da: "Kontekststyring & pålidelighed" }, f: "d5-context-reliability" },
    ],
    domainBase: `${GH}/claude-certified-architect2/blob/main/domains/`,
    links: [
      { label: { en: "Read online", da: "Læs online" }, href: "https://dnacenta.github.io/claude-certified-architect/", primary: true, icon: "globe" },
      { label: { en: "English PDF", da: "Engelsk PDF" }, href: "https://dnacenta.github.io/claude-certified-architect/guide_en.pdf", icon: "file-down" },
      { label: { en: "Open repo", da: "Åbn repo" }, href: `${GH}/claude-certified-architect2`, icon: "github" },
    ],
  },
  {
    id: "teams",
    cat: "community",
    icon: "messages-square",
    accent: { from: "#14b8a6", to: "#10b981", tint: "rgb(20 184 166 / .12)", fg: "#0d9488" },
    tag: { en: "Community", da: "Fællesskab" },
    title: { en: "Happy Mates on Microsoft Teams", da: "Happy Mates på Microsoft Teams" },
    repo: null,
    one: {
      en: "The community workspace — ask questions, find a study buddy, share what you build.",
      da: "Fællesskabets arbejdsrum — stil spørgsmål, find en studiemakker, del det du bygger.",
    },
    contents: {
      en: [
        { icon: "message-circle", label: "Conversations, channels & quick help" },
        { icon: "handshake", label: "Mates, Happy Hearts & partners in one place" },
        { icon: "sparkles", label: "Where every recipe starts with a question" },
      ],
      da: [
        { icon: "message-circle", label: "Samtaler, kanaler & hurtig hjælp" },
        { icon: "handshake", label: "Mates, Happy Hearts & partnere samme sted" },
        { icon: "sparkles", label: "Hvor hver opskrift starter med et spørgsmål" },
      ],
    },
    links: [
      { label: { en: "Open in Teams", da: "Åbn i Teams" }, href: "https://teams.microsoft.com/l/team/19%3Aajr7lXNdxaZV78stlZXUIFlsfIMy4_gOMPKmHP3yOg41%40thread.tacv2/conversations?groupId=2a57d0be-244d-4726-ae3a-50b6e4f4c33e&tenantId=8bfad545-8650-4872-a917-20c9720b906b", primary: true, icon: "external-link" },
    ],
  },
];

// ── Free Anthropic Academy courses (from the Architect repo's curated list) ──
export const COURSES: Course[] = [
  { t: "Claude 101", d: { en: "Claude for everyday work", da: "Claude i hverdagen" }, href: "https://anthropic.skilljar.com/claude-101" },
  { t: "AI Fluency: Framework & Foundations", d: { en: "The foundational thinking course", da: "Det grundlæggende tankesæt" }, href: "https://anthropic.skilljar.com/ai-fluency-framework-foundations" },
  { t: "Introduction to Agent Skills", d: { en: "Build & share Skills in Claude Code", da: "Byg & del Skills i Claude Code" }, href: "https://anthropic.skilljar.com/introduction-to-agent-skills" },
  { t: "Building with the Claude API", d: { en: "Tool use, streaming, SDKs", da: "Tool use, streaming, SDK'er" }, href: "https://anthropic.skilljar.com/claude-with-the-anthropic-api" },
  { t: "Claude Code in Action", d: { en: "Claude Code in your dev workflow", da: "Claude Code i din udviklerflow" }, href: "https://anthropic.skilljar.com/claude-code-in-action" },
  { t: "Intro to Model Context Protocol", d: { en: "Build MCP servers from scratch", da: "Byg MCP-servere fra bunden" }, href: "https://anthropic.skilljar.com/introduction-to-model-context-protocol" },
  { t: "MCP: Advanced Topics", d: { en: "Sampling, transport, production MCP", da: "Sampling, transport, produktion" }, href: "https://anthropic.skilljar.com/model-context-protocol-advanced-topics" },
  { t: "AI Fluency for Students", d: { en: "Learning & career planning", da: "Læring & karriereplanlægning" }, href: "https://anthropic.skilljar.com/ai-fluency-for-students" },
  { t: "AI Fluency for Educators", d: { en: "Applying AI Fluency in teaching", da: "AI Fluency i undervisning" }, href: "https://anthropic.skilljar.com/ai-fluency-for-educators" },
  { t: "Teaching AI Fluency", d: { en: "Teach & assess AI Fluency", da: "Undervis & vurdér AI Fluency" }, href: "https://anthropic.skilljar.com/teaching-ai-fluency" },
  { t: "AI Fluency for Nonprofits", d: { en: "Impact while staying mission-true", da: "Effekt med mission i behold" }, href: "https://anthropic.skilljar.com/ai-fluency-for-nonprofits" },
  { t: "Claude with Amazon Bedrock", d: { en: "Full AWS accreditation course", da: "Fuldt AWS-akkrediteringskursus" }, href: "https://anthropic.skilljar.com/claude-in-amazon-bedrock" },
  { t: "Claude with Google Vertex AI", d: { en: "Claude through Google Cloud", da: "Claude via Google Cloud" }, href: "https://anthropic.skilljar.com/claude-with-google-vertex" },
];
