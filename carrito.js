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

function copiarListaCarrito() {
    // Obtener la lista de productos y el total
    const productos = document.getElementById("lista-productos").innerText;
    const total = document.getElementById("total").innerText;

    // Crear el texto para copiar
    const mensaje = `Hola Quisiera:\n${productos}\n\nTotal: $${total}`;

    // Copiar al portapapeles
    navigator.clipboard.writeText(mensaje).then(() => {
        // Mostrar un mensaje en pantalla
        alert("Lista Copiada");
    }).catch(err => {
        // En caso de error
        alert("Hubo un problema al copiar la lista");
        console.error(err);
    });
}
