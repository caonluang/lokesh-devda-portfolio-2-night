import type {
  Category,
  NavItem,
  Skill,
  TimelineItem,
} from "../types/portfolio";

const picsum = (seed: number, w = 800, h = 600) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const CATEGORIES: Category[] = [
  {
    id: "social-media",
    name: "Social Media Design",
    count: 12,
    icon: "📱",
    color: "#7c3aed",
    accentColor: "rgba(124,58,237,0.8)",
    images: Array.from({ length: 12 }, (_, i) => picsum(100 + i)),
  },
  {
    id: "logo-brand",
    name: "Logo & Brand Identity",
    count: 10,
    icon: "🔤",
    color: "#00f5ff",
    accentColor: "rgba(0,245,255,0.8)",
    images: Array.from({ length: 10 }, (_, i) => picsum(200 + i)),
  },
  {
    id: "packaging",
    name: "Packaging Design",
    count: 9,
    icon: "📦",
    color: "#ff2d55",
    accentColor: "rgba(255,45,85,0.8)",
    images: Array.from({ length: 9 }, (_, i) => picsum(300 + i)),
  },
  {
    id: "advertising",
    name: "Advertising & Campaigns",
    count: 11,
    icon: "📣",
    color: "#f5a623",
    accentColor: "rgba(245,166,35,0.8)",
    images: Array.from({ length: 11 }, (_, i) => picsum(400 + i)),
  },
  {
    id: "ui-web",
    name: "UI / Web Design",
    count: 10,
    icon: "💻",
    color: "#a855f7",
    accentColor: "rgba(168,85,247,0.8)",
    images: Array.from({ length: 10 }, (_, i) => picsum(500 + i)),
  },
  {
    id: "creative-lab",
    name: "Creative Lab",
    count: 9,
    icon: "✨",
    color: "#06ffa5",
    accentColor: "rgba(6,255,165,0.8)",
    images: Array.from({ length: 9 }, (_, i) => picsum(600 + i)),
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    year: "April 2020",
    company: "Sarvagya Online Studio",
    role: "Junior Graphic Designer",
    description:
      "Started my design journey crafting digital assets, social media creatives, and brand collaterals for diverse clients across industries.",
    color: "#7c3aed",
  },
  {
    year: "October 2022",
    company: "World Book of Star Records",
    role: "Visual Designer",
    description:
      "Created award certificates, promotional materials, and press kits for a prestigious recognition platform honoring achievers across India.",
    color: "#00f5ff",
  },
  {
    year: "January 2023",
    company: "Digital Graphics",
    role: "Senior Graphic Designer",
    description:
      "Led design projects including brand identity systems, packaging design, and digital marketing campaigns for multiple brand portfolios.",
    color: "#ff2d55",
  },
  {
    year: "June 2023",
    company: "Krishna Printers",
    role: "Creative Designer",
    description:
      "Specialized in print-ready designs, large format graphics, and prepress production for commercial printing projects.",
    color: "#f5a623",
  },
  {
    year: "February 2024",
    company: "Angel Creation",
    role: "Lead Designer & Web Developer",
    description:
      "Currently leading creative direction, building brand identities, and developing web interfaces for clients across retail, hospitality, and tech sectors.",
    isCurrent: true,
    color: "#a855f7",
  },
];

export const SKILLS: Skill[] = [
  { name: "CorelDraw", icon: "🎨", percent: 90, years: 5, color: "#00f5ff" },
  { name: "Illustrator", icon: "✏️", percent: 90, years: 5, color: "#f5a623" },
  { name: "Photoshop", icon: "🖼️", percent: 85, years: 5, color: "#7c3aed" },
  {
    name: "Affinity Designer",
    icon: "🔷",
    percent: 80,
    years: 4,
    color: "#ff2d55",
  },
  { name: "WordPress", icon: "🌐", percent: 70, years: 3, color: "#a855f7" },
  { name: "Web Design", icon: "💻", percent: 75, years: 3, color: "#06ffa5" },
];

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#categories" },
  { label: "Experience", href: "#timeline" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
