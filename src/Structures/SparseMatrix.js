import Node from "../Objects/Node.js";
import Book from "../Objects/Book.js";
import SimpleList from "./SimpleList.js";
import DoubleList from "./DoubleList.js";

class SparseMatrix{
    constructor(){
        this.rows=new SimpleList()
        this.columns=new SimpleList()
        
    }

    insertNode(column,row,book){
        var nom=""+column+"_"+row

        this.insertColumn(arguments[0],arguments[1],nom,arguments[2])
        this.insertRow(arguments[1],arguments[0],nom,arguments[2])
    }

    insertColumn(column,row,name,book){
        if(column>this.columns.size-1){
            this.resize(column,this.columns)
        }
        var aux=this.columns.first

        //recorro la lista simple para encontrar la columna
        while(aux.id<column){
            aux=aux.right
        }

        var nuevo=new Node(arguments[3])
        var temp=aux
        nuevo.id=row
        nuevo.name=name
        //nuevo.value=book;
        temp.addNewTB(nuevo)


    

    }

    insertRow(row,column,name,book){
        if(row>this.rows.size-1){
            this.resize(row,this.rows)
        }
        var aux=this.rows.first
        //recorro la lista simple para encontrar la fila
        while(aux.id<row){
            aux=aux.down
        }

        var temp=aux;
        var nuevo= new Node(arguments[3]);
        nuevo.id=column;
        nuevo.name=name;
        //nuevo.value=book;
        temp.addNewAsOrdered(nuevo); 

    }

    resize(n,data){
        if(data.size<n+1){
            var val=data.size
            while(val<=n){
                var nodos=new DoubleList()
                nodos.id=val

                if(data==this.columns){
                    data.insertRight(nodos)
                }else if(data==this.rows){
                    data.insertDown(nodos)
                }

                val++

            }
        }
    }

    ranks(name){
        
        var m=this.matrix
        var aux=this.columns.first
        
        var ranks=""
        //saco la cabecera
        ranks+="    {rank = same; \""+name+"\";"
        while(aux!=null){
            ranks+="\"nodeR"+aux.id+"\";"
            aux=aux.right 
        }
        ranks+="}\n"
        
        //saco las filas
        var aux2=this.rows.first
        var n=0
        while(aux2!=null){
            
      
            var f=aux2;
            ranks+="    {rank = same; \"nodeD"+aux2.id+"\";"
            var aux3=f.first
     
            while(aux3!=null){
                ranks+="\"node"+aux3.name+"\";"
                aux3=aux3.next
            }
            
            
              
            ranks+="}\n"
            aux2=aux2.down
            
        }
        
           
        return ranks
        
    
    }

    graph(){
        var text="digraph MatrizDispersa{\n";
        var name="thriller"
        text+="nodesep=0.6;\n"
        text+="ranksep=0.6;\n"
        
        //text+="    size=\"2.5,2.5\";\n";
        text+=this.ranks(name);
        //relaciono el nodo raiz con los nodos 0,0
        var rela="";
        rela+="    "+name+" -> "+"nodeR"+this.columns.first.id+";\n";
        rela+="    "+name+" -> "+"nodeD"+this.rows.first.id+";\n";
        
        text+=this.columns.graphR("columnas");
        text+=this.rows.graphD("Filas");
        
      
        //grafico las listas dobles de las filas
        
        var aux=this.rows.first;
        var n=0;
        while(aux!=null){
            //var n1="Fila"+n;
           
            var f=aux;
            
            if(f.size>0){
                rela+="    nodeD"+aux.id+" -> node"+f.first.name+"[dir=both];\n";
                var aux2=aux.first
                
                while(aux2.next!=null){
                    var g=aux2.value.column+1;
                    rela+="     node"+aux2.name+" -> node"+aux2.next.name+"[dir=both];\n";
                    rela+="     node"+aux2.name+"[label=\""+aux2.value.nameBook+"\", shape=box,  style=filled, fillcolor=\"white\" , weight="+g+", group="+g+"];\n"
                    aux2=aux2.next;
                
                }
                var g=aux2.value.column+1;
                rela+="     node"+aux2.name+"[label=\""+aux2.value.nameBook+"\", shape=box,  style=filled, fillcolor=\"white\" , weight="+g+" , group="+g+"];\n"
                
                //text+=f.graphN();
            }
            
           // n++;
            aux=aux.down;
            
        }

        //grafico las listas dobles de las columnas
        var aux2=this.columns.first;
        var m=0;
        while(aux2!=null){
            var m1="columna"+m;
            
            var f=aux2;
            var g=aux2.id+1;
            if(f.size>0){
                rela+="    nodeR"+aux2.id+" -> node"+f.first.name+"[dir=both];\n";
                text+=f.graphTB();
            }
            
            m++;
            aux2=aux2.right;
            
        }
    
        text+=rela;
        text+="    "+name+"[shape=box,group=0];\n";
        text+="}";


        console.log(text)
        d3.select('#Dispersa').graphviz()
            .width(1600)
            .height(600)
            .renderDot(text);


    }


    createLibreraThriller(){
        var aux=this.rows.first
        var i=0
        var j=0
        const bloqueThriller=document.getElementById("thriller");
        while(aux!=null){
  
            var auxF=aux.first
            j=0
            //console.log("fila" + i )
            var fila=document.createElement("div");
            fila.id="F"+i;
            //fila.textContent="Fila"+i
            fila.classList="librera-view";
            bloqueThriller.insertAdjacentElement("beforeend",fila);
                
            while(auxF!=null){
                var book=auxF.getValue();
                var div=document.createElement("div");
                div.id="F"+i+"C"+j
                div.classList="librera-book";
                
                if(book!=null){
                    div.textContent=auxF.value.nameBook;
                }else{
                    div.textContent=" ";
                }
                //console.log(" Columna"+j )
                fila.insertAdjacentElement("beforeend",div);
                auxF=auxF.next
                j++
            }
            document.createElement("br");
            i++
            aux=aux.down
        }
    }








}

export default SparseMatrix;

//constructor(_isbn,_nombreA,_nombreB,_cantidad,_fila,_columna,_paginas,_categoria)
/*
var terror=new SparseMatrix()
var uno=new Book(94615465,"Strickland Shelton","Zounds ",2,5,10,187,"fantasia")
var dos=new Book(54212515,"Collins Cohen","Isosure",7,9,1,214,"Thriller")
var tres=new Book(5641564,"Williamson Lynn","Crustatia",5,6,2,191,"Fantasia")
var unoo=new Book(94615465,"Strickland Shelton","Zombie",2,6,10,187,"fantasia")
var doso=new Book(54212515,"Collins Cohen","IRead",7,9,2,214,"Thriller")
var treso=new Book(5641564,"Williamson Lynn","Codier",5,6,3,191,"Fantasia")
terror.insertNode(uno.column,uno.row,uno)
terror.insertNode(dos.column,dos.row,dos)
terror.insertNode(tres.column,tres.row,tres)
terror.insertNode(unoo.column,unoo.row,unoo)
terror.insertNode(doso.column,doso.row,doso)
terror.insertNode(treso.column,treso.row,treso)
terror.graph()
*/