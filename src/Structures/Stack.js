import Node from "../Objects/Node.js"
import Book from "../Objects/Book.js"
class stack{
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
        return this.peak
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
       

        console.log(text)

        console.log(text)
        d3.select('#lienzo').graphviz()
            .width(1600)
            .height(600)
            .renderDot(text);

    }

}

var pila=new stack()
var uno=new Book(94615465,"Strickland Shelton","Zounds",2,5,10,187,"fantasia")
var dos=new Book(54212515,"Collins Cohen","Isosure",7,9,1,214,"Thriller")
var tres=new Book(5641564,"Williamson Lynn","Crustatia",5,6,2,191,"Fantasia")
var unoo=new Book(94615465,"Strickland Shelton","Zombie",2,6,10,187,"fantasia")
var doso=new Book(54212515,"Collins Cohen","IRead",7,9,2,214,"Thriller")
var treso=new Book(5641564,"Williamson Lynn","Codier",5,6,3,191,"Fantasia")
pila.push(uno)
pila.push(dos)
pila.push(tres)
pila.push(unoo)
pila.push(doso)
pila.push(treso)

pila.graph()
pila.pop()
pila.graph()
pila.pop()
pila.graph()
pila.pop()
pila.graph()
pila.pop()
pila.graph()
pila.pop()
pila.graph()
pila.pop()
pila.graph()




