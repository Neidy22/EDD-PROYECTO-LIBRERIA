import Node from "../Objects/Node.js";
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
        nuevo.id=data
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