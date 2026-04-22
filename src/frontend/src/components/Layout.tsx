import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "../data/portfolioData";

interface LayoutProps {
  children: React.ReactNode;
}

// Custom Cursor
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      }
      animId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    animId = requestAnimationFrame(animate);

    const onEnter = () => {
      dotRef.current?.classList.add("scale-150");
      ringRef.current?.classList.add("scale-150");
    };
    const onLeave = () => {
      dotRef.current?.classList.remove("scale-150");
      ringRef.current?.classList.remove("scale-150");
    };

    const targets = document.querySelectorAll("a, button, [role='button']");
    for (const el of targets) {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    }

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
      for (const el of targets) {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] w-3 h-3 rounded-full pointer-events-none transition-transform duration-100"
        style={{
          background: "#00f5ff",
          boxShadow: "0 0 12px rgba(0,245,255,0.8)",
        }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] w-10 h-10 rounded-full border pointer-events-none transition-all duration-200"
        style={{ borderColor: "rgba(0,245,255,0.5)" }}
        aria-hidden="true"
      />
    </>
  );
}

export function Layout({ children }: LayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Lenis smooth scroll init
  useEffect(() => {
    let animId: number;
    let lenisDestroy: (() => void) | null = null;

    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        touchMultiplier: 2,
      });
      lenisDestroy = () => lenis.destroy();

      const raf = (time: number) => {
        lenis.raf(time);
        animId = requestAnimationFrame(raf);
      };
      animId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(animId);
      lenisDestroy?.();
    };
  }, []);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const ids = [
      "hero",
      "about",
      "categories",
      "gallery",
      "timeline",
      "skills",
      "contact",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.3 },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-portfolio-primary text-foreground overflow-x-hidden">
      <CustomCursor />

      {/* Header */}
      <header
        data-ocid="header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-xl border-b" : "bg-transparent"
        }`}
        style={{
          background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
          borderColor: scrolled ? "rgba(255,255,255,0.06)" : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("#hero")}
            data-ocid="nav.logo"
            className="flex items-center gap-2 group"
            aria-label="Lokesh Devda — Home"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-lg transition-all duration-300 group-hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #00f5ff)",
                boxShadow: "0 0 20px rgba(124,58,237,0.4)",
              }}
            >
              LD
            </div>
            <span className="hidden sm:block font-display font-semibold text-sm tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity">
              Lokesh Devda
            </span>
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => scrollTo(item.href)}
                  data-ocid={`nav.${item.label.toLowerCase()}`}
                  className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 neon-underline"
                  style={{
                    color: isActive ? "#00f5ff" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollTo("#contact")}
              data-ocid="nav.hire_button"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                boxShadow: "0 0 20px rgba(124,58,237,0.3)",
              }}
            >
              Hire Me
            </button>
            <button
              type="button"
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg glass-card"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-ocid="nav.mobile_toggle"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              <span
                className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            data-ocid="nav.mobile_menu"
            className="md:hidden border-t px-4 py-4 flex flex-col gap-1"
            style={{
              background: "rgba(10,10,15,0.95)",
              borderColor: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
            }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollTo(item.href)}
                data-ocid={`nav.mobile.${item.label.toLowerCase()}`}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                scrollTo("#contact");
                setMobileOpen(false);
              }}
              data-ocid="nav.mobile.hire_button"
              className="mt-2 w-full text-center px-4 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              }}
            >
              Hire Me
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer
        data-ocid="footer"
        className="py-8 border-t text-center"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "#111118" }}
      >
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors underline underline-offset-2"
            style={{ color: "rgba(255,255,255,0.6)" }}
            data-ocid="footer.caffeine_link"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
