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
function agregarProducto(nombre, precio) {
    const productoExistente = carritoProductos.find(producto => producto.nombre === nombre);

    if (productoExistente) {
        // Si ya existe, aumenta la cantidad
        productoExistente.cantidad += 1;
    } else {
        // Si no existe, agregar como nuevo producto con cantidad inicial 1
        carritoProductos.push({ nombre, precio, cantidad: 1 });
    }

    // Guardar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carritoProductos));
    actualizarCarrito(); // Actualizar visualización
}

// Función para mostrar el carrito
function actualizarCarrito() {
    listaProductos.innerHTML = ''; // Limpiar lista de productos
    let total = 0;

    if (carritoProductos.length === 0) {
        // Mostrar mensaje si el carrito está vacío
        const li = document.createElement('li');
        li.textContent = 'Tu carrito está vacío.';
        listaProductos.appendChild(li);
    } else {
        carritoProductos.forEach((producto, index) => {
            // Crear el elemento del producto
            const li = document.createElement('li');
            li.innerHTML = `
                ${producto.nombre} - $${producto.precio} x ${producto.cantidad}
                <button onclick="restarProducto(${index})">-</button>
                <button onclick="sumarProducto(${index})">+</button>
            `;
            listaProductos.appendChild(li);

            total += producto.precio * producto.cantidad; // Calcular total
        });
    }

    totalSpan.textContent = total.toFixed(2); // Mostrar el total actualizado
}

// Función para sumar la cantidad de un producto
function sumarProducto(index) {
    carritoProductos[index].cantidad += 1; // Incrementar cantidad
    localStorage.setItem('carrito', JSON.stringify(carritoProductos));
    actualizarCarrito(); // Refrescar la vista del carrito
}

function sumarProducto(index, event) {
    event.stopPropagation(); // Detener propagación del evento
    carritoProductos[index].cantidad += 1; // Incrementar cantidad
    localStorage.setItem('carrito', JSON.stringify(carritoProductos));
    actualizarCarrito(); // Refrescar la vista del carrito
}

function restarProducto(index, event) {
    event.stopPropagation(); // Detener propagación del evento
    if (carritoProductos[index].cantidad > 1) {
        carritoProductos[index].cantidad -= 1; // Reducir cantidad
    } else {
        carritoProductos.splice(index, 1); // Eliminar producto si la cantidad es 0
    }
    localStorage.setItem('carrito', JSON.stringify(carritoProductos));
    actualizarCarrito(); // Refrescar la vista del carrito
}
// Función dinámica para agregar producto desde el HTML
function agregarProductoDesdeHTML(boton) {
    const producto = boton.parentElement; // Contenedor del producto
    const nombre = producto.getAttribute('data-nombre'); // Leer nombre del atributo data-nombre
    const precio = parseFloat(producto.getAttribute('data-precio')); // Leer precio del atributo data-precio
    agregarProducto(nombre, precio); // Llama a la función agregarProducto existente
}
