
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
        title: '¿Borrar carrito?',
        text: 'Esta seguro de querer borrar su pokecarrito?',
        confirmButtonText:"Estoy seguro",
        cancelButtonText: 'Me arrepenti',
        confirmButtonColor: '#FFCB05',
        cancelButtonColor: '#FF0000',
        background: '#FFFFFF',
        imageUrl: '../Assets/Img/Iconos/icono-enojado.png',
        imageWidth: 100,
        imageAlt: 'Icono enojado',
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            if(localStorage.getItem("compras") === null){
                Swal.fire({
                    title: '¡Ups!',
                    text: 'Algo salió mal. Verifique su pokecarrito...',
                    confirmButtonColor: '#FFCB05',
                    background: '#FFFFFF',
                    imageUrl: '../Assets/Img/Iconos/icono-confundido.png',
                    imageWidth: 100,
                    imageAlt: 'Icono confundido',
                });
            }else{
                Swal.fire({
                    title: '¡Carrito borrado!',
                    text: 'Tu carrito ha sido eliminado.',
                    confirmButtonColor: '#FFCB05',
                    background: '#FFFFFF',
                    imageUrl: '../Assets/Img/Iconos/icono-triste.png',
                    imageWidth: 100,
                    imageAlt: 'Icono triste',
                    });
                borrarStorage();
            }
        }
    });
})

comprarCarrito.addEventListener("click",() => {
    if(localStorage.getItem("compras") === null){
        Swal.fire({
            title: '¡Ups!',
            text: 'Algo salió mal. Verifique su pokecarrito...',
            confirmButtonColor: '#FFCB05',
            background: '#FFFFFF',
            imageUrl: '../Assets/Img/Iconos/icono-confundido.png',
            imageWidth: 100,
            imageAlt: 'Icono confundido',
        });
    }else{
        mostrarFormulario();
    }
})

const mostrarFormulario = async () => {
    const { value: formValues } = await Swal.fire({
        title: '¡Complete su compra!',
        html: `
            <input id="swal-input1" class="swal2-input" placeholder="Nombre">
            <input id="swal-input2" class="swal2-input" placeholder="Teléfono">
            <input id="swal-input3" class="swal2-input" placeholder="Correo electrónico">
        `,
        focusConfirm: false,
        confirmButtonColor: '#FFCB05',
        preConfirm: () => {
            let nombre = document.getElementById("swal-input1").value;
            let telefono = document.getElementById("swal-input2").value;
            let correo = document.getElementById("swal-input3").value;    
                
            if(!nombre){
                Swal.showValidationMessage("Por favor ingrese su nombre");
                return false;
            }else if(!telefono){
                Swal.showValidationMessage("Por favor ingrese su telefono");
                return false;
            }else if(!correo){
                Swal.showValidationMessage("Por favor ingrese su correo");
                return false;
            }

            return [nombre,telefono,correo];
        }
    });

    if (formValues) {
        Swal.fire({
            title: '¡Compra exitosa!',
            text: 'Gracias por su pokecompra. ¡Disfrute de sus pokeproductos!',
            confirmButtonColor: '#FFCB05',
            background: '#FFFFFF',
            imageUrl: '../Assets/Img/Iconos/icono-feliz.png',
            imageWidth: 100,
            imageAlt: 'Icono feliz',
        });
        borrarStorage();
    }
};