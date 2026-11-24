import type { ImageMetadata } from "astro";

export interface SiteConfig extends HeaderProps {
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  author: string;
  socialLinks: { text: string; href: string }[];
  socialImage: string;
  canonicalURL?: string;
}

export interface SiteContent {
  hero: HeroProps;
  experience: ExperienceProps[];
  projects: ProjectProps[];
  awards: AwardProps[];
  about: AboutProps;
}

export interface HeroProps {
  name: string;
  specialty: string;
  summary: string;
  email: string;
  buttonText: string;
  projectsButtonText?: string;
}

export interface ExperienceProps {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  summary: string | string[];
  skills?: string[];
  link?: string;
}

export interface ProjectProps {
  name: string;
  summary: string;
  date: string;
  stack: string[];
  image: ImageMetadata;
  linkPreview?: string;
  linkSource?: string;
}

export interface AwardProps {
  title: string;
  project: string;
  badge: string;
  issuer: string;
  date: string;
  role: string;
  summary: string;
  highlights: string[];
  stack: string[];
  image: ImageMetadata;
  imageAlt: string;
}

export interface CertificationItem {
  name: string;
  href?: string;
}

export interface FocusAreaItem {
  prefix?: string;
  highlight: string;
  suffix?: string;
}

export interface AboutProps {
  image: ImageMetadata;
  greetingPrefix: string;
  roleHighlight: string;
  age: number;
  experienceYears: string;
  location: string;
  degree: string;
  educationDetails: string;
  bioIntroPrefix: string;
  bioAgePrefix?: string;
  bioAgeLocationConnector: string;
  bioEducationPrefix: string;
  bioFocusPrefix: string;
  bioFocusHighlight: string;
  languagesLabel: string;
  languages: string[];
  certificationsTitle: string;
  certifications: CertificationItem[];
  focusTitle: string;
  focusIntroPrefix: string;
  focusIntroHighlight: string;
  focusIntroSuffix: string;
  focusItems: FocusAreaItem[];
  closingCta: string;
}

export interface HeaderProps {
  siteLogo: string;
  navLinks: { text: string; textEs: string; href: string }[];
}
