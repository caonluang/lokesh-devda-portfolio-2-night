import { useEffect, useRef } from "react";

const SOCIALS = [
  { label: "Behance", href: "https://behance.net/lokeshdevda", short: "Be" },
  {
    label: "Instagram",
    href: "https://instagram.com/lokeshdevda",
    short: "IG",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/lokeshdevda",
    short: "in",
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const btnWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert?: () => void } = {};

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Heading + subtitle stagger reveal
        if (headingRef.current) {
          const items =
            headingRef.current.querySelectorAll<HTMLElement>(".reveal-item");
          gsap.fromTo(
            items,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: headingRef.current,
                start: "top 80%",
                once: true,
              },
            },
          );
        }

        // Card fade up
        if (cardRef.current) {
          gsap.fromTo(
            cardRef.current,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardRef.current,
                start: "top 85%",
                once: true,
              },
            },
          );
        }
      }, sectionRef);
    };

    init();

    return () => {
      ctx.revert?.();
    };
  }, []);

  // Magnetic button — listen on the wrapper div so we detect proximity
  useEffect(() => {
    const btn = btnRef.current;
    const wrap = btnWrapRef.current;
    if (!btn || !wrap) return;

    let gsapInstance: typeof import("gsap").gsap | null = null;

    const handleMove = (e: MouseEvent) => {
      if (!gsapInstance || !btn) return;
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        gsapInstance.to(btn, {
          x: dx * 0.4,
          y: dy * 0.4,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleLeave = () => {
      if (!gsapInstance || !btn) return;
      gsapInstance.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)",
      });
    };

    const attachListeners = async () => {
      const { gsap } = await import("gsap");
      gsapInstance = gsap;
      btn.addEventListener("mousemove", handleMove);
      btn.addEventListener("mouseleave", handleLeave);
    };

    attachListeners();

    return () => {
      btn.removeEventListener("mousemove", handleMove);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      data-ocid="contact.section"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "#0a0a0f" }}
    >
      {/* Radial spotlight glow behind CTA */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(124,58,237,0.18) 0%, rgba(0,245,255,0.10) 40%, transparent 70%), radial-gradient(ellipse at 15% 10%, rgba(0,245,255,0.08) 0%, transparent 40%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Section label + heading */}
        <div ref={headingRef} className="mb-12">
          {/* Label row */}
          <div className="reveal-item flex items-center justify-center gap-3 mb-6">
            <div
              className="h-px w-12"
              style={{ background: "rgba(124,58,237,0.4)" }}
            />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#7c3aed" }}
            >
              Get In Touch
            </span>
            <div
              className="h-px w-12"
              style={{ background: "rgba(124,58,237,0.4)" }}
            />
          </div>

          {/* Heading */}
          <h2 className="reveal-item section-title text-5xl md:text-7xl text-white mb-5 leading-none">
            Let's <span className="text-gradient-multi">Connect</span>
          </h2>

          {/* Subtitle */}
          <p className="reveal-item text-white/50 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Have a project in mind? Let's create something extraordinary
            together.
          </p>
        </div>

        {/* Contact glass card */}
        <div
          ref={cardRef}
          data-ocid="contact.card"
          className="glass-card mx-auto mb-10 p-8 md:p-10 max-w-[600px]"
          style={{ border: "1px solid rgba(255,255,255,0.09)" }}
        >
          {/* Phone */}
          <a
            href="tel:+916267382299"
            data-ocid="contact.phone_link"
            className="flex items-center gap-4 group mb-6"
            aria-label="Call Lokesh Devda"
          >
            <span
              className="w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: "rgba(0,245,255,0.1)",
                border: "1px solid rgba(0,245,255,0.25)",
                boxShadow: "0 0 20px rgba(0,245,255,0.15)",
              }}
              aria-hidden="true"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00f5ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-label="Phone icon"
              >
                <title>Phone icon</title>
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.9 10.82 19.79 19.79 0 01.83 2.2 2 2 0 012.83 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.64a16 16 0 006.29 6.29l1-1a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </span>
            <div className="text-left min-w-0">
              <p className="text-xs text-white/35 tracking-wide mb-0.5">
                Phone
              </p>
              <p
                className="font-semibold text-base transition-colors duration-300 group-hover:opacity-100"
                style={{ color: "#00f5ff" }}
              >
                +91 6267382299
              </p>
            </div>
          </a>

          {/* Location */}
          <a
            href="https://maps.google.com/?q=Nyay+Nagar+Indore+MP"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="contact.location_link"
            className="flex items-center gap-4 group mb-8"
            aria-label="View location on map"
          >
            <span
              className="w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: "rgba(124,58,237,0.1)",
                border: "1px solid rgba(124,58,237,0.25)",
                boxShadow: "0 0 20px rgba(124,58,237,0.15)",
              }}
              aria-hidden="true"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7c3aed"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-label="Location pin icon"
              >
                <title>Location pin icon</title>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <div className="text-left min-w-0">
              <p className="text-xs text-white/35 tracking-wide mb-0.5">
                Location
              </p>
              <p
                className="font-semibold text-base transition-colors duration-300 group-hover:opacity-100"
                style={{ color: "#7c3aed" }}
              >
                Nyay Nagar, Indore, MP
              </p>
            </div>
          </a>

          {/* Divider */}
          <div
            className="mb-8"
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
            }}
          />

          {/* Magnetic CTA button */}
          <div
            ref={btnWrapRef}
            className="flex justify-center"
            style={{ minHeight: "70px" }}
          >
            <button
              ref={btnRef}
              type="button"
              onClick={() =>
                window.open("mailto:lokeshdevda@gmail.com", "_blank")
              }
              data-ocid="contact.cta_button"
              className="relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-display font-bold text-xl text-white will-change-transform"
              style={{
                background: "rgba(10,10,15,0.9)",
                border: "1px solid rgba(124,58,237,0.5)",
                boxShadow:
                  "0 0 0 0 transparent, inset 0 0 30px rgba(124,58,237,0.05)",
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 40px rgba(124,58,237,0.5), 0 0 80px rgba(0,245,255,0.2), inset 0 0 30px rgba(124,58,237,0.1)";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(0,245,255,0.7)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 0 0 transparent, inset 0 0 30px rgba(124,58,237,0.05)";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(124,58,237,0.5)";
              }}
            >
              {/* Gradient border overlay */}
              <span
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, transparent 50%, rgba(0,245,255,0.1) 100%)",
                }}
                aria-hidden="true"
              />
              <span className="relative z-10 text-gradient-multi">
                Let's Build Something
              </span>
              <span className="relative z-10 text-xl" aria-hidden="true">
                ✦
              </span>
            </button>
          </div>
        </div>

        {/* Footer area */}
        <footer
          data-ocid="contact.footer"
          className="flex flex-col items-center gap-5"
        >
          {/* Availability dot */}
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: "#06ffa5",
                boxShadow: "0 0 8px #06ffa5",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
              aria-hidden="true"
            />
            <span className="text-sm text-white/35">
              Currently available for freelance &amp; full-time roles
            </span>
          </div>

          {/* Social links */}
          <ul
            className="flex items-center gap-3 list-none p-0 m-0"
            aria-label="Social media links"
          >
            {SOCIALS.map((s, i) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid={`contact.social.${i + 1}`}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white/50 transition-all duration-300 hover:scale-110 neon-underline"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "rgba(0,245,255,0.4)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 0 16px rgba(0,245,255,0.3)";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "#00f5ff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "none";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "rgba(255,255,255,0.5)";
                  }}
                >
                  {s.short}
                </a>
              </li>
            ))}
          </ul>

          {/* Copyright */}
          <p className="text-xs text-white/25 tracking-wide">
            © {new Date().getFullYear()} Lokesh Devda. All rights reserved.
          </p>

          {/* Branding */}
          <p className="text-xs text-white/20">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/35 hover:text-white/60 transition-colors duration-200 neon-underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>

      {/* Large decorative watermark text */}
      <div
        className="absolute bottom-0 left-0 right-0 text-center overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-display font-black text-[12vw] leading-none"
          style={{ color: "rgba(255,255,255,0.012)" }}
        >
          CONTACT
        </span>
      </div>
    </section>
  );
}
