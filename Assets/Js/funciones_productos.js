let cuerpoCarrito = document.querySelector("#cuerpoCarrito");
let comprasAdquiridas = [];
let comprasAdquiridasStorage = [];
let conjuntoCompras = [];
comprasAdquiridasStorage = JSON.parse(localStorage.getItem("compras"));


const borrarStorage = () =>{
    localStorage.clear();
    comprasAdquiridas = [];
    comprasAdquiridasStorage = [];
    conjuntoCompras.forEach((compra) =>{
        compra.cantidad = 1;
    })
    conjuntoCompras = [];
    actualizarCarrito(conjuntoCompras);

    
}

const agregarLocalStorage = (productos, codigo) =>{
    

    let prodSeleccionado = productos.find(produc => produc.cod === codigo);
    verificarDuplicados(prodSeleccionado);

    if(comprasAdquiridasStorage == null){
        conjuntoCompras = comprasAdquiridas;
    }else{
        conjuntoCompras = comprasAdquiridasStorage.concat(comprasAdquiridas);
        
        const mapaCompras = new Map();

        conjuntoCompras.forEach(compra => {
            if (mapaCompras.has(compra.cod)) {
                mapaCompras.get(compra.cod).cantidad = compra.cantidad + 1;
            } else {
                mapaCompras.set(compra.cod, compra);
            }
        });

        conjuntoCompras = Array.from(mapaCompras.values());
        
    }
    localStorage.setItem("compras",JSON.stringify(conjuntoCompras));
    actualizarCarrito(conjuntoCompras);

}



const verificarDuplicados = (prodSeleccionado) =>{

    if(comprasAdquiridas.some((prod) => prod.cod === prodSeleccionado.cod)) {
        prodSeleccionado.cantidad++;
    }else{
        comprasAdquiridas.push(prodSeleccionado);
    }
}


const actualizarCarrito = (comprasAlmacenadas) =>{

    // let comprasAlmacenadas = JSON.parse(localStorage.getItem("compras"));

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
            <p class="nombre">${compra.nombre} cantidad(${compra.cantidad})</p>
            <p class="precio">$${compra.precio}</p>
            </div>
            `;
            cuerpoCarrito.append(compraCarrito);
        })
    }
}

document.addEventListener("DOMContentLoaded",() =>{
    actualizarCarrito(comprasAdquiridasStorage);
});