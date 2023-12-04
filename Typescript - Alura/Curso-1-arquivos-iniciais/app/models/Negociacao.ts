export  class Negociacao{
    #data;
    #quantidade;
    #valor;
    
    constructor(data, quantidade, valor){
        this.#data = data;
        this.#quantidade = quantidade;
        this.#valor = valor;
    }

    // getters e settres, dão acessoa a propridades privdas e protegias (mas deve usar em públicas também para melhor acesso). É como se fosse um método, mas da o acesso a propriedade.

    get data (){
        return this.#data;
    }

    get quantidade (){
        return this.#quantidade;
    }

    get valor (){
        return this.#valor;
    }

    get volume (){
        return this.#valor * this.#quantidade;
    }
}