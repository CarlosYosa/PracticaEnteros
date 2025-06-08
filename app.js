let aciertos = 0;
let fallos = 0;
let temporizadorActivo = false;
let tiempoRestante = 20;
let intervalo;

function generarNumeros(nivel) {
  let min, max;
  if (nivel === "facil") {
    min = -20; max = 20;
  } else if (nivel === "medio") {
    min = -50; max = 50;
  } else if (nivel === "dificil") {
    min = -100; max = 100;
  } else if (nivel === "super-dificil") {
    min = -200; max = 200;
  } else if (nivel === "yosa") {
    min = -500; max = 500;
  }

  const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
  const num2 = Math.floor(Math.random() * (max - min + 1)) + min;
  const operacion = "+";

  // Mostrar número negativo entre paréntesis si es necesario
  const num1Texto = num1 < 0 ? `(${num1})` : num1.toString();
  const num2Texto = num2 < 0 ? `(${num2})` : num2.toString();

  document.getElementById("num1").textContent = num1Texto;
  document.getElementById("num2").textContent = num2Texto;
  document.getElementById("operacion").textContent = operacion;
  document.getElementById("respuesta").value = "";
  document.getElementById("mensaje").textContent = "";
  document.getElementById("respuesta").focus();

  clearInterval(intervalo);
  tiempoRestante = 20;
  document.getElementById("temporizador").textContent = tiempoRestante;
  iniciarTemporizador();
}

function iniciarTemporizador() {
  temporizadorActivo = true;
  intervalo = setInterval(() => {
    tiempoRestante--;
    document.getElementById("temporizador").textContent = tiempoRestante;
    if (tiempoRestante <= 0) {
      clearInterval(intervalo);
      temporizadorActivo = false;
      mostrarMensaje("⏰ Tiempo agotado", "#FFA500");
      document.getElementById("respuesta").disabled = true;
    }
  }, 1000);
}

function validarRespuesta() {
  if (!temporizadorActivo) return;

  const num1 = parseInt(document.getElementById("num1").textContent.replace(/[()]/g, ""));
  const num2 = parseInt(document.getElementById("num2").textContent.replace(/[()]/g, ""));
  const operacion = document.getElementById("operacion").textContent;
  const respuesta = parseInt(document.getElementById("respuesta").value);

  let resultadoEsperado = 0;
  if (operacion === "+") {
    resultadoEsperado = num1 + num2;
  }

  if (isNaN(respuesta)) {
    mostrarMensaje("Ingresa una respuesta válida.", "#FFA500");
    return;
  }

  if (respuesta === resultadoEsperado) {
    aciertos++;
    mostrarMensaje("✅ Correcto!", "#00C853");
  } else {
    fallos++;
    mostrarMensaje(`❌ Incorrecto. La respuesta era: ${resultadoEsperado}`, "#FF5252");
  }

  // Actualizar contadores
  document.getElementById("acierto").textContent = aciertos;
  document.getElementById("fallos").textContent = fallos;

  // Mostrar mensaje durante 2 segundos y luego generar nuevo ejercicio
  setTimeout(() => {
    clearInterval(intervalo);
    tiempoRestante = 20;
    document.getElementById("temporizador").textContent = tiempoRestante;
    iniciarTemporizador();
    generarNumeros(document.getElementById("nivel").value);
  }, 2000);
}

function mostrarMensaje(mensaje, color) {
  const msgElement = document.getElementById("mensaje");
  msgElement.textContent = mensaje;
  msgElement.style.color = color;
}

function reiniciar() {
  aciertos = 0;
  fallos = 0;
  clearInterval(intervalo);
  document.getElementById("acierto").textContent = aciertos;
  document.getElementById("fallos").textContent = fallos;
  document.getElementById("temporizador").textContent = tiempoRestante;
  document.getElementById("mensaje").textContent = "";
  document.getElementById("respuesta").disabled = false;
  generarNumeros(document.getElementById("nivel").value);
}

document.getElementById("nivel").addEventListener("change", function () {
  generarNumeros(this.value);
});

// Inicializar
window.onload = function () {
  reiniciar();
};