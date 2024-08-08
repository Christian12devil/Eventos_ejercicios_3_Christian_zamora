document.addEventListener("DOMContentLoaded", function () {
  // Ejercicio 1: Calculadora de IMC
  document.getElementById("calcularBtn").addEventListener("click", function () {
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
      document.getElementById("resultado").textContent =
        "Por favor, ingrese valores válidos.";
    } else {
      const imc = peso / (altura * altura);
      document.getElementById("resultado").textContent =
        "Tu IMC es: " + imc.toFixed(2);
    }
  });

  // Ejercicio 2: Conversor de Divisas
  const conversionRate = 20; // 1 USD = 20 MXN

  function convertToMXN() {
    const usdValue = document.getElementById("usd").value;
    const mxnValue = usdValue * conversionRate;
    document.getElementById("mxn").value = mxnValue.toFixed(2);
  }

  function convertToUSD() {
    const mxnValue = document.getElementById("mxn").value;
    const usdValue = mxnValue / conversionRate;
    document.getElementById("usd").value = usdValue.toFixed(2);
  }

  document.getElementById("usd").addEventListener("input", convertToMXN);
  document.getElementById("mxn").addEventListener("input", convertToUSD);

  // Ejercicio 3: Aplicación de Notas
  let notas = [
    {
      id: 1,
      titulo: "Lavar la ropa",
      texto: "Poner a lavar toda la ropa antes de que llueva.",
      realizada: false,
    },
    {
      id: 2,
      titulo: "Comprar pollo",
      texto: "Comprar 2 kilos de pollo para la semana.",
      realizada: true,
    },
  ];
  let idGlobal = 2;

  const contenedorNotas = document.getElementById("contenedorNotas");
  const tituloInput = document.getElementById("titulo");
  const textoInput = document.getElementById("texto");
  const guardarBtn = document.getElementById("guardar");
  const borrarCamposBtn = document.getElementById("borrarCampos");
  const busquedaInput = document.getElementById("busqueda");
  const filtroRealizadas = document.getElementById("filtroRealizadas");

  function pintarNotas(notasParaPintar) {
    contenedorNotas.innerHTML = "";

    if (notasParaPintar.length === 0) {
      contenedorNotas.innerHTML = "<p>No hay notas para mostrar.</p>";
      return;
    }

    notasParaPintar.forEach((nota) => {
      const divNota = document.createElement("div");
      divNota.className = "nota";

      divNota.innerHTML = `
                <h4>${nota.titulo}</h4>
                <p>${nota.texto}</p>
                <div class="acciones">
                    <input type="checkbox" ${
                      nota.realizada ? "checked" : ""
                    } data-id="${nota.id}">
                    <button data-id="${nota.id}">Borrar Nota</button>
                </div>
            `;

      contenedorNotas.appendChild(divNota);
    });

    document
      .querySelectorAll('.nota .acciones input[type="checkbox"]')
      .forEach((checkbox) => {
        checkbox.addEventListener("click", function () {
          const id = parseInt(this.getAttribute("data-id"));
          marcarRealizada(id);
        });
      });

    document.querySelectorAll(".nota .acciones button").forEach((boton) => {
      boton.addEventListener("click", function () {
        const id = parseInt(this.getAttribute("data-id"));
        borrarNota(id);
      });
    });
  }

  function agregarNota(titulo, texto) {
    idGlobal++;
    const nuevaNota = { id: idGlobal, titulo, texto, realizada: false };
    notas.push(nuevaNota);
  }

  function borrarNota(id) {
    notas = notas.filter((nota) => nota.id !== id);
    pintarNotas(notas);
  }

  function marcarRealizada(id) {
    notas.forEach((nota) => {
      if (nota.id === id) {
        nota.realizada = !nota.realizada;
      }
    });
    pintarNotas(notas);
  }

  function filtrarPorTexto(array, texto) {
    if (!texto) return array;
    return array.filter(
      (nota) =>
        nota.titulo.toLowerCase().includes(texto.toLowerCase()) ||
        nota.texto.toLowerCase().includes(texto.toLowerCase())
    );
  }

  function filtrarPorRealizadas(array, realizadas) {
    if (!realizadas) return array;
    return array.filter((nota) => nota.realizada);
  }

  guardarBtn.addEventListener("click", () => {
    const titulo = tituloInput.value.trim();
    const texto = textoInput.value.trim();

    if (titulo && texto) {
      agregarNota(titulo, texto);
      pintarNotas(notas);
      tituloInput.value = "";
      textoInput.value = "";
    } else {
      alert("Los campos de título y texto no pueden estar vacíos.");
    }
  });

  borrarCamposBtn.addEventListener("click", () => {
    tituloInput.value = "";
    textoInput.value = "";
  });

  busquedaInput.addEventListener("input", () => {
    const textoBusqueda = busquedaInput.value;
    const notasFiltradas = filtrarPorTexto(notas, textoBusqueda);
    pintarNotas(filtrarPorRealizadas(notasFiltradas, filtroRealizadas.checked));
  });

  filtroRealizadas.addEventListener("change", () => {
    const textoBusqueda = busquedaInput.value;
    const notasFiltradas = filtrarPorTexto(notas, textoBusqueda);
    pintarNotas(filtrarPorRealizadas(notasFiltradas, filtroRealizadas.checked));
  });

  // Pintamos las notas inicialmente
  pintarNotas(notas);
});
