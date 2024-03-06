
// Navbar que siga al scroll
window.addEventListener("scroll",() => {
    let header = document.querySelector("header");
    header.classList.toggle("abajo",this.window.scrollY>0);
})

// Boton Hamburguesa
let nav = document.querySelector("#nav");
let abrir = document.querySelector("#abrir");
let cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

// Boton Carrito
let menuCarrito = document.querySelector("#menu-carrito");
let abrirCarrito = document.querySelector("#abrir-carrito");
let cerrarCarrito = document.querySelector("#cerrar-carrito");
let borrarCarrito = document.querySelector("#borrar-carrito");
let comprarCarrito = document.querySelector("#comprar-carrito");

abrirCarrito.addEventListener("click", () => {
    menuCarrito.classList.add("visible");
})

cerrarCarrito.addEventListener("click", () => {
    menuCarrito.classList.remove("visible");
})

borrarCarrito.addEventListener("click", () => {
    Swal.fire({
        title: "Estas seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4CAF50",
        cancelButtonColor: "#E3350D",
        confirmButtonText: "Si, borralo!",
    }).then((result) => {
        if (result.isConfirmed) {
            if(localStorage.getItem("compras") === null){
                Swal.fire({
                    title: "No hay productos en el carrito!",
                    text: "Verifique que tenga compras en el carrito!",
                    icon: "error"
                });
            }else{
                Swal.fire({
                    title: "Borrado!",
                    text: "Tus compras han sido eliminadas!",
                    icon: "success",
                    confirmButtonColor: "#4CAF50"
                    });
                borrarStorage();
            }
        }
    });
})

comprarCarrito.addEventListener("click",() => {
    if(localStorage.getItem("compras") === null){
        Swal.fire({
            title: "Compra Cancelada!",
            text: "Verifique que tenga compras en el carrito!",
            icon: "error"
        });
    }else{
        Swal.fire({
            title: "Compra realizada!",
            text: "Su compra ha sido procesada con exito!",
            icon: "success"
        });
        borrarStorage();
    }
})