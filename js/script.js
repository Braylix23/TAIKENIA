const abrirCotizacion = document.getElementById("abrirCotizacion");
const modalCotizacion = document.getElementById("modalCotizacion");
const cerrarModal = document.getElementById("cerrarModal");
const formCotizacion = document.getElementById("formCotizacion");
const presupuestoSlider = document.getElementById("presupuestoSlider");
const presupuestoValor = document.getElementById("presupuestoValor");
const participantesSlider = document.getElementById("participantesSlider");
const participantesValor = document.getElementById("participantesValor");

const contenidoFormulario = formCotizacion.innerHTML;
let solicitudEnviada = false;

function actualizarPresupuesto() {

    const valor = Number(presupuestoSlider.value);

    presupuestoValor.textContent =
        "$" + valor.toLocaleString("es-CO") + " COP";
}

presupuestoSlider.addEventListener("input", actualizarPresupuesto);

actualizarPresupuesto();

function actualizarParticipantes() {

    const valor = Number(participantesSlider.value);

    participantesValor.textContent = valor + " personas";
}

participantesSlider.addEventListener("input", actualizarParticipantes);

actualizarParticipantes();

abrirCotizacion.addEventListener("click", function () {

    if (solicitudEnviada) {
        formCotizacion.innerHTML = contenidoFormulario;
        solicitudEnviada = false;
    }

    modalCotizacion.style.display = "flex";
});

cerrarModal.addEventListener("click", function () {
    modalCotizacion.style.display = "none";
});

modalCotizacion.addEventListener("click", function (evento) {
    if (evento.target === modalCotizacion) {
        modalCotizacion.style.display = "none";
    }
});

formCotizacion.addEventListener("submit", async function (evento) {

    evento.preventDefault();

    const datos = new FormData(formCotizacion);

    const respuesta = await fetch(formCotizacion.action, {
        method: "POST",
        body: datos,
        headers: {
            "Accept": "application/json"
        }
    });

    if (respuesta.ok) {

        solicitudEnviada = true;

        formCotizacion.innerHTML = `
            <div class="mensaje-exito">
                <div class="mensaje-icono">✓</div>
                <h3>¡Solicitud recibida!</h3>
                <p>
                    Gracias por confiar en TAUENIA.
                    Revisaremos la información y nos pondremos en contacto contigo.
                </p>
            </div>
        `;

    } else {

        alert("No pudimos enviar la solicitud. Por favor, inténtalo nuevamente.");

    }
});