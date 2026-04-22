import { useEffect, useRef } from "react";
import { TIMELINE } from "../data/portfolioData";

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert?: () => void } = {};
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        if (!sectionRef.current) return;

        ctx = gsap.context(() => {
          // Animate vertical center line (scrub)
          if (lineRef.current) {
            gsap.fromTo(
              lineRef.current,
              { scaleY: 0 },
              {
                scaleY: 1,
                transformOrigin: "top center",
                ease: "none",
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: "top 60%",
                  end: "bottom 40%",
                  scrub: 1,
                },
              },
            );
          }

          // Animate each timeline item — left vs right direction
          TIMELINE.forEach((_, i) => {
            const isLeft = i % 2 === 0;
            gsap.fromTo(
              `[data-ocid="timeline.item.${i + 1}"]`,
              { x: isLeft ? -60 : 60, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: `[data-ocid="timeline.item.${i + 1}"]`,
                  start: "top 82%",
                },
              },
            );
          });
        }, sectionRef);
      });
    });

    return () => {
      if (ctx.revert) ctx.revert();
    };
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      data-ocid="timeline.section"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "#111118" }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 30% 60%, rgba(124,58,237,0.08) 0%, transparent 55%), radial-gradient(ellipse at 75% 30%, rgba(0,245,255,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="mb-20 md:mb-24">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="h-px w-10 flex-shrink-0"
              style={{ background: "rgba(0,245,255,0.45)" }}
            />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#00f5ff" }}
            >
              Experience
            </span>
          </div>
          <h2 className="section-title text-4xl md:text-6xl text-white">
            My <span className="text-gradient-cyan">Journey</span>
          </h2>
          <p className="text-white/50 text-lg mt-3 font-body">
            5 companies · 4+ years of creative growth
          </p>
        </div>

        {/* Timeline wrapper */}
        <div className="relative">
          {/* Vertical spine line — desktop: center, mobile: left */}
          <div
            ref={lineRef}
            data-ocid="timeline.line"
            className="absolute top-0 bottom-0 w-px md:left-1/2 left-5"
            style={{
              background:
                "linear-gradient(to bottom, rgba(124,58,237,0.9) 0%, rgba(0,245,255,0.7) 50%, rgba(255,45,85,0.5) 100%)",
              boxShadow: "0 0 8px rgba(0,245,255,0.3)",
              transform: "translateX(-0.5px)",
            }}
          />

          <div className="space-y-12 md:space-y-0">
            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={item.company}
                  data-ocid={`timeline.item.${i + 1}`}
                  className="relative md:mb-14"
                >
                  {/* Center / left node */}
                  <div
                    className={[
                      "absolute z-20 flex items-center justify-center",
                      // Mobile: pinned to left spine
                      "left-5 -translate-x-1/2",
                      // Desktop: pinned to center spine
                      "md:left-1/2 md:-translate-x-1/2",
                    ].join(" ")}
                    style={{ top: "24px" }}
                  >
                    {/* Outer pulsing ring */}
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: "28px",
                        height: "28px",
                        background: "transparent",
                        border: `1.5px solid ${item.color}55`,
                        animation: "ring-pulse 2.4s ease-out infinite",
                      }}
                    />
                    {/* Second pulse ring — offset timing */}
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: "28px",
                        height: "28px",
                        background: "transparent",
                        border: `1.5px solid ${item.color}35`,
                        animation: "ring-pulse 2.4s ease-out 0.8s infinite",
                      }}
                    />
                    {/* Core dot */}
                    <div
                      className="relative w-4 h-4 rounded-full flex-shrink-0"
                      style={{
                        background: item.color,
                        boxShadow: `0 0 12px ${item.color}cc, 0 0 24px ${item.color}55`,
                      }}
                    />
                  </div>

                  {/* Desktop: alternating card + connector layout */}
                  <div
                    className={[
                      "hidden md:flex items-start",
                      isLeft ? "flex-row" : "flex-row-reverse",
                    ].join(" ")}
                  >
                    {/* Card side (left or right — 44% width) */}
                    <div
                      className={[
                        "w-[44%]",
                        isLeft ? "pr-10 text-right" : "pl-10 text-left",
                      ].join(" ")}
                    >
                      <TimelineCard
                        item={item}
                        align={isLeft ? "right" : "left"}
                      />
                    </div>

                    {/* Center spacer (12% = spine area) */}
                    <div className="w-[12%] flex-shrink-0" />

                    {/* Empty counterpart side */}
                    <div className="w-[44%]" />
                  </div>

                  {/* Mobile: single column card (offset from left spine) */}
                  <div className="md:hidden pl-12 pt-1">
                    <TimelineCard item={item} align="left" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Sub-component ---- */

interface CardProps {
  item: (typeof TIMELINE)[number];
  align: "left" | "right";
}

function TimelineCard({ item, align }: CardProps) {
  return (
    <div
      className="glass-card p-5 rounded-2xl transition-luxury hover:scale-[1.02] group relative overflow-hidden"
      style={{ border: `1px solid ${item.color}28` }}
    >
      {/* Hover shimmer overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${item.color}10 0%, transparent 60%)`,
        }}
      />

      {/* Date + current badge */}
      <div
        className={`flex items-center gap-2 mb-3 ${
          align === "right" ? "justify-end" : "justify-start"
        }`}
      >
        <span
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            background: `${item.color}18`,
            color: item.color,
            border: `1px solid ${item.color}35`,
          }}
        >
          {item.year}
        </span>
        {item.isCurrent && (
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              background: "rgba(6,255,165,0.12)",
              color: "#06ffa5",
              border: "1px solid rgba(6,255,165,0.3)",
            }}
            data-ocid={`timeline.current_badge.${TIMELINE.findIndex((t) => t.company === item.company) + 1}`}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#06ffa5" }}
            />
            Current
          </span>
        )}
      </div>

      {/* Company */}
      <h3
        className={`font-display font-bold text-lg md:text-xl text-white leading-tight mb-1 ${
          align === "right" ? "text-right" : "text-left"
        }`}
      >
        {item.company}
      </h3>

      {/* Role */}
      <p
        className={`text-sm font-semibold mb-3 ${
          align === "right" ? "text-right" : "text-left"
        }`}
        style={{ color: item.color }}
      >
        {item.role}
      </p>

      {/* Description */}
      <p
        className={`text-sm text-white/55 leading-relaxed ${
          align === "right" ? "text-right" : "text-left"
        }`}
      >
        {item.description}
      </p>
    </div>
  );
}
