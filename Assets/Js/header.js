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

abrirCarrito.addEventListener("click", () => {
    menuCarrito.classList.add("visible");
})

cerrarCarrito.addEventListener("click", () => {
    menuCarrito.classList.remove("visible");
})

borrarCarrito.addEventListener("click", () => {
    borrarStorage();
})