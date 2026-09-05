export const SERVICES = [
  { slug:'web-dev',      icon:'🌐', title:'Website Development',   short_desc:'Modern, fast, scalable websites built with cutting-edge frameworks.', color:'#00D4FF' },
  { slug:'mobile-app',   icon:'📱', title:'Mobile App Development', short_desc:'Cross-platform and native apps for iOS and Android.',                  color:'#7C3AED' },
  { slug:'ui-ux',        icon:'🎨', title:'UI/UX Design',           short_desc:'Pixel-perfect designs that convert visitors into customers.',           color:'#F59E0B' },
  { slug:'ai-solutions', icon:'🤖', title:'AI Solutions',           short_desc:'Custom AI integrations, automation, and machine learning pipelines.',   color:'#10B981' },
  { slug:'digital-mkt',  icon:'📈', title:'Digital Marketing',      short_desc:'Data-driven strategies to grow your online presence.',                  color:'#EF4444' },
  { slug:'seo',          icon:'🔍', title:'SEO Services',            short_desc:'Top-of-page rankings through technical and content SEO.',               color:'#00D4FF' },
  { slug:'graphic',      icon:'✏️', title:'Graphic Design',         short_desc:'Memorable brand identity and visual storytelling.',                     color:'#7C3AED' },
  { slug:'cloud',        icon:'☁️', title:'Cloud & Hosting',        short_desc:'Secure, scalable cloud infrastructure and managed hosting.',            color:'#F59E0B' },
  { slug:'consulting',   icon:'💼', title:'IT Consulting',           short_desc:'Strategic technology roadmaps for business transformation.',            color:'#10B981' },
  { slug:'social',       icon:'📣', title:'Social Media Mgmt',      short_desc:'Engage and grow your audience across all platforms.',                   color:'#EF4444' },
];

export const PORTFOLIO = [
  { slug:'ecomart',    icon:'🛒', title:'EcoMart Platform',  category:'E-commerce',    tech:['React','Node.js','PostgreSQL'], color:'#00D4FF' },
  { slug:'summit-lms', icon:'🎓', title:'Summit LMS',        category:'School System', tech:['Next.js','Django','Redis'],     color:'#7C3AED' },
  { slug:'greenfield', icon:'🌾', title:'GreenField AI',     category:'Agri-tech',     tech:['Python','TensorFlow','React'],  color:'#10B981' },
  { slug:'tailorpro',  icon:'✂️', title:'TailorPro',         category:'Mobile App',    tech:['React Native','Firebase'],      color:'#F59E0B' },
  { slug:'nepalsaas',  icon:'🚀', title:'NepalSaaS',         category:'SaaS Platform', tech:['Vue.js','FastAPI','Docker'],    color:'#EF4444' },
  { slug:'quickai',    icon:'🤖', title:'QuickAI Tools',     category:'AI Tools',      tech:['Next.js','OpenAI','Stripe'],    color:'#7C3AED' },
];

export const TESTIMONIALS = [
  { name:'Ramesh Koirala', company:'EcoMart Nepal',    rating:5, text:'Quantum Tech Nepal transformed our e-commerce platform. Sales doubled within 3 months. Exceptional work!' },
  { name:'Anita Gurung',   company:'Summit Academy',   rating:5, text:'Our school management system is now seamless. Parents, teachers, and students love it. Highly recommended!' },
  
];

export const STATS = [
  { value:250, suffix:'+', label:'Projects Completed' },
  { value:180, suffix:'+', label:'Happy Clients' },
  { value:5,   suffix:'+', label:'Years Experience' },
  { value:12,  suffix:'',  label:'Team Members' },
];

export const TEAM = [
  { name:'Rojan Sundas',  role:'CEO & Founder',  initials:'RS', color:'#00D4FF' },
  { name:'Roshan Sundas',   role:'Co-Founder & Financial Manager', initials:'RS', color:'#7C3AED' },
  { name:'Rojina SUndas',    role:'Marketing Manager', initials:'RS', color:'#F59E0B' },
  { name:'Sailesh Bhitrikote',  role:'Project Manager',    initials:'SB', color:'#10B981' },
  { name:'Salil Bhitrikote',  role:'Graphics Designer',    initials:'SB', color:'#10B981' },
];

export const BLOG_POSTS = [
  { slug:'ai-software-2024',  cat:'AI',            icon:'🤖', title:'How AI is Reshaping Software Development in 2026', date:'Jan 10, 2026', read:'5 min' },
  { slug:'nextjs-15',         cat:'Web Dev',        icon:'⚡', title:'Next.js 15: What\'s New and Why It Matters',       date:'Feb 25, 2026', read:'4 min' },
  { slug:'security-practices',cat:'Cybersecurity',  icon:'🔐', title:'Top 10 Security Practices for Your Web App',       date:'Mar 12, 2026', read:'7 min' },
  { slug:'nepal-digital',     cat:'Business',       icon:'📊', title:'Why Your Nepal Business Needs a Digital Presence', date:'Apr 28, 2026', read:'6 min' },
  { slug:'color-psychology',  cat:'Design',         icon:'🎨', title:'The Psychology of Color in UI/UX Design',          date:'May 15, 2026', read:'5 min' },
  { slug:'mvp-lessons',       cat:'Startups',       icon:'🚀', title:'Building a MVP: Lessons from 50+ Projects',        date:'Jun 2, 2026',  read:'8 min' },
];

export const JOBS = [
  { title:'Social Media Specialist',         type:'Full-time',  dept:'Marketing & Content Creations', loc:'Dharan' },
  
];

export const TECH_STACK = ['React','Next.js','Vue.js','Node.js','Django','Python','PostgreSQL','MongoDB','Docker','AWS','TensorFlow','Figma'];

export const PRICING_PLANS = [
  {
    name:'Starter', price:'NPR 15K', color:'#00D4FF',
    features:['5-page website','Mobile responsive','Basic SEO','1 month support'],
  },
  {
    name:'Growth', price:'NPR 40K', color:'#7C3AED', popular:true,
    features:['15-page website','Custom design','Advanced SEO','CMS integration','3 months support'],
  },
  {
    name:'Enterprise', price:'Custom', color:'#F59E0B',
    features:['Unlimited pages','Custom development','AI integration','Dedicated manager','12 months support'],
  },
];
