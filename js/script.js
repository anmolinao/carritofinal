// // SALUDO
// let nombre = prompt("Por favor, ingresa tu nombre:");

// //Capitalizar la primera letra del nombre y convertir el resto en minúsculas
// nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();

// // Mostrar un mensaje de bienvenida con el nombre capitalizado
// alert("¡¡Bienvenido " + nombre + ", gracias por tu visita!!");


let carrito = [];

//  agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    const producto = { nombre: nombre, precio: precio };
    carrito.push(producto);
    console.log(`${nombre} se agregó al carrito.`);
    mostrarCarrito();
}

// eliminar un producto del carrito
function eliminarDelCarrito(nombre) {
    const indice = carrito.findIndex(producto => producto.nombre === nombre);
    if (indice !== -1) {
        carrito.splice(indice, 1);
        console.log(`${nombre} se eliminó del carrito.`);
        mostrarCarrito();
    } else {
        console.log(`${nombre} no está en el carrito.`);
    }
}

//mostrar el contenido del carrito
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




