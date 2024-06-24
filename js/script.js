// // SALUDO
// let nombre = prompt("Por favor, ingresa tu nombre:");

// //Capitalizar la primera letra del nombre y convertir el resto en minúsculas
// nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();

// // Mostrar un mensaje de bienvenida con el nombre capitalizado
// alert("¡¡Bienvenido " + nombre + ", gracias por tu visita!!");

// Función para cargar los productos desde un JSON local
function cargarProductosDesdeJSON() {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            const galeriaProductos = document.querySelector('.galeria');
            galeriaProductos.innerHTML = '';

            data.forEach(producto => {
                const productoHTML = `
                    <div class="producto">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <p>${producto.nombre} - $${producto.precio}</p>
                        <button class="agregar-carrito" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Agregar al Carrito</button>
                    </div>
                `;
                galeriaProductos.innerHTML += productoHTML;
            });

            agregarListenersAgregarCarrito();
        })
        .catch(error => console.error('Error al cargar productos:', error));
}

// Llama a la función para cargar los productos al cargar la página
document.addEventListener('DOMContentLoaded', cargarProductosDesdeJSON);

// Inicializar carrito vacío
let carrito = [];

//  agregar un producto al carrito con efecto visual
function agregarAlCarrito(nombre, precio) {
    const producto = { nombre: nombre, precio: precio };
    carrito.push(producto);
    console.log(`${nombre} se agregó al carrito.`);
    actualizarCarritoUI();

    // Animación de transición al agregar al carrito
    const carritoItem = document.createElement('li');
    carritoItem.textContent = `${producto.nombre} - $${producto.precio}`;
    carritoItem.style.opacity = '0'; // Empezar con opacidad 0
    carritoItem.style.transform = 'translateX(100%)'; // Animación de entrada desde la derecha

    setTimeout(() => {
        carritoItem.style.opacity = '1';
        carritoItem.style.transform = 'translateX(0)';
    }, 50); // Pequeño retardo para asegurar la animación

    document.getElementById('lista-carrito').appendChild(carritoItem);
}

// eliminar un producto del carrito con efecto visual
function eliminarDelCarrito(nombre) {
    const indice = carrito.findIndex(producto => producto.nombre === nombre);
    if (indice !== -1) {
        const carritoItems = document.querySelectorAll('#lista-carrito li');
        const itemAEliminar = carritoItems[indice];

        // Animación de transición al eliminar del carrito
        itemAEliminar.style.transform = 'translateX(-100%)';
        itemAEliminar.style.opacity = '0';

        setTimeout(() => {
            carrito.splice(indice, 1);
            itemAEliminar.remove();
            console.log(`${nombre} se eliminó del carrito.`);
            actualizarCarritoUI();
        }, 300); // Duración de la animación
    } else {
        console.log(`${nombre} no está en el carrito.`);
    }
}

//mostrar el contenido del carrito y actualizar resumen
function mostrarCarrito() {
    const carritoElement = document.getElementById('lista-carrito');
    carritoElement.innerHTML = '';

    let subtotal = 0;

    carrito.forEach(producto => {
        const itemCarrito = document.createElement('li');
        itemCarrito.textContent = `${producto.nombre} - $${producto.precio}`;
        const botonQuitar = document.createElement('button');
        botonQuitar.textContent = 'Quitar';
        botonQuitar.addEventListener('click', () => eliminarDelCarrito(producto.nombre));
        itemCarrito.appendChild(botonQuitar);
        carritoElement.appendChild(itemCarrito);

        subtotal += producto.precio;
    });

    document.getElementById('subtotal-carrito').textContent = `$${subtotal}`;
    document.getElementById('total-carrito').textContent = `$${calcularTotalConIVA(subtotal)}`;

    // Actualizar resumen del carrito
    actualizarResumenCarrito();
}

//calcular el total del carrito con IVA (21%)
function calcularTotalConIVA(subtotal) {
    const totalConIVA = subtotal * 1.21;
    return totalConIVA.toFixed(2);
}

//vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    console.log('Carrito vacío.');
    mostrarCarrito();
}

// Agregamos los botones
document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
    const botonVaciarCarrito = document.getElementById('vaciar-carrito');

    botonesAgregarCarrito.forEach(boton => {
        boton.addEventListener('click', () => {
            const nombre = boton.dataset.nombre;
            const precio = parseFloat(boton.dataset.precio);
            agregarAlCarrito(nombre, precio);
        });
    });

    botonVaciarCarrito.addEventListener('click', vaciarCarrito);
});

// Función para actualizar el resumen del carrito
function actualizarResumenCarrito() {
    let subtotal = 0;

    carrito.forEach(producto => {
        subtotal += producto.precio;
    });

    document.getElementById('subtotal-resumen').textContent = `$${subtotal}`;
    document.getElementById('total-resumen').textContent = `$${calcularTotalConIVA(subtotal)}`;
}


