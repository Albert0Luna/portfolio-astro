// Accent-dot color per technology, used by <TechBadge /> in both the
// Projects and Experience sections. The chip itself is a unified glass pill;
// only the dot changes color. Strings are full literals so Tailwind's
// content scanner picks them up at build time.
const DOT_COLORS: Record<string, string> = {
  React: "bg-sky-400",
  "Next.js": "bg-slate-400",
  TypeScript: "bg-blue-400",
  JavaScript: "bg-yellow-400",
  "Tailwind CSS": "bg-cyan-400",
  MongoDB: "bg-green-400",
  Zod: "bg-amber-400",
  "Node.js": "bg-green-500",
  "Redux Toolkit": "bg-purple-400",
  Vite: "bg-orange-400",
  "next-intl": "bg-indigo-400",
  Laravel: "bg-red-400",
  CodeIgniter: "bg-orange-500",
  "SQL Server": "bg-rose-400",
  MySQL: "bg-cyan-500",
  PostgreSQL: "bg-sky-500",
  Python: "bg-blue-500",
  SEO: "bg-teal-400",
  MCP: "bg-violet-400",
  "AI Agents": "bg-fuchsia-400",
};

const DEFAULT_DOT = "bg-slate-400";

export const getBadgeDot = (tech: string): string =>
  DOT_COLORS[tech] ?? DEFAULT_DOT;
