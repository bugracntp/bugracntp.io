export interface PersonalInfo {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    birthDate: string;
    github: string;
    linkedin: string;
    profileImage: string;
  }
  
  export interface Experience {
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    responsibilities: string[];
    technologies: string[];
  }
  
  export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa: string;
    coursework: string[];
  }
  
  export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    technologies: string[];
    github?: string;
    demo?: string;
    featured: boolean;
    date: string;
  }
  
  export interface Skill {
    category: string;
    items: string[];
  }
  
  export interface SocialLink {
    platform: string;
    url: string;
    icon: string;
  }
  
  export interface PortfolioData {
    personalInfo: PersonalInfo;
    experiences: Experience[];
    education: Education[];
    projects: Project[];
    skills: Skill[];
    socialLinks: SocialLink[];
  }