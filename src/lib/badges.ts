// Tailwind classes per technology, used by <TechBadge /> in both the
// Projects and Experience sections. Strings are full literals so Tailwind's
// content scanner picks them up at build time.
const BADGE_STYLES: Record<string, string> = {
  React: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "Next.js": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  TypeScript: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300",
  JavaScript:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  "Tailwind CSS": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  MongoDB: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Zod: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  "Node.js": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "Redux Toolkit":
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  Vite: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  "next-intl":
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  Laravel: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  CodeIgniter:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  "SQL Server": "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
  MySQL: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
  PostgreSQL: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300",
  Python: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  SEO: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
  MCP: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300",
  "AI Agents":
    "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-300",
};

const DEFAULT_BADGE =
  "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";

export const getBadgeStyle = (tech: string): string =>
  BADGE_STYLES[tech] ?? DEFAULT_BADGE;
