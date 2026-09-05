export const COLORS = {
  primary: "#07090F",
  secondary: "#0D1117",
  accent: "#00D4FF",
  accent2: "#7C3AED",
  accentGold: "#F59E0B",
  success: "#10B981",
  danger: "#EF4444",
  text: "#F1F5F9",
  muted: "#64748B",
  mutedLight: "#94A3B8",
  card: "rgba(13,17,23,0.85)",
  border: "rgba(0,212,255,0.12)",
  borderHover: "rgba(0,212,255,0.35)",
};

export const SERVICES = [
  { icon: "🌐", title: "Website Development", desc: "Modern, fast, scalable websites built with cutting-edge frameworks. We craft pixel-perfect experiences that convert visitors into loyal customers.", color: "#00D4FF", tag: "Most Popular" },
  { icon: "📱", title: "Mobile App Development", desc: "Cross-platform and native apps for iOS and Android that feel premium and perform flawlessly in real-world conditions.", color: "#7C3AED", tag: null },
  { icon: "🎨", title: "UI/UX Design", desc: "Research-driven, pixel-perfect designs that reduce churn, improve engagement, and make your brand unforgettable.", color: "#F59E0B", tag: null },
  { icon: "🤖", title: "AI Solutions", desc: "Custom AI integrations, intelligent automation, and machine learning pipelines that give your business a measurable edge.", color: "#10B981", tag: "Trending" },
  { icon: "📈", title: "Digital Marketing", desc: "Data-driven marketing strategies — from SEO to paid ads — that compound growth and deliver trackable ROI.", color: "#EF4444", tag: null },
  { icon: "🔍", title: "SEO Services", desc: "Technical SEO, content strategy, and link building that sustainably drives organic traffic and top-of-page rankings.", color: "#00D4FF", tag: null },
  { icon: "✏️", title: "Graphic Design", desc: "Memorable brand identity, visual storytelling, and design systems that make your business look world-class.", color: "#7C3AED", tag: null },
  { icon: "☁️", title: "Cloud & Hosting", desc: "Secure, auto-scaling cloud infrastructure with 99.9% uptime SLA, managed backups, and 24/7 monitoring.", color: "#F59E0B", tag: null },
  { icon: "💼", title: "IT Consulting", desc: "Strategic technology roadmaps, architecture reviews, and digital transformation planning for businesses of all sizes.", color: "#10B981", tag: null },
  { icon: "📣", title: "Social Media Management", desc: "End-to-end social media — content creation, scheduling, community management, and performance analytics.", color: "#EF4444", tag: null },
];

export const STATS = [
  { value: 250, suffix: "+", label: "Projects Completed", icon: "🚀" },
  { value: 180, suffix: "+", label: "Happy Clients", icon: "🤝" },
  { value: 5, suffix: "+", label: "Years Experience", icon: "📅" },
  { value: 12, suffix: "", label: "Expert Team Members", icon: "👥" },
];

export const TEAM = [
  { name: "Arjun Sharma", role: "CEO & Founder", initials: "AS", color: "#00D4FF", bio: "10+ years in software engineering, ex-Microsoft" },
  { name: "Priya Thapa", role: "Lead Developer", initials: "PT", color: "#7C3AED", bio: "Full-stack expert, React & Django specialist" },
  { name: "Bikash Rai", role: "UI/UX Director", initials: "BR", color: "#F59E0B", bio: "Ex-Adobe designer, Figma & design systems" },
  { name: "Sarita Karki", role: "AI Engineer", initials: "SK", color: "#10B981", bio: "ML researcher, TensorFlow & LLM integrations" },
];

export const TESTIMONIALS = [
  { name: "Ramesh Koirala", company: "EcoMart Nepal", text: "Quantum Tech Nepal transformed our e-commerce platform. Sales doubled within 3 months. Exceptional craftsmanship and communication throughout.", rating: 5, avatar: "RK" },
  { name: "Anita Gurung", company: "Summit Academy", text: "Our school management system is now seamless. Parents, teachers, and students love the interface. Highly recommended — they genuinely care about results.", rating: 5, avatar: "AG" },
  { name: "Dev Poudel", company: "GreenField Agri", text: "Their AI-powered crop monitoring system is a game changer. It's already saving us 30% in operational costs. These folks are way ahead of other agencies.", rating: 5, avatar: "DP" },
  { name: "Sita Maharjan", company: "Himalayan Crafts", text: "We went from zero online presence to 500+ orders per month in just 4 months. Quantum Tech's marketing and web team is simply outstanding.", rating: 5, avatar: "SM" },
];

export const PORTFOLIO = [
  { title: "EcoMart Platform", category: "E-commerce", tech: ["React", "Node.js", "PostgreSQL"], color: "#00D4FF", icon: "🛒", desc: "Full-featured e-commerce platform with 50K+ monthly users" },
  { title: "Summit LMS", category: "Education", tech: ["Next.js", "Django", "Redis"], color: "#7C3AED", icon: "🎓", desc: "School management system for 3,000+ students" },
  { title: "GreenField AI", category: "Agri-tech", tech: ["Python", "TensorFlow", "React"], color: "#10B981", icon: "🌾", desc: "AI crop monitoring reducing waste by 30%" },
  { title: "TailorPro", category: "Mobile App", tech: ["React Native", "Firebase"], color: "#F59E0B", icon: "✂️", desc: "Tailoring business management app, 1K+ active users" },
  { title: "NepalSaaS", category: "SaaS", tech: ["Vue.js", "FastAPI", "Docker"], color: "#EF4444", icon: "🚀", desc: "B2B SaaS platform serving 200+ businesses" },
  { title: "QuickAI Tools", category: "AI Tools", tech: ["Next.js", "OpenAI", "Stripe"], color: "#7C3AED", icon: "🤖", desc: "AI productivity suite with 5K+ subscribers" },
];

export const TECH_STACK = ["React", "Next.js", "Vue.js", "Node.js", "Django", "Python", "PostgreSQL", "MongoDB", "Docker", "AWS", "TensorFlow", "Figma", "TypeScript", "Redis"];

export const NAV_LINKS = ["Home", "About", "Services", "Portfolio", "Blog", "Careers", "Contact"];

export const PLANS = [
  {
    name: "Starter",
    price: "NPR 15K",
    period: "one-time",
    color: "#00D4FF",
    features: ["5-page website", "Mobile responsive", "Basic SEO setup", "Contact form", "1 month support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Growth",
    price: "NPR 40K",
    period: "one-time",
    color: "#7C3AED",
    features: ["15-page website", "Custom design system", "Advanced SEO", "CMS integration", "Analytics dashboard", "3 months support"],
    cta: "Most Popular",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "project-based",
    color: "#F59E0B",
    features: ["Unlimited pages", "Custom development", "AI integration", "Dedicated manager", "Priority support", "12 months support"],
    cta: "Contact Us",
    popular: false,
  },
];

export const BLOG_POSTS = [
  { cat: "AI", title: "How AI is Reshaping Software Development in 2025", date: "Jan 15, 2025", read: "5 min", icon: "🤖", excerpt: "Large language models are changing how we write, review, and ship code..." },
  { cat: "Web Dev", title: "Next.js 15: What's New and Why It Matters", date: "Dec 20, 2024", read: "4 min", icon: "⚡", excerpt: "Server components, partial prerendering, and the new caching model explained..." },
  { cat: "Security", title: "Top 10 Security Practices for Your Web App in 2025", date: "Dec 5, 2024", read: "7 min", icon: "🔐", excerpt: "From input validation to JWT best practices — the security checklist every dev needs..." },
  { cat: "Business", title: "Why Your Nepal Business Needs a Digital Presence Now", date: "Nov 18, 2024", read: "6 min", icon: "📊", excerpt: "87% of consumers research online before buying. Here's what you're missing..." },
  { cat: "Design", title: "The Psychology of Color in UI/UX Design", date: "Nov 2, 2024", read: "5 min", icon: "🎨", excerpt: "How color choices drive emotion, trust, and conversion rates in digital products..." },
  { cat: "Startups", title: "Building an MVP: Hard Lessons from 50+ Projects", date: "Oct 20, 2024", read: "8 min", icon: "🚀", excerpt: "What we learned shipping MVPs for startups across Nepal and beyond..." },
];

export const JOBS = [
  { title: "Senior React Developer", type: "Full-time", dept: "Engineering", loc: "Kathmandu", salary: "NPR 80K–120K/mo" },
  { title: "UI/UX Designer", type: "Full-time", dept: "Design", loc: "Remote", salary: "NPR 60K–90K/mo" },
  { title: "AI/ML Engineer", type: "Full-time", dept: "Engineering", loc: "Kathmandu", salary: "NPR 100K–150K/mo" },
  { title: "Digital Marketing Specialist", type: "Full-time", dept: "Marketing", loc: "Kathmandu", salary: "NPR 50K–70K/mo" },
  { title: "Backend Developer Intern", type: "Internship", dept: "Engineering", loc: "Kathmandu", salary: "NPR 15K–25K/mo" },
  { title: "UI/UX Design Intern", type: "Internship", dept: "Design", loc: "Remote", salary: "NPR 12K–20K/mo" },
];
