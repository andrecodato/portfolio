const socialsLinks = {
  github: "https://github.com/andrecodato",
  linkedin: "https://www.linkedin.com/in/andrecodato/",
  youtube: "https://www.youtube.com/@andrecodato",
};

type ProjectCard = {
  description: string;
  linkUrl: string;
  stack?: string[];
  imageUrl?: string;
  alt?: string;
};

const projectsCards: Record<string, ProjectCard> = {
  "Koda Create": {
    description: "Landing page para a agência de produção de conteúdo digital Koda Create.",
    linkUrl: "https://www.kodacreate.com.br/",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    imageUrl: "/images/projects/koda.png",
    alt: "Screenshot da landing page da Koda Create, mostrando uma interface moderna e vibrante com seções de serviços, portfólio e contato."
  },
  "Dojjo": {
    description: "Dojjo SP Streetwear",
    linkUrl: "https://dojjosp.com.br/",
    stack: ["Shopify", "Bling", "Melhor Envio"],
    imageUrl: "/images/projects/dojjo.png",
    alt: "Screenshot da loja online Dojjo SP Streetwear, mostrando uma interface moderna e vibrante com seções de produtos, promoções e contato."
  },
  "Project 3": {
    description: "Description of project 3",
    linkUrl: "https://example.com/project3",
  },
  "Project 4": {
    description: "Description of project 4",
    linkUrl: "https://example.com/project4",
  },
};

const sobreText = {
  aboutText:
    "Sou um desenvolvedor focado em transformar ideias em produtos reais, funcionais e escaláveis. Trabalho principalmente com Next.js, criando aplicações modernas com foco em performance, organização e experiência do usuário. Tenho uma mentalidade prática: aprendo construindo e já desenvolvi sistemas completos com autenticação, dashboards, integrações com APIs e automações. Além da programação, também empreendo — fui cofundador da hamburgueria artesanal OPORÃO, o que me dá uma visão além do código, focada em produto e negócio. Também exploro criatividade através da música com a banda RABISCO, trazendo uma abordagem mais autêntica e experimental para tudo que construo. Meu objetivo é evoluir constantemente como desenvolvedor fullstack e criar soluções que realmente gerem impacto.",
  
  creativeList: [
    "Next.js",
    "React",
    "Node.js",
    "APIs & Integrações",
    "Autenticação (JWT / Supabase)",
    "Dashboards & Sistemas Web",
    "Landing Pages",
    "Bots & Automação (WhatsApp)",
    "Game Servers",
    "UI com Tailwind"
  ],

  otherList: [
    "Empreendedor (OPORÃO Burgers)",
    "Garçom e cozinheiro por 4+ anos",
    "Guitarrista na banda RABISCO",
    "Criação de conteúdo (Twitch)",
    "Produção musical e design"
  ],
};

export { socialsLinks, projectsCards, sobreText };
