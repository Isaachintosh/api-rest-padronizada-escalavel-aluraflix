const Modelo = require('./ModeloTabelaCatalogo')
const NaoEncontrado = require('../../erros/NaoEncontrado')

module.exports = {
    listar () {
        return Modelo.findAll()
    },
    inserir (video) {
        return Modelo.create(video)
    },
    async pegarPorId (id) {
        const videoEncontrado = await Modelo.findOne({
            where: {
                id: id
            }
        })
        if(!videoEncontrado) {
            throw new NaoEncontrado('Video não encontrado')
        }

        return videoEncontrado
    },
    atualizar (id, dadosParaAtualizar) {
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: { id: id }
            }
        )
    },
    remover (id) {
        return Modelo.destroy({
            where: { id: id }
        })
    }
}