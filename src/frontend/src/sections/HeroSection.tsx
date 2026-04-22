import { useEffect, useRef, useState } from "react";

const PARTICLES = [
  {
    id: "p0",
    color: "#00f5ff",
    size: 4,
    left: "8%",
    top: "15%",
    dur: 5,
    delay: 0,
  },
  {
    id: "p1",
    color: "#7c3aed",
    size: 3,
    left: "18%",
    top: "72%",
    dur: 7,
    delay: 0.6,
  },
  {
    id: "p2",
    color: "#ff2d55",
    size: 2,
    left: "30%",
    top: "38%",
    dur: 4,
    delay: 1.2,
  },
  {
    id: "p3",
    color: "#00f5ff",
    size: 5,
    left: "44%",
    top: "85%",
    dur: 6,
    delay: 0.3,
  },
  {
    id: "p4",
    color: "#7c3aed",
    size: 2,
    left: "55%",
    top: "22%",
    dur: 8,
    delay: 1.8,
  },
  {
    id: "p5",
    color: "#ff2d55",
    size: 4,
    left: "63%",
    top: "60%",
    dur: 5,
    delay: 0.9,
  },
  {
    id: "p6",
    color: "#00f5ff",
    size: 3,
    left: "72%",
    top: "10%",
    dur: 7,
    delay: 2.1,
  },
  {
    id: "p7",
    color: "#7c3aed",
    size: 2,
    left: "80%",
    top: "45%",
    dur: 4,
    delay: 0.4,
  },
  {
    id: "p8",
    color: "#f5a623",
    size: 4,
    left: "88%",
    top: "78%",
    dur: 6,
    delay: 1.5,
  },
  {
    id: "p9",
    color: "#ff2d55",
    size: 3,
    left: "93%",
    top: "30%",
    dur: 5,
    delay: 0.7,
  },
  {
    id: "p10",
    color: "#00f5ff",
    size: 2,
    left: "5%",
    top: "50%",
    dur: 8,
    delay: 2.4,
  },
  {
    id: "p11",
    color: "#7c3aed",
    size: 5,
    left: "25%",
    top: "90%",
    dur: 6,
    delay: 1.1,
  },
  {
    id: "p12",
    color: "#f5a623",
    size: 3,
    left: "48%",
    top: "5%",
    dur: 4,
    delay: 0.2,
  },
  {
    id: "p13",
    color: "#00f5ff",
    size: 2,
    left: "68%",
    top: "92%",
    dur: 7,
    delay: 1.7,
  },
  {
    id: "p14",
    color: "#ff2d55",
    size: 4,
    left: "85%",
    top: "55%",
    dur: 5,
    delay: 0.5,
  },
  {
    id: "p15",
    color: "#7c3aed",
    size: 3,
    left: "96%",
    top: "18%",
    dur: 6,
    delay: 2.0,
  },
  {
    id: "p16",
    color: "#00f5ff",
    size: 2,
    left: "38%",
    top: "65%",
    dur: 8,
    delay: 1.3,
  },
  {
    id: "p17",
    color: "#f5a623",
    size: 4,
    left: "12%",
    top: "35%",
    dur: 5,
    delay: 0.8,
  },
];

const NAME_LETTERS = "LOKESH DEVDA".split("").map((char, i) => ({
  char,
  key: `nl-${i}`,
}));
const TAGLINE = "Crafting Visual Experiences";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLButtonElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const availableBadgeRef = useRef<HTMLDivElement>(null);
  const [typewriterText, setTypewriterText] = useState("");

  // Typewriter effect
  useEffect(() => {
    let idx = 0;
    const iv = setInterval(() => {
      idx++;
      setTypewriterText(TAGLINE.slice(0, idx));
      if (idx >= TAGLINE.length) clearInterval(iv);
    }, 55);
    // Delay start until after name animation (~NAME_LETTERS.length * 80ms + 400ms sub fade)
    const timeout = setTimeout(() => {}, 0);
    return () => {
      clearInterval(iv);
      clearTimeout(timeout);
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    let ctx: { revert?: () => void } = {};

    (async () => {
      const { gsap } = await import("gsap");

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Photo fade in
        if (photoRef.current) {
          tl.fromTo(
            photoRef.current,
            { opacity: 0, scale: 0.85, y: 30 },
            { opacity: 1, scale: 1, y: 0, duration: 1.1 },
            0,
          );
        }

        // Available badge
        if (availableBadgeRef.current) {
          tl.fromTo(
            availableBadgeRef.current,
            { opacity: 0, y: -16 },
            { opacity: 1, y: 0, duration: 0.5 },
            0.2,
          );
        }

        // Name letters drop
        const validLetters = lettersRef.current.filter(Boolean);
        if (validLetters.length) {
          tl.fromTo(
            validLetters,
            { y: -60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, stagger: 0.065 },
            0.4,
          );
        }

        // Subtitle
        if (subtitleRef.current) {
          tl.fromTo(
            subtitleRef.current,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.6 },
            1.6,
          );
        }

        // CTA group
        if (ctaGroupRef.current) {
          tl.fromTo(
            ctaGroupRef.current,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.6 },
            2.4,
          );
        }

        // Scroll indicator
        if (scrollIndicatorRef.current) {
          tl.fromTo(
            scrollIndicatorRef.current,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5 },
            2.8,
          );
        }
      }, sectionRef.current ?? undefined);
    })();

    return () => ctx.revert?.();
  }, []);

  // Magnetic CTA button
  useEffect(() => {
    const btn = ctaBtnRef.current;
    if (!btn) return;

    let gsapInstance: typeof import("gsap")["gsap"] | null = null;

    (async () => {
      const { gsap } = await import("gsap");
      gsapInstance = gsap;
    })();

    const onMove = (e: MouseEvent) => {
      if (!gsapInstance) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsapInstance.to(btn, {
        x: x * 0.32,
        y: y * 0.32,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      if (!gsapInstance) return;
      gsapInstance.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
      });
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);

    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const handleExploreClick = () => {
    document
      .getElementById("categories")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      data-ocid="hero.section"
      className="relative min-h-screen gradient-mesh overflow-hidden flex flex-col"
      style={{ paddingTop: "80px" }}
    >
      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            left: p.left,
            top: p.top,
            opacity: 0.65,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `float ${p.dur}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Decorative rotating ring */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(124,58,237,0.07)",
          borderRadius: "50%",
          animation: "spin-slow 30s linear infinite",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: "900px",
          height: "900px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(0,245,255,0.05)",
          borderRadius: "50%",
          animation: "spin-slow 50s linear infinite reverse",
        }}
      />

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 lg:px-24">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* LEFT — Photo area */}
          <div className="flex justify-center md:justify-end order-1 md:order-1">
            <div className="relative">
              {/* Glass circle frame */}
              <div
                className="relative flex items-center justify-center"
                style={{
                  width: "280px",
                  height: "280px",
                  borderRadius: "50%",
                  background: "rgba(124,58,237,0.12)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow:
                    "0 0 60px rgba(124,58,237,0.25), inset 0 0 40px rgba(124,58,237,0.08)",
                  overflow: "visible",
                }}
              >
                {/* Rotating accent ring */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    border: "2px solid transparent",
                    background:
                      "linear-gradient(#0a0a0f, #0a0a0f) padding-box, linear-gradient(135deg, rgba(124,58,237,0.8), transparent 40%, rgba(0,245,255,0.8)) border-box",
                    animation: "spin-slow 12s linear infinite",
                  }}
                />

                {/* Photo breaking out of circle */}
                <img
                  ref={photoRef}
                  src="https://picsum.photos/seed/lokesh-hero/400/500"
                  alt="Lokesh Devda — Graphic Designer & Web Developer"
                  style={{
                    position: "absolute",
                    top: "-60px",
                    width: "240px",
                    height: "320px",
                    objectFit: "cover",
                    borderRadius: "120px 120px 60% 60%",
                    boxShadow:
                      "0 0 50px rgba(124,58,237,0.5), 0 0 100px rgba(124,58,237,0.2), 0 20px 60px rgba(0,0,0,0.6)",
                    border: "2px solid rgba(124,58,237,0.4)",
                    opacity: 0,
                    zIndex: 10,
                  }}
                />
              </div>

              {/* Floating experience badge */}
              <div
                className="absolute glass-card px-4 py-2 text-center"
                style={{
                  bottom: "-10px",
                  right: "-20px",
                  borderRadius: "14px",
                  border: "1px solid rgba(0,245,255,0.25)",
                  boxShadow: "0 0 20px rgba(0,245,255,0.12)",
                  animation: "float 5s ease-in-out infinite",
                  animationDelay: "1s",
                  zIndex: 20,
                }}
              >
                <div
                  className="text-2xl font-bold font-display"
                  style={{ color: "#00f5ff" }}
                >
                  5+
                </div>
                <div
                  className="text-xs tracking-wider uppercase"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Years Exp.
                </div>
              </div>

              {/* Floating location badge */}
              <div
                className="absolute glass-card px-3 py-2 flex items-center gap-2"
                style={{
                  top: "20px",
                  left: "-30px",
                  borderRadius: "12px",
                  border: "1px solid rgba(124,58,237,0.25)",
                  boxShadow: "0 0 20px rgba(124,58,237,0.12)",
                  animation: "float 6s ease-in-out infinite",
                  animationDelay: "0.3s",
                  zIndex: 20,
                }}
              >
                <span style={{ fontSize: "14px" }}>📍</span>
                <span
                  className="text-xs font-body"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Indore, India
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — Text area */}
          <div className="flex flex-col order-2 md:order-2 text-center md:text-left">
            {/* Available badge */}
            <div
              ref={availableBadgeRef}
              data-ocid="hero.available_badge"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm mb-6 self-center md:self-start opacity-0"
              style={{
                border: "1px solid rgba(0,245,255,0.2)",
                color: "#00f5ff",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: "#00f5ff",
                  boxShadow: "0 0 8px #00f5ff",
                  animation: "pulse-glow 1.8s ease-in-out infinite",
                }}
              />
              Available for work
            </div>

            {/* Name — letter split */}
            <h1
              className="font-display leading-none tracking-tight mb-4"
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
              }}
              aria-label="LOKESH DEVDA"
            >
              {NAME_LETTERS.map(({ char, key }, i) => (
                <span
                  key={key}
                  ref={(el) => {
                    if (el) lettersRef.current[i] = el;
                  }}
                  className="inline-block"
                  style={{
                    opacity: 0,
                    ...(i >= 7
                      ? {
                          background:
                            "linear-gradient(135deg, #7c3aed 0%, #00f5ff 60%, #ff2d55 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }
                      : { color: "#ffffff" }),
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="font-body text-lg md:text-xl mb-3 opacity-0"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Graphic Designer &amp; Web Developer
            </p>

            {/* Tagline typewriter */}
            <div
              className="font-display font-semibold text-xl md:text-2xl mb-8"
              style={{ minHeight: "2em", color: "#00f5ff" }}
            >
              <span ref={taglineRef}>{typewriterText}</span>
              <span
                className="inline-block w-0.5 h-6 ml-1 align-middle"
                style={{
                  background: "#00f5ff",
                  animation: "blink-cursor 0.85s step-end infinite",
                  opacity: typewriterText.length < TAGLINE.length ? 1 : 0,
                }}
              />
            </div>

            {/* CTA group */}
            <div
              ref={ctaGroupRef}
              className="flex flex-col sm:flex-row gap-4 items-center md:items-start opacity-0"
            >
              {/* Primary magnetic CTA */}
              <button
                ref={ctaBtnRef}
                type="button"
                onClick={handleExploreClick}
                data-ocid="hero.cta_button"
                className="relative px-8 py-4 rounded-2xl font-display font-bold text-base tracking-wide transition-all duration-300 will-change-transform"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(0,245,255,0.15))",
                  border: "1px solid rgba(124,58,237,0.6)",
                  color: "#ffffff",
                  boxShadow:
                    "0 0 30px rgba(124,58,237,0.3), inset 0 0 20px rgba(124,58,237,0.05)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <span className="relative z-10">Explore Work</span>
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(0,245,255,0.2))",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.opacity = "0";
                  }}
                />
              </button>

              {/* Secondary — Let's Talk */}
              <button
                type="button"
                data-ocid="hero.secondary_button"
                className="px-8 py-4 rounded-2xl font-body font-medium text-base tracking-wide transition-smooth"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.6)",
                  background: "rgba(255,255,255,0.03)",
                }}
                onClick={() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Let's Talk
              </button>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 mt-10 items-center justify-center md:justify-start">
              {[
                { value: "50+", label: "Projects Done" },
                { value: "5+", label: "Years Active" },
                { value: "20+", label: "Happy Clients" },
              ].map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <div
                    className="font-display font-bold text-2xl"
                    style={{ color: "#7c3aed" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs tracking-wider uppercase"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        data-ocid="hero.scroll_indicator"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
        style={{ zIndex: 10 }}
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Scroll
        </span>

        {/* Bouncing arrow with pulse ring */}
        <div className="relative flex items-center justify-center">
          {/* Pulse ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: "36px",
              height: "36px",
              border: "1px solid rgba(0,245,255,0.4)",
              animation: "ring-pulse 2s ease-out infinite",
            }}
          />
          {/* Arrow container */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center relative"
            style={{
              background: "rgba(0,245,255,0.08)",
              border: "1px solid rgba(0,245,255,0.3)",
              animation: "bounce-scroll 1.6s ease-in-out infinite",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7 1v9M3 7l4 4 4-4"
                stroke="#00f5ff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
