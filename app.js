"use strict";
// Sistema de Mascotas con TypeScript
let mascotas = [
    { id: 1, nombre: "Firulais", especie: "Perro", edad: 4, raza: "Labrador", dueño: "Juan Pérez", telefono: "123456789", vacunada: true },
    { id: 2, nombre: "Michi", especie: "Gato", edad: 2, raza: "Siames", dueño: "María López", telefono: "987654321", vacunada: false },
    { id: 3, nombre: "Luna", especie: "Perro", edad: 6, raza: "Pastor Alemán", dueño: "Carlos Rodríguez", telefono: "456789123", vacunada: true }
];
let formulario = document.querySelector("#formMascota");
let inputNombre = document.querySelector("#nombre");
let selectEspecie = document.querySelector("#especie");
let inputEdad = document.querySelector("#edad");
let inputRaza = document.querySelector("#raza");
let inputDueño = document.querySelector("#dueño");
let inputTelefono = document.querySelector("#telefono");
let selectVacunada = document.querySelector("#vacunada");
let listadoMascotas = document.querySelector("#listadoMascotas");
let mensaje = document.querySelector("#mensaje");
let btnMostrarTodas = document.querySelector("#btnMostrarTodas");
let btnMostrarVacunadas = document.querySelector("#btnMostrarVacunadas");
let btnMostrarNoVacunadas = document.querySelector("#btnMostrarNoVacunadas");
let totalMascotas = document.querySelector("#totalMascotas");
let totalVacunadas = document.querySelector("#totalVacunadas");
let totalNoVacunadas = document.querySelector("#totalNoVacunadas");
function mostrarMascotas(lista) {
    if (!listadoMascotas) {
        return;
    }
    listadoMascotas.innerHTML = "";
    lista.forEach((mascota) => {
        let estadoTexto = mascota.vacunada ? "Vacunada" : "No vacunada";
        let claseEstado = mascota.vacunada ? "vacunada" : "no-vacunada";
        listadoMascotas.innerHTML += `

      <div class="tarjeta">

        <h3>${mascota.nombre}</h3>

        <p><strong>Especie:</strong> ${mascota.especie}</p>

        <p><strong>Edad:</strong> ${mascota.edad} años</p>
        <p><strong>Raza:</strong> ${mascota.raza}</p>
        <p><strong>Dueño:</strong> ${mascota.dueño}</p>
        <p><strong>Teléfono:</strong> ${mascota.telefono}</p>

        <span class="estado ${claseEstado}">${estadoTexto}</span>

      </div>

    `;
    });
    actualizarResumen();
}
function actualizarResumen() {
    let vacunadas = mascotas.filter((mascota) => mascota.vacunada);
    let noVacunadas = mascotas.filter((mascota) => !mascota.vacunada);
    if (totalMascotas) {
        totalMascotas.innerHTML = "Total de mascotas: " + mascotas.length;
    }
    if (totalVacunadas) {
        totalVacunadas.innerHTML = "Vacunadas: " + vacunadas.length;
    }
    if (totalNoVacunadas) {
        totalNoVacunadas.innerHTML = "No vacunadas: " + noVacunadas.length;
    }
}
function mostrarMensaje(texto, tipo) {
    if (!mensaje) {
        return;
    }
    mensaje.innerHTML = texto;
    mensaje.className = "mensaje " + tipo;
}
if (formulario) {
    formulario.onsubmit = function (evento) {
        evento.preventDefault();
        if (!inputNombre || !selectEspecie || !inputEdad || !selectVacunada) {
            return;
        }
        let nombre = inputNombre.value.trim();
        let especie = selectEspecie.value;
        let edad = Number(inputEdad.value);
        let raza = inputRaza.value.trim();
        let dueño = inputDueño.value.trim();
        let telefono = inputTelefono.value.trim();
        let vacunada = selectVacunada.value === "true";
        if (nombre === "" || especie === "" || edad <= 0 || raza === "" || dueño === "" || telefono === "") {
            mostrarMensaje("Debe completar todos los datos correctamente.", "error");
            return;
        }
        let nuevaMascota = {
            id: mascotas.length + 1,
            nombre: nombre,
            especie: especie,
            edad: edad,
            raza: raza,
            dueño: dueño,
            telefono: telefono,
            vacunada: vacunada
        };
        mascotas.push(nuevaMascota);
        mostrarMascotas(mascotas);
        mostrarMensaje("Mascota agregada correctamente.", "ok");
        formulario.reset();
    };
}
if (btnMostrarTodas) {
    btnMostrarTodas.onclick = function () {
        mostrarMascotas(mascotas);
    };
}
if (btnMostrarVacunadas) {
    btnMostrarVacunadas.onclick = function () {
        let vacunadas = mascotas.filter((mascota) => mascota.vacunada);
        mostrarMascotas(vacunadas);
    };
}
if (btnMostrarNoVacunadas) {
    btnMostrarNoVacunadas.onclick = function () {
        let noVacunadas = mascotas.filter((mascota) => !mascota.vacunada);
        mostrarMascotas(noVacunadas);
    };
}
mostrarMascotas(mascotas);
console.log("Sistema de mascotas iniciado correctamente.");

