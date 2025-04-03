// Tiempo que el botón está siendo presionado
let presionando = false; // Para rastrear si está presionado
let tiempoInicio; // Guardar el tiempo en que se presiona el botón

// Selecciona el botón por su ID
const boton = document.getElementById("boton-entrada");

// Evento cuando el botón empieza a ser presionado (mouse)
boton.addEventListener("mousedown", () => {
    presionando = true;
    tiempoInicio = new Date().getTime();

    // Monitorea si se mantiene presionado durante 5s
    setTimeout(() => {
        if (presionando) {
            // Mostrar prompt de contraseña
            const contraseña = prompt("Introduce la contraseña para acceder a la página administrativa:");
            if (contraseña === "admin123") { // Cambia 'admin123' por tu contraseña real
                window.location.href = "admin-precios.html"; // Redirige a la página administrativa
            } else {
                alert("Contraseña incorrecta. Inténtalo de nuevo.");
            }
        }
    }, 5000); // 5000ms = 5 segundos
});

// Evento cuando se suelta el botón (mouse)
boton.addEventListener("mouseup", () => {
    presionando = false; // Resetea el estado
});

// Evento cuando se empieza a tocar el botón (pantallas táctiles)
boton.addEventListener("touchstart", () => {
    presionando = true;
    tiempoInicio = new Date().getTime();

    // Igual que el evento de mousedown
    setTimeout(() => {
        if (presionando) {
            const contraseña = prompt("Introduce la contraseña para acceder a la página administrativa:");
            if (contraseña === "admin123") { // Cambia 'admin123' por tu contraseña real
                window.location.href = "admin-precios.html";
            } else {
                alert("Contraseña incorrecta. Inténtalo de nuevo.");
            }
        }
    }, 5000);
});

// Evento cuando se deja de tocar el botón (pantallas táctiles)
boton.addEventListener("touchend", () => {
    presionando = false;
});