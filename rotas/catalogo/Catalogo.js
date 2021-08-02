const TabelaCatalogo = require('./TabelaCatalogo')

class Catalogo {
    constructor ({ id, titulo, descricao, url, categoria, dataCriacao, dataAtualizacao, versao }) {
        this.id = id
        this.titulo = titulo
        this.descricao = descricao
        this.url = url
        this.categoria = categoria
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
        
    }

    async criar () {
        const resultado = await TabelaCatalogo.inserir({
            titulo: this.titulo,
            descricao: this.descricao,
            url: this.url,
            categoria: this.categoria
        })
        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async carregar () {
        const videoEncontrado = await TabelaCatalogo.pegarPorId(this.id)
        this.titulo = videoEncontrado.titulo
        this.descricao = videoEncontrado.descricao
        this.url = videoEncontrado.url
        this.categoria = videoEncontrado.categoria
        this.dataCriacao = videoEncontrado.dataCriacao
        this.dataAtualizacao = videoEncontrado.dataAtualizacao
        this.versao = videoEncontrado.versao
    }
}

module.exports = Catalogo