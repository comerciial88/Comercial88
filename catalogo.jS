function filterProducts() {
    const searchInput = document.getElementById("search").value.toLowerCase();
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        const title = product.querySelector("h2").textContent.toLowerCase();
        product.style.display = title.includes(searchInput) ? "block" : "none";
    });
}

function scanBarcode() {
    alert("Función de escaneo activada. Integra una librería como QuaggaJS o ZXing para leer códigos EAN_13.");
}