const TabelaCatalogo = require('./TabelaCatalogo')
const CampoInvalido = require('../../erros/CampoInvalido')
const DadosNaoFornecidos = require('../../erros/DadosNaoFornecidos')

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
        this.validar()
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

    async atualizar () {
        const videoEncontrado = await TabelaCatalogo.pegarPorId(this.id)
        const campos = ['titulo', 'descricao', 'url', 'categoria']
        const dadosParaAtualizar = {}

        campos.forEach((campo) => {
            const valor = this[campo]
                        
            if(typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            }
        })

        if(Object.keys(dadosParaAtualizar).length === 0) {
            throw new DadosNaoFornecidos()
        }

        await TabelaCatalogo.atualizar(this.id, dadosParaAtualizar)
    }

    remover () {
        return TabelaCatalogo.remover(this.id)
    }

    validar () {
        const campos = ['titulo', 'descricao', 'url', 'categoria']

        campos.forEach(campo => {
            const valor = this[campo]
            
            if (typeof valor !== 'string' || valor.length === 0){
                throw new CampoInvalido(campo)
            }
        })
    }
}

module.exports = Catalogo