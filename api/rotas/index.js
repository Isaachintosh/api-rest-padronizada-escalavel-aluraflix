const roteador = require('express').Router()
const TabelaCatalogo = require('./catalogo/TabelaCatalogo')
const Catalogo = require('./catalogo/Catalogo')

roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaCatalogo.listar()
    resposta.status(200)
    resposta.send(
        JSON.stringify(resultados)
    )
})

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const dadosRecebidos = await requisicao.body
        const catalogo = new Catalogo(dadosRecebidos)
        await catalogo.criar()
        resposta.status(201)
        resposta.send(
            JSON.stringify(catalogo)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.get('/:idNoCatalogo', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idNoCatalogo
        const catalogo = new Catalogo({ id: id })
        await catalogo.carregar()
        resposta.status(200)
        resposta.send(
            JSON.stringify(catalogo)
        )
    } catch (erro) {
        proximo(erro)
    }
})

roteador.put('/idNoCatalogo', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idNoCatalogo
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const catalogo = new Catalogo(dados)
        await catalogo.atualizar()
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
    
})

roteador.delete('/idNoCatalogo', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idNoCatalogo
        const catalogo = new Catalogo({ id: id })
        await catalogo.carregar()
        await catalogo.remover()
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        proximo(erro)
    }
})

module.exports = roteador