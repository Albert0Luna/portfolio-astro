import type { SiteConfig, SiteContent } from "../types/index";

export const SITE_CONFIG: SiteConfig = {
  title: "Gustavo Luna — Full-Stack & AI Engineer",
  author: "Gustavo Luna",
  description:
    "Portfolio of Gustavo Luna, a Full-Stack & AI Engineer specialized in Next.js, React and Node.js, building modern, scalable applications with applied AI.",
  lang: "en",
  siteLogo: "/profile-photo.webp",
  navLinks: [
    { text: "Experience", textEs: "Experiencia", href: "#experience" },
    { text: "Projects", textEs: "Proyectos", href: "#projects" },
    { text: "About", textEs: "Sobre mí", href: "#about" },
  ],
  socialLinks: [
    { text: "LinkedIn", href: "https://www.linkedin.com/in/gustavo-alberto-r-a202b2231/" },
    { text: "Github", href: "https://github.com/Albert0Luna" },
  ],
  socialImage: "/",
  canonicalURL: "/",
};

export const SITE_CONTENT_EN: SiteContent = {
  hero: {
    name: "Gustavo Luna",
    specialty: "Full-Stack & AI Engineer",
    summary:
      "Full-Stack developer specialized in Next.js, React and Node.js, with a growing focus on applied AI. I build modern, scalable and secure web applications, with clean, accessible interfaces, solid code quality and great performance. On the AI side, I work with RAG and embeddings, custom MCP servers, LLM agents, and model training and fine-tuning.",
    email: "albertorl1002@gmail.com",
    buttonText: "Get In Touch",
    projectsButtonText: "View Projects",
  },
  experience: [
    {
      company: "Ciudad Maderas",
      position: "Jr. Analyst Programmer",
      startDate: "December 2025",
      endDate: "Present",
      summary: [
        "Develop and maintain modules across several of the company's internal systems with React, Laravel and CodeIgniter on SQL Server and MySQL databases — shipping complete views and features, fixing bugs, and coordinating directly with the teams that request each change.",
        "Designed and built from scratch an in-house code-documentation system based on a custom MCP (Model Context Protocol) server and purpose-built agents that run on OpenCode as their LLM runtime. With simple commands like \"document this commit\" or \"document this branch\", the agent generates the documentation and automatically records it — together with the related code changes — in the company's internal task-tracking and assignment system.",
        "Proposed and justified adopting OpenCode over GitHub Copilot for this workflow, lowering operational costs while delivering better results; the solution is approved and ~90% ready for rollout.",
        "Work closely with stakeholders to scope, prioritize and validate changes before delivery, keeping the feedback loop tight and the work aligned with what each team actually needs.",
      ],
      skills: ["React", "Laravel", "CodeIgniter", "SQL Server", "MySQL", "MCP", "AI Agents"],
    },
    {
      company: "Ecliptica",
      position: "Creator & Full-Stack Developer · Freelance",
      startDate: "March 2025",
      endDate: "Present",
      link: "https://ecliptica.appwrite.network/",
      summary: [
        "Designed and built a personal finance platform from scratch with real-time income tracking, goal setting, and dynamic data-visualization charts.",
        "Implemented a responsive, accessible UI with React, Next.js and Tailwind CSS, type-safe logic with TypeScript, and schema validation with Zod over a MongoDB backend.",
      ],
      skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MongoDB", "Zod"],
    },
  ],
  projects: [
    {
      name: "Luna News",
      summary:
        "Multilingual programming news platform with dynamic content delivery, dark mode support, and optimized SEO performance.",
      date: "August 2024 - September 2025",
      stack: ["React", "Next.js", "Tailwind CSS", "MongoDB", "next-intl"],
      linkPreview: "https://luna-news.appwrite.network/en",
      image: "/luna-news.webp",
    },
    {
      name: "UniMart",
      summary:
        "Modern e-commerce platform featuring advanced search, dynamic filtering, and a seamless shopping cart experience with responsive design.",
      date: "December 2024 - January 2025",
      stack: ["React", "TypeScript", "Redux Toolkit", "Tailwind CSS"],
      linkPreview: "https://unimart.appwrite.network/",
      linkSource: "https://github.com/Albert0Luna/UniMart",
      image: "/unimart.webp",
    },
  ],
  about: {
    image: "/foto-web.webp",
  },
};

export const SITE_CONTENT_ES: SiteContent = {
  hero: {
    name: "Gustavo Luna",
    specialty: "Ingeniero Full-Stack & IA",
    summary:
      "Desarrollador Full-Stack especializado en Next.js, React y Node.js, con un enfoque creciente en la IA aplicada. Construyo aplicaciones web modernas, escalables y seguras, cuidando interfaces limpias y accesibles, la calidad del código y el rendimiento. En el lado de la IA, trabajo con RAG y embeddings, servidores MCP propios, agentes con LLMs, entrenamiento y ajuste de modelos.",
    email: "albertorl1002@gmail.com",
    buttonText: "Contáctame",
    projectsButtonText: "Ver Proyectos",
  },
  experience: [
    {
      company: "Ciudad Maderas",
      position: "Programador Analista Jr.",
      startDate: "Diciembre 2025",
      endDate: "Actualidad",
      summary: [
        "Desarrollo y mantengo módulos de varios sistemas internos de la empresa con React, Laravel y CodeIgniter sobre bases de datos SQL Server y MySQL: implemento vistas y funcionalidades completas, corrijo bugs y coordino directamente con las áreas que solicitan cada cambio.",
        "Diseñé y construí desde cero un sistema propio de documentación de código basado en un servidor MCP (Model Context Protocol) y agentes a medida que se ejecutan sobre OpenCode como plataforma/runtime de LLM. Con comandos sencillos como «documenta este commit» o «documenta esta rama», el agente genera la documentación y la registra automáticamente —junto con los cambios de código relacionados— en el sistema interno de seguimiento y asignación de tareas.",
        "Propuse y justifiqué adoptar OpenCode frente a GitHub Copilot para este flujo, reduciendo costos operativos y obteniendo mejores resultados; la solución está aprobada y lista al ~90% para su implementación.",
        "Trabajo de cerca con las áreas solicitantes para definir, priorizar y validar los cambios antes de entregarlos, manteniendo un ciclo de retroalimentación ágil y el trabajo alineado con lo que cada equipo realmente necesita.",
      ],
      skills: ["React", "Laravel", "CodeIgniter", "SQL Server", "MySQL", "MCP", "AI Agents"],
    },
    {
      company: "Ecliptica",
      position: "Creador y Desarrollador Full-Stack · Independiente",
      startDate: "Marzo 2025",
      endDate: "Actualidad",
      summary: [
        "Diseñé y construí desde cero una plataforma de finanzas personales con seguimiento de ingresos en tiempo real, definición de metas y gráficos dinámicos de visualización de datos.",
        "Implementé una interfaz responsiva y accesible con React, Next.js y Tailwind CSS, lógica con tipado seguro mediante TypeScript y validación de esquemas con Zod sobre un backend en MongoDB.",
      ],
      skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MongoDB", "Zod"],
    },
  ],
  projects: [
    {
      name: "Luna News",
      summary:
        "Plataforma multilingüe de noticias de programación con entrega dinámica de contenido, soporte de modo oscuro y rendimiento SEO optimizado.",
      date: "Agosto 2024 - Septiembre 2025",
      stack: ["React", "Next.js", "Tailwind CSS", "MongoDB", "next-intl"],
      linkPreview: "https://luna-news.appwrite.network/es",
      image: "/luna-news.webp",
    },
    {
      name: "UniMart",
      summary:
        "Plataforma de e-commerce moderna con búsqueda avanzada, filtrado dinámico y una experiencia de carrito de compras fluida con diseño responsivo.",
      date: "Diciembre 2024 - Enero 2025",
      stack: ["React", "TypeScript", "Redux Toolkit", "Tailwind CSS"],
      linkPreview: "https://unimart.appwrite.network/",
      linkSource: "https://github.com/Albert0Luna/UniMart",
      image: "/unimart.webp",
    },
  ],
  about: {
    image: "/foto-web.webp",
  },
};
