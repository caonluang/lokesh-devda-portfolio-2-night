import { useCallback, useEffect, useRef } from "react";
import { CATEGORIES } from "../data/portfolioData";
import type { Category } from "../types/portfolio";

interface CategoriesSectionProps {
  onCategorySelect: (categoryId: string) => void;
}

const MOSAIC_COUNT = 9;

interface CategoryCardProps {
  category: Category;
  index: number;
  onSelect: (id: string) => void;
}

function CategoryCard({ category, index, onSelect }: CategoryCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const mosaicRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gsapRef = useRef<typeof import("gsap")["gsap"] | null>(null);

  const getGsap = useCallback(async () => {
    if (gsapRef.current) return gsapRef.current;
    const { gsap } = await import("gsap");
    gsapRef.current = gsap;
    return gsap;
  }, []);

  const handleMouseEnter = useCallback(async () => {
    const gsap = await getGsap();
    const card = cardRef.current;
    const bg = bgRef.current;
    const tiles = mosaicRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!card || !bg || tiles.length === 0) return;

    gsap.to(card, {
      scale: 1.03,
      boxShadow: `0 0 30px ${category.color}80, 0 0 60px ${category.color}33, inset 0 0 30px ${category.color}0d`,
      borderColor: category.color,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(bg, {
      yPercent: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.fromTo(
      tiles,
      { y: 28, opacity: 0.25, scale: 0.82 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.55,
        stagger: 0.04,
        ease: "back.out(1.4)",
        overwrite: true,
      },
    );
  }, [category.color, getGsap]);

  const handleMouseLeave = useCallback(async () => {
    const gsap = await getGsap();
    const card = cardRef.current;
    const bg = bgRef.current;
    const tiles = mosaicRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!card || !bg) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      boxShadow: "0 0 0px transparent",
      borderColor: "rgba(124,58,237,0.25)",
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.to(bg, {
      yPercent: 100,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
    });

    if (tiles.length) {
      gsap.to(tiles, {
        y: 16,
        opacity: 0.55,
        scale: 0.92,
        duration: 0.35,
        stagger: 0.025,
        ease: "power2.in",
        overwrite: true,
      });
    }
  }, [getGsap]);

  const handleMouseMove = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      const gsap = await getGsap();
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateX: -cy * 12,
        rotateY: cx * 12,
        transformPerspective: 800,
        duration: 0.25,
        ease: "power1.out",
      });
    },
    [getGsap],
  );

  const handleClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      const gsap = await getGsap();
      const card = cardRef.current;
      if (card) {
        gsap.to(card, {
          scale: 0.94,
          opacity: 0.7,
          duration: 0.18,
          ease: "power2.in",
          onComplete: () => {
            gsap.to(card, {
              scale: 1,
              opacity: 1,
              duration: 0.3,
              ease: "back.out(1.6)",
            });
            onSelect(category.id);
          },
        });
      } else {
        onSelect(category.id);
      }
    },
    [category.id, onSelect, getGsap],
  );

  const mosaicImages = category.images.slice(0, MOSAIC_COUNT);

  return (
    <button
      type="button"
      ref={cardRef}
      data-ocid={`categories.card.${index + 1}`}
      className="relative will-change-transform w-full text-left"
      style={{
        transformStyle: "preserve-3d",
        borderRadius: "24px",
        border: "1px solid rgba(124,58,237,0.25)",
        background: "rgba(10,10,15,0.88)",
        overflow: "hidden",
        aspectRatio: "1 / 1",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        minHeight: "280px",
        cursor: "pointer",
        padding: 0,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      aria-label={`Explore ${category.name} — ${category.count} projects`}
    >
      {/* Layer 1: Bucket background image */}
      <div
        ref={bgRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          transform: "translateY(100%)",
          opacity: 0,
          zIndex: 1,
          willChange: "transform, opacity",
        }}
      >
        <img
          src={category.images[0]}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.55) 50%, rgba(10,10,15,0.3) 100%)",
          }}
        />
      </div>

      {/* Layer 2: Mosaic thumbnail grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "48px 12px 64px 12px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "6px",
          zIndex: 2,
        }}
      >
        {mosaicImages.map((img, i) => (
          <div
            key={`${category.id}-tile-${i}`}
            ref={(el) => {
              mosaicRefs.current[i] = el;
            }}
            style={{
              borderRadius: "8px",
              overflow: "hidden",
              opacity: 0.55,
              transform: "scale(0.92) translateY(16px)",
              willChange: "transform, opacity",
              border: `1px solid ${category.color}28`,
            }}
          >
            <img
              src={img}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Layer 3: Top-right badge */}
      <div
        style={{
          position: "absolute",
          top: "14px",
          right: "14px",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span
          style={{
            fontSize: "20px",
            filter: `drop-shadow(0 0 6px ${category.color})`,
            lineHeight: 1,
          }}
        >
          {category.icon}
        </span>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.04em",
            padding: "3px 9px",
            borderRadius: "20px",
            background: `${category.color}22`,
            color: category.color,
            border: `1px solid ${category.color}50`,
            backdropFilter: "blur(8px)",
          }}
        >
          {category.count} Projects
        </span>
      </div>

      {/* Layer 4: Bottom info */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: "16px",
          background:
            "linear-gradient(to top, rgba(10,10,15,0.97) 60%, transparent 100%)",
        }}
      >
        <h3
          className="font-display"
          style={{
            fontSize: "clamp(15px, 2vw, 19px)",
            fontWeight: 700,
            color: "#ffffff",
            margin: 0,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          {category.name}
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginTop: "6px",
          }}
        >
          <span
            style={{
              width: "20px",
              height: "1px",
              background: category.color,
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontSize: "12px",
              color: category.color,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Explore
          </span>
          <span style={{ color: category.color, fontSize: "12px" }}>→</span>
        </div>
      </div>

      {/* Corner gradient accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "120px",
          height: "120px",
          background: `radial-gradient(ellipse at 0% 0%, ${category.color}18 0%, transparent 70%)`,
          zIndex: 3,
          pointerEvents: "none",
        }}
      />
    </button>
  );
}

export default function CategoriesSection({
  onCategorySelect,
}: CategoriesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      const cards = sectionRef.current.querySelectorAll(
        "[data-ocid^='categories.card']",
      );
      gsap.set(cards, { opacity: 0, y: 55 });

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
          });
        },
        once: true,
      });

      const heading = sectionRef.current.querySelector(
        "[data-ocid='categories.heading']",
      );
      if (heading) {
        gsap.set(heading, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: heading,
          start: "top 85%",
          onEnter: () => {
            gsap.to(heading, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
            });
          },
          once: true,
        });
      }

      cleanup = () => {
        st.kill();
        for (const t of ScrollTrigger.getAll()) t.kill();
      };
    })();

    return () => cleanup?.();
  }, []);

  const totalProjects = CATEGORIES.reduce((s, c) => s + c.count, 0);

  return (
    <section
      id="categories"
      ref={sectionRef}
      data-ocid="categories.section"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 15% 50%, rgba(124,58,237,0.14) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(0,245,255,0.09) 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(255,45,85,0.08) 0%, transparent 50%), #0a0a0f",
        paddingTop: "clamp(64px, 8vw, 120px)",
        paddingBottom: "clamp(64px, 8vw, 120px)",
      }}
    >
      {/* Decorative neon top line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.5), rgba(0,245,255,0.5), transparent)",
          pointerEvents: "none",
        }}
      />

      <div
        className="max-w-7xl mx-auto"
        style={{
          paddingLeft: "clamp(16px, 4vw, 48px)",
          paddingRight: "clamp(16px, 4vw, 48px)",
        }}
      >
        {/* Section heading */}
        <div
          data-ocid="categories.heading"
          style={{ marginBottom: "clamp(40px, 6vw, 72px)" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "14px",
            }}
          >
            <span
              style={{
                width: "32px",
                height: "1px",
                background: "rgba(124,58,237,0.6)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#7c3aed",
              }}
            >
              Selected Works
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <div>
              <h2
                className="section-title"
                style={{
                  fontSize: "clamp(32px, 6vw, 64px)",
                  color: "#ffffff",
                  margin: 0,
                  lineHeight: 1.05,
                }}
              >
                My <span className="text-gradient-purple">Work</span>
              </h2>
              <p
                style={{
                  marginTop: "12px",
                  fontSize: "clamp(14px, 1.5vw, 18px)",
                  color: "rgba(255,255,255,0.45)",
                  maxWidth: "480px",
                  lineHeight: 1.6,
                }}
              >
                5+ years across 6 design disciplines — select a category to
                explore the full collection.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 18px",
                borderRadius: "40px",
                background: "rgba(124,58,237,0.08)",
                border: "1px solid rgba(124,58,237,0.2)",
                backdropFilter: "blur(8px)",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#7c3aed",
                  animation: "pulse-glow 2s ease-in-out infinite",
                  boxShadow: "0 0 10px rgba(124,58,237,0.8)",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.6)",
                  whiteSpace: "nowrap",
                }}
              >
                {totalProjects}+ total projects
              </span>
            </div>
          </div>
        </div>

        {/* Categories grid */}
        <div
          data-ocid="categories.list"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            gap: "clamp(12px, 2vw, 24px)",
          }}
        >
          {CATEGORIES.map((category, i) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={i}
              onSelect={onCategorySelect}
            />
          ))}
        </div>

        {/* Bottom hint */}
        <div
          style={{
            textAlign: "center",
            marginTop: "clamp(32px, 4vw, 56px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            color: "rgba(255,255,255,0.2)",
            fontSize: "13px",
            letterSpacing: "0.08em",
          }}
        >
          <span
            style={{
              width: "40px",
              height: "1px",
              background: "rgba(255,255,255,0.1)",
            }}
          />
          Hover to preview · Click to explore
          <span
            style={{
              width: "40px",
              height: "1px",
              background: "rgba(255,255,255,0.1)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
