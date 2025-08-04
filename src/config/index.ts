import type { SiteConfig, SiteContent } from "../types/index";

export const SITE_CONFIG: SiteConfig = {
  title: "Alberto Luna — Full Stack Developer",
  author: "Gustavo Alberto Robles Luna",
  description:
    "Portfolio of Alberto Luna, a Full Stack Developer with expertise in modern, scalable applications.",
  lang: "en",
  siteLogo: "/foto-web.webp",
  navLinks: [
    { text: "Projects", textEs: "Proyectos", href: "#projects" },
    { text: "Experience", textEs: "Experiencia", href: "#experience" },
    { text: "About", textEs: "Sobre mí", href: "#about" },
  ],
  socialLinks: [
    { text: "Twitter", href: "https://x.com/LunaNewsX" },
    { text: "LinkedIn", href: "https://www.linkedin.com/in/alberto-luna-a202b2231/" },
    { text: "Github", href: "https://github.com/Albert0Luna" },
  ],
  socialImage: "/",
  canonicalURL: "/",
};

export const SITE_CONTENT_EN: SiteContent = {
  hero: {
    name: "Alberto Luna",
    specialty: "Full Stack Developer",
    summary:
      "Full stack developer with experience in modern, scalable applications, focused on performance, security, and accessibility, with projects in SaaS, e-commerce, and personal sites.",
    email: "albertorl1002@gmail.com",
    buttonText: "Contact Me",
  },
  projects: [
    {
      name: "Ecliptica",
      summary: "Full-stack platform for personal income management.",
      date: "July 2025",
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
      summary: "Dynamic website focused on programming news and resources.",
      date: "August 2024",
      stack: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "MongoDB",
        "next-intl"
      ],
      linkPreview: "https://luna-news.vercel.app/en",
      linkSource: "https://github.com/Albert0Luna/luna-news",
      image: "/luna-news.webp",
    },
    {
      name: "UniMart",
      summary: "Online store with search, filters, and cart functionality.",
      date: "January 2025",
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
        "Developed a full-stack platform for personal financial management using Next.js as the main framework, focusing on speed, SEO, scalability, and security.",
        "On the frontend, implemented a responsive interface with Tailwind CSS and shadcn/ui components, incorporating dark mode support. Client-side interactivity and logic were built with React and TypeScript, leveraging Next.js's modern Server Components and Client Components architecture.",
        "On the backend, utilized Next.js API Routes to handle CRUD operations, authentication, and business logic. Data validation is done with Zod, and input sanitization with DOMPurify, ensuring security against attacks like XSS. ESLint was applied for clean and consistent code, with data stored in MongoDB.",
      ],
    },
    {
      company: "Luna News",
      position: "Full Stack Developer",
      startDate: "August 2024",
      endDate: "June 2025",
      summary: [
        "Developed a programming news blog using Next.js and MongoDB, with a scalable architecture, multilingual support, and optimization focused on performance and SEO.",
        "On the frontend, used React and Next.js along with Tailwind CSS, implementing light and dark themes. Thanks to Next.js's Server-Side Rendering (SSR) capabilities, achieved fast loading and excellent search engine indexing. Internationalization was managed with next-intl, allowing content to easily adapt to different languages.",
        "On the backend, used Next.js API Routes to process requests securely and efficiently. Information is stored in MongoDB, providing flexibility and scalability to handle large volumes of dynamic content."
      ],
    },
    {
      company: "UniMart",
      position: "Frontend Developer",
      startDate: "December 2024",
      endDate: "January 2025",
      summary: [
        "Digital store with complete search, filter, and shopping cart functionalities, designed to offer a smooth and intuitive user experience on both mobile and desktop devices.",
        "The interface was built with React and Redux Toolkit, enabling efficient state management and dynamic navigation without reloads. Although everything is currently managed on the client side, the architecture is ready to easily incorporate a backend with Node.js and MongoDB, allowing the project to scale to features like authentication, product management, and data persistence."
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
      "Desarrollador full-stack con experiencia en aplicaciones modernas y escalables, enfocado en rendimiento, seguridad y accesibilidad, con proyectos en SaaS, e-commerce y sitios personales.",
    email: "albertorl1002@gmail.com",
    buttonText: "Contáctame",
  },
  projects: [
    {
      name: "Ecliptica",
      summary: "Plataforma full-stack para gestion de ingresos personales.",
      date: "Julio 2025",
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
      summary: "Sitio web dinámico enfocado en noticias y recursos sobre programación.",
      date: "Agosto 2024",
      stack: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "MongoDB",
        "next-intl"
      ],
      linkPreview: "https://luna-news.vercel.app/es",
      linkSource: "https://github.com/Albert0Luna/luna-news",
      image: "/luna-news.webp",
    },
    {
      name: "UniMart",
      summary: "Tienda online con busqueda, filtros, carrito",
      date: "Enero 2025",
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
      endDate: "En curso",
      summary: [
        "Desarrollé una plataforma full-stack para la gestión financiera personal utilizando Next.js como framework principal con un enfoque en la velocidad, SEO, escalabilidad y la seguridad.",
        "En el frontend, implementé una interfaz responsiva con Tailwind CSS y componentes de shadcn/ui, incorporando soporte para modo oscuro. La interactividad y la lógica del cliente se construyeron con React y TypeScript, aprovechando la arquitectura moderna de Server Components y Client Components ofrecida por Next.js.",
        "En el backend, utilicé las API Routes de Next.js para manejar operaciones CRUD, autenticación y lógica de negocio. La validación de datos se realiza con Zod, y la sanitización de entradas con DOMPurify, garantizando seguridad contra ataques como XSS. Para mantener un código limpio y consistente, se aplicó ESLint, y los datos se almacenan en MongoDB.",
      ],
    },
    {
      company: "Luna News",
      position: "Desarrollador Full-Stack",
      startDate: "Agosto 2024",
      endDate: "Junio 2025",
      summary: [
        "Desarrollé un blog de noticias de programación utilizando Next.js y MongoDB, con una arquitectura escalable, soporte multilenguaje y optimización enfocada en rendimiento y SEO.",
        "En el frontend, utilicé React y Next.js junto con Tailwind CSS, implementando temas claro y oscuro. Gracias a las capacidades de Server-Side Rendering (SSR) de Next.js, logré una carga rápida y una excelente indexación en motores de búsqueda. La internacionalización fue gestionada mediante next-intl, lo que permite que el contenido se adapte fácilmente a diferentes idiomas.",
        "En el backend, utilicé las API Routes de Next.js para procesar solicitudes de forma segura y eficiente. La información se almacena en MongoDB, lo que brinda flexibilidad y escalabilidad para manejar grandes volúmenes de contenido dinámico."
      ],
    },
    {
      company: "UniMart",
      position: "Frontend Developer",
      startDate: "Diciembre 2024",
      endDate: "Enero 2025",
      summary: [
        "Tienda digital con funcionalidades completas de búsqueda, filtros y carrito de compras, diseñada para ofrecer una experiencia de usuario fluida e intuitiva tanto en dispositivos móviles como de escritorio.",
        "La interfaz fue construida con React y Redux Toolkit, lo que permitió un manejo eficiente del estado y una navegación dinámica sin recargas. Aunque actualmente todo se gestiona en el lado del cliente, la arquitectura está preparada para incorporar fácilmente un backend con Node.js y MongoDB, permitiendo escalar el proyecto hacia funcionalidades como autenticación, gestión de productos y persistencia de datos."
      ],
    },
  ],
  about: {
    image: "/foto-web.webp",
  },
};
