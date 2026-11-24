// ===== Language switch (EN / ES) =====
// Any element with a data-es attribute is translatable.
// English text lives in the HTML; Spanish lives in data-es.
(function () {
  const els = document.querySelectorAll("[data-es]");
  els.forEach((el) => { el.dataset.en = el.innerHTML; });

  function setLang(lang) {
    els.forEach((el) => { el.innerHTML = lang === "es" ? el.dataset.es : el.dataset.en; });
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang-toggle button").forEach((b) => {
      b.classList.toggle("on", b.dataset.lang === lang);
    });
    document.querySelectorAll("[data-label-es]").forEach((el) => {
      if (!el.dataset.labelEn) el.dataset.labelEn = el.dataset.label;
      el.dataset.label = lang === "es" ? el.dataset.labelEs : el.dataset.labelEn;
    });
    const t = document.querySelector("title");
    if (t && t.dataset.es) document.title = lang === "es" ? t.dataset.es : t.dataset.en;
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  let saved = "en";
  try { saved = localStorage.getItem("lang") || "en"; } catch (e) {}
  setLang(saved);

  document.querySelectorAll(".lang-toggle button").forEach((b) => {
    b.addEventListener("click", () => setLang(b.dataset.lang));
  });
})();

// ===== Nav: background on scroll + mobile menu =====
(function () {
  const nav = document.querySelector(".nav");
  const onScroll = () => nav && nav.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const btn = document.querySelector(".menu-btn");
  const links = document.querySelector(".nav-links");
  if (btn && links) {
    btn.addEventListener("click", () => links.classList.toggle("open"));
    links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));
  }
})();

// ===== Reveal on scroll =====
(function () {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach((i) => i.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  items.forEach((i) => io.observe(i));
})();

// ===== Footer year =====
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
