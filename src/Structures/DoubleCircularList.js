import Node from "../Objects/Node.js"
import SimpleList from "../Structures/SimpleList.js"

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

    }*/
    


    addNew(data){
        var aux=new Node(data)
        aux.down=new SimpleList()

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


    search(usuario,contra){
        var aux=this.first;
        do{
            if(aux.value.userName==usuario){
                console.log("Usuario valido")
                if(aux.value.password==contra){
                    console.log("Contraseña valida")
                    return aux;
                }else{
                    alert("Contraseña incorrecta")
                }
            }
            aux=aux.next
        }while(aux!=this.first)
        alert("No se encontró ningun usuario")
        return null;

    }

    searchU(usuario){
        var aux=this.first;
        do{
            if(aux.value.userName==usuario){
                console.log("Usuario valido")
                
                return aux;
                
            }
            aux=aux.next
        }while(aux!=this.first)
        alert("No se encontró ningun usuario")
        return null;

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

    graph(){
        var doteCode="digraph ListaDobleCircular {\n";
        doteCode+="rankdir=TB;\n";
        doteCode+="     fontname=\"Forte\";\n"
        doteCode+="     fontsize=30;\n"
        doteCode+="     nodesep=0.6;\n"
        doteCode+="node[shape=box, fontsize=14];\n";

        var aux=this.first
        var rela=""
        var label=""
        var rank=""
        var p=0
        if(this.first!=null){

            rank+="{rank = same;"
            do{
                rank+="\"node"+aux.value.dpi+"\";"
                rela+="   node"+aux.value.dpi+" -> node"+aux.next.value.dpi+"[dir=both];\n"
                label+="    node"+aux.value.dpi+"[label=\""+aux.value.name+"\" , weight="+p+", group="+p+"];\n"
                //verifico si tiene libros comprados
                if(aux.down.first!=null){
                    var name=aux.down.first.id+"P"+p;
                    rela+="   node"+aux.value.dpi+" -> nodeD"+name+";\n";
                    rela+=aux.down.graphDownBook(p);
                }

                aux=aux.next;
                p++;
    
            }while(aux!=this.first)
            rank+="}\n"

        }
        doteCode+=rank
        doteCode+=rela
        doteCode+=label
        doteCode+="}"

        console.log(doteCode)

        d3.select('#Circular').graphviz()
        .width(1600)
        .height(600)
        .renderDot(doteCode);
       
        
    }


}

export default DoubleCircularList;

/*
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
*/