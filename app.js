/* =========================================================
   FriendCharge — Interactions
   Scroll reveal · Navbar · Stat counters · Parallax · Tilt
   ========================================================= */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Navbar: shrink on scroll ---------- */
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    if (window.scrollY > 20) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const toggle = document.getElementById("navToggle");
  const mobile = document.getElementById("navMobile");
  if (toggle && mobile) {
    const closeMenu = () => {
      toggle.classList.remove("open");
      mobile.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", () => {
      const open = toggle.classList.toggle("open");
      mobile.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    mobile.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("in"));
  } else {
    // stagger items that share a parent grid
    document.querySelectorAll(".problem-grid, .feature-grid, .persona-grid").forEach((grid) => {
      grid.querySelectorAll(".reveal").forEach((el, i) => {
        el.style.setProperty("--d", i * 0.09 + "s");
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Animated stat counters ---------- */
  const stats = document.querySelectorAll(".stat-num[data-count]");
  if (stats.length) {
    const animate = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || "";
      if (prefersReduced) {
        el.textContent = target + suffix;
        return;
      }
      const dur = 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const statIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate(e.target);
            statIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    stats.forEach((s) => statIO.observe(s));
  }

  if (prefersReduced) return;

  /* ---------- Soft parallax on experience section ---------- */
  const parallax = document.querySelector(".exp-parallax");
  if (parallax) {
    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const rect = parallax.parentElement.getBoundingClientRect();
          const offset = (rect.top - window.innerHeight / 2) * -0.08;
          parallax.style.transform = `translateY(${offset}px)`;
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  /* ---------- Subtle 3D tilt on the device mockups ---------- */
  const tilts = document.querySelectorAll("[data-tilt]");
  tilts.forEach((wrap) => {
    const body = wrap.querySelector(".device-body");
    if (!body) return;
    const maxRot = 10;
    wrap.addEventListener("mousemove", (e) => {
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      body.style.transform = `rotateY(${px * maxRot}deg) rotateX(${-py * maxRot}deg)`;
    });
    wrap.addEventListener("mouseleave", () => {
      body.style.transform = "rotateY(0) rotateX(0)";
    });
  });

  /* ---------- Idle float for hero device ---------- */
  document.querySelectorAll(".hero .device-body").forEach((b) => {
    b.animate(
      [{ transform: "translateY(0)" }, { transform: "translateY(-12px)" }, { transform: "translateY(0)" }],
      { duration: 5000, iterations: Infinity, easing: "ease-in-out" }
    );
  });
})();
