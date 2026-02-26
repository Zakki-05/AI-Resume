export interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    jobTitle: string;
    summary: string;
    website?: string;
    linkedin?: string;
    github?: string;
}

export interface Experience {
    company: string;
    role: string;
    location: string;
    period: string;
    description: string[];
}

export interface Education {
    school: string;
    degree: string;
    location: string;
    period: string;
}

export interface Project {
    title: string;
    description: string;
    link?: string;
}

export interface ResumeData {
    id: string;
    updatedAt: string;
    personalInfo: PersonalInfo;
    experiences: Experience[];
    education: Education[];
    skills: string[];
    projects: Project[];
}
