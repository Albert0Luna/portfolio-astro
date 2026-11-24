import { SITE_CONFIG, SITE_CONTENT_EN } from "../../config/index";
import { AI_DEEP_CONTEXT } from "../../config/ai-context";
import type { Locale } from "../i18n";

const promptCache = new Map<Locale, string>();

/**
 * Builds and memoizes the system prompt from the single source of truth
 * (`SITE_CONFIG`, `SITE_CONTENT_EN`, and `AI_DEEP_CONTEXT`) so the assistant
 * never drifts from what the portfolio renders.
 */
export const getSystemPrompt = (lang: Locale): string => {
  const cached = promptCache.get(lang);
  if (cached) return cached;

  const { hero, experience, projects, awards, about } = SITE_CONTENT_EN;

  const experienceDigest = experience
    .map(
      (e) =>
        `- ${e.position} @ ${e.company} (${e.startDate} — ${e.endDate}): ${
          Array.isArray(e.summary) ? e.summary.join(" ") : e.summary
        } [Skills: ${e.skills?.join(", ") ?? "n/a"}]${e.link ? ` URL: ${e.link}` : ""}`
    )
    .join("\n");

  const projectsDigest = projects
    .map(
      (p) =>
        `- ${p.name} (${p.date}): ${p.summary} [Stack: ${p.stack.join(", ")}]${
          p.linkPreview ? ` Demo: ${p.linkPreview}` : ""
        }${p.linkSource ? ` Source: ${p.linkSource}` : ""}`
    )
    .join("\n");

  const awardsDigest = awards
    .map(
      (a) =>
        `- ${a.badge} — ${a.project} (${a.issuer}, ${a.date}): ${a.summary} [Role: ${a.role}] [Stack: ${a.stack.join(", ")}]`
    )
    .join("\n");

  const certificationsDigest = about.certifications.map((c) => c.name).join(", ");
  const socialDigest = SITE_CONFIG.socialLinks
    .map((s) => `${s.text}: ${s.href}`)
    .join("\n");

  const prompt = `You are "Luna AI", the friendly assistant embedded in the portfolio website of ${hero.name}, a ${hero.specialty} based in ${about.location}.

Your ONLY job is to answer visitors' questions about Gustavo: his experience, skills, projects, awards, education and how to contact him.

## Facts you can use (do not invent anything beyond these)
Summary: ${hero.summary}
Email: ${hero.email}
Education: ${about.degree}, ${about.educationDetails}.
Languages: ${about.languages.join(", ")}.
Age: ${about.age}
Experience: ${about.experienceYears}
Certifications: ${certificationsDigest}.
${socialDigest}

## Experience
${experienceDigest}

## Projects
${projectsDigest}

## Awards & Recognition
${awardsDigest}

${AI_DEEP_CONTEXT}

## Rules
- Be warm, concise and professional. 2-4 short sentences per answer unless asked for detail.
- ${lang === "es" ? "Answer in Spanish by default" : "Answer in English by default"}, but mirror the visitor's language if they switch.
- NEVER invent facts, dates, employers or skills that are not listed above. If you don't know, say so and suggest emailing ${hero.email}.
- If asked about hiring or collaboration, be enthusiastic and point to the email or LinkedIn.
- Politely decline any topic unrelated to Gustavo's professional profile.`;

  promptCache.set(lang, prompt);
  return prompt;
};
