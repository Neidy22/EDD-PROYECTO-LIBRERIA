import Node from "../Objects/Node.js"
import Solicitud from "../Objects/Solicitud.js"
class Queue{
    consturctor(){
        this.first=null
        this.size=0
    }

    enqueue(data){
        //agrega un elemento al final de la cola
        var nuevo=new Node(data)
        if(this.first==null){
            this.first=nuevo;
        }else{
            var aux=this.first;

            while(aux.next != null ){
                aux=aux.next;
            }
            nuevo.next=aux.next;
            aux.next=nuevo;

        }
        this.size++;

    }


    dequeue(){
        var aux=this.first.next
        this.first=aux
    }

    peek(){
        return this.first
    }

    graph(){
        var text="digraph Cola{\n"
        text+="rankdir=LR;\n"
       
    
        var aux=this.first
        var rela=""
        var labels=""
        var m=0
        if (this.first!=null){
            
            while(aux.next!=null){            
                rela+=" node"+m+" -> "+"node"+(m+1)+";\n"
                labels+=" node"+m+"[label=\""+aux.value.getString()+"\"];\n"
                
                aux=aux.next
                m++
            }
            labels+=" node"+m+"[label=\""+aux.value.getString()+"\"];\n"
        }

        text+=rela
        text+=labels
     
        

       
        text+="}"
        
        console.log(text)
        d3.select('#lienzo').graphviz()
            .width(1600)
            .height(600)
            .renderDot(text);
            
    }
}

/*
var pedidos=new Queue()
var uno= new Solicitud("Jose","Escudo",1)
var dos= new Solicitud("Jose","Camilo",1)
var tres= new Solicitud("Jose","Cretino",1)
var cuatro= new Solicitud("Jose","Patino",1)
var cinco= new Solicitud("Jose","Chuky",1)
pedidos.enqueue(uno)
pedidos.enqueue(dos)
pedidos.enqueue(tres)
pedidos.enqueue(cuatro)
pedidos.enqueue(cinco)
pedidos.graph()*/