/* HLT One homepage, 29 Sep 2026 draft: the age picker, the "Start here" cards and the sliders.
   Loaded after hlt-home.js, whose window.HLT.addToCart opens the slide-out cart. */
(function () {
  'use strict';

  var doc = document;

  /* ---------------- Age picker dialog ----------------
     Every "Choose their bundle" button and the Age bundles link carry
     data-hlt-age-open. Without JS they are plain links to the youngest bundle. */
  function ageDialog() { return doc.getElementById('HltAgeDialog'); }

  doc.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-hlt-age-open]');
    var dialog = ageDialog();
    if (opener && dialog && typeof dialog.showModal === 'function') {
      e.preventDefault();
      var drawer = doc.querySelector('header-drawer details[open]');
      if (drawer) {
        var summary = drawer.querySelector('summary');
        if (summary) summary.click();
      }
      dialog.showModal();
      var first = dialog.querySelector('.hlt-age__opt');
      if (first) first.focus();
      return;
    }
    if (dialog && dialog.open) {
      if (e.target.closest('[data-hlt-age-close]') || e.target === dialog) dialog.close();
    }
  });

  /* ---------------- Find their snack dropdown (desktop header) ---------------- */
  function initSnackMenu() {
    var wrap = doc.querySelector('[data-hlt-snack]');
    if (!wrap || wrap.hltReady) return;
    wrap.hltReady = true;
    var trigger = wrap.querySelector('[data-hlt-snack-trigger]');
    var panel = wrap.querySelector('[data-hlt-snack-panel]');
    var timer = null;
    function setOpen(on) {
      clearTimeout(timer);
      panel.hidden = !on;
      trigger.setAttribute('aria-expanded', on ? 'true' : 'false');
      wrap.classList.toggle('is-open', on);
      if (on) doc.dispatchEvent(new CustomEvent('hlt:menu-open', { detail: 'snack' }));
    }
    trigger.addEventListener('click', function () { setOpen(panel.hidden); });
    trigger.addEventListener('mouseenter', function () { setOpen(true); });
    panel.addEventListener('mouseenter', function () { setOpen(true); });
    wrap.addEventListener('mouseleave', function () { timer = setTimeout(function () { setOpen(false); }, 180); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) { setOpen(false); trigger.focus(); } });
    ['click', 'focusin'].forEach(function (type) {
      doc.addEventListener(type, function (e) { if (!panel.hidden && !wrap.contains(e.target)) setOpen(false); });
    });
    doc.addEventListener('hlt:menu-open', function (e) { if (e.detail !== 'snack' && !panel.hidden) setOpen(false); });
  }

  /* ---------------- Start here cards ---------------- */
  function initCards(scope) {
    scope.querySelectorAll('[data-hlt-card]').forEach(function (card) {
      if (card.hltReady) return;
      card.hltReady = true;
      var dataEl = card.querySelector('[data-hlt-card-variants]');
      var variants = dataEl ? JSON.parse(dataEl.textContent) : [];
      var idInput = card.querySelector('input[name="id"]');
      var priceEl = card.querySelector('[data-hlt-card-price]');
      var btn = card.querySelector('[data-hlt-card-add]');
      var errorEl = card.querySelector('[data-hlt-card-error]');
      var addLabel = btn ? btn.textContent.trim() : '';
      var soldLabel = card.getAttribute('data-sold-out-label') || 'Sold out';

      function select(id) {
        var v = variants.filter(function (x) { return String(x.id) === String(id); })[0];
        if (!v) return;
        if (idInput) idInput.value = v.id;
        if (priceEl) priceEl.textContent = v.price;
        card.querySelectorAll('[data-hlt-chip]').forEach(function (c) {
          c.setAttribute('aria-pressed', c.getAttribute('data-hlt-chip') === String(v.id) ? 'true' : 'false');
        });
        if (btn) {
          btn.disabled = !v.available;
          btn.textContent = v.available ? addLabel : soldLabel;
        }
      }

      card.addEventListener('click', function (e) {
        var chip = e.target.closest('[data-hlt-chip]');
        if (chip) { e.preventDefault(); select(chip.getAttribute('data-hlt-chip')); }
      });

      var form = card.querySelector('form');
      if (form && btn) {
        form.addEventListener('submit', function (e) {
          if (!window.HLT || typeof window.HLT.addToCart !== 'function') return;
          e.preventDefault();
          window.HLT.addToCart(idInput.value, btn, errorEl);
        });
      }
    });
  }

  /* ---------------- Sliders (arrows only; touch scroll is native) ---------------- */
  function initSliders(scope) {
    scope.querySelectorAll('[data-hlt-slider]').forEach(function (slider) {
      if (slider.hltReady) return;
      slider.hltReady = true;
      var track = slider.querySelector('[data-hlt-track]');
      var prev = slider.querySelector('[data-hlt-prev]');
      var next = slider.querySelector('[data-hlt-next]');
      if (!track) return;
      function step() {
        var item = track.firstElementChild;
        if (!item) return track.clientWidth;
        var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return item.getBoundingClientRect().width + gap;
      }
      function update() {
        var max = track.scrollWidth - track.clientWidth - 2;
        if (prev) prev.disabled = track.scrollLeft <= 2;
        if (next) next.disabled = track.scrollLeft >= max;
      }
      if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
      if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
      track.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });
      window.addEventListener('resize', update, { passive: true });
      update();
    });
  }

  function init(scope) {
    initSnackMenu();
    initCards(scope);
    initSliders(scope);
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', function () { init(doc); });
  else init(doc);
  doc.addEventListener('shopify:section:load', function (e) { init(e.target); });
})();
