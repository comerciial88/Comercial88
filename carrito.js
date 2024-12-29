const cart = JSON.parse(localStorage.getItem('cart')) || [];

function searchItems() {
    const query = document.getElementById('search').value.toLowerCase();
    const items = [
        { id: 1, title: 'Producto 1', price: '10 Bs', img: 'img/producto1.jpg' },
        { id: 2, title: 'Producto 2', price: '20 Bs', img: 'img/producto2.jpg' },
        { id: 3, title: 'Producto 3', price: '30 Bs', img: 'img/producto3.jpg' },
        // Agrega los demás productos aquí
        { id: 15, title: 'Producto 15', price: '150 Bs', img: 'img/producto15.jpg' }
    ];
    const filteredItems = items.filter(item => item.title.toLowerCase().includes(query));
    const grid = document.getElementById('itemGrid');
    grid.innerHTML = '';
    filteredItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.price}</p>
            <button onclick="addToCart(${item.id})">Agregar al carrito</button>
        `;
        grid.appendChild(itemDiv);
        const itemButton = itemDiv.querySelector('button');
        itemButton.addEventListener('click', () => {
            document.getElementById('click3Sound').play();
        });
    });
}

function addToCart(id) {
    const items = [
        { id: 1, title: 'Producto 1', price: '10 Bs', img: 'img/producto1.jpg' },
        { id: 2, title: 'Producto 2', price: '20 Bs', img: 'img/producto2.jpg' },
        { id: 3, title: 'Producto 3', price: '30 Bs', img: 'img/producto3.jpg' },
        // Agrega los demás productos aquí
        { id: 15, title: 'Producto 15', price: '150 Bs', img: 'img/producto15.jpg' }
    ];
    const item = items.find(item => item.id === id);
    cart.push(item);
    updateCart();
    document.getElementById('click3Sound').play();
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCart() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            ${item.title} - ${item.price}
            <button onclick="removeFromCart(${index})">Quitar</button>
        `;
        cartList.appendChild(cartItem);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    localStorage.setItem('cart', JSON.stringify(cart));
}

function toggleCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.style.display = cartDiv.style.display === 'none' ? 'block' : 'none';
    document.getElementById('clickSound').play();
}

function showOrderForm() {
    const formContainer = document.getElementById('formContainer');
    formContainer.style.display = 'block';
    formContainer.style.marginLeft = 'auto';
    formContainer.style.marginRight = 'auto';
    formContainer.style.width = '42.5%';
    formContainer.style.textAlign = 'center';
    document.getElementById('click2Sound').play();
}

function submitOrder(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const message = `Nombre: ${name}\nDirección: ${address}\nProductos:\n${cart.map(item => `${item.title} - ${item.price}`).join('\n')}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    window.location.href = 'index.html';
}

document.getElementById('click4Sound').addEventListener('click', () => {
    document.getElementById('click4Sound').play();
});

window.onload = function() {
    searchItems();
    updateCart(); // Actualiza el carrito al cargar la página
};