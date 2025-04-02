const carrito = document.getElementById('carrito');
const listaProductos = document.getElementById('lista-productos');
const totalSpan = document.getElementById('total');

// Carrito inicial (desde localStorage o vacío)
let carritoProductos = JSON.parse(localStorage.getItem('carrito')) || [];
actualizarCarrito();

carrito.addEventListener('click', (event) => {
    // Verificar si el clic fue dentro del carrito
    if (!event.target.closest('button')) {
        carrito.classList.toggle('active'); // Solo alterna si no es un botón
    }
});

// Función para agregar un producto al carrito
function agregarProducto(nombre, precio, tipo) {
    const productoExistente = carritoProductos.find(producto => producto.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += tipo === "gramos" ? 50 : 1; // Incremento según tipo
    } else {
        const cantidadInicial = tipo === "gramos" ? 100 : 1;
        carritoProductos.push({ nombre, precio, cantidad: cantidadInicial, tipo });
    }

    localStorage.setItem('carrito', JSON.stringify(carritoProductos)); // Guardar en localStorage
    actualizarCarrito();
}

// Función para mostrar el carrito
function actualizarCarrito() {
    listaProductos.innerHTML = ''; // Limpiar lista de productos
    let total = 0;

    if (carritoProductos.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Tu carrito está vacío.';
        listaProductos.appendChild(li);
    } else {
        carritoProductos.forEach((producto, index) => {
            const li = document.createElement('li');
            const precioPorCantidad = (producto.tipo === "gramos"
                ? producto.precio / 1000 * producto.cantidad
                : producto.precio * producto.cantidad).toFixed(2);

            li.innerHTML = `
                ${producto.nombre} - $${precioPorCantidad} (${producto.cantidad} ${producto.tipo})
                <button onclick="restarProducto(${index}, event)">-</button>
                <button onclick="sumarProducto(${index}, event)">+</button>
            `;

            listaProductos.appendChild(li);
            total += parseFloat(precioPorCantidad);
        });
    }

    totalSpan.textContent = total.toFixed(2); // Mostrar el total actualizado
}

// Funciones para sumar/restar productos
function sumarProducto(index, event) {
    event.stopPropagation();
    carritoProductos[index].cantidad += carritoProductos[index].tipo === "gramos" ? 50 : 1;
    localStorage.setItem('carrito', JSON.stringify(carritoProductos));
    actualizarCarrito();
}

function restarProducto(index, event) {
    event.stopPropagation();
    const producto = carritoProductos[index];
    producto.cantidad -= producto.tipo === "gramos" ? 50 : 1;

    if ((producto.tipo === "gramos" && producto.cantidad < 100) || (producto.tipo !== "gramos" && producto.cantidad < 1)) {
        carritoProductos.splice(index, 1); // Eliminar si la cantidad es insuficiente
    }

    localStorage.setItem('carrito', JSON.stringify(carritoProductos));
    actualizarCarrito();
}

// Función dinámica para agregar productos desde el HTML
function agregarProductoDesdeHTML(boton) {
    const producto = boton.parentElement;
    const nombre = producto.getAttribute('data-nombre');
    const precio = parseFloat(producto.getAttribute('data-precio'));
    const tipo = producto.getAttribute('data-tipo');
    agregarProducto(nombre, precio, tipo);
}

function enviarPedidoWhatsApp() {
    // Lista de números de WhatsApp (incluye el código de país, sin espacios ni símbolos extra)
    const numeros = ["584123456789", "584987654321", "584000111222", "584321654987"];
    
    // Construir el mensaje basado en el contenido del carrito
    let mensaje = "¡Hola! Quisiera realizar el siguiente pedido:\n";
    carritoProductos.forEach(producto => {
        mensaje += `- ${producto.nombre}: ${producto.cantidad} ${producto.tipo} (Total: $${(producto.precio * producto.cantidad).toFixed(2)})\n`;
    });
    mensaje += `\nTotal general: $${totalSpan.textContent}`;

    // Abrir WhatsApp para cada número
    numeros.forEach(numero => {
        const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank"); // Abre una nueva pestaña por cada número
    });
}
