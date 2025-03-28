// Variables Globales
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego() {
  let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
  sectionSeleccionarAtaque.style.display = "none";

  let sectionReiniciar = document.getElementById("reiniciar");
  sectionReiniciar.style.display = "none";

  document
    .getElementById("boton-mascota")
    .addEventListener("click", seleccionarMascotaJugador);
  document.getElementById("boton-fuego").addEventListener("click", ataqueFuego);
  document.getElementById("boton-agua").addEventListener("click", ataqueAgua);
  document
    .getElementById("boton-tierra")
    .addEventListener("click", ataqueTierra);
  document
    .getElementById("boton-reiniciar")
    .addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {
  let sectionSeleccionarMascota = document.getElementById(
    "seleccionar-mascota"
  );
  sectionSeleccionarMascota.style.display = "none";
  document.getElementById("seleccionar-ataque").style.display = "flex";

  let spanMascotaJugador = document.getElementById("mascota-jugador");
  if (document.getElementById("hipodoge").checked) {
    spanMascotaJugador.innerHTML = "Hipodoge";
  } else if (document.getElementById("capipepo").checked) {
    spanMascotaJugador.innerHTML = "Capipepo";
  } else if (document.getElementById("ratigueya").checked) {
    spanMascotaJugador.innerHTML = "Ratigueya";
  } else {
    Swal.fire("Debes seleccionar una Mascota");
    return;
  }
  seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
  let mascotaAleatorio = aleatorio(1, 3);
  let spanMascotaEnemigo = document.getElementById("mascota-enemigo");
  spanMascotaEnemigo.innerHTML = ["Hipodoge", "Capipepo", "Ratigueya"][
    mascotaAleatorio - 1
  ];
}

function ataqueFuego() {
  ataqueJugador = "FUEGO";
  ataqueAleatorioEnemigo();
}
function ataqueAgua() {
  ataqueJugador = "AGUA";
  ataqueAleatorioEnemigo();
}
function ataqueTierra() {
  ataqueJugador = "TIERRA";
  ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
  ataqueEnemigo = ["FUEGO", "AGUA", "TIERRA"][aleatorio(1, 3) - 1];
  combate();
}

function combate() {
  let spanVidasJugador = document.getElementById("vidas-jugador");
  let spanVidasEnemigo = document.getElementById("vidas-enemigo");

  let resultado = "EMPATE";
  if (
    (ataqueJugador === "FUEGO" && ataqueEnemigo === "TIERRA") ||
    (ataqueJugador === "AGUA" && ataqueEnemigo === "FUEGO") ||
    (ataqueJugador === "TIERRA" && ataqueEnemigo === "AGUA")
  ) {
    resultado = "GANASTE";
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else if (ataqueJugador !== ataqueEnemigo) {
    resultado = "PERDISTE";
    vidasJugador--;
    spanVidasJugador.innerHTML = vidasJugador;
  }

  crearMensaje(resultado);
  revisarVidas();
}

function revisarVidas() {
  if (vidasEnemigo === 0) {
    crearMensajeFinal("FELICITACIONES, GANASTE!");
  } else if (vidasJugador === 0) {
    crearMensajeFinal("LO SIENTO, PERDISTE!");
  }
}

function crearMensaje(resultado) {
  Swal.fire({
    title: resultado,
    text: `Tu ataque: ${ataqueJugador}\nAtaque enemigo: ${ataqueEnemigo}`,
    icon:
      resultado === "GANASTE"
        ? "success"
        : resultado === "PERDISTE"
        ? "error"
        : "info",
    confirmButtonText: "OK",
  });
}

function crearMensajeFinal(resultadoFinal) {
  Swal.fire({
    title: "Juego terminado",
    text: resultadoFinal,
    icon: resultadoFinal.includes("GANASTE") ? "success" : "error",
    confirmButtonText: "Reiniciar",
  }).then(() => {
    location.reload();
  });
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
