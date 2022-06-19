class Solicitud{
    constructor(_cliente,_nombreLibro,_cantidad){
        this.cliente=_cliente
        this.nombreBook=_nombreLibro
        this.cantidad=_cantidad
    }

    getString(){
        var text="Cliente: "+this.cliente+", "
        text+="Libro: "+this.nombreBook+", "
        text+="Cantidad: "+this.cantidad+". "
        return text
    }
}

export default Solicitud;