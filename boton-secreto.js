// Tiempo que el botón está siendo presionado
let contadorToques = 0; // Contador de toques consecutivos
const imagenLogo = document.getElementById("logo-inicio"); // Selecciona la imagen

// Evento para detectar toques (incluido clicks)
imagenLogo.addEventListener("click", () => {
    contadorToques++; // Incrementa el contador cada vez que se toca

    // Si se alcanzan 6 toques consecutivos, activa la función de contraseña
    if (contadorToques === 6) {
        const contraseña = prompt("Introduce la contraseña para acceder a la página administrativa:");
        if (contraseña === "1234") { // Cambia 'admin123' por tu contraseña real
            window.location.href = "admin-precios.html"; // Redirige a la página administrativa
        } else {
            alert("Contraseña incorrecta. Inténtalo de nuevo.");
        }
        contadorToques = 0; // Resetea el contador después de activarse la función
    }

    // Reinicia el contador si pasan más de 3 segundos entre toques
    setTimeout(() => {
        contadorToques = 0;
    }, 3000);
});
