(function () {
  'use strict';
  var S = window.SITE || {};
  document.documentElement.classList.remove('no-js');

  /* ---- bind contact settings ---- */
  document.querySelectorAll('[data-bind]').forEach(function (el) {
    var k = el.getAttribute('data-bind'), v = S[k];
    if (!v) return;
    el.textContent = v;
    var h = el.getAttribute('data-href');
    if (h === 'tel') el.href = 'tel:' + v.replace(/[^+\d]/g, '');
    if (h === 'mailto') el.href = 'mailto:' + v;
  });
  document.querySelectorAll('[data-show]').forEach(function (el) {
    if (S[el.getAttribute('data-show')]) el.hidden = false;
  });

  /* ---- mobile nav ---- */
  var burger = document.getElementById('burger'), nav = document.getElementById('nav');
  function closeNav() { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeNav(); });

  /* ---- reveal + counters + dial ---- */
  function countUp(el) {
    var end = parseInt(el.getAttribute('data-count'), 10), t0 = null, dur = 1400;
    if (isNaN(end)) return;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var dial = document.querySelector('.dial'), shield = document.querySelector('.shield-wrap');
  function activate(el) {
    el.classList.add('in');
    el.querySelectorAll('[data-count]').forEach(countUp);
    if (el.hasAttribute('data-count')) countUp(el);
    if (el === dial || el === shield) el.classList.add('in');
  }
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { activate(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });
  } else {
    items.forEach(activate);
  }

  /* ---- enquiry form ---- */
  var form = document.getElementById('reqForm'), note = document.getElementById('formNote');
  function say(msg, cls) { note.textContent = msg; note.className = 'form-note ' + (cls || ''); }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    form.querySelectorAll('[required]').forEach(function (f) {
      var bad = !f.value.trim() || (f.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value));
      f.classList.toggle('bad', bad); if (bad) ok = false;
    });
    if (!ok) { say('Please complete the highlighted fields.', 'err'); return; }

    var data = {}; new FormData(form).forEach(function (v, k) { data[k] = v; });

    if (S.formEndpoint) {
      say('Sending…');
      fetch(S.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error(); form.reset(); say('Thank you. Our leadership team will respond with an initial shortlist plan shortly.', 'ok'); })
        .catch(function () { say('Sorry, we could not send your enquiry. Please try again or email us directly.', 'err'); });
    } else if (S.email) {
      var body = Object.keys(data).map(function (k) { return k + ': ' + data[k]; }).join('\n');
      window.location.href = 'mailto:' + S.email + '?subject=' + encodeURIComponent('Manpower requirement - ' + data.company) + '&body=' + encodeURIComponent(body);
      say('Opening your email app with the enquiry details…', 'ok');
    } else {
      say('Enquiry form is not connected yet. Please add the email or form endpoint in assets/js/config.js.', 'err');
    }
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
