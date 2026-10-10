/* Small enhancements. The site works without them. */
(function () {
  "use strict";

  /* Annotated photo: hovering a marker or its note highlights both. */
  var figure = document.querySelector(".hero__figure");
  if (figure) {
    var parts = figure.querySelectorAll("[data-pin]");
    var setActive = function (id) {
      parts.forEach(function (el) {
        el.classList.toggle("is-active", id !== null && el.getAttribute("data-pin") === id);
      });
    };
    parts.forEach(function (el) {
      var id = el.getAttribute("data-pin");
      el.addEventListener("mouseenter", function () { setActive(id); });
      el.addEventListener("mouseleave", function () { setActive(null); });
      el.addEventListener("click", function () { setActive(id); });
    });
  }

  /* Copy the email address. */
  document.querySelectorAll("[data-copy]").forEach(function (button) {
    var label = button.textContent;
    var timer = null;
    var show = function (text, done) {
      button.textContent = text;
      button.classList.toggle("is-done", done);
      clearTimeout(timer);
      timer = setTimeout(function () {
        button.textContent = label;
        button.classList.remove("is-done");
      }, 2200);
    };
    var fallback = function (text) {
      var area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(area);
      return ok;
    };
    button.addEventListener("click", function () {
      var text = button.getAttribute("data-copy");
      var finish = function (ok) { show(ok ? "Copied" : "Copy failed", ok); };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { finish(true); }, function () { finish(fallback(text)); });
      } else {
        finish(fallback(text));
      }
    });
  });

  /* Let wide tables scroll sideways on small screens. */
  document.querySelectorAll(".prose table").forEach(function (table) {
    if (table.parentElement.classList.contains("table-wrap")) return;
    var wrap = document.createElement("div");
    wrap.className = "table-wrap";
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });

  /* Figure viewer for the gallery. Without it, the links open the image itself. */
  var links = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
  if (!links.length || typeof HTMLDialogElement !== "function") return;

  var icon = function (path) {
    return '<svg class="icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="' + path + '"/></svg>';
  };

  var dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "Figure viewer");
  dialog.innerHTML =
    '<div class="lightbox__bar">' +
      '<p class="lightbox__count" aria-live="polite"></p>' +
      '<button type="button" class="lightbox__button lightbox__close" aria-label="Close">' + icon("M3.5 3.5l9 9M12.5 3.5l-9 9") + "</button>" +
    "</div>" +
    '<div class="lightbox__stage">' +
      '<img class="lightbox__img" alt="">' +
      '<button type="button" class="lightbox__button lightbox__prev" aria-label="Previous figure">' + icon("M10 3 5 8l5 5") + "</button>" +
      '<button type="button" class="lightbox__button lightbox__next" aria-label="Next figure">' + icon("M6 3l5 5-5 5") + "</button>" +
    "</div>" +
    '<p class="lightbox__caption"></p>';
  document.body.appendChild(dialog);

  var img = dialog.querySelector(".lightbox__img");
  var caption = dialog.querySelector(".lightbox__caption");
  var count = dialog.querySelector(".lightbox__count");
  var prev = dialog.querySelector(".lightbox__prev");
  var next = dialog.querySelector(".lightbox__next");
  var current = 0;

  if (links.length < 2) {
    prev.hidden = true;
    next.hidden = true;
  }

  var show = function (index) {
    current = (index + links.length) % links.length;
    var link = links[current];
    var thumb = link.querySelector("img");
    var figcaption = link.parentElement.querySelector("figcaption");
    img.src = link.getAttribute("href");
    img.alt = thumb ? thumb.alt : "";
    caption.textContent = figcaption ? figcaption.textContent : "";
    count.textContent = "Figure " + (current + 1) + " of " + links.length;
  };

  links.forEach(function (link, index) {
    link.addEventListener("click", function (event) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) return;
      event.preventDefault();
      show(index);
      dialog.showModal();
    });
  });

  prev.addEventListener("click", function () { show(current - 1); });
  next.addEventListener("click", function () { show(current + 1); });
  dialog.querySelector(".lightbox__close").addEventListener("click", function () { dialog.close(); });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog || event.target.classList.contains("lightbox__stage")) dialog.close();
  });
  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") { event.preventDefault(); show(current - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); show(current + 1); }
  });
  dialog.addEventListener("close", function () {
    img.removeAttribute("src");
    var link = links[current];
    if (link) link.focus({ preventScroll: true });
  });
})();
