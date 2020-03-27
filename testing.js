class Coluna {
    constructor(nome, tipo) {
        this.tipo = tipo
        this.nome = nome
        this.dados = []

    }

    geraColunas(nome, tipo) {

        return {
            tipo: tipo,
            nome: nome,
            dados: []
        }
    }

}



let minhaTabela = []
minhaTabela.push(new Coluna('Ameno', 'tipo'))
minhaTabela.push(new Coluna('Dorime', 'Select'))



console.log(minhaTabela[0]);
