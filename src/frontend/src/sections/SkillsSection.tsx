import { useEffect, useRef, useState } from "react";
import { SKILLS } from "../data/portfolioData";
import type { Skill } from "../types/portfolio";

const SKILL_ABBR: Record<string, string> = {
  CorelDraw: "Cd",
  Illustrator: "Ai",
  Photoshop: "Ps",
  "Affinity Designer": "Af",
  WordPress: "WP",
  "Web Design": "Web",
};

const RADIUS = 48;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<SVGCircleElement>(null);
  const [displayPercent, setDisplayPercent] = useState(0);
  const animatedRef = useRef(false);

  useEffect(() => {
    const card = cardRef.current;
    const circle = progressRef.current;
    if (!card || !circle) return;

    circle.style.strokeDashoffset = String(CIRCUMFERENCE);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          import("gsap").then(({ gsap }) => {
            const proxy = { value: 0 };
            gsap.to(proxy, {
              value: skill.percent,
              duration: 1.6,
              delay: index * 0.08,
              ease: "power2.out",
              onUpdate() {
                const offset = CIRCUMFERENCE * (1 - proxy.value / 100);
                if (progressRef.current) {
                  progressRef.current.style.strokeDashoffset = String(offset);
                }
                setDisplayPercent(Math.round(proxy.value));
              },
              onComplete() {
                const finalOffset = CIRCUMFERENCE * (1 - skill.percent / 100);
                if (progressRef.current) {
                  progressRef.current.style.strokeDashoffset =
                    String(finalOffset);
                }
                setDisplayPercent(skill.percent);
              },
            });
          });
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [skill.percent, index]);

  const abbr = SKILL_ABBR[skill.name] ?? skill.name.slice(0, 2);

  return (
    <div
      ref={cardRef}
      data-ocid={`skills.card.${index + 1}`}
      className="glass-card p-6 rounded-2xl flex flex-col items-center text-center transition-luxury group relative overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${skill.color}15 0%, transparent 70%)`,
          boxShadow: `inset 0 0 0 1px ${skill.color}35`,
        }}
      />

      {/* SVG Progress Ring */}
      <div
        className="relative w-[120px] h-[120px] mb-5 flex-shrink-0"
        aria-hidden="true"
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          className="rotate-[-90deg]"
          aria-hidden="true"
        >
          <defs>
            <filter
              id={`ring-glow-${index}`}
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Track */}
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Progress arc */}
          <circle
            ref={progressRef}
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            stroke={skill.color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            filter={`url(#ring-glow-${index})`}
            style={{ filter: `drop-shadow(0 0 5px ${skill.color}bb)` }}
          />
        </svg>

        {/* Center label — not rotated */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span
            className="font-display font-bold text-xl leading-none mb-1 group-hover:scale-110 transition-transform duration-300"
            style={{ color: skill.color }}
          >
            {abbr}
          </span>
          <span className="text-[11px] font-semibold text-white/50">
            {displayPercent}%
          </span>
        </div>
      </div>

      {/* Skill name */}
      <h3 className="font-display font-bold text-white text-sm md:text-base mb-1 leading-tight">
        {skill.name}
      </h3>
      <p className="text-[11px] text-white/35 mb-4">{skill.years} years</p>

      {/* Mini progress bar — synced with ring */}
      <div
        className="w-full h-[3px] rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${displayPercent}%`,
            background: `linear-gradient(90deg, ${skill.color}, rgba(255,255,255,0.35))`,
            boxShadow: `0 0 8px ${skill.color}70`,
            transition: "width 0.04s linear",
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        if (!cardsRef.current) return;
        const cards = cardsRef.current.querySelectorAll(
          "[data-ocid^='skills.card']",
        );
        gsap.set(cards, { opacity: 0, y: 40 });
        gsap.to(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
          },
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
        });
      });
    });
  }, []);

  return (
    <section
      id="skills"
      data-ocid="skills.section"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "#111118" }}
    >
      {/* Ambient radial glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 80% 30%, rgba(124,58,237,0.1) 0%, transparent 55%), radial-gradient(ellipse at 20% 70%, rgba(0,245,255,0.07) 0%, transparent 50%)",
        }}
      />

      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.4) 30%, rgba(0,245,255,0.4) 70%, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="h-px flex-1 max-w-12"
              style={{ background: "rgba(0,245,255,0.4)" }}
            />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#00f5ff" }}
            >
              Expertise
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="section-title text-4xl md:text-5xl lg:text-6xl text-white">
                Skills & <span className="text-gradient-cyan">Tools</span>
              </h2>
              <p className="text-white/50 text-lg mt-3 max-w-lg">
                Precision tools wielded with 5+ years of creative mastery
              </p>
            </div>

            {/* Quick stats */}
            <div
              className="flex items-center gap-8 flex-shrink-0"
              data-ocid="skills.stats"
            >
              {[
                { val: "5+", label: "Years", color: "#00f5ff" },
                { val: "50+", label: "Clients", color: "#7c3aed" },
                { val: "200+", label: "Projects", color: "#ff2d55" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className="font-display font-bold text-3xl leading-none mb-1"
                    style={{
                      color: stat.color,
                      textShadow: `0 0 20px ${stat.color}80`,
                    }}
                  >
                    {stat.val}
                  </div>
                  <div className="text-[10px] text-white/40 tracking-widest uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          data-ocid="skills.list"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5"
        >
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        {/* Legend */}
        <div
          className="mt-10 flex items-center justify-center gap-5 flex-wrap"
          aria-hidden="true"
        >
          {SKILLS.map((skill) => (
            <div key={skill.name} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background: skill.color,
                  boxShadow: `0 0 5px ${skill.color}`,
                }}
              />
              <span className="text-[11px] text-white/30">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
