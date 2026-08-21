/* DETERICA — Genesis site interactions.
   No dependency, no build step.

   The two forms have no server. They compose a mailto: link and open the
   visitor's email client. That works on a static host and it needs no
   endpoint, no key, and no third party. Swap `send()` for a fetch to a real
   endpoint when one exists — see README.md. */
(function () {
  "use strict";

  var EMAIL = "oleg@deterica.com";

  /* ---- Year in the footer ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Mobile navigation ---- */
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

  /* ---- Which section is the reader in ----

     The header is sticky, so "the current section" is the one that covers the
     line just under it. That is simpler than a distance-to-centre rule and it
     agrees with what a reader sees: the heading under the header is the
     heading they are reading. */
  (function () {
    var header = document.querySelector(".site-header");
    var links = [];
    document.querySelectorAll('.site-header a[href^="#"]').forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      // `#top` is the header itself, not a section to report.
      if (id && id !== "top" && document.getElementById(id)) links.push({ a: a, id: id });
    });
    if (!links.length) return;

    // One entry per target, in the order the page holds them.
    var seen = {};
    var targets = [];
    links.forEach(function (l) {
      if (seen[l.id]) return;
      seen[l.id] = true;
      targets.push(document.getElementById(l.id));
    });
    targets.sort(function (x, y) { return x.offsetTop - y.offsetTop; });

    var current = null;
    function paint(id) {
      if (id === current) return;
      current = id;
      links.forEach(function (l) {
        l.a.classList.toggle("is-active", l.id === id);
      });
    }

    function spy() {
      var line = (header ? header.getBoundingClientRect().height : 0) + 8;
      var found = null;
      for (var i = 0; i < targets.length; i++) {
        var r = targets[i].getBoundingClientRect();
        if (r.top <= line && r.bottom > line) found = targets[i].id;
      }
      // The last section can be shorter than the space under the fold, so it
      // would never cross the line. At the foot of the page it wins.
      if (!found &&
          window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        found = targets[targets.length - 1].id;
      }
      paint(found);
    }

    // No rAF throttle. `spy()` reads nine rectangles, which costs less than
    // the bookkeeping, and a frame-based throttle drops updates whenever the
    // frame callback does not run.
    window.addEventListener("scroll", spy, { passive: true });
    window.addEventListener("resize", spy);
    spy();
  })();

  /* ---- Scroll reveal ---- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(
    ".card, .step, .video-item, .status li, .faq-list details," +
    " .form-card, .split > div, .split-media, .note, .download"
  );
  targets.forEach(function (el) { el.classList.add("reveal"); });

  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var i = Array.prototype.indexOf.call(el.parentNode.children, el);
        el.style.transitionDelay = Math.min(i * 70, 280) + "ms";
        el.classList.add("in");
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---- Video: a poster becomes a player on the first click ----

     The page ships no YouTube code. It loads the player only when somebody
     asks for it, which keeps the page fast and sends nothing to YouTube
     before then.

     One caveat decides the two branches below. A YouTube embed refuses to
     play when the page itself came from a `file://` URL: the player has no
     origin to check and it reports "Error 153". So a page opened straight
     from the disk opens the video on YouTube instead of failing in place.
     Served over http or https, it plays inside the page. */
  var canEmbed = /^https?:$/.test(window.location.protocol);

  document.querySelectorAll(".video[data-yt]").forEach(function (tile) {
    tile.addEventListener("click", function () {
      var id = tile.getAttribute("data-yt");
      if (!id) return;

      if (!canEmbed) {
        window.open("https://www.youtube.com/watch?v=" + id, "_blank", "noopener");
        return;
      }
      // The player is built once. A click on the player itself must not rebuild it.
      if (tile.querySelector("iframe")) return;

      var frame = document.createElement("iframe");
      frame.src = "https://www.youtube-nocookie.com/embed/" + id +
                  "?autoplay=1&rel=0&modestbranding=1";
      frame.title = tile.getAttribute("aria-label") || "Video";
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media;" +
                    " gyroscope; picture-in-picture; web-share";
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      frame.allowFullscreen = true;
      tile.textContent = "";
      tile.appendChild(frame);
      // The box is no longer a control; it is the player.
      tile.style.cursor = "default";
      tile.removeAttribute("aria-label");
    });
  });

  /* ---- The form ----

     The form posts to Web3Forms, which delivers the message to the address
     the account holds. That keeps the page a static file: there is no server
     of ours in the path.

     Two things guard it.

     The access key below is public, because it travels in this file to the
     visitor's browser. Web3Forms is built that way. What it means is that
     anybody can post to the key, so the form carries a honeypot: a checkbox
     that CSS hides, which a person never sees and never ticks. Web3Forms
     drops any submission that arrives with it set.

     And a request can fail — a network, a blocker, a quota. When it does the
     message is not lost: the status line offers the same message as a
     `mailto:` link, so the visitor sends it from their own client instead. */

  var FORM_ENDPOINT = "https://api.web3forms.com/submit";
  var FORM_KEY = "6d3d1def-6cc5-476b-a4a0-654507904beb";

  // The label of a field, so the message reads as prose and not as form data.
  function labelOf(field) {
    var el = field.form.querySelector('label[for="' + field.id + '"]');
    return el ? el.textContent.trim() : field.name;
  }

  // Every field a person filled, in the order the form asks for them.
  function readFields(form) {
    var filled = [];
    var missing = null;
    form.querySelectorAll("input, select, textarea").forEach(function (f) {
      if (f.name === "botcheck") return;
      var value = f.value.trim();
      if (f.required && (!value || !f.checkValidity())) {
        if (!missing) missing = f;
        return;
      }
      if (value) filled.push({ field: f, label: labelOf(f), value: value });
    });
    return { filled: filled, missing: missing };
  }

  function mailtoHref(subject, filled) {
    var lines = filled.map(function (f) { return f.label + ": " + f.value; });
    lines.push("", "-- Sent from " + window.location.hostname);
    return "mailto:" + EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));
  }

  function say(statusEl, text, ok) {
    statusEl.textContent = text;
    statusEl.classList.toggle("ok", !!ok);
  }

  // The recovery path. It offers the mail client; it does not hijack the page.
  function offerMailClient(statusEl, subject, filled) {
    statusEl.textContent = "That did not go through. ";
    var a = document.createElement("a");
    a.href = mailtoHref(subject, filled);
    a.textContent = "Send it from your email client instead";
    statusEl.appendChild(a);
    statusEl.appendChild(document.createTextNode(", or write to " + EMAIL + "."));
    statusEl.classList.remove("ok");
  }

  function send(form, subject, statusEl) {
    var read = readFields(form);
    if (read.missing) {
      say(statusEl, "Please complete: " + labelOf(read.missing) + ".");
      read.missing.focus();
      return;
    }

    var payload = { access_key: FORM_KEY, subject: subject, botcheck: "" };
    read.filled.forEach(function (f) { payload[f.field.name] = f.value; });
    // Web3Forms puts `from_name` in the From line of the mail it sends.
    if (payload.name) payload.from_name = payload.name;

    var button = form.querySelector('button[type="submit"]');
    if (button) button.disabled = true;
    say(statusEl, "Sending…");

    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) { return res.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (!data || !data.success) throw new Error((data && data.message) || "rejected");
        form.reset();
        say(statusEl, "Thank you. The message is with us, and a real human reads every one.", true);
      })
      .catch(function () { offerMailClient(statusEl, subject, read.filled); })
      .then(function () { if (button) button.disabled = false; });
  }

  function wire(formId, subject, statusId) {
    var form = document.getElementById(formId);
    var status = document.getElementById(statusId);
    if (!form || !status) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      send(form, subject, status);
    });
  }

  wire("contact-form", "Genesis — enquiry from the website", "contact-status");
})();
