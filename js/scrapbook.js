/* ================================================
   Scrapbook — panels + gallery slideshow
   ================================================ */
(function () {
  'use strict';

  /* ========== PANEL OPEN / CLOSE ========== */
  var backdrop = document.getElementById('backdrop');
  var panels = document.querySelectorAll('.panel');

  function openPanel(id) {
    var panel = document.getElementById(id);
    if (!panel) return;
    backdrop.classList.add('active');
    panel.classList.add('active');
  }

  function closeAll() {
    backdrop.classList.remove('active');
    panels.forEach(function (p) { p.classList.remove('active'); });
  }

  // "See all" links trigger panels
  document.querySelectorAll('[data-panel]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openPanel(this.getAttribute('data-panel'));
    });
  });

  // Close buttons
  document.querySelectorAll('.panel-close').forEach(function (btn) {
    btn.addEventListener('click', closeAll);
  });

  // Click backdrop to close
  backdrop.addEventListener('click', closeAll);

  // Esc key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll();
  });

  /* ========== GALLERY SLIDESHOW ========== */
  var slides = document.querySelectorAll('.gallery-slide');
  var currentSlide = 0;
  var slideTimer;

  function goToSlide(index) {
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function resetTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, 7000);
  }

  var prevBtn = document.querySelector('.gallery-prev');
  var nextBtn = document.querySelector('.gallery-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', function () { prevSlide(); resetTimer(); });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () { nextSlide(); resetTimer(); });
  }

  resetTimer();

})();
