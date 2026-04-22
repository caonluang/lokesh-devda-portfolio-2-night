import { useCallback, useEffect, useRef, useState } from "react";
import { CATEGORIES } from "../data/portfolioData";
import type { Category } from "../types/portfolio";

// ─── Tile heights cycle ──────────────────────────────────────────────────────
const HEIGHTS = [200, 300, 250, 220, 280, 200, 300, 260, 240] as const;

// ─── Props ───────────────────────────────────────────────────────────────────
interface GallerySectionProps {
  categoryId: string | null;
  onClose: () => void;
}

// ─── Lightbox state ──────────────────────────────────────────────────────────
interface LightboxState {
  isOpen: boolean;
  imageUrl: string;
  projectIndex: number;
  category: Category | null;
}

// ─── Project Tile ─────────────────────────────────────────────────────────────
interface TileProps {
  img: string;
  index: number;
  category: Category;
  onOpen: (imageUrl: string, index: number) => void;
}

function ProjectTile({ img, index, category, onOpen }: TileProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const height = HEIGHTS[index % HEIGHTS.length];

  const handleMouseMove = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const deltaX = e.clientX - rect.left - rect.width / 2;
      const deltaY = e.clientY - rect.top - rect.height / 2;
      if (imgRef.current) {
        const { gsap } = await import("gsap");
        gsap.to(imgRef.current, {
          x: deltaX * 0.05,
          y: deltaY * 0.05,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    },
    [],
  );

  const handleMouseLeave = useCallback(async () => {
    if (imgRef.current) {
      const { gsap } = await import("gsap");
      gsap.to(imgRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    }
  }, []);

  return (
    <button
      type="button"
      data-ocid={`gallery.item.${index + 1}`}
      className="group relative overflow-hidden rounded-xl cursor-pointer will-change-transform transition-luxury text-left w-full"
      style={{
        height: `${height}px`,
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(img, index)}
      aria-label={`Open ${category.name} project ${index + 1}`}
    >
      {/* Image */}
      <img
        ref={imgRef}
        src={img}
        alt={`${category.name} project ${index + 1}`}
        className="w-full h-full object-cover will-change-transform transition-luxury group-hover:scale-110"
        loading="lazy"
      />

      {/* Bottom gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-luxury"
        style={{
          background:
            "linear-gradient(to top, rgba(5,5,10,0.95) 0%, rgba(5,5,10,0.5) 50%, transparent 100%)",
        }}
      />

      {/* Neon border on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-luxury pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${category.color}80, 0 0 30px ${category.color}30`,
        }}
      />

      {/* Hover info panel */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-luxury">
        <p className="text-white font-display text-sm font-semibold truncate">
          Project #{index + 1}
        </p>
        <p
          className="text-xs font-body truncate mt-0.5"
          style={{ color: category.color }}
        >
          {category.name}
        </p>
      </div>

      {/* Expand icon */}
      <div
        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-luxury"
        style={{ background: category.color, color: "#0a0a0f" }}
      >
        ↗
      </div>
    </button>
  );
}

// ─── Glass Lightbox ───────────────────────────────────────────────────────────
interface LightboxProps {
  state: LightboxState;
  onClose: () => void;
}

function GlassLightbox({ state, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Entry animation
  useEffect(() => {
    if (!state.isOpen || !contentRef.current) return;
    (async () => {
      const { gsap } = await import("gsap");
      gsap.fromTo(
        contentRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
      );
    })();
  }, [state.isOpen]);

  // ESC key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!state.isOpen || !state.category) return null;

  const cat = state.category;
  const tags = [cat.name.split(" ")[0], "Graphic Design", "Visual Identity"];

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      open
      data-ocid="gallery.lightbox"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 w-full h-full max-w-none max-h-none m-0 border-0 overflow-y-auto"
      style={{
        background: "rgba(5,5,10,0.95)",
        backdropFilter: "blur(40px) saturate(180%)",
      }}
      onClick={handleBackdropClick}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      aria-label="Image lightbox"
      aria-modal="true"
    >
      {/* Gradient border wrapper */}
      <div className="relative max-w-3xl w-full my-auto" ref={contentRef}>
        {/* Outer gradient border glow */}
        <div
          className="absolute inset-[-1px] rounded-[33px] pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.8), transparent 40%, rgba(0,245,255,0.8))",
            zIndex: -1,
          }}
        />

        {/* Inner glass card */}
        <div
          className="relative rounded-[32px] overflow-hidden"
          style={{
            background: "rgba(5,5,10,0.97)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(40px)",
            boxShadow: `0 0 80px ${cat.color}25, 0 40px 80px rgba(0,0,0,0.6)`,
          }}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            data-ocid="gallery.lightbox.close_button"
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-smooth"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            aria-label="Close lightbox"
          >
            ✕
          </button>

          {/* Image */}
          <div
            className="relative overflow-hidden"
            style={{ maxHeight: "60vh" }}
          >
            <img
              src={state.imageUrl}
              alt={`Project ${state.projectIndex + 1} — ${cat.name}`}
              className="w-full object-cover"
              style={{ maxHeight: "60vh" }}
            />
            {/* Bottom fade overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(5,5,10,0.9), transparent)",
              }}
            />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Title */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="section-title text-xl md:text-2xl text-white">
                Project{" "}
                <span style={{ color: cat.color }}>
                  #{state.projectIndex + 1}
                </span>{" "}
                — <span className="text-white/80">{cat.name}</span>
              </h3>
              <span
                className="text-xs font-body font-medium px-3 py-1 rounded-full shrink-0"
                style={{
                  background: `${cat.color}20`,
                  border: `1px solid ${cat.color}40`,
                  color: cat.color,
                }}
              >
                {cat.icon} {cat.name.split(" ")[0]}
              </span>
            </div>

            {/* Description */}
            <p
              className="font-body text-sm leading-relaxed mb-5"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              A stunning visual piece crafted with precision, blending modern
              aesthetics with functional design principles. This work
              demonstrates mastery of composition, color theory, and typographic
              excellence — a signature piece from the{" "}
              <span style={{ color: cat.color }}>{cat.name}</span> collection.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-body px-3 py-1.5 rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

// ─── Main Gallery Section ─────────────────────────────────────────────────────
export default function GallerySection({
  categoryId,
  onClose,
}: GallerySectionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    imageUrl: "",
    projectIndex: 0,
    category: null,
  });

  const activeCategory = CATEGORIES.find((c) => c.id === categoryId) ?? null;

  // Entry clip-path animation
  useEffect(() => {
    if (!categoryId || !overlayRef.current) return;
    (async () => {
      const { gsap } = await import("gsap");
      gsap.fromTo(
        overlayRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "power4.inOut" },
      );
    })();
  }, [categoryId]);

  // Scroll lock when overlay is open
  useEffect(() => {
    if (categoryId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [categoryId]);

  const handleClose = useCallback(async () => {
    if (!overlayRef.current) {
      onClose();
      return;
    }
    const { gsap } = await import("gsap");
    gsap.to(overlayRef.current, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.6,
      ease: "power4.inOut",
      onComplete: onClose,
    });
  }, [onClose]);

  const openLightbox = useCallback(
    (imageUrl: string, projectIndex: number) => {
      setLightbox({
        isOpen: true,
        imageUrl,
        projectIndex,
        category: activeCategory,
      });
    },
    [activeCategory],
  );

  const closeLightbox = useCallback(() => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  }, []);

  if (!categoryId) return null;

  return (
    <>
      {/* Fullscreen overlay */}
      <div
        ref={overlayRef}
        data-ocid="gallery.section"
        className="fixed inset-0 z-50 flex flex-col"
        style={{
          background: "rgba(5,5,10,0.98)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Header bar */}
        <div
          className="shrink-0 flex items-center justify-between px-4 md:px-8 py-4 md:py-5 border-b"
          style={{
            borderColor: "rgba(255,255,255,0.07)",
            background: "rgba(10,10,20,0.8)",
          }}
        >
          {/* Left — breadcrumb + title */}
          <div className="flex items-center gap-4 min-w-0">
            <button
              type="button"
              onClick={handleClose}
              data-ocid="gallery.back_button"
              className="flex items-center gap-1.5 text-xs font-body font-medium tracking-widest uppercase transition-smooth hover:text-white shrink-0"
              style={{ color: "rgba(255,255,255,0.4)" }}
              aria-label="Back to categories"
            >
              <span>←</span>
              <span className="hidden sm:inline">Categories</span>
            </button>

            <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>

            {activeCategory && (
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-lg leading-none">
                  {activeCategory.icon}
                </span>
                <h1
                  className="section-title text-lg md:text-xl truncate"
                  style={{ color: activeCategory.color }}
                >
                  {activeCategory.name}
                </h1>
                <span
                  className="text-xs font-body px-2 py-0.5 rounded-full shrink-0 hidden sm:inline-flex"
                  style={{
                    background: `${activeCategory.color}18`,
                    border: `1px solid ${activeCategory.color}35`,
                    color: activeCategory.color,
                  }}
                >
                  {activeCategory.count} projects
                </span>
              </div>
            )}
          </div>

          {/* Right — close button */}
          <button
            type="button"
            onClick={handleClose}
            data-ocid="gallery.close_button"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white/50 hover:text-white transition-smooth shrink-0 ml-4"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            aria-label="Close gallery"
          >
            ✕
          </button>
        </div>

        {/* Scrollable grid area */}
        <div
          data-ocid="gallery.grid"
          className="flex-1 overflow-y-auto px-4 md:px-8 py-6 md:py-8"
          style={{
            background: activeCategory
              ? `radial-gradient(ellipse at 70% 20%, ${activeCategory.color}10 0%, transparent 55%), #05050a`
              : "#05050a",
          }}
        >
          {activeCategory ? (
            <>
              {/* Section hint */}
              <p
                className="text-xs font-body tracking-widest uppercase mb-6"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Click any project to view details
              </p>

              {/* Masonry grid */}
              <div
                className="grid gap-3"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                }}
              >
                {activeCategory.images.map((img, i) => (
                  <ProjectTile
                    key={`${activeCategory.id}-${i}`}
                    img={img}
                    index={i}
                    category={activeCategory}
                    onOpen={openLightbox}
                  />
                ))}
              </div>

              {/* Bottom spacer */}
              <div className="h-16" />
            </>
          ) : (
            <div
              data-ocid="gallery.empty_state"
              className="flex flex-col items-center justify-center h-full text-center py-24"
            >
              <span className="text-5xl mb-4">🎨</span>
              <p className="section-title text-xl text-white/40">
                No category selected
              </p>
            </div>
          )}
        </div>

        {/* Ambient gradient orb — decorative */}
        {activeCategory && (
          <div
            className="absolute top-24 right-0 w-96 h-96 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${activeCategory.color}12 0%, transparent 70%)`,
              filter: "blur(40px)",
            }}
          />
        )}
      </div>

      {/* Lightbox */}
      <GlassLightbox state={lightbox} onClose={closeLightbox} />
    </>
  );
}
