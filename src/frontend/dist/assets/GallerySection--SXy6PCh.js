import { r as reactExports, C as CATEGORIES, _ as __vitePreload, j as jsxRuntimeExports } from "./index-DuMneQu4.js";
const HEIGHTS = [200, 300, 250, 220, 280, 200, 300, 260, 240];
function ProjectTile({ img, index, category, onOpen }) {
  const imgRef = reactExports.useRef(null);
  const height = HEIGHTS[index % HEIGHTS.length];
  const handleMouseMove = reactExports.useCallback(
    async (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const deltaX = e.clientX - rect.left - rect.width / 2;
      const deltaY = e.clientY - rect.top - rect.height / 2;
      if (imgRef.current) {
        const { gsap } = await __vitePreload(async () => {
          const { gsap: gsap2 } = await import("./index-D_EK8lFb.js");
          return { gsap: gsap2 };
        }, true ? [] : void 0);
        gsap.to(imgRef.current, {
          x: deltaX * 0.05,
          y: deltaY * 0.05,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    },
    []
  );
  const handleMouseLeave = reactExports.useCallback(async () => {
    if (imgRef.current) {
      const { gsap } = await __vitePreload(async () => {
        const { gsap: gsap2 } = await import("./index-D_EK8lFb.js");
        return { gsap: gsap2 };
      }, true ? [] : void 0);
      gsap.to(imgRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)"
      });
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": `gallery.item.${index + 1}`,
      className: "group relative overflow-hidden rounded-xl cursor-pointer will-change-transform transition-luxury text-left w-full",
      style: {
        height: `${height}px`,
        border: "1px solid rgba(255,255,255,0.06)"
      },
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      onClick: () => onOpen(img, index),
      "aria-label": `Open ${category.name} project ${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            ref: imgRef,
            src: img,
            alt: `${category.name} project ${index + 1}`,
            className: "w-full h-full object-cover will-change-transform transition-luxury group-hover:scale-110",
            loading: "lazy"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-luxury",
            style: {
              background: "linear-gradient(to top, rgba(5,5,10,0.95) 0%, rgba(5,5,10,0.5) 50%, transparent 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-luxury pointer-events-none",
            style: {
              boxShadow: `inset 0 0 0 1px ${category.color}80, 0 0 30px ${category.color}30`
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-luxury", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white font-display text-sm font-semibold truncate", children: [
            "Project #",
            index + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs font-body truncate mt-0.5",
              style: { color: category.color },
              children: category.name
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-luxury",
            style: { background: category.color, color: "#0a0a0f" },
            children: "↗"
          }
        )
      ]
    }
  );
}
function GlassLightbox({ state, onClose }) {
  const dialogRef = reactExports.useRef(null);
  const contentRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!state.isOpen || !contentRef.current) return;
    (async () => {
      const { gsap } = await __vitePreload(async () => {
        const { gsap: gsap2 } = await import("./index-D_EK8lFb.js");
        return { gsap: gsap2 };
      }, true ? [] : void 0);
      gsap.fromTo(
        contentRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    })();
  }, [state.isOpen]);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!state.isOpen || !state.category) return null;
  const cat = state.category;
  const tags = [cat.name.split(" ")[0], "Graphic Design", "Visual Identity"];
  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "dialog",
    {
      ref: dialogRef,
      open: true,
      "data-ocid": "gallery.lightbox",
      className: "fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 w-full h-full max-w-none max-h-none m-0 border-0 overflow-y-auto",
      style: {
        background: "rgba(5,5,10,0.95)",
        backdropFilter: "blur(40px) saturate(180%)"
      },
      onClick: handleBackdropClick,
      onKeyDown: (e) => {
        if (e.key === "Escape") onClose();
      },
      "aria-label": "Image lightbox",
      "aria-modal": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-3xl w-full my-auto", ref: contentRef, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-[-1px] rounded-[33px] pointer-events-none",
            style: {
              background: "linear-gradient(135deg, rgba(124,58,237,0.8), transparent 40%, rgba(0,245,255,0.8))",
              zIndex: -1
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative rounded-[32px] overflow-hidden",
            style: {
              background: "rgba(5,5,10,0.97)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(40px)",
              boxShadow: `0 0 80px ${cat.color}25, 0 40px 80px rgba(0,0,0,0.6)`
            },
            onClick: (e) => e.stopPropagation(),
            onKeyDown: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  "data-ocid": "gallery.lightbox.close_button",
                  className: "absolute top-4 right-4 z-10 w-9 h-9 rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-smooth",
                  style: {
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)"
                  },
                  "aria-label": "Close lightbox",
                  children: "✕"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "relative overflow-hidden",
                  style: { maxHeight: "60vh" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: state.imageUrl,
                        alt: `Project ${state.projectIndex + 1} — ${cat.name}`,
                        className: "w-full object-cover",
                        style: { maxHeight: "60vh" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute bottom-0 left-0 right-0 h-24 pointer-events-none",
                        style: {
                          background: "linear-gradient(to top, rgba(5,5,10,0.9), transparent)"
                        }
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "section-title text-xl md:text-2xl text-white", children: [
                    "Project",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: cat.color }, children: [
                      "#",
                      state.projectIndex + 1
                    ] }),
                    " ",
                    "— ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80", children: cat.name })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-xs font-body font-medium px-3 py-1 rounded-full shrink-0",
                      style: {
                        background: `${cat.color}20`,
                        border: `1px solid ${cat.color}40`,
                        color: cat.color
                      },
                      children: [
                        cat.icon,
                        " ",
                        cat.name.split(" ")[0]
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "font-body text-sm leading-relaxed mb-5",
                    style: { color: "rgba(255,255,255,0.55)" },
                    children: [
                      "A stunning visual piece crafted with precision, blending modern aesthetics with functional design principles. This work demonstrates mastery of composition, color theory, and typographic excellence — a signature piece from the",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: cat.color }, children: cat.name }),
                      " collection."
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-body px-3 py-1.5 rounded-lg",
                    style: {
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.6)"
                    },
                    children: tag
                  },
                  tag
                )) })
              ] })
            ]
          }
        )
      ] })
    }
  );
}
function GallerySection({
  categoryId,
  onClose
}) {
  const overlayRef = reactExports.useRef(null);
  const [lightbox, setLightbox] = reactExports.useState({
    isOpen: false,
    imageUrl: "",
    projectIndex: 0,
    category: null
  });
  const activeCategory = CATEGORIES.find((c) => c.id === categoryId) ?? null;
  reactExports.useEffect(() => {
    if (!categoryId || !overlayRef.current) return;
    (async () => {
      const { gsap } = await __vitePreload(async () => {
        const { gsap: gsap2 } = await import("./index-D_EK8lFb.js");
        return { gsap: gsap2 };
      }, true ? [] : void 0);
      gsap.fromTo(
        overlayRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "power4.inOut" }
      );
    })();
  }, [categoryId]);
  reactExports.useEffect(() => {
    if (categoryId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [categoryId]);
  const handleClose = reactExports.useCallback(async () => {
    if (!overlayRef.current) {
      onClose();
      return;
    }
    const { gsap } = await __vitePreload(async () => {
      const { gsap: gsap2 } = await import("./index-D_EK8lFb.js");
      return { gsap: gsap2 };
    }, true ? [] : void 0);
    gsap.to(overlayRef.current, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.6,
      ease: "power4.inOut",
      onComplete: onClose
    });
  }, [onClose]);
  const openLightbox = reactExports.useCallback(
    (imageUrl, projectIndex) => {
      setLightbox({
        isOpen: true,
        imageUrl,
        projectIndex,
        category: activeCategory
      });
    },
    [activeCategory]
  );
  const closeLightbox = reactExports.useCallback(() => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  }, []);
  if (!categoryId) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: overlayRef,
        "data-ocid": "gallery.section",
        className: "fixed inset-0 z-50 flex flex-col",
        style: {
          background: "rgba(5,5,10,0.98)",
          backdropFilter: "blur(10px)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "shrink-0 flex items-center justify-between px-4 md:px-8 py-4 md:py-5 border-b",
              style: {
                borderColor: "rgba(255,255,255,0.07)",
                background: "rgba(10,10,20,0.8)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: handleClose,
                      "data-ocid": "gallery.back_button",
                      className: "flex items-center gap-1.5 text-xs font-body font-medium tracking-widest uppercase transition-smooth hover:text-white shrink-0",
                      style: { color: "rgba(255,255,255,0.4)" },
                      "aria-label": "Back to categories",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "←" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Categories" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "rgba(255,255,255,0.15)" }, children: "|" }),
                  activeCategory && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg leading-none", children: activeCategory.icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h1",
                      {
                        className: "section-title text-lg md:text-xl truncate",
                        style: { color: activeCategory.color },
                        children: activeCategory.name
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "text-xs font-body px-2 py-0.5 rounded-full shrink-0 hidden sm:inline-flex",
                        style: {
                          background: `${activeCategory.color}18`,
                          border: `1px solid ${activeCategory.color}35`,
                          color: activeCategory.color
                        },
                        children: [
                          activeCategory.count,
                          " projects"
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleClose,
                    "data-ocid": "gallery.close_button",
                    className: "w-9 h-9 rounded-xl flex items-center justify-center text-white/50 hover:text-white transition-smooth shrink-0 ml-4",
                    style: {
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)"
                    },
                    "aria-label": "Close gallery",
                    children: "✕"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "gallery.grid",
              className: "flex-1 overflow-y-auto px-4 md:px-8 py-6 md:py-8",
              style: {
                background: activeCategory ? `radial-gradient(ellipse at 70% 20%, ${activeCategory.color}10 0%, transparent 55%), #05050a` : "#05050a"
              },
              children: activeCategory ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs font-body tracking-widest uppercase mb-6",
                    style: { color: "rgba(255,255,255,0.25)" },
                    children: "Click any project to view details"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "grid gap-3",
                    style: {
                      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))"
                    },
                    children: activeCategory.images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ProjectTile,
                      {
                        img,
                        index: i,
                        category: activeCategory,
                        onOpen: openLightbox
                      },
                      `${activeCategory.id}-${i}`
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "gallery.empty_state",
                  className: "flex flex-col items-center justify-center h-full text-center py-24",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl mb-4", children: "🎨" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-title text-xl text-white/40", children: "No category selected" })
                  ]
                }
              )
            }
          ),
          activeCategory && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-24 right-0 w-96 h-96 pointer-events-none",
              style: {
                background: `radial-gradient(circle, ${activeCategory.color}12 0%, transparent 70%)`,
                filter: "blur(40px)"
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlassLightbox, { state: lightbox, onClose: closeLightbox })
  ] });
}
export {
  GallerySection as default
};
