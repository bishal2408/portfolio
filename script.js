// Bishal Lamichhane — Portfolio
// Nav scroll state + active link, mobile menu, scroll-reveal, smooth anchor scroll.

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const nav = document.getElementById("nav");
  const navLinks = document.getElementById("nav-links");
  const navToggle = document.getElementById("nav-toggle");
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");

  // Scrolled nav background
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("active");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  // Active link on scroll
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        links.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => activeObserver.observe(s));

  // Reveal-on-scroll
  document
    .querySelectorAll(
      ".section-label, .section-title, .about-copy, .about-stats .stat, .skill-card, .timeline-item, .project-feature, .project-card, .edu-item, .contact-item"
    )
    .forEach((el) => el.setAttribute("data-reveal", ""));

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));
});
