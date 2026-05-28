// Sistema de Mascotas con TypeScript

// Objetivo: modelar datos usando interface, arrays de objetos y DOM.

interface Mascota {

    id: number;

    nombre: string;

    especie: string;

    edad: number;

    vacunada: boolean;

}
let mascotas: Mascota[] = [

    { id: 1, nombre: "Firulais", especie: "Perro", edad: 4, vacunada: true },

    { id: 2, nombre: "Michi", especie: "Gato", edad: 2, vacunada: false },

    { id: 3, nombre: "Luna", especie: "Perro", edad: 6, vacunada: true }

];

let formulario = document.querySelector("#formMascota") as HTMLFormElement | null;

let inputNombre = document.querySelector("#nombre") as HTMLInputElement | null;

let selectEspecie = document.querySelector("#especie") as HTMLSelectElement | null;

let inputEdad = document.querySelector("#edad") as HTMLInputElement | null;

let inputRaza = document.querySelector("#raza") as HTMLInputElement | null;

let inputDueño = document.querySelector("#dueño") as HTMLInputElement | null;
let inputTelefono = document.querySelector("#telefono") as HTMLInputElement | null;

let selectVacunada = document.querySelector("#vacunada") as HTMLSelectElement | null;

let listadoMascotas = document.querySelector("#listadoMascotas") as HTMLDivElement | null;

let mensaje = document.querySelector("#mensaje") as HTMLParagraphElement | null;



let btnMostrarTodas = document.querySelector("#btnMostrarTodas") as HTMLButtonElement | null;

let btnMostrarVacunadas = document.querySelector("#btnMostrarVacunadas") as HTMLButtonElement | null;

let btnMostrarNoVacunadas = document.querySelector("#btnMostrarNoVacunadas") as HTMLButtonElement | null;



let totalMascotas = document.querySelector("#totalMascotas") as HTMLParagraphElement | null;

let totalVacunadas = document.querySelector("#totalVacunadas") as HTMLParagraphElement | null;

let totalNoVacunadas = document.querySelector("#totalNoVacunadas") as HTMLParagraphElement | null;

function mostrarMascotas(lista: Mascota[]): void {

    if (!listadoMascotas) {

        return;

    }

    listadoMascotas.innerHTML = "";

    lista.forEach((mascota: Mascota) => {

        let estadoTexto: string = mascota.vacunada ? "Vacunada" : "No vacunada";

        let claseEstado: string = mascota.vacunada ? "vacunada" : "no-vacunada";

        listadoMascotas!.innerHTML += `

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

function actualizarResumen(): void {

    let vacunadas: Mascota[] = mascotas.filter((mascota: Mascota) => mascota.vacunada);

    let noVacunadas: Mascota[] = mascotas.filter((mascota: Mascota) => !mascota.vacunada);

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

function mostrarMensaje(texto: string, tipo: string): void {

    if (!mensaje) {

        return;

    }

    mensaje.innerHTML = texto;

    mensaje.className = "mensaje " + tipo;

}
if (formulario) {
    formulario.onsubmit = function (evento: SubmitEvent): void {
        evento.preventDefault();

        if (!inputNombre || !selectEspecie || !inputEdad || !selectVacunada) {
            return;
        }

        let nombre: string = inputNombre.value.trim();
        let especie: string = selectEspecie.value;
        let edad: number = Number(inputEdad.value);
        let raza: string = inputRaza.value.trim();
        let dueño: string = inputDueño.value.trim();
        let telefono: string = inputTelefono.value.trim();
        let vacunada: boolean = selectVacunada.value === "true";

        if (nombre === "" || especie === "" || edad <= 0 || raza === "" || dueño === "" || telefono === "") {
            mostrarMensaje("Debe completar todos los campos.", "error");
            return;
        }

        let nuevaMascota: Mascota = {
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

        formulario!.reset();
    };
}

if (btnMostrarTodas) {
    btnMostrarTodas.onclick = function (): void {
        mostrarMascotas(mascotas);
    };
}

if (btnMostrarVacunadas) {
    btnMostrarVacunadas.onclick = function (): void {
        let vacunadas: Mascota[] = mascotas.filter((mascota: Mascota) => mascota.vacunada);
        mostrarMascotas(vacunadas);
    };
}

if (btnMostrarNoVacunadas) {
    btnMostrarNoVacunadas.onclick = function (): void {
        let noVacunadas: Mascota[] = mascotas.filter((mascota: Mascota) => !mascota.vacunada);
        mostrarMascotas(noVacunadas);
    };
}

mostrarMascotas(mascotas);
console.log("Sistema de mascotas iniciado correctamente.");



