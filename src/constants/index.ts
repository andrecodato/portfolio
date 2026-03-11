const socialsLinks = {
  github: "https://github.com/andrecodato",
  linkedin: "https://www.linkedin.com/in/andrecodato/",
  youtube: "https://www.youtube.com/@andrecodato",
};

type ProjectCard = {
  description: string;
  linkUrl: string;
  stack?: string[];
};

const projectsCards: Record<string, ProjectCard> = {
  "Koda Create": {
    description: "Landing page para a agência de produção de conteúdo digital Koda Create.",
    linkUrl: "https://www.kodacreate.com.br/",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  "Project 2": {
    description: "Description of project 2",
    linkUrl: "https://example.com/project2",
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
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  creativeList: ["CMS", "Game Servers", "Landing pages", "Bot development"],
  otherList: [
    "Garçom e cozinheiro por 4 anos",
    "Guitarrista na Banda RABISCO",
    "Other 3",
    "Other 4",
  ],
};

export { socialsLinks, projectsCards, sobreText };
