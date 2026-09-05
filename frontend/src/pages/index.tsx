import { useState, useEffect } from "react";
import Head from "next/head";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import { StatsSection, PortfolioSection, TestimonialsSection, TechStackSection, CTASection } from "@/components/sections/HomeSections";
import { AboutPage, ServicesPage, PortfolioPage, BlogPage, CareersPage, ContactPage } from "@/components/sections/Pages";

// ── Loading Screen ────────────────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "#07090F",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: "1.5rem", zIndex: 9999,
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: 18,
        background: "linear-gradient(135deg, #00D4FF, #7C3AED)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, color: "#fff",
        animation: "pulse-glow 1.2s ease infinite",
      }}>Q</div>
      <div className="font-display" style={{ color: "#F1F5F9", fontSize: 18, fontWeight: 600, letterSpacing: "-0.5px" }}>
        Quantum Tech<span style={{ color: "#00D4FF" }}> Nepal</span>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: "50%", background: "#00D4FF",
            animation: `bounce-dot 1.2s ease ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}

// ── Home Page ─────────────────────────────────────────────────────────────────
function HomePage({ setActive }: { setActive: (p: string) => void }) {
  return (
    <>
      <HeroSection setActive={setActive} />
      <TechStackSection />
      <ServicesSection setActive={setActive} />
      <StatsSection />
      <PortfolioSection setActive={setActive} />
      <TestimonialsSection />
      <CTASection setActive={setActive} />
    </>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────
export default function QuantumTechNepal() {
  const [active, setActive] = useState("Home");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const handleNav = (page: string) => {
    setActive(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const PAGE_TITLES: Record<string, string> = {
    Home: "Quantum Tech Nepal — Nepal's Premier Tech Partner",
    About: "About Us — Quantum Tech Nepal",
    Services: "Services — Web, Mobile, AI & More",
    Portfolio: "Portfolio — Our Projects",
    Blog: "Blog — Tech Insights from Quantum Tech Nepal",
    Careers: "Careers — Join Our Team",
    Contact: "Contact Us — Get a Free Consultation",
  };

  if (loading) return <LoadingScreen />;

  return (
    <>
      <Head>
        <title>{PAGE_TITLES[active] || "Quantum Tech Nepal"}</title>
        <meta name="description" content="Quantum Tech Nepal — building world-class websites, mobile apps, AI solutions, and digital experiences from Kathmandu." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Quantum Tech Nepal" />
        <meta property="og:description" content="Nepal's premier tech partner for web, mobile, AI, and digital marketing." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ background: "var(--color-primary)", minHeight: "100vh", color: "var(--color-text)" }}>
        <NavBar active={active} setActive={handleNav} />

        <main>
          {active === "Home" && <HomePage setActive={handleNav} />}
          {active === "About" && <AboutPage />}
          {active === "Services" && <ServicesPage setActive={handleNav} />}
          {active === "Portfolio" && <PortfolioPage />}
          {active === "Blog" && <BlogPage />}
          {active === "Careers" && <CareersPage />}
          {active === "Contact" && <ContactPage />}
        </main>

        <Footer setActive={handleNav} />
        <FloatingButtons />
      </div>
    </>
  );
}
