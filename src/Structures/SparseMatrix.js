class SparseMatrix{
    constructor(){
        this.rows=new SimpleList()
        this.columns=new SimpleList()
        
    }

    insertNode(column,row,book){
        var nom=""+column+"_"+row

        this.insertColumn(column,row,nom,book)
        this.insertRow(row,column,nom,book)


    }

    insertColumn(column,row,name,book){
        if(column>this.columns.size-1){
            this.resize(column,this.columns)
        }
        var aux=this.columns.first

        //recorro la lista simple para encontrar la columna
        while(aux.data.id<column){
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
        while(aux.data.id<row){
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

    graph(){
        var text="digraph MatrizDispersa{\n";
        var name="MatrizDispersa"
        //text+="    size=\"2.5,2.5\";\n";
        text+=ranks(name);
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
            var n1="Fila"+n;
           
            var f=aux;
            
            if(f.size>0){
                rela+="    nodeD"+aux.id+" -> node"+f.first.name+" -> nodeD"+aux.id+";\n";
                text+=f.graphN();
            }
            
            n++;
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
                rela+="    nodeR"+aux2.id+" -> node"+f.first.name+" -> nodeR"+aux2.id+";\n";
                text+=f.graphTB();
            }
            
            m++;
            aux2=aux2.right;
            
        }
    
        text+=rela;
        text+="    "+name+"[shape=Msquare,group=0];\n";
        text+="}";


        console.log(text)
        d3.select('#lienzo').graphviz()
            .width(1600)
            .height(600)
            .renderDot(text);


    }
}