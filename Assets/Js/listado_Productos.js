let borrarCarrito = document.querySelector("#borrar-carrito");
let contenedorP = document.querySelector("#contenedorP");
let cuerpoCarrito = document.querySelector("#cuerpoCarrito");
let comprasAdquiridas = [];
let comprasAdquiridasStorage = [];
comprasAdquiridasStorage = JSON.parse(localStorage.getItem("compras"));

function borrarStorage(){
    localStorage.clear();
    comprasAdquiridas = [];
    comprasAdquiridasStorage = [];
    actualizarCarrito();
}

function agregarLocalStorage(codigo){
    let prodSeleccionado = productos.find(produc => produc.cod === codigo);
    prodSeleccionado.cantidad = 0;
    comprasAdquiridas.push(prodSeleccionado);
    if(comprasAdquiridasStorage == null){
        localStorage.setItem("compras",JSON.stringify(comprasAdquiridas));
        actualizarCarrito();
        return;
    }else{
        let conjuntoCompras = comprasAdquiridasStorage.concat(comprasAdquiridas);
        localStorage.setItem("compras",JSON.stringify(conjuntoCompras));
    }
    actualizarCarrito();
}

function actualizarCarrito(){
    cuerpoCarrito.innerHTML = '';

    const comprasAlmacenadas = JSON.parse(localStorage.getItem("compras"));

    if(comprasAlmacenadas == null){
        cuerpoCarrito.innerHTML = '';
    }else{
        for (const compra of comprasAlmacenadas){
            const compraCarrito = document.createElement("div");
            compraCarrito.classList.add("compraCarrito");
            compraCarrito.innerHTML = `
            <img src="${compra.img}" alt="">
            <div class="datos"> 
            <p class="nombre">${compra.nombre} cantidad(${compra.cantidad})</p>
            <p class="precio">$${compra.precio}</p>
            </div>
            `;
            cuerpoCarrito.append(compraCarrito);
        }
    }
    
}

// Colocar productos en la seccion productos.html
try {
    for( const prod of productos){

        let producto = document.createElement("div");
        producto.classList.add("producto");
        producto.innerHTML = `
        <img src="${prod.img}" alt="">
        <p class="nombre">${prod.tipo} : ${prod.nombre}</p>
        <p class="precio">$${prod.precio}</p>
        <button id="comprarBtn">Agregar</button>
        `;
        contenedorP.append(producto);
    
        const botonComprar = producto.querySelector('#comprarBtn');
        botonComprar.addEventListener("click", () =>{
            agregarLocalStorage(prod.cod);
        });
        
    }
} catch(error){
    console.log(error);
}

document.addEventListener("DOMContentLoaded",() =>{
    actualizarCarrito();
})

borrarCarrito.addEventListener("click", () => {
    borrarStorage();
})