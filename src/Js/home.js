
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

/*----------------------------------
Codigo para el ingreso de un usuario
------------------------------------*/

form.onsubmit = function(e){
   
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass=document.getElementById("pass").value;
  form.reset();
  console.log(user);
  console.log(pass);
  
  
}
    