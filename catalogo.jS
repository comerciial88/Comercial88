document.getElementById('startScan').addEventListener('click', () => {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            constraints: {
                width: 640,
                height: 480,
                facingMode: "environment"
            },
            target: document.querySelector('#scanner') // Elemento donde se mostrará la cámara
        },
        decoder: {
            readers: ["ean_reader"] // Lee códigos de barras EAN-13
        }
    }, function(err) {
        if (err) {
            console.error(err);
            alert("Error al iniciar el escaneo: " + err);
            return;
        }
        Quagga.start();
        console.log("Escaneo iniciado");
    });

    Quagga.onDetected(data => {
        const scannedCode = data.codeResult.code;
        document.getElementById('output').textContent = `Código escaneado: ${scannedCode}`;
        Quagga.stop();
    });
});
