const Sequelize = require('sequelize')
const instancia = require('../../banco-de-dados')

const colunas = {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.ENUM('Lógica de Programação', 'Front-End', 'Back-End', 'Full-Stack', 'Data-Science', 'DevOps', 'IoT', 'Dev em T', 'UX & Design', 'Mobile', 'Inovação e Gestão'),
        allowNull: false
    }
}

const opcoes = {
    freeseTableName: true,
    tableName: 'catalogo',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}

module.exports = instancia.define('catalogo', colunas, opcoes)