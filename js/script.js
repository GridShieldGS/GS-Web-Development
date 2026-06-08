(function iniciarSlideshow() {
  var slides = document.querySelectorAll(".slide");
  var dots = document.querySelectorAll(".dot");
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

  function avancar() {
    irPara(atual + 1);
  }
  function voltar() {
    irPara(atual - 1);
  }

  function reiniciarIntervalo() {
    clearInterval(intervalo);
    intervalo = setInterval(avancar, 4000);
  }

  btnNext.addEventListener("click", function () {
    avancar();
    reiniciarIntervalo();
  });
  btnPrev.addEventListener("click", function () {
    voltar();
    reiniciarIntervalo();
  });

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
      "--bg": "#050d1a",
      "--bg-mid": "#080f20",
      "--bg-card": "#0c1730",
      "--ciano": "#00d4ff",
      "--orange": "#ff7800",
    },
    solar: {
      "--bg": "#1a0a00",
      "--bg-mid": "#1f0e00",
      "--bg-card": "#2a1500",
      "--ciano": "#ffaa00",
      "--orange": "#ff4400",
    },
    aurora: {
      "--bg": "#020f0f",
      "--bg-mid": "#041414",
      "--bg-card": "#061c1c",
      "--ciano": "#00ffb3",
      "--orange": "#7b2fff",
    },
  };

  var botoes = {
    space: document.getElementById("themeSpace"),
    solar: document.getElementById("themeSolar"),
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

  if (botoes.space)
    botoes.space.addEventListener("click", function () {
      aplicarTema("space");
    });
  if (botoes.solar)
    botoes.solar.addEventListener("click", function () {
      aplicarTema("solar");
    });
  if (botoes.aurora)
    botoes.aurora.addEventListener("click", function () {
      aplicarTema("aurora");
    });
})();

(function iniciarQuiz() {
  var perguntas = [
    {
      enunciado: "O que é uma Ejeção de Massa Coronal (CME)?",
      opcoes: [
        "Uma explosão de plasma e campo magnético expelida pelo Sol",
        "Um meteoro que entra na atmosfera terrestre",
        "Um satélite artificial em órbita baixa",
        "Uma aurora boreal de alta intensidade",
      ],
      correta: 0,
    },
    {
      enunciado:
        "Qual satélite da NASA/NOAA o GridShield usa para detectar CMEs?",
      opcoes: ["Hubble", "DSCOVR", "ISS", "James Webb"],
      correta: 1,
    },
    {
      enunciado:
        "Em qual ponto Lagrangiano o satélite DSCOVR está posicionado?",
      opcoes: ["L2", "L4", "L1", "L3"],
      correta: 2,
    },
    {
      enunciado: "O que são GICs no contexto do GridShield?",
      opcoes: [
        "Geradores Independentes de Corrente",
        "Satélites de monitoramento geomagnético",
        "Correntes Induzidas Geomagneticamente nas linhas de transmissão",
        "Grades Integradas de Controle",
      ],
      correta: 2,
    },
    {
      enunciado: "O Índice Kp mede o quê?",
      opcoes: [
        "A intensidade da perturbação geomagnética global",
        "A velocidade de órbita dos satélites",
        "A temperatura da superfície solar",
        "O número de satélites ativos em órbita",
      ],
      correta: 0,
    },
    {
      enunciado:
        "Qual valor de Kp indica início de perturbação geomagnética (nível G1)?",
      opcoes: ["Kp = 2", "Kp = 9", "Kp = 5", "Kp = 7"],
      correta: 2,
    },
    {
      enunciado:
        "Com quantas horas de antecedência o GridShield pode detectar uma CME?",
      opcoes: ["1 hora", "12 horas", "72 horas", "7 dias"],
      correta: 2,
    },
    {
      enunciado: "Qual ODS da ONU o GridShield está alinhado?",
      opcoes: [
        "ODS 3 — Saúde",
        "ODS 9 — Inovação e Infraestrutura",
        "ODS 13 — Ação Climática",
        "ODS 7 — Energia Limpa",
      ],
      correta: 1,
    },
    {
      enunciado:
        "O que o GridShield faz ao detectar risco iminente de CME severa?",
      opcoes: [
        "Lança um foguete para interceptar a CME",
        "Aciona o isolamento preventivo das subestações vulneráveis",
        "Desliga todos os satélites em órbita",
        "Emite alerta apenas para a população",
      ],
      correta: 1,
    },
    {
      enunciado:
        "Qual modelo matemático descreve o decaimento do Índice Kp após o pico da tempestade?",
      opcoes: [
        "Função linear",
        "Função polinomial de grau 2",
        "Função exponencial decrescente",
        "Função logarítmica crescente",
      ],
      correta: 2,
    },
  ];
  var quizBox = document.getElementById("quizBox");
  var quizResult = document.getElementById("quizResult");
  if (!quizBox) return;
  var questionEl = document.getElementById("quizQuestion");
  var optionsEl = document.getElementById("quizOptions");
  var nextBtn = document.getElementById("quizNext");
  var counter = document.getElementById("quizCounter");
  var fill = document.getElementById("quizFill");
  var restartBtn = document.getElementById("quizRestart");
  var atual = 0;
  var pontos = 0;
  var respondeu = false;
  function mostrarPergunta(index) {
    respondeu = false;
    nextBtn.style.display = "none";
    var p = perguntas[index];
    counter.textContent = "Pergunta " + (index + 1) + " de " + perguntas.length;
    fill.style.width = ((index + 1) / perguntas.length) * 100 + "%";
    questionEl.textContent = p.enunciado;
    optionsEl.innerHTML = "";
    p.opcoes.forEach(function (opcao, i) {
      var btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.textContent = opcao;
      btn.addEventListener("click", function () {
        selecionar(i, btn, p.correta);
      });
      optionsEl.appendChild(btn);
    });
  }
  function selecionar(index, btn, correta) {
    if (respondeu) return;
    respondeu = true;
    var todas = optionsEl.querySelectorAll(".quiz-option");
    todas.forEach(function (b) {
      b.disabled = true;
    });
    if (index === correta) {
      btn.classList.add("correta");
      pontos++;
    } else {
      btn.classList.add("errada");
      todas[correta].classList.add("correta");
    }
    nextBtn.style.display = "inline-block";
    if (atual === perguntas.length - 1) {
      nextBtn.textContent = "Ver resultado →";
    }
  }
  function mostrarResultado() {
    quizBox.style.display = "none";
    quizResult.style.display = "block";
    var pct = (pontos / perguntas.length) * 100;
    var icon = document.getElementById("resultIcon");
    var title = document.getElementById("resultTitle");
    var msg = document.getElementById("resultMsg");
    var score = document.getElementById("resultScore");
    score.textContent =
      pontos + " de " + perguntas.length + " acertos (" + pct.toFixed(0) + "%)";
    if (pct >= 80) {
      icon.textContent = "🛰️";
      title.textContent = "Excelente! Você domina o tema!";
      msg.textContent =
        "Seu conhecimento sobre clima espacial e proteção de redes elétricas é de alto nível.";
    } else if (pct >= 50) {
      icon.textContent = "⚡";
      title.textContent = "Bom resultado! Continue aprendendo.";
      msg.textContent =
        "Você tem uma boa base sobre o GridShield. Revise os pontos que errou.";
    } else {
      icon.textContent = "🌍";
      title.textContent = "Ainda há muito para explorar!";
      msg.textContent =
        "Leia as seções do site e tente novamente para melhorar seu desempenho.";
    }
  }
  nextBtn.addEventListener("click", function () {
    atual++;
    if (atual < perguntas.length) {
      mostrarPergunta(atual);
    } else {
      mostrarResultado();
    }
  });
  restartBtn.addEventListener("click", function () {
    atual = 0;
    pontos = 0;
    quizResult.style.display = "none";
    quizBox.style.display = "block";
    nextBtn.textContent = "Próxima →";
    mostrarPergunta(0);
  });
  mostrarPergunta(0);
})();
