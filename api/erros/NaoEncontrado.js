class NaoEncontrado extends Error {
    constructor () {
        super('Video não encontrado')
        this.name = 'NaoEncontrado'
        this.idErro = 0
    }
}

module.exports = NaoEncontrado