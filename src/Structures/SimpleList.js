import Node from "../Objects/Node.js";
import Solicitud from "../Objects/Solicitud.js";

class SimpleList{
   
    constructor(){
        this.first=null
        this.size=0

    }

    addNewD(data){
        var nuevo=new Node(data)
        nuevo.id=this.size
        if(this.first==null){
            this.first=nuevo
        }else{
            var aux=this.first
            while(aux.down!=null){
                aux=aux.down
            }
            aux.down=nuevo
        }
        this.size++

    }

    addNewOrdered(data){
        var nuevo=new Node(data)
        nuevo.id=data.quantity
        if(this.first==null){
            this.first=nuevo
        }else if (nuevo.id<this.first.id){
            nuevo.next=this.first
            this.first=nuevo
        }else{
            var aux=this.first
            var prev=this.first
            while(nuevo.id>aux.id && aux.next!=null){
                prev=aux
                aux=aux.next

            }
            if(nuevo.id>aux.id){
                prev=aux
            }
            nuevo.next=prev.next
            prev.next=nuevo
        }
        this.size++
    }

    graph(){
        var doteCode="digraph ListaSimple {\n";
        doteCode+="rankdir=LR;\n";
        doteCode+="label=\"Lista Simple\";\n"
        doteCode+="     fontname=\"Forte\";\n"
        doteCode+="     fontsize=30;\n"
        doteCode+="node[shape=box, fontsize=14];\n";
        
        var relas=""
        var labels=""
        var aux=this.first
        while(aux.next!=null){
            relas+="    node"+aux.id+" -> node"+aux.next.id+";\n"
            labels+="    node"+aux.id+" [label=\""+aux.id+"\"];\n"
            aux=aux.next
        }
        labels+="    node"+aux.id+" [label=\""+aux.id+"\"];\n"
        
        doteCode+=relas
        doteCode+=labels

        doteCode+="    }\n"
        console.log(doteCode)
        d3.select('#lienzo').graphviz()
            .width(1600)
            .height(600)
            .renderDot(doteCode);



    }


    insertRight(nuevo){
        if (this.first==null){
            this.first=nuevo
        }else if(nuevo.id<this.first.id){
            nuevo.right=this.first
            this.first=nuevo;

        }else{
            var aux=this.first
            var prev=aux
            while(nuevo.id>aux.id && aux.right!=null){
                prev=aux
                aux=aux.right
            }
            if (nuevo.id > aux.id){
                prev=aux
            }

            nuevo.right=prev.right
            prev.right=nuevo
         
            
        }

       
        this.size++
    }
    
    insertDown(nuevo){
        if (this.first==null){
            this.first=nuevo
        }else if(nuevo.id<this.first.id){
            nuevo.down=this.first
            this.first=nuevo

        }else{
            var aux=this.first
            var prev=aux
            while(nuevo.id>aux.id && aux.down!=null){
                prev=aux
                aux=aux.down
            }
            if (nuevo.id > aux.id){
                prev=aux
            }

            nuevo.down=prev.next
            prev.down=nuevo
         
            
        }

       
        this.size++
    }


    search(nombre){
        const cont=document.getElementById("books");
        const cont2=document.getElementById("stackBook");
        var aux=this.first;
        while(aux!=null){   
            if(aux.value.nameBook==nombre){
                alert("Libro encontrado");
                var nom="Ejemplares: "+aux.value.nameBook+" Cantidad:"+aux.value.quantity;
                cont.insertAdjacentElement("beforeend",cont2)
                this.graphPila(aux.value.pila,nom);
            }

            aux=aux.next;
        }
        //alert("Libro no encontrado");

    }


    buyBook(nombre,cantidad,usuario,cola){
        var aux=this.first;
        var temp=usuario.down;
        //console.log(usuario.value.name)
        //console.log(aux.value.nameBook)
        while(aux!=null){
            //encuentro el libro
            
            //console.log("actual: "+aux.value.nameBook+" buscado: "+nombre)
            if(aux.value.nameBook==nombre){
                //console.log("se encontró")

                //si la cantidad que quiere comprar es menor que la cantidad disponible
                if(aux.value.quantity>=cantidad){
                    aux.value.quantity=aux.value.quantity-cantidad;
                    //ingreso los libros a la lista de libros
                    var n=1
                    while(n<=cantidad){
                        temp.addNewD(aux.value)
                        //aux.value.quantity--;
                        aux.value.pila.pop();
                        n++
                    }

                }//si la cantidad que quiere comprar es mayor que la cantidad disponible
                else if(aux.value.quantity<cantidad){
                   





                    var pendiente=cantidad-aux.value.quantity;
                    //inserto los pendientes en la cola de disponibilidad
                    var nueva=new Solicitud(usuario.value.name,aux.value.nameBook,pendiente)
                    cola.enqueue(nueva);
                    cola.graph();

                    if(aux.value.quantity>0){
                        var n=1
                        while(aux.value.quantity>0){
                            temp.addNewD(aux.value)
                            aux.value.quantity--;
                            aux.value.pila.pop();
                            
                        }
                    }

                    
                }



                return 0
            }
            aux=aux.next;
        }
        alert("No se encontró")


    }

    graphPila(pila,name){
        var text="digraph pila{\n"
        text+="rankdir=RL;\n"
        text+="ranksep=0;\n"
        text+="nodesep=0;\n"
        text+="node [shape=Mrecord];\n"
        text+="label=\""+name+"\";\n"
        var aux=pila.peak;

        if(pila.peak==null){
            text+="    struct1 [label=\"<f0>Vacía\"];\n";
        }else{
            var n=0
            text+="    struct1 [label=\"<f"+n+">"+aux.id+""
            aux=aux.down
            while(aux!=null){
                n++
               
                text+="|<f"+n+">"+aux.id+""
                aux=aux.down
                
            }
            text+="\"];\n"
    
            

        }
        text+="}\n"
       

  

        //console.log(text)
        d3.select('#stackBook').graphviz()
            .width(1600)
            .height(600)
            .renderDot(text);

    }

    graphR(){
        var text=" "
  
        var aux=this.first
      
        var rela=""
        var labels=""
        var g=0
        
        if (this.first!=null){
               
            while(aux.right!=null){            
                g=aux.id+1
                rela+="    nodeR"+aux.id+" -> nodeR"+aux.right.id+";\n"
                labels+="    nodeR"+aux.id+" [ shape=box, label=\""+aux.id+"\",weight="+g+", group="+g+"];\n"
                aux=aux.right
            }
        }
        g=aux.id+1
        labels+="    nodeR"+aux.id+" [shape=box, label=\""+aux.id+"\",  weight="+g+", group="+g+"];\n"

        text+=labels
        text+=rela
        
        return text

    }

    graphD(){
        var text=" "
        var aux=this.first
        var rela=""
        var labels=""
        
        if (this.first!=null){

            while(aux.down!=null){
                rela+="    nodeD"+aux.id+" -> nodeD"+aux.down.id+";\n"
                labels+="    nodeD"+aux.id+" [shape=box, label=\""+aux.id+"\", group=0];\n"
                aux=aux.down
            }
        }
        labels+="    nodeD"+aux.id+" [shape=box, label=\""+aux.id+"\", group=0];\n"
        
        text+=labels
        text+=rela
        
        return text

    }
    
    graphDownBook(padre){
        var text=" "
        var aux=this.first
        var rela=""
        var labels=""
        
        if (this.first!=null){

            while(aux.down!=null){
                var name=aux.id+"P"+padre
                var name2=aux.down.id+"P"+padre
                rela+="    nodeD"+name+" -> nodeD"+name2+";\n"
                labels+="    nodeD"+name+" [shape=box, label=\""+aux.value.nameBook+"\", weight="+padre+" ,group="+padre+"];\n"
                aux=aux.down
            }
        }
        var name=aux.id+"P"+padre
        labels+="    nodeD"+name+" [shape=box, label=\""+aux.value.nameBook+"\",  weight="+padre+" , group="+padre+"];\n"
        
        text+=labels
        text+=rela
        


        return text

    }


    
    graphDown(padre){
        var text=" "
        var aux=this.first
        var rela=""
        var labels=""
        
        if (this.first!=null){

            while(aux.down!=null){
                rela+="    nodeD"+aux.id+" -> nodeD"+aux.down.id+";\n"
                labels+="    nodeD"+aux.id+" [shape=box, label=\""+aux.id+"\", group="+padre+"];\n"
                aux=aux.down
            }
        }
        labels+="    nodeD"+aux.id+" [shape=box, label=\""+aux.id+"\", group="+padre+"];\n"
        
        text+=labels
        text+=rela
        
        return text

    }

}

export default SimpleList;

/*

var filas=new SimpleList()

var uno=20
var dos=2
var tres=3
var cuatro=4
var cinco=5
var seis=45
filas.addNewOrdered(uno)
filas.addNewOrdered(dos)
filas.addNewOrdered(tres)
filas.addNewOrdered(cuatro)
filas.addNewOrdered(cinco)
filas.addNewOrdered(seis)
filas.graph()*/