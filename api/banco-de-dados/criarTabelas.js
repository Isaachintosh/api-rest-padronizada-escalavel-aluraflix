const ModeloTabela = require('../rotas/catalogo/ModeloTabelaCatalogo')

ModeloTabela
    .sync()
    .then(() => console.log('Tabela criada com sucesso'))
    .catch(console.log)