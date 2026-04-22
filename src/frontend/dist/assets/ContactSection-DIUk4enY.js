import { r as reactExports, j as jsxRuntimeExports, _ as __vitePreload } from "./index-DuMneQu4.js";
const SOCIALS = [
  { label: "Behance", href: "https://behance.net/lokeshdevda", short: "Be" },
  {
    label: "Instagram",
    href: "https://instagram.com/lokeshdevda",
    short: "IG"
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/lokeshdevda",
    short: "in"
  }
];
function ContactSection() {
  const sectionRef = reactExports.useRef(null);
  const headingRef = reactExports.useRef(null);
  const cardRef = reactExports.useRef(null);
  const btnRef = reactExports.useRef(null);
  const btnWrapRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    let ctx = {};
    const init = async () => {
      const { gsap } = await __vitePreload(async () => {
        const { gsap: gsap2 } = await import("./index-D_EK8lFb.js");
        return { gsap: gsap2 };
      }, true ? [] : void 0);
      const { ScrollTrigger } = await __vitePreload(async () => {
        const { ScrollTrigger: ScrollTrigger2 } = await import("./ScrollTrigger-CxSD7whB.js");
        return { ScrollTrigger: ScrollTrigger2 };
      }, true ? [] : void 0);
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        if (headingRef.current) {
          const items = headingRef.current.querySelectorAll(".reveal-item");
          gsap.fromTo(
            items,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: headingRef.current,
                start: "top 80%",
                once: true
              }
            }
          );
        }
        if (cardRef.current) {
          gsap.fromTo(
            cardRef.current,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardRef.current,
                start: "top 85%",
                once: true
              }
            }
          );
        }
      }, sectionRef);
    };
    init();
    return () => {
      var _a;
      (_a = ctx.revert) == null ? void 0 : _a.call(ctx);
    };
  }, []);
  reactExports.useEffect(() => {
    const btn = btnRef.current;
    const wrap = btnWrapRef.current;
    if (!btn || !wrap) return;
    let gsapInstance = null;
    const handleMove = (e) => {
      if (!gsapInstance || !btn) return;
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        gsapInstance.to(btn, {
          x: dx * 0.4,
          y: dy * 0.4,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };
    const handleLeave = () => {
      if (!gsapInstance || !btn) return;
      gsapInstance.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)"
      });
    };
    const attachListeners = async () => {
      const { gsap } = await __vitePreload(async () => {
        const { gsap: gsap2 } = await import("./index-D_EK8lFb.js");
        return { gsap: gsap2 };
      }, true ? [] : void 0);
      gsapInstance = gsap;
      btn.addEventListener("mousemove", handleMove);
      btn.addEventListener("mouseleave", handleLeave);
    };
    attachListeners();
    return () => {
      btn.removeEventListener("mousemove", handleMove);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "contact",
      ref: sectionRef,
      "data-ocid": "contact.section",
      className: "py-24 md:py-32 relative overflow-hidden",
      style: { background: "#0a0a0f" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(124,58,237,0.18) 0%, rgba(0,245,255,0.10) 40%, transparent 70%), radial-gradient(ellipse at 15% 10%, rgba(0,245,255,0.08) 0%, transparent 40%)"
            },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: headingRef, className: "mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reveal-item flex items-center justify-center gap-3 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-px w-12",
                  style: { background: "rgba(124,58,237,0.4)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-semibold tracking-widest uppercase",
                  style: { color: "#7c3aed" },
                  children: "Get In Touch"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-px w-12",
                  style: { background: "rgba(124,58,237,0.4)" }
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "reveal-item section-title text-5xl md:text-7xl text-white mb-5 leading-none", children: [
              "Let's ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-multi", children: "Connect" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "reveal-item text-white/50 text-lg md:text-xl max-w-xl mx-auto leading-relaxed", children: "Have a project in mind? Let's create something extraordinary together." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              ref: cardRef,
              "data-ocid": "contact.card",
              className: "glass-card mx-auto mb-10 p-8 md:p-10 max-w-[600px]",
              style: { border: "1px solid rgba(255,255,255,0.09)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: "tel:+916267382299",
                    "data-ocid": "contact.phone_link",
                    className: "flex items-center gap-4 group mb-6",
                    "aria-label": "Call Lokesh Devda",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110",
                          style: {
                            background: "rgba(0,245,255,0.1)",
                            border: "1px solid rgba(0,245,255,0.25)",
                            boxShadow: "0 0 20px rgba(0,245,255,0.15)"
                          },
                          "aria-hidden": "true",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "svg",
                            {
                              width: "20",
                              height: "20",
                              viewBox: "0 0 24 24",
                              fill: "none",
                              stroke: "#00f5ff",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              "aria-label": "Phone icon",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Phone icon" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.9 10.82 19.79 19.79 0 01.83 2.2 2 2 0 012.83 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.64a16 16 0 006.29 6.29l1-1a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" })
                              ]
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/35 tracking-wide mb-0.5", children: "Phone" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "font-semibold text-base transition-colors duration-300 group-hover:opacity-100",
                            style: { color: "#00f5ff" },
                            children: "+91 6267382299"
                          }
                        )
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: "https://maps.google.com/?q=Nyay+Nagar+Indore+MP",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    "data-ocid": "contact.location_link",
                    className: "flex items-center gap-4 group mb-8",
                    "aria-label": "View location on map",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110",
                          style: {
                            background: "rgba(124,58,237,0.1)",
                            border: "1px solid rgba(124,58,237,0.25)",
                            boxShadow: "0 0 20px rgba(124,58,237,0.15)"
                          },
                          "aria-hidden": "true",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "svg",
                            {
                              width: "20",
                              height: "20",
                              viewBox: "0 0 24 24",
                              fill: "none",
                              stroke: "#7c3aed",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              "aria-label": "Location pin icon",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Location pin icon" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "10", r: "3" })
                              ]
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/35 tracking-wide mb-0.5", children: "Location" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "font-semibold text-base transition-colors duration-300 group-hover:opacity-100",
                            style: { color: "#7c3aed" },
                            children: "Nyay Nagar, Indore, MP"
                          }
                        )
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "mb-8",
                    style: {
                      height: "1px",
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    ref: btnWrapRef,
                    className: "flex justify-center",
                    style: { minHeight: "70px" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        ref: btnRef,
                        type: "button",
                        onClick: () => window.open("mailto:lokeshdevda@gmail.com", "_blank"),
                        "data-ocid": "contact.cta_button",
                        className: "relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-display font-bold text-xl text-white will-change-transform",
                        style: {
                          background: "rgba(10,10,15,0.9)",
                          border: "1px solid rgba(124,58,237,0.5)",
                          boxShadow: "0 0 0 0 transparent, inset 0 0 30px rgba(124,58,237,0.05)",
                          transition: "box-shadow 0.3s ease, border-color 0.3s ease"
                        },
                        onMouseEnter: (e) => {
                          e.currentTarget.style.boxShadow = "0 0 40px rgba(124,58,237,0.5), 0 0 80px rgba(0,245,255,0.2), inset 0 0 30px rgba(124,58,237,0.1)";
                          e.currentTarget.style.borderColor = "rgba(0,245,255,0.7)";
                        },
                        onMouseLeave: (e) => {
                          e.currentTarget.style.boxShadow = "0 0 0 0 transparent, inset 0 0 30px rgba(124,58,237,0.05)";
                          e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)";
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "absolute inset-0 rounded-2xl pointer-events-none",
                              style: {
                                background: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, transparent 50%, rgba(0,245,255,0.1) 100%)"
                              },
                              "aria-hidden": "true"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10 text-gradient-multi", children: "Let's Build Something" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10 text-xl", "aria-hidden": "true", children: "✦" })
                        ]
                      }
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "footer",
            {
              "data-ocid": "contact.footer",
              className: "flex flex-col items-center gap-5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-2 h-2 rounded-full",
                      style: {
                        background: "#06ffa5",
                        boxShadow: "0 0 8px #06ffa5",
                        animation: "pulse-glow 2s ease-in-out infinite"
                      },
                      "aria-hidden": "true"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-white/35", children: "Currently available for freelance & full-time roles" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "ul",
                  {
                    className: "flex items-center gap-3 list-none p-0 m-0",
                    "aria-label": "Social media links",
                    children: SOCIALS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "a",
                      {
                        href: s.href,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        "data-ocid": `contact.social.${i + 1}`,
                        "aria-label": s.label,
                        className: "w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white/50 transition-all duration-300 hover:scale-110 neon-underline",
                        style: {
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)"
                        },
                        onMouseEnter: (e) => {
                          e.currentTarget.style.borderColor = "rgba(0,245,255,0.4)";
                          e.currentTarget.style.boxShadow = "0 0 16px rgba(0,245,255,0.3)";
                          e.currentTarget.style.color = "#00f5ff";
                        },
                        onMouseLeave: (e) => {
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                        },
                        children: s.short
                      }
                    ) }, s.label))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/25 tracking-wide", children: [
                  "© ",
                  (/* @__PURE__ */ new Date()).getFullYear(),
                  " Lokesh Devda. All rights reserved."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/20", children: [
                  "Built with love using",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "text-white/35 hover:text-white/60 transition-colors duration-200 neon-underline",
                      children: "caffeine.ai"
                    }
                  )
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-0 left-0 right-0 text-center overflow-hidden pointer-events-none select-none",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-display font-black text-[12vw] leading-none",
                style: { color: "rgba(255,255,255,0.012)" },
                children: "CONTACT"
              }
            )
          }
        )
      ]
    }
  );
}
export {
  ContactSection as default
};
