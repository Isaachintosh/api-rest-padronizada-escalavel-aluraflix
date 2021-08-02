const Modelo = require('./ModeloTabelaCatalogo')

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
            throw new Error('Video não encontrado')
        }

        return videoEncontrado
    }
}