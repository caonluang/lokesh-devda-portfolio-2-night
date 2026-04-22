import { useEffect, useRef } from "react";
import { SKILLS } from "../data/portfolioData";

const SOFTWARE_ICONS = [
  { label: "CD", name: "CorelDraw", color: "#00f5ff" },
  { label: "Ai", name: "Illustrator", color: "#f5a623" },
  { label: "Ps", name: "Photoshop", color: "#7c3aed" },
  { label: "Af", name: "Affinity", color: "#ff2d55" },
  { label: "WP", name: "WordPress", color: "#a855f7" },
];

// Skills with exact percentages from requirements
const ABOUT_SKILLS = [
  { name: "CorelDraw", percent: 95, color: "#00f5ff" },
  { name: "Illustrator", percent: 90, color: "#f5a623" },
  { name: "Photoshop", percent: 88, color: "#7c3aed" },
  { name: "Affinity Designer", percent: 80, color: "#ff2d55" },
  { name: "WordPress", percent: 72, color: "#a855f7" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRevealRef = useRef<HTMLDivElement>(null);
  const skillBarsRef = useRef<HTMLDivElement>(null);
  const barFillsRef = useRef<(HTMLDivElement | null)[]>([]);

  // 3D tilt on photo card
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let gsapInstance: typeof import("gsap").gsap | null = null;

    import("gsap").then(({ gsap }) => {
      gsapInstance = gsap;

      const onMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateX: -y * 15,
          rotateY: x * 15,
          transformPerspective: 1000,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const onMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        });
      };

      card.addEventListener("mousemove", onMouseMove);
      card.addEventListener("mouseleave", onMouseLeave);

      return () => {
        card.removeEventListener("mousemove", onMouseMove);
        card.removeEventListener("mouseleave", onMouseLeave);
      };
    });

    return () => {
      if (gsapInstance && card) {
        gsapInstance.killTweensOf(card);
      }
    };
  }, []);

  // ScrollTrigger text reveal + skill bars
  useEffect(() => {
    const textEl = textRevealRef.current;
    const skillsEl = skillBarsRef.current;
    if (!textEl && !skillsEl) return;

    let ctx: ReturnType<typeof import("gsap").gsap.context> | null = null;

    import("gsap").then(async ({ gsap }) => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Text reveal
        if (textEl) {
          const items = textEl.querySelectorAll("[data-reveal]");
          gsap.fromTo(
            items,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: textEl,
                start: "top 80%",
              },
            },
          );
        }

        // Skill bars
        barFillsRef.current.forEach((bar, i) => {
          if (!bar) return;
          const targetWidth = ABOUT_SKILLS[i].percent;
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: `${targetWidth}%`,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: bar,
                start: "top 80%",
              },
            },
          );
        });
      });
    });

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      data-ocid="about.section"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "#111118" }}
    >
      {/* Ambient background radials */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 30%, rgba(124,58,237,0.12) 0%, transparent 55%), radial-gradient(ellipse at 10% 70%, rgba(0,245,255,0.08) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div
          className="flex items-center gap-4 mb-14"
          data-ocid="about.section_header"
        >
          <div
            className="h-px w-10 shrink-0"
            style={{ background: "rgba(0,245,255,0.4)" }}
          />
          <span
            className="text-xs font-semibold tracking-[0.25em] uppercase"
            style={{ color: "#00f5ff" }}
          >
            About Me
          </span>
          <div
            className="h-px flex-1"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
        </div>

        <div className="grid md:grid-cols-[40%_60%] gap-12 lg:gap-20 items-center">
          {/* ─── LEFT: 3D Tilt Photo Card ─── */}
          <div
            className="flex justify-center md:justify-start"
            style={{ perspective: "1000px" }}
          >
            <div
              ref={cardRef}
              data-ocid="about.photo_card"
              className="relative w-64 sm:w-72 md:w-80 will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Ambient glow */}
              <div
                className="absolute inset-0 rounded-3xl -z-10 blur-2xl"
                style={{ background: "rgba(124,58,237,0.25)" }}
              />

              {/* Main photo card */}
              <div
                className="glass-card overflow-hidden aspect-[3/4] rounded-3xl floating"
                style={{ border: "1px solid rgba(124,58,237,0.35)" }}
              >
                <img
                  src="https://picsum.photos/seed/lokesh-about/350/450"
                  alt="Lokesh Devda — Graphic Designer & Web Developer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Bottom gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.3) 40%, transparent 70%)",
                  }}
                />
                {/* Bottom name badge inside card */}
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="font-display font-bold text-white text-lg leading-tight">
                    Lokesh Devda
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: "#00f5ff" }}>
                    Graphic Designer &amp; Web Developer
                  </p>
                </div>
              </div>

              {/* ✦ Available for Work badge */}
              <div
                data-ocid="about.available_badge"
                className="absolute -top-3 -right-3 glass-card px-3 py-2 rounded-2xl text-center pulse-glow"
                style={{ border: "1px solid rgba(0,245,255,0.4)" }}
              >
                <div
                  className="font-display font-bold text-2xl leading-none"
                  style={{ color: "#00f5ff" }}
                >
                  5+
                </div>
                <div className="text-[10px] font-medium tracking-widest uppercase text-white/50 mt-0.5">
                  Yrs Exp.
                </div>
              </div>

              {/* Location badge */}
              <div
                data-ocid="about.location_badge"
                className="absolute -bottom-4 -left-4 glass-card px-3 py-2 rounded-2xl flex items-center gap-2"
                style={{ border: "1px solid rgba(124,58,237,0.4)" }}
              >
                <span className="text-sm">📍</span>
                <span className="text-xs text-white/70">Indore, India</span>
              </div>

              {/* Available tag */}
              <div
                className="absolute top-1/2 -right-5 -translate-y-1/2 flex flex-col items-center gap-1"
                style={{ writingMode: "vertical-rl" }}
              >
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">
                  ✦ Available
                </span>
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Text + Skills ─── */}
          <div
            data-ocid="about.content"
            ref={textRevealRef}
            className="space-y-8"
          >
            {/* Text reveals */}
            <div>
              <p
                data-reveal
                className="text-xs font-semibold tracking-[0.3em] uppercase mb-3"
                style={{ color: "#00f5ff" }}
              >
                Hi, I'm
              </p>

              <h2
                data-reveal
                className="section-title text-4xl sm:text-5xl lg:text-6xl text-white mb-5"
              >
                Lokesh <span className="text-gradient-purple">Devda</span>
              </h2>

              <p
                data-reveal
                className="text-white/60 text-lg leading-relaxed mb-3"
              >
                A passionate Graphic Designer &amp; Web Developer from Indore,
                India with{" "}
                <span className="text-white/90 font-medium">
                  5+ years of crafting visual experiences
                </span>{" "}
                that captivate and convert. I blend design thinking with
                technical expertise to create brands that stand out.
              </p>

              <div data-reveal className="flex items-center gap-2 mt-4">
                <span
                  className="inline-flex items-center gap-2 glass-card px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    border: "1px solid rgba(245,166,35,0.3)",
                    color: "#f5a623",
                  }}
                >
                  <span>📍</span>
                  Indore, Madhya Pradesh
                </span>
                <span
                  className="inline-flex items-center gap-2 glass-card px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    border: "1px solid rgba(0,245,255,0.3)",
                    color: "#00f5ff",
                  }}
                >
                  <span>✦</span>
                  Open to Work
                </span>
              </div>
            </div>

            {/* Skill bars */}
            <div
              data-reveal
              ref={skillBarsRef}
              data-ocid="about.skills_list"
              className="space-y-4"
            >
              <h3 className="text-sm font-semibold tracking-widest uppercase text-white/40 mb-5">
                Core Skills
              </h3>
              {ABOUT_SKILLS.map((skill, i) => (
                <div key={skill.name} data-ocid={`about.skill.${i + 1}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-white/80">
                      {skill.name}
                    </span>
                    <span
                      className="text-xs font-bold tabular-nums"
                      style={{ color: skill.color }}
                    >
                      {skill.percent}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  >
                    <div
                      ref={(el) => {
                        barFillsRef.current[i] = el;
                      }}
                      className="h-full rounded-full"
                      style={{
                        width: "0%",
                        background: `linear-gradient(90deg, ${skill.color}, rgba(255,255,255,0.25))`,
                        boxShadow: `0 0 8px ${skill.color}80`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Software icon badges */}
            <div data-reveal>
              <h3 className="text-sm font-semibold tracking-widest uppercase text-white/40 mb-4">
                Tools &amp; Software
              </h3>
              <div
                data-ocid="about.software_list"
                className="flex flex-wrap gap-3"
              >
                {SOFTWARE_ICONS.map((sw) => (
                  <div
                    key={sw.name}
                    data-ocid={`about.software.${sw.label.toLowerCase()}`}
                    className="group relative flex flex-col items-center gap-1.5 cursor-pointer"
                    title={sw.name}
                  >
                    {/* Icon circle */}
                    <div
                      className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center font-display font-bold text-sm transition-all duration-300 group-hover:scale-110"
                      style={{
                        border: `1px solid ${sw.color}30`,
                        color: sw.color,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow =
                          `0 0 20px ${sw.color}50, 0 0 40px ${sw.color}20`;
                        (e.currentTarget as HTMLDivElement).style.borderColor =
                          `${sw.color}80`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.boxShadow =
                          "none";
                        (e.currentTarget as HTMLDivElement).style.borderColor =
                          `${sw.color}30`;
                      }}
                    >
                      {sw.label}
                    </div>
                    {/* Label */}
                    <span className="text-[10px] text-white/40 group-hover:text-white/70 transition-colors duration-200">
                      {sw.name}
                    </span>
                  </div>
                ))}

                {/* Years stat */}
                <div className="flex flex-col items-center gap-1.5 ml-auto">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-display font-bold text-base"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(0,245,255,0.2))",
                      border: "1px solid rgba(124,58,237,0.4)",
                      color: "#ffffff",
                    }}
                  >
                    5+
                  </div>
                  <span className="text-[10px] text-white/40">Years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
