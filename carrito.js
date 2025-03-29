// Selección de elementos
const carrito = document.getElementById('carrito');
const listaProductos = document.getElementById('lista-productos');
const totalSpan = document.getElementById('total');

// Carrito inicial (desde localStorage o vacío)
let carritoProductos = JSON.parse(localStorage.getItem('carrito')) || [];
actualizarCarrito();

// Mostrar/ocultar detalles del carrito
carrito.addEventListener('click', () => {
    carrito.classList.toggle('active'); // Alterna la clase 'active' para mostrar detalles
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

    carritoProductos.forEach((producto, index) => {
        // Crear el elemento del producto
        const li = document.createElement('li');
        li.innerHTML = `
            ${producto.nombre} - $${producto.precio} x ${producto.cantidad}
            <button onclick="restarProducto(${index})">-</button>
            <button onclick="sumarProducto(${index})">+</button>
        `;
        listaProductos.appendChild(li);

        // Calcular el total
        total += producto.precio * producto.cantidad;
    });

    totalSpan.textContent = total.toFixed(2); // Mostrar el total actualizado
}

// Función para sumar la cantidad de un producto
function sumarProducto(index) {
    carritoProductos[index].cantidad += 1; // Incrementar cantidad
    localStorage.setItem('carrito', JSON.stringify(carritoProductos));
    actualizarCarrito(); // Refrescar la vista del carrito
}

// Función para restar la cantidad de un producto
function restarProducto(index) {
    if (carritoProductos[index].cantidad > 1) {
        carritoProductos[index].cantidad -= 1; // Reducir cantidad
    } else {
        carritoProductos.splice(index, 1); // Eliminar producto si la cantidad es 0
    }
    localStorage.setItem('carrito', JSON.stringify(carritoProductos));
    actualizarCarrito(); // Refrescar la vista del carrito
}