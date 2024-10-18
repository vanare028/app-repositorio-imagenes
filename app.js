import { MiniKit } from '@worldcoin/minikit-js'; // Usa npm para importar MiniKit

// Simulamos una base de datos de imágenes en la memoria
let imageDatabase = [];

// Cuando el documento esté listo
document.addEventListener('DOMContentLoaded', async () => {
    const uploadButton = document.getElementById('uploadButton');
    const imagesContainer = document.getElementById('imagesContainer');

    // Inicializar MiniKit SDK
    await MiniKit.install();

    // Evento para subir imágenes
    uploadButton.addEventListener('click', () => {
        const imageInput = document.getElementById('imageUpload');
        const priceInput = document.getElementById('imagePrice');
        const file = imageInput.files[0];
        const price = parseFloat(priceInput.value);

        if (file && !isNaN(price)) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target.result;

                // Guardamos la imagen en nuestra "base de datos"
                imageDatabase.push({
                    url: imageUrl,
                    price: price,
                    sold: false
                });

                // Mostramos la imagen en la galería
                displayImages();
            };
            reader.readAsDataURL(file);
        } else {
            alert("Por favor sube una imagen y define un precio válido.");
        }
    });

    // Función para mostrar las imágenes disponibles en la galería
    function displayImages() {
        imagesContainer.innerHTML = '';
        imageDatabase.forEach((image, index) => {
            if (!image.sold) {
                const imageItem = document.createElement('div');
                imageItem.classList.add('image-item');

                const img = document.createElement('img');
                img.src = image.url;
                const priceText = document.createElement('p');
                priceText.textContent = Precio: ${image.price} WLD;

                const buyButton = document.createElement('button');
                buyButton.textContent = 'Comprar';
                buyButton.addEventListener('click', () => handlePurchase(image, index));

                imageItem.appendChild(img);
                imageItem.appendChild(priceText);
                imageItem.appendChild(buyButton);
                imagesContainer.appendChild(imageItem);
            }
        });
    }

    // Función para procesar la compra
    async function handlePurchase(image, index) {
        try {
            const commissionRate = 0.1; // Cobras un 10% de comisión por cada venta
            const sellerAmount = image.price * (1 - commissionRate);
            const appCommission = image.price * commissionRate;

            // Lógica de pago usando MiniKit
            const result = await MiniKit.requestPayment({
                amount: image.price * 100, // Convertimos a centavos
                currency: "WLD",
                description: "Compra de imagen"
            });

            if (result.success) {
                alert(Compra exitosa. El vendedor recibe: ${sellerAmount} WLD. La app recibe: ${appCommission} WLD.);

                // Marcamos la imagen como vendida
                imageDatabase[index].sold = true;
                displayImages();
            } else {
                alert("La compra no se pudo completar.");
            }
        } catch (error) {
            console.error("Error al procesar el pago:", error);
        }
    }
});


4. Explicación del código

Subida de imágenes: Los usuarios pueden cargar imágenes con un precio definido. Se muestran en una galería si no han sido vendidas.

Sistema de compra: Cuando un usuario compra una imagen, la aplicación procesa el pago y calcula una comisión (en este caso, el 10%). El resto del pago se destina al vendedor.

Comisión: La app toma el 10% de cada transacción y lo muestra en el mensaje de confirmación.


5. Probar la app

Sigue estos pasos para probar la aplicación:

1. Abre la terminal en tu carpeta del proyecto.


2. Ejecuta:

npx live-server

Esto abrirá la aplicación en tu navegador.



Siguientes pasos:

Autenticación de usua…
