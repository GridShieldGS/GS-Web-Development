# Uso de IA no Projeto

## 1. Como criar slideshow automático?

### JavaScript

```javascript
let imagens = ["img1.jpg", "img2.jpg", "img3.jpg"];
let i = 0;

function trocarSlide() {
  document.getElementById("slide").src = imagens[i];
  i = (i + 1) % imagens.length;
}

setInterval(trocarSlide, 3000);
```

### CSS

```css
img {
  transition: 0.5s ease-in-out;
}
```

**Rejeitado:** troca de imagem sem animação.

**Motivo:** experiência visual ruim.

---

## 2. Como criar quiz interativo?

### JavaScript

```javascript
let score = 0;

function responder(correta) {
  if (correta) score++;
}

function resultado() {
  document.getElementById("resultado").innerText =
    "Você acertou " + score + " de 10";
}
```

**Mantido:** contador de score.

**Motivo:** base correta para lógica do quiz.
