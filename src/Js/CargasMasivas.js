import BinaryTree from "../Structures/BinaryTree.js";
import SparseMatrix from "../Structures/SparseMatrix.js";
import OrthogonalMatrix from "../Structures/OrthogonalMatrix.js"
import DoubleCircularList from "../Structures/DoubleCircularList.js"
import Queue from "../Structures/Queue.js";
import Autor from "../Objects/Autor.js";
import Book from "../Objects/Book.js";
import User from "../Objects/User.js";
import SimpleList from "../Structures/SimpleList.js";
import Node from "../Objects/Node.js";
import DoubleList from "../Structures/DoubleList.js";

    const matrizO=new OrthogonalMatrix()
    const matrizD=new SparseMatrix()
    const arbol=new BinaryTree()
    const usuarios=new DoubleCircularList()
    const books=new SimpleList()
    const queue=new Queue();
    let top=new DoubleList();
    var usuario;
    

    //carga masiva de los autores
    document.getElementById('cmAutors').addEventListener('change', function() {
        
        //obtengo el archivo
        let fileAut = new FileReader();
        //cargo el archivo
        fileAut.onload = () => {

          //parseo el archivo para poder extraer los datos
          let autorsData=JSON.parse(fileAut.result)
          //mando a extraer los datos para mostrarlos en el html
          renderHTML2(autorsData)
        }

        fileAut.readAsText(this.files[0]);


    });

    function renderHTML2(data){
        let htmlStringA="";
        let aux;
        for( let i=0; i<data.length; i++){
            //constructor(_dpi,_name,_email,_telephone,_adress,_bio)
            aux=new Autor(data[i].dpi,data[i].nombre_autor,data[i].correo,data[i].telefono,data[i].direccion,data[i].biografia);
            arbol.insertN(aux)
            
                
        }
        //document.getElementById('output').insertAdjacentHTML('beforeend',htmlStringA)
        arbol.graph()
        arbol.recorrer()

    }


    //carga masiva de los libros
    document.getElementById('cmBook').addEventListener('change', function() {
        
        //obtengo el archivo
        let file = new FileReader();
        //cargo el archivo
        file.onload = () => {
          //document.getElementById('output').textContent = file.result;

          //parseo el archivo para poder extraer los datos
          let booksData=JSON.parse(file.result)
          //mando a extraer los datos para mostrarlos en el html
          renderHTML(booksData)
        }

        file.readAsText(this.files[0]);


    });

    function renderHTML(data){
        //let htmlString="";
        
        for( var i=0; i<data.length; i++){
           
            //constructor(_isbn,_nombreA,_nombreB,_cantidad,_fila,_columna,_paginas,_categoria){
            var nuevo=new Book(data[i].isbn,data[i].nombre_autor,data[i].nombre_libro,data[i].cantidad,data[i].fila,data[i].columna,data[i].paginas,data[i].categoria);
            insertEjemplares(nuevo.quantity,nuevo);
            books.addNewOrdered(nuevo)
            if(data[i].categoria=="Fantasia"){
              matrizO.insertBook(nuevo.column,nuevo.row,nuevo) 
            }else{
              matrizD.insertNode(nuevo.column,nuevo.row,nuevo)
              //console.log(nuevo.nameBook)
            }
            
            
                
        }
       
       // document.getElementById('output').insertAdjacentHTML('beforeend',htmlString)
        matrizD.graph();
        matrizO.graph();
        matrizO.createLibreraFantasy();
        matrizD.createLibreraThriller();

    }

    //insertar ejemplares en una pila
    function insertEjemplares(cantidad,libro){
      var i=0

      while(i<cantidad){
        libro.pila.push(i)
        i++
      }
      
    }

    //carga del usuario default
    const admin=new User("2354168452525","Wilfred Perez","Wilfred","wilfredPerez@gmail.com","Administrador","123","+502 (123) 123-4567")
    usuarios.addNew(admin)
    //carga masiva de los usuarios
    document.getElementById('cmUser').addEventListener('change', function() {
        
        //obtengo el archivo
        let file = new FileReader();
        //cargo el archivo
        file.onload = () => {
          //document.getElementById('output').textContent = file.result;

          //parseo el archivo para poder extraer los datos
          let usersData=JSON.parse(file.result)
          //mando a extraer los datos para mostrarlos en el html
          renderHTML3(usersData)
        }

        file.readAsText(this.files[0]);


    });

    function renderHTML3(data){
        let htmlString="";
        let aux;
        for(let i=0; i<data.length; i++){
           
            //constructor(_dpi,_nombreCompleto,_nombreUsuario,_correo,_rol,_contrasenia,_telefono)
            aux=new User(data[i].dpi,data[i].nombre_completo,data[i].nombre_usuario,data[i].correo,data[i].rol,data[i].contrasenia,data[i].telefono);
            usuarios.addNew(aux)
            
            
            
                
        }
       
        //document.getElementById('output').insertAdjacentHTML('beforeend',htmlString)
        usuarios.graph()

    }


    /*----------------------------------
      Codigo para el ingreso de un usuario
    ------------------------------------*/

    const form=document.getElementById("formulario");
    
    form.onsubmit = function(e){
   
      e.preventDefault();
      const user = document.getElementById("username").value;
      const pass=document.getElementById("pass").value;
      form.reset();
      //console.log(user);
      //console.log(pass);
      usuario=usuarios.search(user,pass);
      if(usuario!=0){
        var rol=usuario.value.rol;
        if(rol=="Administrador"){
            showHide('none',document.getElementsByClassName("menuPrincipal"));
            showHide('block',document.getElementsByClassName("menuAdmin"));
            showHideSeccion(document.getElementsByClassName("seccionAdmin"),'top10');
          
        }else{
            showHide('none',document.getElementsByClassName("menuPrincipal"));
            showHide('block',document.getElementsByClassName("menuClient"));
            showHideSeccion(document.getElementsByClassName("seccionCliente"),'top10');

        }
      }
  
    }

    //función para mostrar u ocultar los elementos de una clase
    function showHide(estado,elementos){
      var i;
      for(i=0; i<elementos.length; i++){
        elementos[i].style.display=estado;
      }

    }

     //funcion para activar una seccion especifica de un menu 
    function showHideSeccion(clase,id){
      var i;
      for(i=0; i<clase.length; i++){
        //console.log(clase[i].getAttribute('id'));
        //console.log(id);
        if(clase[i].getAttribute('id')==id){
          clase[i].style.display='block';
        }else{
          clase[i].style.display='none';
        }
      }
    }
    

     /*----------------------------------
        Codigo para Buscar un autor
    ------------------------------------*/

    const autorBuscado=document.getElementById("buscarAutor");
    
    autorBuscado.onsubmit = function(e){
   
      e.preventDefault();
      const nombre = document.getElementById("autor-name").value;
      
      autorBuscado.reset();
      //console.log(user);
      //console.log(pass);
      arbol.search(nombre);
      

     
    }

    /*----------------------------------
        Codigo para Buscar un libro
    ------------------------------------*/

    const libroBuscado=document.getElementById("buscarLibro");
    
    libroBuscado.onsubmit = function(e){
   
      e.preventDefault();
      const nombre = document.getElementById("book-name").value;
      console.log("clickeado el buscar libro")
      libroBuscado.reset();
      //console.log(user);
      //console.log(pass);
      books.search(nombre);
      //matrizO.search(nombre);
    
    }
   
    /*----------------------------------
        Codigo para comprar libros
    ------------------------------------*/
    const comprarLibro=document.getElementById("comprarLibro");
    
    comprarLibro.onsubmit = function(e){
   
      e.preventDefault();
      var nombre = document.getElementById("bookname").value;
      var cantidad = document.getElementById("cantidadB").value;
    
      comprarLibro.reset();
      
      books.buyBook(nombre,cantidad,usuario,queue);
      
      usuarios.graph()

      console.log("Se compró")

      insertTop();
      
    
    
    }

    //función para insertar en el top al usuario que compro
    function insertTop(){
      top.addNewDesOrdered(usuario.value)
      
      top.graph();
      generarDivs();
    }
    //función para generar los divs del top
    
    function generarDivs(){
      
      var aux=top.first
      var n=1
      while(aux!=null){

        var div=document.getElementById(n);
        div.textContent="No. "+n+"  "+aux.value.name;

        

        aux=aux.next
        n++;
      }

    }



    export{showHideSeccion,showHide};