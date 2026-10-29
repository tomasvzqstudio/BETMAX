// Respuesta al tacto y navegación animada entre pantallas
(function () {
  var SEL = '.ev, .odd, .opt, .chip, .btn-bet, .btn-place, .hdr-left, .sport, .tab, .stats-tab, .result-btn, .hdr-btn, .nav a, .sh-close';
  var current = null, timer = null;
  function press(e) {
    var el = e.target.closest(SEL); if (!el) return;
    current = el; clearTimeout(timer); el.classList.add('pressed');
  }
  function release() {
    if (!current) return;
    var el = current; current = null;
    timer = setTimeout(function () { el.classList.remove('pressed'); }, 130);
  }
  document.addEventListener('pointerdown', press, { passive: true });
  document.addEventListener('pointerup', release, { passive: true });
  document.addEventListener('pointercancel', release, { passive: true });
  document.addEventListener('touchstart', function () {}, { passive: true });

  // Navegación: mantener el toque visible un instante y deslizar la pantalla
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#') { e.preventDefault(); return; }
    e.preventDefault();
    var back = a.hasAttribute('data-back');
    a.classList.add('pressed');
    try { sessionStorage.setItem('nav', back ? 'back' : 'fwd'); } catch (_) {}
    setTimeout(function () {
      document.body.classList.add('leaving'); if (back) document.body.classList.add('back');
      setTimeout(function () { location.href = href; }, 190);
    }, 110);
  });

  // Al volver desde la caché del navegador, limpiar el estado de salida
  window.addEventListener('pageshow', function (ev) {
    if (ev.persisted) {
      document.body.classList.remove('leaving', 'back');
      document.querySelectorAll('.pressed').forEach(function (el) { el.classList.remove('pressed'); });
    }
  });
})();
