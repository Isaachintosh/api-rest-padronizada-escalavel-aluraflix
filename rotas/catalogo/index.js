const roteador = require('express').Router()
const TabelaCatalogo = require('./TabelaCatalogo')
const Catalogo = require('./Catalogo')

roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaCatalogo.listar()
    resposta.send(
        JSON.stringify(resultados)
    )
})

roteador.post('/', async (requisicao, resposta) => {
    const dadosRecebidos = await requisicao.body
    const catalogo = new Catalogo(dadosRecebidos)
    await catalogo.criar()
    resposta.send(
        JSON.stringify(catalogo)
    )
})

roteador.get('/:idNoCatalogo', async (requisicao, resposta) => {
    try {
        const id = requisicao.params.idNoCatalogo
        const catalogo = new Catalogo({ id: id })
        await catalogo.carregar()
        resposta.send(
            JSON.stringify(catalogo)
        )
    } catch (erro) {
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

module.exports = roteador