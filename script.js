/* Deterica — landing interactions */
(function () {
  "use strict";

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = mobileNav.getAttribute("data-open") === "true";
      mobileNav.setAttribute("data-open", String(!open));
      mobileNav.hidden = open;
      toggle.setAttribute("aria-expanded", String(!open));
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileNav.setAttribute("data-open", "false");
        mobileNav.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll reveal — tag sections, then observe
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(
    ".prob, .feature, .step, .ba, .big-stats div, .company-copy, .company-media, .faq details, .section-title, .section-sub"
  );
  targets.forEach(function (el) { el.classList.add("reveal"); });

  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var el = e.target;
          var sibs = Array.prototype.indexOf.call(el.parentNode.children, el);
          el.style.transitionDelay = Math.min(sibs * 70, 280) + "ms";
          el.classList.add("in");
          io.unobserve(el);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  }

  // Waitlist form (front-end only — wire to a real endpoint later)
  window.Deterica = {
    submitWaitlist: function (e) {
      e.preventDefault();
      var input = document.getElementById("email");
      var status = document.getElementById("form-status");
      if (input && status) {
        status.textContent = "Thanks — you're on the list. We'll reach out as access opens.";
        status.classList.add("ok");
        input.value = "";
        input.blur();
      }
      return false;
    }
  };
})();
