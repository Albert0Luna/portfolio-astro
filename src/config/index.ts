import type { SiteConfig, SiteContent } from "../types/index";

export const SITE_CONFIG: SiteConfig = {
  title: "Alberto Luna — Full Stack Developer",
  author: "Gustavo Alberto Robles Luna",
  description:
    "Portfolio of Alberto Luna, a Full Stack Developer with expertise in modern, scalable applications.",
  lang: "en",
  siteLogo: "/profile-photo.webp",
  navLinks: [
    { text: "Projects", textEs: "Proyectos", href: "#projects" },
    { text: "Experience", textEs: "Experiencia", href: "#experience" },
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
    name: "Gustavo Alberto Robles Luna",
    specialty: "Full Stack Developer",
    summary:
      "Passionate full-stack developer specializing in modern web technologies like React, Next.js, and MongoDB. I build scalable, secure, and user-centric applications with a focus on performance, clean code, and exceptional user experiences.",
    email: "albertorl1002@gmail.com",
    buttonText: "Get In Touch",
    projectsButtonText: "View Projects",
  },
  projects: [
    {
      name: "Ecliptica",
      summary: "Comprehensive personal finance management platform with real-time income tracking, expense categorization, and data visualization.",
      date: "March 2025 - Present",
      stack: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "MongoDB",
        "Zod",
      ],
      linkPreview: "https://ecliptica-six.vercel.app/",
      image: "/ecliptica.webp",
    },
    {
      name: "Luna News",
      summary: "Multilingual programming news platform with dynamic content delivery, dark mode support, and optimized SEO performance.",
      date: "August 2024 - June 2025",
      stack: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "MongoDB",
        "next-intl"
      ],
      linkPreview: "https://luna-news.vercel.app/en",
      image: "/luna-news.webp",
    },
    {
      name: "UniMart",
      summary: "Modern e-commerce platform featuring advanced search, dynamic filtering, and seamless shopping cart experience with responsive design.",
      date: "December 2024 - January 2025",
      stack: [
        "React",
        "TypeScript",
        "Redux Toolkit",
        "Tailwind CSS"
      ],
      linkPreview: "https://uni-mart-six.vercel.app/",
      linkSource: "https://github.com/Albert0Luna/UniMart",
      image: "/unimart.webp",
    },
  ],
  experience: [
    {
      company: "Ecliptica",
      position: "Full Stack Developer",
      startDate: "March 2025",
      endDate: "Present",
      summary: [
        "Architected and developed a full-stack financial management platform using Next.js, prioritizing performance, SEO optimization, scalability, and enterprise-level security.",
        "Engineered a responsive, accessible frontend with Tailwind CSS and shadcn/ui components, implementing comprehensive dark mode support. Built robust client-side logic with React and TypeScript, leveraging Next.js Server and Client Components for optimal performance.",
        "Designed and implemented RESTful APIs using Next.js API Routes for CRUD operations, authentication, and business logic. Implemented Zod for schema validation and DOMPurify for XSS protection. Maintained code quality with ESLint and stored data efficiently in MongoDB.",
      ],
    },
    {
      company: "Luna News",
      position: "Full Stack Developer",
      startDate: "August 2024",
      endDate: "June 2025",
      summary: [
        "Developed a scalable programming news platform using Next.js and MongoDB, featuring multilingual support, advanced SEO optimization, and superior performance metrics.",
        "Built a modern frontend with React, Next.js, and Tailwind CSS, implementing adaptive light/dark themes. Achieved exceptional loading speeds and search engine indexing through Next.js Server-Side Rendering (SSR). Integrated next-intl for seamless internationalization across multiple languages.",
        "Implemented secure and efficient backend APIs using Next.js API Routes for content management and delivery. Utilized MongoDB for flexible, scalable data storage capable of handling high volumes of dynamic content."
      ],
    },
    {
      company: "UniMart",
      position: "Frontend Developer",
      startDate: "December 2024",
      endDate: "January 2025",
      summary: [
        "Developed a feature-rich e-commerce platform with advanced search, filtering, and shopping cart functionality, delivering smooth, intuitive experiences across mobile and desktop devices.",
        "Built the interface using React and Redux Toolkit for efficient state management and seamless navigation without page reloads. Designed a scalable architecture ready for backend integration with Node.js and MongoDB, supporting future features like authentication, product management, and persistent data storage."
      ],
    },
  ],
  about: {
    image: "/foto-web.webp",
  },
};

export const SITE_CONTENT_ES: SiteContent = {
  hero: {
    name: "Alberto Luna",
    specialty: "Desarrollador Full Stack",
    summary:
      "Desarrollador full-stack apasionado especializado en tecnologías web modernas como React, Next.js y MongoDB. Construyo aplicaciones escalables, seguras y centradas en el usuario con enfoque en rendimiento, código limpio y experiencias excepcionales.",
    email: "albertorl1002@gmail.com",
    buttonText: "Contáctame",
    projectsButtonText: "Ver Proyectos",
  },
  projects: [
    {
      name: "Ecliptica",
      summary: "Plataforma integral de gestión financiera personal con seguimiento de ingresos en tiempo real, categorización de gastos y visualización de datos.",
      date: "Marzo 2025 - Actualidad",
      stack: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "MongoDB",
        "Zod",
      ],
      linkPreview: "https://ecliptica-six.vercel.app/",
      image: "/ecliptica.webp",
    },
    {
      name: "Luna News",
      summary: "Plataforma multilingüe de noticias de programación con entrega dinámica de contenido, soporte de modo oscuro y rendimiento SEO optimizado.",
      date: "Agosto 2024 - Junio 2025",
      stack: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "MongoDB",
        "next-intl"
      ],
      linkPreview: "https://luna-news.vercel.app/es",
      image: "/luna-news.webp",
    },
    {
      name: "UniMart",
      summary: "Plataforma moderna de e-commerce con búsqueda avanzada, filtrado dinámico y experiencia de carrito fluida con diseño responsivo.",
      date: "Diciembre 2024 - Enero 2025",
      stack: [
        "React",
        "TypeScript",
        "Redux Toolkit",
        "Tailwind CSS"
      ],
      linkPreview: "https://uni-mart-six.vercel.app/",
      linkSource: "https://github.com/Albert0Luna/UniMart",
      image: "/unimart.webp",
    },
  ],
  experience: [
    {
      company: "Ecliptica",
      position: "Desarrollador Full-Stack",
      startDate: "Marzo 2025",
      endDate: "Actualidad",
      summary: [
        "Diseñé y desarrollé una plataforma full-stack de gestión financiera usando Next.js, priorizando rendimiento, optimización SEO, escalabilidad y seguridad de nivel empresarial.",
        "Desarrollé un frontend responsivo y accesible con Tailwind CSS y componentes shadcn/ui, implementando soporte completo de modo oscuro. Construí lógica robusta del lado del cliente con React y TypeScript, aprovechando Server y Client Components de Next.js para rendimiento óptimo.",
        "Diseñé e implementé APIs RESTful usando Next.js API Routes para operaciones CRUD, autenticación y lógica de negocio. Implementé Zod para validación de esquemas y DOMPurify para protección XSS. Mantuve la calidad del código con ESLint y almacené datos eficientemente en MongoDB.",
      ],
    },
    {
      company: "Luna News",
      position: "Desarrollador Full-Stack",
      startDate: "Agosto 2024",
      endDate: "Junio 2025",
      summary: [
        "Desarrollé una plataforma escalable de noticias de programación usando Next.js y MongoDB, con soporte multilingüe, optimización SEO avanzada y métricas de rendimiento superiores.",
        "Construí un frontend moderno con React, Next.js y Tailwind CSS, implementando temas adaptativos claro/oscuro. Logré velocidades de carga excepcionales e indexación en motores de búsqueda mediante Server-Side Rendering (SSR) de Next.js. Integré next-intl para internacionalización fluida en múltiples idiomas.",
        "Implementé APIs backend seguras y eficientes usando Next.js API Routes para gestión y entrega de contenido. Utilicé MongoDB para almacenamiento de datos flexible y escalable, capaz de manejar grandes volúmenes de contenido dinámico."
      ],
    },
    {
      company: "UniMart",
      position: "Desarrollador Frontend",
      startDate: "Diciembre 2024",
      endDate: "Enero 2025",
      summary: [
        "Desarrollé una plataforma de e-commerce rica en funcionalidades con búsqueda avanzada, filtrado y carrito de compras, ofreciendo experiencias fluidas e intuitivas en dispositivos móviles y de escritorio.",
        "Construí la interfaz usando React y Redux Toolkit para gestión eficiente del estado y navegación fluida sin recargas de página. Diseñé una arquitectura escalable lista para integración backend con Node.js y MongoDB, soportando futuras características como autenticación, gestión de productos y almacenamiento persistente de datos."
      ],
    },
  ],
  about: {
    image: "/foto-web.webp",
  },
};
