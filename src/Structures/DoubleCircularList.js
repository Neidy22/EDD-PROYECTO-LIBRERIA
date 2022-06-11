class Node{

    constructor(data){
        this.value=data
        this.next=null
        this.previous=null
        this.id=0
        
    }


}

class DoubleCircularList{
    constructor(){
        this.first=null
        this.last=null
        this.size=0
    }

    //método para insertar datos
    /*addNew(data){
        var aux=new Node(data)
        if(this.first==null){
            this.first=aux
            this.last=aux
            this.first.next=this.last
            
        }else{
            var aux2=this.first
            var n=0
            while(aux2.next!=this.first){
                aux2=aux2.next
                n++
            }
            aux2.next=aux
            this.last=aux
            console.log("el valor antes de last: "+aux2.value)
           


        }

        this.last.next=this.first
        this.size++
        aux.id=this.size

    }
    */


    addNew(data){
        var aux=new Node(data)
        if(this.first==null){
            this.first=aux
            this.last=aux
            this.first.next=this.last
            
        }else{
            var aux2=this.first
            var n=0
            while(aux2.next!=this.first){
                aux2=aux2.next
                n++
            }
            aux.previous=aux2
            aux2.next=aux
            this.last=aux
           

        }
        this.first.previous=this.last
        this.last.next=this.first
        this.size++
        aux.id=this.size

    }

    
    


    graficarIF(name){
        var doteCode="subgraph cluster_"+name+" {\n";
        doteCode+="rankdir=LR;\n";
        doteCode+="style=filled;\n";
        doteCode+="node[shape=box, fontsize=14, style=filled, color=\"#fbe3e3\"];\n";

        var rela=""
        var labels=""
        var aux=this.first
        var n=0
       
        do{
            rela+="     a"+aux.id+" -> a"+aux.next.id+"[dir=both];\n"
           // rela+="     a"+aux.id+" -> a"+aux.previous.id+";\n"
            labels+="     a"+aux.id+"[label=\""+aux.value+"\"];\n"

            aux=aux.next
            n++
     

        }while(aux!=this.first)
       
        doteCode+=rela
        doteCode+=labels
        doteCode+="     label=\"Recorrido de Inicio a Fin\";\n"
        
        doteCode+="     color=\"#fdcae1\";\n"
        doteCode+="    }\n"

        return doteCode
    
    }

    graficarFI(name){
        var doteCode="subgraph cluster_"+name+" {\n";
        doteCode+="rankdir=LR;\n";
        doteCode+="style=filled;\n";
        doteCode+="node[shape=box, fontsize=14, style=filled, color=\"#fbe3e3\"];\n";

        var rela=""
        var labels=""
        var aux=this.last
        var n=0
       
        do{
            rela+="     b"+aux.id+" -> b"+aux.previous.id+"[dir=both];\n"
            //rela+="     b"+aux.id+" -> b"+aux.next.id+";\n"
            labels+="     b"+aux.id+"[label=\""+aux.value+"\"];\n"

            aux=aux.previous
            n++
     

        }while(aux!=this.last)
        

        doteCode+=rela
        doteCode+=labels
        doteCode+="     label=\"Recorrido de Fin a Inicio\";\n"
        
        doteCode+="     color=\"#ffe5f0\";\n"
        doteCode+="    }\n"
        return doteCode

    }

    graficarDoble(name){
        var doteCode="subgraph cluster_"+name+" {\n";
        doteCode+="rankdir=LR;\n";
        doteCode+="style=filled;\n";
        doteCode+="node[shape=box, fontsize=14, style=filled, color=\"#fbe3e3\"];\n";

        var rela=""
        var labels=""
        var aux=this.first
        var n=1
       
        do{
            if(n<9){
                rela+="     c"+aux.id+" -> c"+aux.next.id+"[dir=both];\n"
                labels+="     c"+aux.id+"[label=\""+aux.value+"\"];\n"

                aux=aux.next

            }else if(n==9){
                rela+="     c"+aux.id+" -> d"+aux.id+"[dir=both];\n"
      
                labels+="     c"+aux.id+"[label=\""+aux.value+"\"];\n"
                labels+="     d"+aux.id+"[label=\""+aux.value+"\"];\n"
                //aux=aux.previous

               
            }else if(n<18){
                rela+="     d"+aux.id+" -> d"+aux.previous.id+"[dir=both];\n"
                labels+="     d"+aux.id+"[label=\""+aux.value+"\"];\n"
                aux=aux.previous
            }else{
                rela+="     d"+aux.id+" -> c"+aux.id+"[dir=both];\n"
                labels+="     d"+aux.id+"[label=\""+aux.value+"\"];\n"
            }
            n++
        
        }while(n<19)
        

        doteCode+=rela
        doteCode+=labels
        doteCode+="     label=\"Recorrido Doble\";\n"
        
       
        doteCode+="     color=\"#e3b1c8\";\n"

        doteCode+="    }\n"
        return doteCode

    }

    graficar(){
        var doteCode="digraph ListaDobleCircular {\n";
        doteCode+="rankdir=LR;\n";
        doteCode+="label=\"Tarea 1\nNeidy Aracely Flores Molina\n201801671\";\n"
        doteCode+="     fontname=\"Forte\";\n"
        doteCode+="     fontsize=30;\n"
        doteCode+="node[shape=box, fontsize=14];\n";


        doteCode+=this.graficarFI("finInicio")
        doteCode+=this.graficarIF("inicioFin")
        doteCode+=this.graficarDoble("DobleRecorrido")
        

        doteCode+="    }\n"
        console.log(doteCode)
        d3.select('#lienzo').graphviz()
            .width(1600)
            .height(600)
            .renderDot(doteCode);

    }



}

var lista=new DoubleCircularList()
var a="2"
var b="0"
var c="1"
var d="8"
var e="0"
var f="1"
var g="6"
var h="7"
var i="1"
lista.addNew(a)
lista.addNew(b)
lista.addNew(c)
lista.addNew(d)
lista.addNew(e)
lista.addNew(f)
lista.addNew(g)
lista.addNew(h)
lista.addNew(i)
lista.graficar()
