
const login=document.querySelector("#singin");

const form=document.getElementById("formulario");

/*este pedazo funciona esconde y aparece todo el body*/

login.addEventListener("click", (e) =>{
    e.preventDefault();
    console.log("Click en singin")
    /*document.body.classList.toggle("show-login");*/
    form.classList.toggle('show-login');
});


/*
const open=document.getElementById("singin");
const formu=document.getElementById("formulario");
const openForm = () => formu.classList.add("show-login");

open.addEventListener("click",openForm);*/