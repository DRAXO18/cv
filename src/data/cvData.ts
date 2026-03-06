export const cvData = {
  personal: {
    name: "José Ghenaro Tueros Morón",
    title: "Fullstack Developer",
    email: "tuerosmorong@gmail.com",
    phone: "+51 933142128",
    location: "Huancayo, Perú",
    github: "github.com/DRAXO18",
    linkedin: "Jose Tueros Moron",
    languages: [
      "Spanish — Native",
      "English — A1"
    ],
    summary:
      "Desarrollador fullstack enfocado en estructura backend. APIs con Laravel, sistemas escalables y análisis de datos asistido por IA. Experiencia construyendo plataformas integrales, escalables y modulares.",
  },

  experience: [
    {
      company: "Corporación Cactus Pro S.R.L.",
      role: "Web Developer Jr.",
      period: "Jun 2024 – Nov 2024",
      stack: ["Laravel", "HTML", "CSS", "JavaScript"],
      achievements: [
        "Participación en el desarrollo de proyectos web internos utilizando Laravel",
        "Apoyo en campañas internas mediante desarrollo frontend",
        "Colaboración en la implementación de herramientas web para procesos empresariales",
      ],
    },
    {
      company: "Bamboo Salud y Belleza S.A.C.",
      role: "Freelance Backend Developer",
      period: "Feb 2025 – Jun 2025",
      stack: ["Laravel", "Livewire", "MySQL"],
      achievements: [
        "Desarrollo de un sistema de reservas de citas para clientes",
        "Implementación de lógica backend para gestión de agendamiento",
        "Diseño de estructura de base de datos para control de servicios y horarios",
      ],
    },
    {
      company: "Cimark Comunicación Corporativa S.A.C.",
      role: "Web Designer",
      period: "Jun 2025 – Nov 2025",
      stack: ["WordPress", "Elementor"],
      achievements: [
        "Diseño de páginas web modernas utilizando Elementor",
        "Implementación de interfaces responsive para clientes corporativos",
        "Colaboración en múltiples despliegues de sitios web empresariales",
      ],
    },
  ],

  skills: {
    backend: ["Laravel", "REST APIs", "MySQL", "PostgreSQL", "Supabase"],
    frontend: ["React", "TypeScript", "HTML", "CSS", "Bootstrap"],
    tools: ["Docker", "Git", "OpenAI API", "WordPress"],
    concepts: [
      "Arquitectura API-first",
      "Sistemas con control de roles",
      "Análisis de datos con SQL",
      "Automatización asistida por IA",
      "Arquitectura de microservicios",
    ],
  },

  education: [
    {
      degree: "Ingeniería de Software con Inteligencia Artificial",
      institution: "SENATI",
      year: "2025",
      relevant: [
        "Desarrollo backend con Laravel",
        "Desarrollo frontend con React",
        "Bases de datos SQL",
        "Arquitectura de REST APIs"
      ]
    },
    {
      degree: "Formación autodidacta en desarrollo web",
      institution: "Aprendizaje independiente",
      year: "En curso",
      relevant: [
        "Integración de IA mediante APIs de OPEN-AI y GEMINI",
        "Desarrollo con Docker",
        "Linux básico, producción en VPS"
      ]
    }
  ],

  projects: [
    {
      name: "AI Inventory Microservice",
      description:
        "Microservicio backend diseñado para analizar datos de inventario mediante IA y generar diagnósticos operativos.",
      tech: ["Laravel 12", "OpenAI API", "SQL"],
      url: "github.com/DRAXO18/ai-backend",
    },
    {
      name: "Inventory System with AI Assistant",
      description:
        "Sistema de inventario con control por roles, operaciones CRUD y asistente de IA capaz de generar consultas SQL para análisis de datos.",
      tech: ["Laravel", "React", "CoreUI"],
      url: "github.com/DRAXO18/backend-base",
    },
    {
      name: "RUBRO Service Platform",
      description:
        "Plataforma PWA orientada a conectar usuarios con técnicos y empresas de servicios a nivel nacional.",
      tech: ["Laravel", "PWA", "API-first architecture"],
      url: "github.com/DRAXO18/app",
    },
    {
      name: "Workshop Maintenance System",
      description:
        "Sistema de mantenimiento para talleres técnicos con integración opcional de inventario externo mediante Supabase.",
      tech: ["Laravel", "Supabase", "REST APIs"],
      url: "github.com/DRAXO18/backend-mant",
    },
    {
      name: "WordPress Business Websites",
      description:
        "Implementación y colaboración en el desarrollo de sitios web corporativos utilizando WordPress y Elementor.",
      tech: ["WordPress", "Elementor"],
      url: "https://devilopers.org.pe",
    },
  ],
};

export const endpoints: {
  label: string;
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  responseKey: keyof typeof cvData;
}[] = [
    {
      label: "Información Personal",
      url: "https://api.tueros.dev/v1/informacion-personal",
      method: "GET",
      responseKey: "personal",
    },
    {
      label: "Experiencia",
      url: "https://api.tueros.dev/v1/experiencia",
      method: "GET",
      responseKey: "experience",
    },
    {
      label: "Habilidades",
      url: "https://api.tueros.dev/v1/habilidades",
      method: "GET",
      responseKey: "skills",
    },
    {
      label: "Educación",
      url: "https://api.tueros.dev/v1/educacion",
      method: "GET",
      responseKey: "education",
    },
    {
      label: "Proyectos",
      url: "https://api.tueros.dev/v1/proyectos",
      method: "GET",
      responseKey: "projects",
    },
  ];