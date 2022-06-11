class Node{

    constructor(data){
        this.data=data
        this.next=null
        this.previous=null
        this.top=null
        this.down=null
        this.right=null
        this.left=null
        this.id=0
        
    }


}

class DoubleList{
    
    constructor(){
        this.first=null
        this.size=0
    }

    addNew(data){
        var nuevo= new Node(data)
        if(this.first==null){
            this.first=nuevo
            
        }else if (nuevo.data.cantidad>this.first.data.cantidad){
            //si la cantidad del nuevo nodo es mayor a la cantidad de la cabecera de la lista, inserto al inicio
            this.first.previous=nuevo
            nuevo.next=this.first
            this.first=nuevo
        }else{
            var aux=this.first
            var prev=this.first
            while(nuevo.data.cantidad<aux.data.cantidad && aux.next!=null){
                //recorro la lista doble siempre que la cantidad del nuevo sea menor que la cantidad del nodo actual y no 
                //sea el final de la lista
                prev=aux
                aux=aux.next
            }

            if(nuevo.data.cantidad<aux.data.cantidad){
                //si la cantidad  del nuevo es menor que la cantidad del actual, lo inserto al final
                aux.next=nuevo
                nuevo.previous=aux
            }else if(nuevo.data.cantidad>aux.data.cantidad){
                //si la cantidad del nuevo es mayor que el actual, ingreso el nuevo antes que el actual
                nuevo.next=aux
                nuevo.previous=aux.previous

                aux.previous.next=nuevo
                aux.previous=nuevo
            }


        }
        this.size++
    }

    graph(){
        var doteCode="digraph ListaDoble {\n";
        doteCode+="rankdir=LR;\n";
        doteCode+="label=\"Lista Doble\";\n"
        doteCode+="     fontname=\"Forte\";\n"
        doteCode+="     fontsize=30;\n"
        doteCode+="node[shape=box, fontsize=14];\n";
        
        var relas=""
        var labels=""
        var aux=this.first
        while(aux.next!=null){
            relas+="    node"+aux.data.cantidad+" -> node"+aux.next.data.cantidad+" -> node"+aux.data.cantidad+";\n"
            labels+="    node"+aux.data.cantidad+" [label=\""+aux.data.cantidad+"\"];\n"
            aux=aux.next
        }
        labels+="    node"+aux.data.cantidad+" [label=\""+aux.data.cantidad+"\"];\n"
        
        doteCode+=relas
        doteCode+=labels

        doteCode+="    }\n"
        console.log(doteCode)
        d3.select('#lienzo').graphviz()
            .width(1600)
            .height(600)
            .renderDot(doteCode);



    }



}

class User {
    constructor(_dpi,_nombreCompleto,_nombreUsuario,_correo,_rol,_contrasenia,_telefono){
        this.dpi=_dpi
        this.name=_nombreCompleto
        this.userName=_nombreUsuario
        this.email=_correo
        this.rol=_rol
        this.password=_contrasenia
        this.telephone=_telefono
        this.cantidad=0
    }

}


var usuarios = new DoubleList()
//  constructor(_dpi,_nombreCompleto,_nombreUsuario,_correo,_rol,_contrasenia,_telefono){
const us1= new User("123456846451","neidy flores","nf","neidy@gmail.com","cliente","123","38187749")
us1.cantidad=5
console.log(us1.name)

var us2= new User(123456846451,"moyflores","nf","neidy@gmail.com","cliente","123","38187749")
us2.cantidad=2
var us3 = new User(123456846451,"Brenda flores","nf","neidy@gmail.com","cliente","123","38187749")
us3.cantidad=4
var us4 = new User(123456846451,"Walter flores","nf","neidy@gmail.com","cliente","123","38187749")
us4.cantida = 8
var us5 = new User(123456846451,"Alexflores","nf","neidy@gmail.com","cliente","123","38187749")
us5.cantidad=10

usuarios.addNew(us1)
usuarios.addNew(us2)
usuarios.addNew(us3)
usuarios.addNew(us4)
usuarios.addNew(us5)
usuarios.graph()