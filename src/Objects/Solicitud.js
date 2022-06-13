class Solicitud{
    constructor(_cliente,_nombreLibro,_cantidad){
        this.cliente=_cliente
        this.nombreBook=_nombreLibro
        this.cantidad=_cantidad
    }

    getString(){
        var text=this.cliente
        text+=this.nombreBook
        text+=this.cantidad
        return text
    }
}

export default Solicitud;