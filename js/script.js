(function iniciarSlideshow() {
  var slides = document.querySelectorAll(".slide");
  var dots   = document.querySelectorAll(".dot");
  var btnPrev = document.getElementById("slidePrev");
  var btnNext = document.getElementById("slideNext");

  if (!slides.length) return;

  var atual = 0;
  var total = slides.length;
  var intervalo;

  function irPara(index) {
    slides[atual].classList.remove("active");
    dots[atual].classList.remove("active");
    atual = (index + total) % total;
    slides[atual].classList.add("active");
    dots[atual].classList.add("active");
  }

  function avancar() { irPara(atual + 1); }
  function voltar()  { irPara(atual - 1); }

  function reiniciarIntervalo() {
    clearInterval(intervalo);
    intervalo = setInterval(avancar, 4000);
  }

  btnNext.addEventListener("click", function () { avancar(); reiniciarIntervalo(); });
  btnPrev.addEventListener("click", function () { voltar();  reiniciarIntervalo(); });

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      irPara(parseInt(dot.getAttribute("data-index")));
      reiniciarIntervalo();
    });
  });

  reiniciarIntervalo();
})();