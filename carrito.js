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
        if (tipo === "gramos") {
            // Incrementar en 50g si es por gramaje
            productoExistente.cantidad += 50;
        } else {
            // Incrementar en 1 si es por unidad
            productoExistente.cantidad += 1;
        }
    } else {
        // Agregar nuevo producto
        const cantidadInicial = tipo === "gramos" ? 100 : 1; // 100g para gramaje, 1 para unidad
        carritoProductos.push({ nombre, precio, cantidad: cantidadInicial, tipo });
    }

    // Guardar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carritoProductos));
    actualizarCarrito(); // Refrescar visualización
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
            const li = document.createElement('li');
            let precioPorCantidad;

            if (producto.tipo === "gramos") {
                // Calcular el precio por gramos dinámicamente
                const precioPorGramo = producto.precio / 1000; // Precio por gramo (precio por kg / 1000)
                precioPorCantidad = (precioPorGramo * producto.cantidad).toFixed(2); // Precio total según gramaje
                li.innerHTML = `
                    ${producto.nombre} - $${precioPorCantidad} (${producto.cantidad}g)
                    <button onclick="restarProducto(${index}, event)">-</button>
                    <button onclick="sumarProducto(${index}, event)">+</button>
                `;
            } else {
                // Calcular el precio normal para productos por unidad
                precioPorCantidad = (producto.precio * producto.cantidad).toFixed(2);
                li.innerHTML = `
                    ${producto.nombre} - $${precioPorCantidad} (${producto.cantidad} unidades)
                    <button onclick="restarProducto(${index}, event)">-</button>
                    <button onclick="sumarProducto(${index}, event)">+</button>
                `;
            }

            listaProductos.appendChild(li);
            total += parseFloat(precioPorCantidad); // Sumar al total general
        });
    }

    totalSpan.textContent = total.toFixed(2); // Mostrar el total actualizado
}


// Función para sumar la cantidad de un producto
function sumarProducto(index, event) {
    event.stopPropagation(); // Evita interferencias con el contenedor del carrito

    const producto = carritoProductos[index];

    if (producto.tipo === "gramos") {
        // Incrementar en bloques de 50g si el producto es por gramaje
        producto.cantidad += 50;
    } else {
        // Incrementar en 1 unidad si el producto es por unidad
        producto.cantidad += 1;
    }

    localStorage.setItem('carrito', JSON.stringify(carritoProductos)); // Guardar cambios
    actualizarCarrito(); // Refrescar la vista del carrito
}
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
            const li = document.createElement('li');
            let precioPorCantidad;

            if (producto.tipo === "gramos") {
                // Calcular el precio por gramos dinámicamente
                const precioPorGramo = producto.precio / 1000; // Precio por gramo (precio por kg / 1000)
                precioPorCantidad = (precioPorGramo * producto.cantidad).toFixed(2); // Precio total según gramaje
                li.innerHTML = `
                    ${producto.nombre} - $${precioPorCantidad} (${producto.cantidad}g)
                    <button onclick="restarProducto(${index}, event)">-</button>
                    <button onclick="sumarProducto(${index}, event)">+</button>
                `;
            } else {
                // Calcular el precio normal para productos por unidad
                precioPorCantidad = (producto.precio * producto.cantidad).toFixed(2);
                li.innerHTML = `
                    ${producto.nombre} - $${precioPorCantidad} (${producto.cantidad} unidades)
                    <button onclick="restarProducto(${index}, event)">-</button>
                    <button onclick="sumarProducto(${index}, event)">+</button>
                `;
            }

            listaProductos.appendChild(li);
            total += parseFloat(precioPorCantidad); // Sumar al total general
        });
    }

    totalSpan.textContent = total.toFixed(2); // Mostrar el total actualizado
}
    
function restarProducto(index, event) {
    event.stopPropagation(); // Evita interferencias con el contenedor del carrito

    const producto = carritoProductos[index];

    if (producto.tipo === "gramos") {
        // Reducir en bloques de 50g si el producto es por gramaje
        producto.cantidad -= 50;

        // Eliminar el producto si la cantidad baja de 100g
        if (producto.cantidad < 100) {
            carritoProductos.splice(index, 1); // Remover del carrito
        }
    } else {
        // Reducir en 1 unidad si el producto es por unidad
        if (producto.cantidad > 1) {
            producto.cantidad -= 1;
        } else {
            carritoProductos.splice(index, 1); // Remover del carrito
        }
    }

    // Mostrar el formulario (modal)
function mostrarFormulario() {
    const modal = document.getElementById("formulario-modal");
    modal.style.display = "block"; // Hace visible el modal
}

// Cerrar el formulario (modal)
function cerrarFormulario() {
    const modal = document.getElementById("formulario-modal");
    modal.style.display = "none"; // Oculta el modal
}

// Cerrar el modal haciendo clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById("formulario-modal");
    if (event.target === modal) {
        modal.style.display = "none"; // Cierra el modal si se hace clic fuera
    }
};
    localStorage.setItem('carrito', JSON.stringify(carritoProductos)); // Guardar cambios
    actualizarCarrito(); // Refrescar la vista del carrito
}

// Función dinámica para agregar producto desde el HTML
function agregarProductoDesdeHTML(boton) {
    const producto = boton.parentElement; // Contenedor del producto
    const nombre = producto.getAttribute('data-nombre'); // Leer nombre
    const precio = parseFloat(producto.getAttribute('data-precio')); // Leer precio
    const tipo = producto.getAttribute('data-tipo'); // Leer tipo (gramos o unidad)
    agregarProducto(nombre, precio, tipo); // Pasar el tipo al agregar producto
}
