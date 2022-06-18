import "./CargasMasivas.js"


const login=document.querySelector("#singin");

const form=document.getElementById("formulario");


/*-------------------------------------------------------
Codigo para aparecer y desaparecer el formulario de login
--------------------------------------------------------*/
login.addEventListener("click", (e) =>{
    e.preventDefault();
    /*console.log("Click en singin")*/
    /*document.body.classList.toggle("show-login");*/
    form.classList.toggle('show-login');
});


