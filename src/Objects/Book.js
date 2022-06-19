import Stack from "../Structures/Stack.js"
class Book {
    constructor(_isbn,_nombreA,_nombreB,_cantidad,_fila,_columna,_paginas,_categoria){
        this.isbn=_isbn
        this.nameA=_nombreA
        this.nameBook=_nombreB
        this.quantity=_cantidad
        this.row=_fila
        this.column=_columna
        this.pages=_paginas
        this.category=_categoria
        this.pila=new Stack();
    }

}

export default Book;