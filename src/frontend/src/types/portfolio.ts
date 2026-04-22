export interface Category {
  id: string;
  name: string;
  count: number;
  images: string[];
  color: string;
  accentColor: string;
  icon: string;
}

export interface Project {
  id: string;
  categoryId: string;
  title: string;
  image: string;
  description: string;
  tags: string[];
}

export interface TimelineItem {
  year: string;
  company: string;
  role: string;
  description: string;
  isCurrent?: boolean;
  color: string;
}

export interface Skill {
  name: string;
  icon: string;
  percent: number;
  years: number;
  color: string;
}

export interface NavItem {
  label: string;
  href: string;
}
