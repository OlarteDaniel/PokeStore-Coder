let cuerpoCarrito = document.querySelector("#cuerpoCarrito");
let precioCarrito = document.querySelector("#precioCarrito");
let comprasAdquiridas = [];
let comprasAdquiridasStorage = [];
let conjuntoCompras = [];
let total = 0;
comprasAdquiridasStorage = JSON.parse(localStorage.getItem("compras"));


const borrarStorage = () =>{
    localStorage.clear();
    comprasAdquiridas = [];
    comprasAdquiridasStorage = [];
    conjuntoCompras = [];
    precioCarrito.textContent = 0;
    actualizarCarrito(conjuntoCompras);    
}

const calcularPrecioTotal = (conjuntoCompras) =>{
    total = 0;

    conjuntoCompras.forEach((prod) => {
        total += prod.cantidad * prod.precio;
    });

    console.log(total);
}

const agregarLocalStorage = (productos, codigo) =>{
    let prodSeleccionado = productos.find(produc => produc.cod === codigo);
    verificarDuplicados(prodSeleccionado);

    // Combina los productos adquiridos durante la sesión actual (comprasAdquiridas) 
    // con los productos almacenados previamente en el localStorage (comprasAdquiridasStorage).
    // Si no hay datos en el localStorage, se proporciona un array vacío por defecto.
    conjuntoCompras = comprasAdquiridas.concat(comprasAdquiridasStorage || []);

    // Utiliza un Map para consolidar los productos en conjuntoCompras.
    // Si hay productos con el mismo código, suma las cantidades.
    // Si no hay productos con el mismo código, agrega una copia del producto al Map.
    let mapaCompras = new Map();
    conjuntoCompras.forEach(compra => {
        if (mapaCompras.has(compra.cod)) {
            // Si ya existe un producto con el mismo código, aumenta su cantidad.
            mapaCompras.get(compra.cod).cantidad += compra.cantidad;
        } else {
            // Si es el primer producto con este código, agrega una copia al Map.
            mapaCompras.set(compra.cod, { ...compra});
        }
    });
    // Convierte los valores del Map de nuevo a un array para actualizar conjuntoCompras.
    conjuntoCompras = Array.from(mapaCompras.values());

    calcularPrecioTotal(conjuntoCompras);
    localStorage.setItem("precio", total);
    localStorage.setItem("compras", JSON.stringify(conjuntoCompras));
    actualizarCarrito(conjuntoCompras);

}

// Verifica si existen productos adquiridos.
// Si existe un producto con el mismo código, aumenta su cantidad.
// Si no existe, agrega el producto al array de comprasAdquiridas con cantidad inicializada en 1.
// Si no hay ningún producto adquirido, crea un nuevo array con el producto actual.
const verificarDuplicados = (prodSeleccionado) =>{
    if (comprasAdquiridas) {

        // Busca un producto existente con el mismo código.
        let productoExistente = comprasAdquiridas.find(prod => prod.cod === prodSeleccionado.cod);

        if (productoExistente) {
            // Si ya existe, aumenta la cantidad.
            productoExistente.cantidad++;

        } else {
            // Si no existe, agrega el producto con cantidad inicializada en 1.
            prodSeleccionado.cantidad = 1;
            comprasAdquiridas.push(prodSeleccionado);
        }
    } else {
        // Si no hay productos adquiridos, crea un nuevo array con el producto actual.
        comprasAdquiridas = [prodSeleccionado];
    }
}

const actualizarCarrito = (comprasAlmacenadas) =>{

    if(localStorage.getItem("precio") !== null){
        let precioRecuperado = localStorage.getItem("precio");
        total = parseInt(precioRecuperado);
    }

    cuerpoCarrito.innerHTML = '';

    if(comprasAlmacenadas == null){
        cuerpoCarrito.innerHTML = '';
    }else{
        comprasAlmacenadas.forEach(compra => {
            const compraCarrito = document.createElement("div");
            compraCarrito.classList.add("compraCarrito");

            compraCarrito.innerHTML = `
            <img src="${compra.img}" alt="">
            <div class="datos"> 
            <p class="nombre">${compra.nombre}</p>
            <p class="precio">$${compra.precio}x${compra.cantidad}</p>
            </div>
            `;

            precioCarrito.textContent = total;

            cuerpoCarrito.append(compraCarrito);
        })
    }
    
}

document.addEventListener("DOMContentLoaded",() =>{
    actualizarCarrito(comprasAdquiridasStorage);
});