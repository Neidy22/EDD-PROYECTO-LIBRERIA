import {showHideSeccion,showHide} from "./CargasMasivas.js"



const login=document.querySelector("#singin");
const form=document.getElementById("formulario");
const stack=document.getElementById("stack");


/*-------------------------------------------------------
Codigo para aparecer y desaparecer el formulario de login
--------------------------------------------------------*/
login.addEventListener("click", (e) =>{
    e.preventDefault();
    /*console.log("Click en singin")*/
    /*document.body.classList.toggle("show-login");*/
    form.classList.toggle('show-login');
});


/*-------------------------------------------------------
Codigo para activar la seccion de HOME
--------------------------------------------------------*/
const btnHome=document.getElementById("activar-home");
btnHome.addEventListener("click",(e) => {
    e.preventDefault()
    showHideSeccion(document.getElementsByClassName('seccionAdmin'),'top10');
});



/*-------------------------------------------------------
Codigo para activar la seccion de cargas masivas
--------------------------------------------------------*/
const btnMenuMasiva=document.getElementById("activar-masivas");
btnMenuMasiva.addEventListener("click",(e) => {
    e.preventDefault()
    showHideSeccion(document.getElementsByClassName('seccionAdmin'),'masivas');
});

/*-------------------------------------------------------
Codigo para activar la seccion de estructuras
--------------------------------------------------------*/
const btnEstructuras=document.getElementById("activar-estructuras");
btnEstructuras.addEventListener("click",(e) => {
    e.preventDefault()
    showHideSeccion(document.getElementsByClassName('seccionAdmin'),'estructuras');
});


/*-------------------------------------------------------
Codigo para activar la seccion Libreras
--------------------------------------------------------*/
const btnLibrera=document.getElementById("activar-libreras");
btnLibrera.addEventListener("click",(e) => {
    e.preventDefault()
    showHideSeccion(document.getElementsByClassName('seccionAdmin'),'librera');
});

/*-------------------------------------------------------
Codigo para activar la seccion Libros ordenados
--------------------------------------------------------*/
const btnLibros=document.getElementById("activar-libros");
btnLibros.addEventListener("click",(e) => {
    e.preventDefault()
    showHideSeccion(document.getElementsByClassName('seccionAdmin'),'books');
});

/*-------------------------------------------------------
Codigo para activar la seccion autores
--------------------------------------------------------*/
const btnAutores=document.getElementById("activar-autores");
btnAutores.addEventListener("click",(e) => {
    e.preventDefault()
    showHideSeccion(document.getElementsByClassName('seccionAdmin'),'autors');
});

/*-------------------------------------------------------
Codigo para activar la seccion autores
--------------------------------------------------------*/
const btnCarrito=document.getElementById("activar-carrito");
btnCarrito.addEventListener("click",(e) => {
    e.preventDefault()
    showHideSeccion(document.getElementsByClassName('seccionAdmin'),'carrito');
});

/*-------------------------------------------------------
Codigo para activar la finalización de sesión
--------------------------------------------------------*/
const btnLogout=document.getElementById("activar-salida");
btnLogout.addEventListener("click",(e) => {
    e.preventDefault()
    showHide('',document.getElementsByClassName("menuPrincipal"));
    showHide('none',document.getElementsByClassName("menuAdmin"));
    showHide('none',docuement.getElementsByClassName("menuClient")); 
});


/*-------------------------------------------------------
            Codigo para mostrar la pila
--------------------------------------------------------*/
function showStack(componente,libro){
    var texto=document.createElement("h2");
    console.log("click en "+libro.nameBook);
    texto.textContent=libro.nameBook+" Cantidad "+libro.quantity;
    stack.insertAdjacentElement("beforebegin",texto);
    libro.pila.graph();
    stack.style.visibility='';
    
    

}




export {showStack}