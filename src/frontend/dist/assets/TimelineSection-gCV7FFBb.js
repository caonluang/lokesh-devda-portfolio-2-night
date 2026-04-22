import { r as reactExports, _ as __vitePreload, T as TIMELINE, j as jsxRuntimeExports } from "./index-DuMneQu4.js";
function TimelineSection() {
  const sectionRef = reactExports.useRef(null);
  const lineRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    let ctx = {};
    __vitePreload(async () => {
      const { gsap } = await import("./index-D_EK8lFb.js");
      return { gsap };
    }, true ? [] : void 0).then(({ gsap }) => {
      __vitePreload(async () => {
        const { ScrollTrigger } = await import("./ScrollTrigger-CxSD7whB.js");
        return { ScrollTrigger };
      }, true ? [] : void 0).then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        if (!sectionRef.current) return;
        ctx = gsap.context(() => {
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
                  scrub: 1
                }
              }
            );
          }
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
                  start: "top 82%"
                }
              }
            );
          });
        }, sectionRef);
      });
    });
    return () => {
      if (ctx.revert) ctx.revert();
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "timeline",
      ref: sectionRef,
      "data-ocid": "timeline.section",
      className: "py-24 md:py-32 relative overflow-hidden",
      style: { background: "#111118" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            "aria-hidden": "true",
            style: {
              background: "radial-gradient(ellipse at 30% 60%, rgba(124,58,237,0.08) 0%, transparent 55%), radial-gradient(ellipse at 75% 30%, rgba(0,245,255,0.06) 0%, transparent 50%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-20 md:mb-24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-px w-10 flex-shrink-0",
                  style: { background: "rgba(0,245,255,0.45)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-semibold tracking-widest uppercase",
                  style: { color: "#00f5ff" },
                  children: "Experience"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "section-title text-4xl md:text-6xl text-white", children: [
              "My ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-cyan", children: "Journey" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-lg mt-3 font-body", children: "5 companies · 4+ years of creative growth" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                ref: lineRef,
                "data-ocid": "timeline.line",
                className: "absolute top-0 bottom-0 w-px md:left-1/2 left-5",
                style: {
                  background: "linear-gradient(to bottom, rgba(124,58,237,0.9) 0%, rgba(0,245,255,0.7) 50%, rgba(255,45,85,0.5) 100%)",
                  boxShadow: "0 0 8px rgba(0,245,255,0.3)",
                  transform: "translateX(-0.5px)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-12 md:space-y-0", children: TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": `timeline.item.${i + 1}`,
                  className: "relative md:mb-14",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: [
                          "absolute z-20 flex items-center justify-center",
                          // Mobile: pinned to left spine
                          "left-5 -translate-x-1/2",
                          // Desktop: pinned to center spine
                          "md:left-1/2 md:-translate-x-1/2"
                        ].join(" "),
                        style: { top: "24px" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "absolute rounded-full",
                              style: {
                                width: "28px",
                                height: "28px",
                                background: "transparent",
                                border: `1.5px solid ${item.color}55`,
                                animation: "ring-pulse 2.4s ease-out infinite"
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "absolute rounded-full",
                              style: {
                                width: "28px",
                                height: "28px",
                                background: "transparent",
                                border: `1.5px solid ${item.color}35`,
                                animation: "ring-pulse 2.4s ease-out 0.8s infinite"
                              }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "relative w-4 h-4 rounded-full flex-shrink-0",
                              style: {
                                background: item.color,
                                boxShadow: `0 0 12px ${item.color}cc, 0 0 24px ${item.color}55`
                              }
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: [
                          "hidden md:flex items-start",
                          isLeft ? "flex-row" : "flex-row-reverse"
                        ].join(" "),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: [
                                "w-[44%]",
                                isLeft ? "pr-10 text-right" : "pl-10 text-left"
                              ].join(" "),
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                TimelineCard,
                                {
                                  item,
                                  align: isLeft ? "right" : "left"
                                }
                              )
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[12%] flex-shrink-0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[44%]" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden pl-12 pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineCard, { item, align: "left" }) })
                  ]
                },
                item.company
              );
            }) })
          ] })
        ] })
      ]
    }
  );
}
function TimelineCard({ item, align }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass-card p-5 rounded-2xl transition-luxury hover:scale-[1.02] group relative overflow-hidden",
      style: { border: `1px solid ${item.color}28` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl",
            style: {
              background: `radial-gradient(ellipse at 50% 0%, ${item.color}10 0%, transparent 60%)`
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center gap-2 mb-3 ${align === "right" ? "justify-end" : "justify-start"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full",
                  style: {
                    background: `${item.color}18`,
                    color: item.color,
                    border: `1px solid ${item.color}35`
                  },
                  children: item.year
                }
              ),
              item.isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full",
                  style: {
                    background: "rgba(6,255,165,0.12)",
                    color: "#06ffa5",
                    border: "1px solid rgba(6,255,165,0.3)"
                  },
                  "data-ocid": `timeline.current_badge.${TIMELINE.findIndex((t) => t.company === item.company) + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-1.5 h-1.5 rounded-full animate-pulse",
                        style: { background: "#06ffa5" }
                      }
                    ),
                    "Current"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h3",
          {
            className: `font-display font-bold text-lg md:text-xl text-white leading-tight mb-1 ${align === "right" ? "text-right" : "text-left"}`,
            children: item.company
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: `text-sm font-semibold mb-3 ${align === "right" ? "text-right" : "text-left"}`,
            style: { color: item.color },
            children: item.role
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: `text-sm text-white/55 leading-relaxed ${align === "right" ? "text-right" : "text-left"}`,
            children: item.description
          }
        )
      ]
    }
  );
}
export {
  TimelineSection as default
};
