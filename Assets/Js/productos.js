let url = "../Assets/Json/productos.json";
let selector = document.querySelector("#selector");
let filtroStorage = localStorage.getItem("filtro");
let filtro = parseInt(filtroStorage);
let contenedorP = document.querySelector("#contenedorP");

if (filtroStorage === null) {
    localStorage.setItem("filtro", "1");
    filtro = 1;
}

fetch(url)
.then(response => response.json())
.then(productos => ordenarProductos(productos))
.catch(error => console.log(error));

const ordenarProductos = (productos) => {
    selector.addEventListener("change", () => {
        filtro = selector.value;
        localStorage.setItem("filtro", filtro);

        ordenamiento(productos);

        mostrarProductos(productos); 
        return;
    });

    ordenamiento(productos);
    mostrarProductos(productos);
};

const ordenamiento = (productos) => {
    if (filtro == 2) {
        const filtroMayorMenor = (a, b) => b.precio - a.precio;
        productos.sort(filtroMayorMenor);
    } else if (filtro == 3) {
        const filtroMenorMayor = (a, b) => a.precio - b.precio;
        productos.sort(filtroMenorMayor);
    } else {
        const filtroPokedex = (a, b) => a.cod - b.cod;
        productos.sort(filtroPokedex);
    }
}

const mostrarProductos = (productoOrdenados) => {
    
    contenedorP.innerHTML = "";

    productoOrdenados.forEach(prod => {
        let producto = document.createElement("div");
        producto.classList.add("producto");
        producto.innerHTML = `
        <p class="codigo">N°${prod.cod}</p>
        <img class="img-prod" src="${prod.img}" alt="">
        <p class="nombre">${prod.tipo} : ${prod.nombre}</p>
        <p class="precio">$${prod.precio}</p>
        <button id="comprarBtn">Agregar</button>
        <div class="contador">
        </div>
        `;
        contenedorP.append(producto);
    
        const botonComprar = producto.querySelector('#comprarBtn');
        botonComprar.addEventListener("click", () =>{
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
                Toast.fire({
                icon: "success",
                title: "Producto Agregado"
            });
            agregarLocalStorage(productoOrdenados,prod.cod);
        });


    });
}


