import Node from "..//Objects/Node.js";
import Autor from "../Objects/Autor.js";
class BinaryTree{
    constructor(){
        this.root=null;
        this.left_son=null;
        this.right_son=null;
        this.level=0
        this.levels=0
        this.nodos=0
    }

    insertN(data){
        var nuevo=new Node(data)
        nuevo.id=data.name.split(" ").join("")
        nuevo.name=data.name
        if(this.root==null){
            this.root=nuevo
            this.left_son=new BinaryTree();
            this.right_son=new BinaryTree();
            this.level=0
            this.levels++
            this.nodos++
            //console.log("insertado en la raíz")

        }else{
            this.insertH(nuevo,this,0)
        }

    }

    insertH(nuevo,actual,n){
        //si la raíz es nula ingreso el nuevo nodo como raiz
        
        
        if(actual.root==null){
            actual.root=nuevo
            actual.left_son=new BinaryTree()
            actual.right_son=new BinaryTree()
            actual.level=n
            this.nodos++
            //console.log("insertado")
        }
        //comparo si el valor de la llave del nuevo nodo es mayor  que la llave de la raíz 
        //recorro el sub-árbol derecho
        else if(this.comparacion(nuevo.name,actual.root.name)==2){
            n++
            if(n>this.levels){
                this.levels++
            }
            //console.log(" a la derecha el nombre de "+nuevo.name +" es mayor que "+actual.root.name)
            return this.insertH(nuevo,actual.right_son,n)

        }
        //comparo si el valor de la llave del nuevo nodo es igual  que la llave de la raíz 
        //no inserto el nodo porque está repetido
        else if(this.comparacion(nuevo.name,actual.root.name)==0){
            console.log("Repetido")
        }
        //comparo si el valor de la llave del nuevo nodo es menor que la llave de la raíz 
        //recorro el sub-árbol izquierdo
        else{
            n++
            if(n>this.levels){
                this.levels++
            }
            //console.log(" a la izquierda el nombre de "+nuevo.name +" es menor que "+actual.root.name)
            return this.insertH(nuevo,actual.left_son,n)
        }
        return 0

    }


    comparacion(a,b){
        var cadenas=[a,b]
        var resultado=cadenas.sort()
        //console.log("La comparación es"+resultado)
        if(resultado[0]==a){
            //el valor de a es menor que b
            return 1
        }else if(resultado[0]==b){
            //el valor de a es mayor que b
            return 2
        }else if(a==b){
            
            return 0
        }
        
        
    }

    preorderGraph(actual,nodes){
        if(actual.root!=null){
            
            nodes[1]+="    node"+actual.root.id+"[label=\""+actual.root.name+"\", style=filled, fillcolor=\"#c7f6d4\"];\n";
            
            if(actual.left_son.root!=null){
                nodes[0]+="    node"+actual.root.id+" -> node"+actual.left_son.root.id+";\n";
                
                
            
            }
            this.preorderGraph(actual.left_son,nodes);
            
            if(actual.right_son.root!=null){
                nodes[0]+="    node"+actual.root.id+" -> node"+actual.right_son.root.id+";\n";
                
            }
            this.preorderGraph(actual.right_son,nodes);
          
        }
    
    }


    search(nombre){
        const divA=document.getElementById("autorBio");
        this.searchPRE(this,nombre,divA);
    }

    searchPRE(actual,nombre,cont){
        if(actual.root!=null){
            if(nombre===actual.root.value.name){
                const aut=actual.root.value;
                console.log(actual.root.value.name)
                alert("Autor encontrado")
                
                const nom=document.createElement("h2");
                nom.textContent=aut.name;
                cont.insertAdjacentElement("beforeend",nom)
                const dpi=document.createElement("h3");
                dpi.textContent=aut.dpi;
                cont.insertAdjacentElement("beforeend",dpi)
                const email=document.createElement("h3");
                email.textContent=aut.email;
                cont.insertAdjacentElement("beforeend",email)
                const tel=document.createElement("h3");
                tel.textContent=aut.telephone;
                cont.insertAdjacentElement("beforeend",tel)
                const direc=document.createElement("h3");
                direc.textContent=aut.adress;
                cont.insertAdjacentElement("beforeend",direc)
                const bio=document.createElement("p");
                bio.textContent=aut.bio;
                cont.insertAdjacentElement("beforeend",bio)
                 
            }
            this.searchPRE(actual.left_son,nombre,cont);
            this.searchPRE(actual.right_son,nombre,cont);
        }
       
    }

    recorrer(){
        const container=document.getElementById("autors-container")
        this.recorrerPreorder(this,container)
    }

    recorrerPreorder(actual,cont){
        if(actual.root!=null){
            
            const div=document.createElement("div");
            div.classList="autor-view";
            div.textContent=actual.root.value.name;
            cont.insertAdjacentElement("beforeend",div);
            const logo=document.createElement("span");
            logo.classList="material-icons";
            logo.textContent="&#xea67;";
            this.recorrerPreorder(actual.left_son,cont)
            this.recorrerPreorder(actual.right_son,cont)
        }

    }

    graph(){
        var text="digraph Autores{\n";
        text+="    rankdir=TB;\n";
        
        
        let n = ["",""] 
       
        this.preorderGraph(this,n);
        text+=n[0];
        text+=n[1];
        
        text+="}";
        //console.log(text)
       
        d3.select('#arbol').graphviz()
            .width(1600)
            .height(600)
            .renderDot(text);

            
         
            
            
        
    }




    
}
export default BinaryTree;

//constructor(_dpi,_name,_email,_telephone,_adress,_bio)
/*
const autors=new BinaryTree()
var autor1=new Autor(123456789,"Alice Kellen","nombre@gmail.com",124578964,"Palin","Autor famoso")
var autor2=new Autor(123426789,"Ana Frank","nombre@gmail.com",124578964,"Palin","Autor famoso")
var autor3=new Autor(123446789,"John le Carré","nombre@gmail.com",124578964,"Palin","Autor famoso")
var autor4=new Autor(123466789,"Stephanie Meyer","nombre@gmail.com",124578964,"Palin","Autor famoso")
var autor5=new Autor(123486789,"Pauolo Coelho","nombre@gmail.com",124578964,"Palin","Autor famoso")
var autor6=new Autor(123496789,"Marta Cerda","nombre@gmail.com",124578964,"Palin","Autor famoso")

autors.insertN(autor1)
autors.insertN(autor2)
autors.insertN(autor3)
autors.insertN(autor4)
autors.insertN(autor5)
autors.insertN(autor6)


autors.graph()
*/