class Node{

    constructor(data){
        this.value=data
        this.next=null
        this.previous=null
        this.top=null
        this.down=null
        this.right=null
        this.left=null
        this.id=0
        this.name=null
        
    }

    setName(nombre){
        this.name=nombre
    }
    setId(ide){
        this.id=ide
    }
    getValue(){
        return this.value;s
    }
}

export default Node;