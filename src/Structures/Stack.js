import Node from "../Objects/Node.js"
import Book from "../Objects/Book.js"
class Stack{
    constructor(){
        this.peak=null
        this.size=0
    }

    push(data){
        var nuevo=new Node(data)
        if(this.peak==null){
            this.peak=nuevo
        }else{
            var aux=this.peak
            nuevo.down=aux
            this.peak=nuevo
        }

        this.size++

    }
    peek(){
        return this.peak.value
    }

    pop(){
        var aux=this.peak.down
        this.peak=aux
    }

    

    graph(){
        var text="digraph pila{\n"
        text+="rankdir=RL;\n"
        text+="ranksep=0;\n"
        text+="nodesep=0;\n"
        text+="node [shape=Mrecord];\n"
        var aux=this.peak

        if(this.peak==null){
            text+="    struct1 [label=\"<f0>Vacía\"];\n";
        }else{
            var n=0
            text+="    struct1 [label=\"<f"+n+">"+aux.value.nameBook+""
            aux=aux.down
            while(aux!=null){
                n++
               
                text+="|<f"+n+">"+aux.value.nameBook+""
                aux=aux.down
                
            }
            text+="\"];\n"
    
            

        }
        text+="}\n"
       

        //console.log(text)

        console.log(text)
        d3.select('#lienzo').graphviz()
            .width(1600)
            .height(600)
            .renderDot(text);

    }


    graphP(nombre,cl,color){
        var text="        subgraph cluster_"+nombre+"{\n"
        text+="            rankdir=RL;\n"
        text+="            ranksep=0;\n"
        text+="            nodesep=0;\n"
        text+="            node [shape=Mrecord];\n"
        text+="            style=filled;\n"
        var aux=this.peak

        if(this.peak==null){
            text+="        struct"+cl+" [label=\"<f0>Vacía\"];\n";
        }else{
            var n=0
            text+="        struct"+cl+" [label=\"<f"+n+">"+aux.value.nameBook+""
            aux=aux.down
            while(aux!=null){
                n++
               
                text+="|<f"+n+">"+aux.value.nameBook+""
                aux=aux.down
                
            }
            text+="\"];\n"
    
            

        }
        text+="             label=\""+nombre+"\";\n"
        text+="        color=\""+color+"\";\n"
        text+="        }\n"
        return text
    }

    graphT2(pila2){
        
        var doteCode="digraph Pila {\n";
        doteCode+="    rankdir=LR;\n";
       
        doteCode+="    fontname=\"Forte\";\n"
        doteCode+="    fontsize=30;\n"
        doteCode+="    node[shape=plaintext, fontsize=14,];\n";
        var cont=1
        var n=0
        var m=1
 
        var relaS;
        



        while(cont<11){
            if((cont+1)<11){
                relaS+="    node"+cont+" -> node"+(cont+1)+"[color=white, dir=none];\n"
            }
            
            
            doteCode+="    subgraph cluster_Paso_"+cont+"{\n"
            doteCode+="        node"+cont+"[label=\"Paso "+cont+"\"];\n"
            doteCode+=this.graphP("Pila1_"+cont,m,"#FEC8D8")
            doteCode+=pila2.graphP("Pila2_"+cont,n,"#f7dfd8")
            doteCode+="        color=\"#e0bbe4\";\n"
            
            doteCode+="    }\n"
            
            if(cont<10){
                pila2.push(this.peek())
                this.pop()
            }
            
            
            cont++
            n+=2
            m+=2
      
        }
      
        
        doteCode+="   label=\"Tarea 2\nNeidy Aracely Flores Molina\n201801671\";\n"
        doteCode+="   undefined[label=\"\"];"
        doteCode+=relaS
        

        doteCode+="    }\n"
        console.log(doteCode)
        d3.select('#lienzo').graphviz()
            .width(1600)
            .height(600)
            .renderDot(doteCode);

    }

}

/*
var pila=new stack()
var pil=new stack()
var un=new Book(94615465,"Strickland Shelton","1",2,5,10,187,"fantasia")
var uno=new Book(94615465,"Strickland Shelton","7",2,5,10,187,"fantasia")
var dos=new Book(54212515,"Collins Cohen","6",7,9,1,214,"Thriller")
var tres=new Book(5641564,"Williamson Lynn","1",5,6,2,191,"Fantasia")
var unoo=new Book(94615465,"Strickland Shelton","0",2,6,10,187,"fantasia")
var doso=new Book(54212515,"Collins Cohen","8",7,9,2,214,"Thriller")
var treso=new Book(5641564,"Williamson Lynn","1",5,6,3,191,"Fantasia")
var dosoo=new Book(54212515,"Collins Cohen","0",7,9,2,214,"Thriller")
var tresoo=new Book(5641564,"Williamson Lynn","2",5,6,3,191,"Fantasia")
pila.push(un)
pila.push(uno)
pila.push(dos)
pila.push(tres)
pila.push(unoo)
pila.push(doso)
pila.push(treso)
pila.push(dosoo)
pila.push(tresoo)





pil.push(pila.peek())
pila.pop()

pil.push(pila.peek())
pila.pop()

pil.push(pila.peek())
pila.pop()

pil.push(pila.peek())
pila.pop()

pil.push(pila.peek())
pila.pop()

pil.push(pila.peek())
pila.pop()

pil.push(pila.peek())
pila.pop()

pil.push(pila.peek())
pila.pop()

pila.graphT2(pil)*/






