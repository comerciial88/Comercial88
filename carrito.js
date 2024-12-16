let carrito = [];
let isCartMinimized = false;

function agregarAlCarrito(producto, precio, imagen) {
    carrito.push({ producto, precio, imagen });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    playSound();
}

function restarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    playSound();
}

function mostrarCarrito() {
    const carritoItems = document.getElementById('carritoItems');
    carritoItems.innerHTML = '';

    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p>Tu carrito está vacío.</p>';
        return;
    }

    const productRow = document.createElement('div');
    productRow.style.display = 'flex';
    productRow.style.flexWrap = 'wrap';
    productRow.style.justifyContent = 'center';

    carrito.forEach((item, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.style.border = '1px solid #ddd';
        productDiv.style.padding = '10px';
        productDiv.style.margin = '10px';
        productDiv.style.width = 'auto';

        productDiv.innerHTML = `
            <p style="margin: 0;">${item.producto} - $${item.precio}</p>
            <button class="btn" onclick="restarDelCarrito(${index})" style="margin-top: 5px;">Restar</button>
        `;
        productRow.appendChild(productDiv);
    });

    carritoItems.appendChild(productRow);

    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    const totalElement = document.getElementById('total');
    totalElement.innerText = `Total: $${total}`;

    totalElement.style.textAlign = 'center';
    totalElement.style.marginTop = '20px';

    const pedirBtn = document.createElement('button');
    pedirBtn.innerText = 'PEDIR';
    pedirBtn.style.display = 'block';
    pedirBtn.style.margin = '20px auto';
    pedirBtn.style.backgroundColor = '#800080';
    pedirBtn.style.color = 'white';
    pedirBtn.style.border = '2px solid #800080';
    pedirBtn.style.padding = '10px 20px';
    pedirBtn.style.marginLeft= '100px';
    pedirBtn.onclick = mostrarFormulario;
    totalElement.appendChild(pedirBtn);
}

function mostrarFormulario() {
    const formularioDiv = document.createElement('div');
    formularioDiv.style.position = 'fixed';
    formularioDiv.style.top = '50%';
    formularioDiv.style.left = '50%';
    formularioDiv.style.transform = 'translate(-50%, -50%)';
    formularioDiv.style.backgroundColor = 'white';
    formularioDiv.style.padding = '20px';
    formularioDiv.style.border = '1px solid #ddd';

    formularioDiv.innerHTML = `
        <h3>Soy</h3>
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required>
        <button onclick="enviarFormulario()" style="display: block; margin: 20px auto 0; background-color: #800080; color: white; border: 2px solid #800080; padding: 5px 10px;">Enviar</button>
        <button onclick="cerrarFormulario()" style="display: block; margin: 10px auto 0; background-color: #800080; color: white; border: 2px solid #800080; padding: 5px 10px;">Regresar</button>
    `;

    document.body.appendChild(formularioDiv);
}

function cerrarFormulario() {
    const formularioDiv = document.querySelector('div[style*="fixed"]');
    if (formularioDiv) {
        document.body.removeChild(formularioDiv);
    }
}

function enviarFormulario() {
    const nombre = document.getElementById('nombre').value;
    if (nombre) {
        const pedido = carrito.map(item => `${item.producto} - $${item.precio}`).join('\n');
        const mensaje = `Hola, soy ${nombre}. Me gustaría pedir:\n${pedido}\nTotal: $${carrito.reduce((sum, item) => sum + item.precio, 0)}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
        window.open(whatsappUrl, '_blank');
    } else {
        alert('Por favor, ingrese su nombre.');
    }
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        mostrarCarrito();
    }
}

function toggleCart() {
    const carrito = document.getElementById('carrito');
    const toggleBtn = document.getElementById('toggleCartBtn');
    if (isCartMinimized) {
        carrito.style.display = 'block';
        toggleBtn.innerHTML = 'Minimizar Carrito';
        toggleBtn.style.backgroundColor = '#800080';
    } else {
        carrito.style.display = 'none';
        toggleBtn.innerHTML = 'Maximizar Carrito';
        toggleBtn.style.backgroundColor = '#800080';
    }
    isCartMinimized = !isCartMinimized;
    playSound();
}

function playSound() {
    const sound = document.getElementById("clickSound");
    if (sound) {
        sound.play();
    }
}

function generarPlanilla() {
    alert('¡Planilla generada!');
}

document.addEventListener('DOMContentLoaded', function () {
    cargarCarrito();

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'toggleCartBtn';
    toggleBtn.innerHTML = 'Minimizar Carrito';
    toggleBtn.style.backgroundColor = '#800080';
    toggleBtn.addEventListener('click', toggleCart);
    document.body.appendChild(toggleBtn);

    const totalElement = document.getElementById('total');
    totalElement.style.textAlign = 'center';
    totalElement.style.marginTop = '14px';

    const carritoTitulo = document.querySelector('h2');
    if (carritoTitulo) {
        carritoTitulo.style.textAlign = 'right';
        carritoTitulo.style.marginRight = '14px';
    }
});