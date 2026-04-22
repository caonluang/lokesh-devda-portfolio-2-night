import { r as reactExports, _ as __vitePreload, C as CATEGORIES, j as jsxRuntimeExports } from "./index-DuMneQu4.js";
const MOSAIC_COUNT = 9;
function CategoryCard({ category, index, onSelect }) {
  const cardRef = reactExports.useRef(null);
  const bgRef = reactExports.useRef(null);
  const mosaicRefs = reactExports.useRef([]);
  const gsapRef = reactExports.useRef(null);
  const getGsap = reactExports.useCallback(async () => {
    if (gsapRef.current) return gsapRef.current;
    const { gsap } = await __vitePreload(async () => {
      const { gsap: gsap2 } = await import("./index-D_EK8lFb.js");
      return { gsap: gsap2 };
    }, true ? [] : void 0);
    gsapRef.current = gsap;
    return gsap;
  }, []);
  const handleMouseEnter = reactExports.useCallback(async () => {
    const gsap = await getGsap();
    const card = cardRef.current;
    const bg = bgRef.current;
    const tiles = mosaicRefs.current.filter(Boolean);
    if (!card || !bg || tiles.length === 0) return;
    gsap.to(card, {
      scale: 1.03,
      boxShadow: `0 0 30px ${category.color}80, 0 0 60px ${category.color}33, inset 0 0 30px ${category.color}0d`,
      borderColor: category.color,
      duration: 0.4,
      ease: "power2.out"
    });
    gsap.to(bg, {
      yPercent: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
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
        overwrite: true
      }
    );
  }, [category.color, getGsap]);
  const handleMouseLeave = reactExports.useCallback(async () => {
    const gsap = await getGsap();
    const card = cardRef.current;
    const bg = bgRef.current;
    const tiles = mosaicRefs.current.filter(Boolean);
    if (!card || !bg) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      boxShadow: "0 0 0px transparent",
      borderColor: "rgba(124,58,237,0.25)",
      duration: 0.5,
      ease: "power3.out"
    });
    gsap.to(bg, {
      yPercent: 100,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in"
    });
    if (tiles.length) {
      gsap.to(tiles, {
        y: 16,
        opacity: 0.55,
        scale: 0.92,
        duration: 0.35,
        stagger: 0.025,
        ease: "power2.in",
        overwrite: true
      });
    }
  }, [getGsap]);
  const handleMouseMove = reactExports.useCallback(
    async (e) => {
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
        ease: "power1.out"
      });
    },
    [getGsap]
  );
  const handleClick = reactExports.useCallback(
    async (e) => {
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
              ease: "back.out(1.6)"
            });
            onSelect(category.id);
          }
        });
      } else {
        onSelect(category.id);
      }
    },
    [category.id, onSelect, getGsap]
  );
  const mosaicImages = category.images.slice(0, MOSAIC_COUNT);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      ref: cardRef,
      "data-ocid": `categories.card.${index + 1}`,
      className: "relative will-change-transform w-full text-left",
      style: {
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
        padding: 0
      },
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onMouseMove: handleMouseMove,
      onClick: handleClick,
      "aria-label": `Explore ${category.name} — ${category.count} projects`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            ref: bgRef,
            "aria-hidden": "true",
            style: {
              position: "absolute",
              inset: 0,
              transform: "translateY(100%)",
              opacity: 0,
              zIndex: 1,
              willChange: "transform, opacity"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: category.images[0],
                  alt: "",
                  style: { width: "100%", height: "100%", objectFit: "cover" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.55) 50%, rgba(10,10,15,0.3) 100%)"
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": "true",
            style: {
              position: "absolute",
              inset: "48px 12px 64px 12px",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "6px",
              zIndex: 2
            },
            children: mosaicImages.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                ref: (el) => {
                  mosaicRefs.current[i] = el;
                },
                style: {
                  borderRadius: "8px",
                  overflow: "hidden",
                  opacity: 0.55,
                  transform: "scale(0.92) translateY(16px)",
                  willChange: "transform, opacity",
                  border: `1px solid ${category.color}28`
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: img,
                    alt: "",
                    style: {
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block"
                    },
                    loading: "lazy"
                  }
                )
              },
              `${category.id}-tile-${i}`
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              position: "absolute",
              top: "14px",
              right: "14px",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              gap: "6px"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    fontSize: "20px",
                    filter: `drop-shadow(0 0 6px ${category.color})`,
                    lineHeight: 1
                  },
                  children: category.icon
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  style: {
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    padding: "3px 9px",
                    borderRadius: "20px",
                    background: `${category.color}22`,
                    color: category.color,
                    border: `1px solid ${category.color}50`,
                    backdropFilter: "blur(8px)"
                  },
                  children: [
                    category.count,
                    " Projects"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 10,
              padding: "16px",
              background: "linear-gradient(to top, rgba(10,10,15,0.97) 60%, transparent 100%)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "font-display",
                  style: {
                    fontSize: "clamp(15px, 2vw, 19px)",
                    fontWeight: 700,
                    color: "#ffffff",
                    margin: 0,
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em"
                  },
                  children: category.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "6px"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          width: "20px",
                          height: "1px",
                          background: category.color,
                          display: "inline-block"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          fontSize: "12px",
                          color: category.color,
                          fontWeight: 600,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase"
                        },
                        children: "Explore"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: category.color, fontSize: "12px" }, children: "→" })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": "true",
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              width: "120px",
              height: "120px",
              background: `radial-gradient(ellipse at 0% 0%, ${category.color}18 0%, transparent 70%)`,
              zIndex: 3,
              pointerEvents: "none"
            }
          }
        )
      ]
    }
  );
}
function CategoriesSection({
  onCategorySelect
}) {
  const sectionRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    let cleanup;
    (async () => {
      const { gsap } = await __vitePreload(async () => {
        const { gsap: gsap2 } = await import("./index-D_EK8lFb.js");
        return { gsap: gsap2 };
      }, true ? [] : void 0);
      const { ScrollTrigger } = await __vitePreload(async () => {
        const { ScrollTrigger: ScrollTrigger2 } = await import("./ScrollTrigger-CxSD7whB.js");
        return { ScrollTrigger: ScrollTrigger2 };
      }, true ? [] : void 0);
      gsap.registerPlugin(ScrollTrigger);
      if (!sectionRef.current) return;
      const cards = sectionRef.current.querySelectorAll(
        "[data-ocid^='categories.card']"
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
            ease: "power3.out"
          });
        },
        once: true
      });
      const heading = sectionRef.current.querySelector(
        "[data-ocid='categories.heading']"
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
              ease: "power3.out"
            });
          },
          once: true
        });
      }
      cleanup = () => {
        st.kill();
        for (const t of ScrollTrigger.getAll()) t.kill();
      };
    })();
    return () => cleanup == null ? void 0 : cleanup();
  }, []);
  const totalProjects = CATEGORIES.reduce((s, c) => s + c.count, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "categories",
      ref: sectionRef,
      "data-ocid": "categories.section",
      className: "relative overflow-hidden",
      style: {
        background: "radial-gradient(ellipse at 15% 50%, rgba(124,58,237,0.14) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(0,245,255,0.09) 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(255,45,85,0.08) 0%, transparent 50%), #0a0a0f",
        paddingTop: "clamp(64px, 8vw, 120px)",
        paddingBottom: "clamp(64px, 8vw, 120px)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": "true",
            style: {
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "60%",
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5), rgba(0,245,255,0.5), transparent)",
              pointerEvents: "none"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "max-w-7xl mx-auto",
            style: {
              paddingLeft: "clamp(16px, 4vw, 48px)",
              paddingRight: "clamp(16px, 4vw, 48px)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": "categories.heading",
                  style: { marginBottom: "clamp(40px, 6vw, 72px)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "14px"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: {
                                width: "32px",
                                height: "1px",
                                background: "rgba(124,58,237,0.6)",
                                display: "inline-block"
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: {
                                fontSize: "11px",
                                fontWeight: 700,
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                color: "#7c3aed"
                              },
                              children: "Selected Works"
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        style: {
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "flex-end",
                          justifyContent: "space-between",
                          gap: "16px"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "h2",
                              {
                                className: "section-title",
                                style: {
                                  fontSize: "clamp(32px, 6vw, 64px)",
                                  color: "#ffffff",
                                  margin: 0,
                                  lineHeight: 1.05
                                },
                                children: [
                                  "My ",
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-purple", children: "Work" })
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                style: {
                                  marginTop: "12px",
                                  fontSize: "clamp(14px, 1.5vw, 18px)",
                                  color: "rgba(255,255,255,0.45)",
                                  maxWidth: "480px",
                                  lineHeight: 1.6
                                },
                                children: "5+ years across 6 design disciplines — select a category to explore the full collection."
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "10px 18px",
                                borderRadius: "40px",
                                background: "rgba(124,58,237,0.08)",
                                border: "1px solid rgba(124,58,237,0.2)",
                                backdropFilter: "blur(8px)",
                                flexShrink: 0
                              },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    style: {
                                      width: "8px",
                                      height: "8px",
                                      borderRadius: "50%",
                                      background: "#7c3aed",
                                      animation: "pulse-glow 2s ease-in-out infinite",
                                      boxShadow: "0 0 10px rgba(124,58,237,0.8)",
                                      display: "inline-block"
                                    }
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "span",
                                  {
                                    style: {
                                      fontSize: "13px",
                                      fontWeight: 600,
                                      color: "rgba(255,255,255,0.6)",
                                      whiteSpace: "nowrap"
                                    },
                                    children: [
                                      totalProjects,
                                      "+ total projects"
                                    ]
                                  }
                                )
                              ]
                            }
                          )
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "data-ocid": "categories.list",
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
                    gap: "clamp(12px, 2vw, 24px)"
                  },
                  children: CATEGORIES.map((category, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CategoryCard,
                    {
                      category,
                      index: i,
                      onSelect: onCategorySelect
                    },
                    category.id
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: {
                    textAlign: "center",
                    marginTop: "clamp(32px, 4vw, 56px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    color: "rgba(255,255,255,0.2)",
                    fontSize: "13px",
                    letterSpacing: "0.08em"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          width: "40px",
                          height: "1px",
                          background: "rgba(255,255,255,0.1)"
                        }
                      }
                    ),
                    "Hover to preview · Click to explore",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          width: "40px",
                          height: "1px",
                          background: "rgba(255,255,255,0.1)"
                        }
                      }
                    )
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  CategoriesSection as default
};
