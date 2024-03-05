let url = "../Assets/Json/productos.json";
let contenedorP = document.querySelector("#contenedorP");

fetch(url)
.then(response => response.json())
.then(productos => mostrarProductos(productos))
.catch(error => console.log(error));

const mostrarProductos = (productos) => {
    productos.forEach(prod => {
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
            agregarLocalStorage(productos,prod.cod);
        });
    });
} 

