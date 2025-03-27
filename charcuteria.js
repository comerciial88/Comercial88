// Seleccionar elementos importantes
const searchInput = document.getElementById('search');
const products = document.querySelectorAll('.product');

// Escuchar el evento de escritura en la barra de búsqueda
searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();

    // Filtrar productos según el texto ingresado
    products.forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase();
        if (productName.includes(searchText)) {
            product.style.display = 'block'; // Mostrar si coincide
        } else {
            product.style.display = 'none'; // Ocultar si no coincide
        }
    });
});