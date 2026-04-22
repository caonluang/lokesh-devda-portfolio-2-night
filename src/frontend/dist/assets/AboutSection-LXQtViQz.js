import { r as reactExports, _ as __vitePreload, j as jsxRuntimeExports } from "./index-DuMneQu4.js";
const SOFTWARE_ICONS = [
  { label: "CD", name: "CorelDraw", color: "#00f5ff" },
  { label: "Ai", name: "Illustrator", color: "#f5a623" },
  { label: "Ps", name: "Photoshop", color: "#7c3aed" },
  { label: "Af", name: "Affinity", color: "#ff2d55" },
  { label: "WP", name: "WordPress", color: "#a855f7" }
];
const ABOUT_SKILLS = [
  { name: "CorelDraw", percent: 95, color: "#00f5ff" },
  { name: "Illustrator", percent: 90, color: "#f5a623" },
  { name: "Photoshop", percent: 88, color: "#7c3aed" },
  { name: "Affinity Designer", percent: 80, color: "#ff2d55" },
  { name: "WordPress", percent: 72, color: "#a855f7" }
];
function AboutSection() {
  const sectionRef = reactExports.useRef(null);
  const cardRef = reactExports.useRef(null);
  const textRevealRef = reactExports.useRef(null);
  const skillBarsRef = reactExports.useRef(null);
  const barFillsRef = reactExports.useRef([]);
  reactExports.useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    let gsapInstance = null;
    __vitePreload(async () => {
      const { gsap } = await import("./index-D_EK8lFb.js");
      return { gsap };
    }, true ? [] : void 0).then(({ gsap }) => {
      gsapInstance = gsap;
      const onMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateX: -y * 15,
          rotateY: x * 15,
          transformPerspective: 1e3,
          duration: 0.3,
          ease: "power2.out"
        });
      };
      const onMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)"
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
  reactExports.useEffect(() => {
    const textEl = textRevealRef.current;
    const skillsEl = skillBarsRef.current;
    if (!textEl && !skillsEl) return;
    let ctx = null;
    __vitePreload(() => import("./index-D_EK8lFb.js"), true ? [] : void 0).then(async ({ gsap }) => {
      const { ScrollTrigger } = await __vitePreload(async () => {
        const { ScrollTrigger: ScrollTrigger2 } = await import("./ScrollTrigger-CxSD7whB.js");
        return { ScrollTrigger: ScrollTrigger2 };
      }, true ? [] : void 0);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
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
                start: "top 80%"
              }
            }
          );
        }
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
                start: "top 80%"
              }
            }
          );
        });
      });
    });
    return () => {
      ctx == null ? void 0 : ctx.revert();
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "about",
      ref: sectionRef,
      "data-ocid": "about.section",
      className: "py-24 md:py-32 relative overflow-hidden",
      style: { background: "#111118" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse at 80% 30%, rgba(124,58,237,0.12) 0%, transparent 55%), radial-gradient(ellipse at 10% 70%, rgba(0,245,255,0.08) 0%, transparent 50%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-4 mb-14",
              "data-ocid": "about.section_header",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-px w-10 shrink-0",
                    style: { background: "rgba(0,245,255,0.4)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-semibold tracking-[0.25em] uppercase",
                    style: { color: "#00f5ff" },
                    children: "About Me"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-px flex-1",
                    style: { background: "rgba(255,255,255,0.06)" }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[40%_60%] gap-12 lg:gap-20 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex justify-center md:justify-start",
                style: { perspective: "1000px" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    ref: cardRef,
                    "data-ocid": "about.photo_card",
                    className: "relative w-64 sm:w-72 md:w-80 will-change-transform",
                    style: { transformStyle: "preserve-3d" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "absolute inset-0 rounded-3xl -z-10 blur-2xl",
                          style: { background: "rgba(124,58,237,0.25)" }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "glass-card overflow-hidden aspect-[3/4] rounded-3xl floating",
                          style: { border: "1px solid rgba(124,58,237,0.35)" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "img",
                              {
                                src: "https://picsum.photos/seed/lokesh-about/350/450",
                                alt: "Lokesh Devda — Graphic Designer & Web Developer",
                                className: "w-full h-full object-cover",
                                loading: "lazy"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "absolute inset-0",
                                style: {
                                  background: "linear-gradient(to top, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.3) 40%, transparent 70%)"
                                }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-5 left-5 right-5", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-white text-lg leading-tight", children: "Lokesh Devda" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-0.5", style: { color: "#00f5ff" }, children: "Graphic Designer & Web Developer" })
                            ] })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          "data-ocid": "about.available_badge",
                          className: "absolute -top-3 -right-3 glass-card px-3 py-2 rounded-2xl text-center pulse-glow",
                          style: { border: "1px solid rgba(0,245,255,0.4)" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "font-display font-bold text-2xl leading-none",
                                style: { color: "#00f5ff" },
                                children: "5+"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-medium tracking-widest uppercase text-white/50 mt-0.5", children: "Yrs Exp." })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          "data-ocid": "about.location_badge",
                          className: "absolute -bottom-4 -left-4 glass-card px-3 py-2 rounded-2xl flex items-center gap-2",
                          style: { border: "1px solid rgba(124,58,237,0.4)" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "📍" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/70", children: "Indore, India" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "absolute top-1/2 -right-5 -translate-y-1/2 flex flex-col items-center gap-1",
                          style: { writingMode: "vertical-rl" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium", children: "✦ Available" })
                        }
                      )
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "about.content",
                ref: textRevealRef,
                className: "space-y-8",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        "data-reveal": true,
                        className: "text-xs font-semibold tracking-[0.3em] uppercase mb-3",
                        style: { color: "#00f5ff" },
                        children: "Hi, I'm"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "h2",
                      {
                        "data-reveal": true,
                        className: "section-title text-4xl sm:text-5xl lg:text-6xl text-white mb-5",
                        children: [
                          "Lokesh ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-purple", children: "Devda" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        "data-reveal": true,
                        className: "text-white/60 text-lg leading-relaxed mb-3",
                        children: [
                          "A passionate Graphic Designer & Web Developer from Indore, India with",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/90 font-medium", children: "5+ years of crafting visual experiences" }),
                          " ",
                          "that captivate and convert. I blend design thinking with technical expertise to create brands that stand out."
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-reveal": true, className: "flex items-center gap-2 mt-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "inline-flex items-center gap-2 glass-card px-3 py-1.5 rounded-full text-sm font-medium",
                          style: {
                            border: "1px solid rgba(245,166,35,0.3)",
                            color: "#f5a623"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📍" }),
                            "Indore, Madhya Pradesh"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "inline-flex items-center gap-2 glass-card px-3 py-1.5 rounded-full text-sm font-medium",
                          style: {
                            border: "1px solid rgba(0,245,255,0.3)",
                            color: "#00f5ff"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✦" }),
                            "Open to Work"
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      "data-reveal": true,
                      ref: skillBarsRef,
                      "data-ocid": "about.skills_list",
                      className: "space-y-4",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold tracking-widest uppercase text-white/40 mb-5", children: "Core Skills" }),
                        ABOUT_SKILLS.map((skill, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": `about.skill.${i + 1}`, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-white/80", children: skill.name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                className: "text-xs font-bold tabular-nums",
                                style: { color: skill.color },
                                children: [
                                  skill.percent,
                                  "%"
                                ]
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "h-1.5 rounded-full overflow-hidden",
                              style: { background: "rgba(255,255,255,0.07)" },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "div",
                                {
                                  ref: (el) => {
                                    barFillsRef.current[i] = el;
                                  },
                                  className: "h-full rounded-full",
                                  style: {
                                    width: "0%",
                                    background: `linear-gradient(90deg, ${skill.color}, rgba(255,255,255,0.25))`,
                                    boxShadow: `0 0 8px ${skill.color}80`
                                  }
                                }
                              )
                            }
                          )
                        ] }, skill.name))
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-reveal": true, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold tracking-widest uppercase text-white/40 mb-4", children: "Tools & Software" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        "data-ocid": "about.software_list",
                        className: "flex flex-wrap gap-3",
                        children: [
                          SOFTWARE_ICONS.map((sw) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              "data-ocid": `about.software.${sw.label.toLowerCase()}`,
                              className: "group relative flex flex-col items-center gap-1.5 cursor-pointer",
                              title: sw.name,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "div",
                                  {
                                    className: "w-12 h-12 rounded-2xl glass-card flex items-center justify-center font-display font-bold text-sm transition-all duration-300 group-hover:scale-110",
                                    style: {
                                      border: `1px solid ${sw.color}30`,
                                      color: sw.color
                                    },
                                    onMouseEnter: (e) => {
                                      e.currentTarget.style.boxShadow = `0 0 20px ${sw.color}50, 0 0 40px ${sw.color}20`;
                                      e.currentTarget.style.borderColor = `${sw.color}80`;
                                    },
                                    onMouseLeave: (e) => {
                                      e.currentTarget.style.boxShadow = "none";
                                      e.currentTarget.style.borderColor = `${sw.color}30`;
                                    },
                                    children: sw.label
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/40 group-hover:text-white/70 transition-colors duration-200", children: sw.name })
                              ]
                            },
                            sw.name
                          )),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5 ml-auto", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "w-12 h-12 rounded-2xl flex items-center justify-center font-display font-bold text-base",
                                style: {
                                  background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(0,245,255,0.2))",
                                  border: "1px solid rgba(124,58,237,0.4)",
                                  color: "#ffffff"
                                },
                                children: "5+"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/40", children: "Years" })
                          ] })
                        ]
                      }
                    )
                  ] })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  AboutSection as default
};
