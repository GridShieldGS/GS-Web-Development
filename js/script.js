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


(function iniciarTemas() {
  var temas = {
    space: {
      "--bg":       "#050d1a",
      "--bg-mid":   "#080f20",
      "--bg-card":  "#0c1730",
      "--ciano":    "#00d4ff",
      "--orange":   "#ff7800",
    },
    solar: {
      "--bg":       "#1a0a00",
      "--bg-mid":   "#1f0e00",
      "--bg-card":  "#2a1500",
      "--ciano":    "#ffaa00",
      "--orange":   "#ff4400",
    },
    aurora: {
      "--bg":       "#020f0f",
      "--bg-mid":   "#041414",
      "--bg-card":  "#061c1c",
      "--ciano":    "#00ffb3",
      "--orange":   "#7b2fff",
    },
  };

  var botoes = {
    space:  document.getElementById("themeSpace"),
    solar:  document.getElementById("themeSolar"),
    aurora: document.getElementById("themeAurora"),
  };

  function aplicarTema(nome) {
    var vars = temas[nome];
    var root = document.documentElement;
    Object.keys(vars).forEach(function (prop) {
      root.style.setProperty(prop, vars[prop]);
    });
    Object.keys(botoes).forEach(function (k) {
      botoes[k].classList.remove("active");
    });
    botoes[nome].classList.add("active");
  }

  if (botoes.space)  botoes.space.addEventListener("click",  function () { aplicarTema("space");  });
  if (botoes.solar)  botoes.solar.addEventListener("click",  function () { aplicarTema("solar");  });
  if (botoes.aurora) botoes.aurora.addEventListener("click", function () { aplicarTema("aurora"); });
})();
