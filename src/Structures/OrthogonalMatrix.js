import Node from "../Objects/Node.js";
import Book from "../Objects/Book.js";
import SimpleList from "./SimpleList.js";
import DoubleList from "./DoubleList.js";

class OrthogonalMatrix{
    constructor(){
        this.rows=new SimpleList()
        this.columns=new SimpleList()
        this.initialize()
        
    }

    initialize(){
        
        var f=0
        var c=0
        while(f<26){

            while(c<26){
                this.insertNode(c,f,null)
                c++
            }
            c=0
            f++
        }


    }

  

    insertBook(column,row,book){
        //cabecera de las filas
        var aux=this.rows.first
        //recorro la lista simple para encontrar la fila
        while(aux.id<row){
            aux=aux.down
        }

        //cabecera de la lista doble de la fila deseada
        var temp=aux.first;

        //recorro la lista doble para encontrar el nodo en donde insertaré el libro
        while(temp.id<column){
            temp=temp.next
        }
        //le ingreso el  libro a la posición
        temp.value=book
        

    }

    insertNode(column,row,book){
        var nom=""+column+"_"+row

        this.insertColumn(column,row,nom,book)
        this.insertRow(row,column,nom,book)
        console.log("Insertado")


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

        var nuevo=new Node(book)
        var temp=aux
        nuevo.id=row
        nuevo.name=name
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
        var nuevo= new Node(book);
        nuevo.id=column;
        nuevo.name=name;
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
        var text="digraph MatrizOrtogonal{\n";
        var name="fantasy"
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
                text+=f.graphN();
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
        d3.select('#lienzo').graphviz()
            .width(1600)
            .height(600)
            .renderDot(text);


    }
}

//constructor(_isbn,_nombreA,_nombreB,_cantidad,_fila,_columna,_paginas,_categoria){
var terror=new OrthogonalMatrix()

var uno=new Book(94615465,"Strickland Shelton","Zounds viendo\n como acomoda",2,5,10,187,"fantasia")
var dos=new Book(54212515,"Collins Cohen","Isosure",7,9,1,214,"Thriller")
var tres=new Book(5641564,"Williamson Lynn","Crustatia",5,6,2,191,"Fantasia")
var unoo=new Book(94615465,"Strickland Shelton","Zombie",2,6,10,187,"fantasia")
var doso=new Book(54212515,"Collins Cohen","IRead",7,9,2,214,"Thriller")
var treso=new Book(5641564,"Williamson Lynn","Codier",5,6,3,191,"Fantasia")
terror.insertBook(uno.column,uno.row,uno)
terror.insertBook(dos.column,dos.row,dos)
terror.insertBook(tres.column,tres.row,tres)
terror.insertBook(unoo.column,unoo.row,unoo)
terror.insertBook(doso.column,doso.row,doso)
terror.insertBook(treso.column,treso.row,treso)
terror.graph()
