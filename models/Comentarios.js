const db = require('./db')

const Comentarios = db.sequelize.define('comentarios', {
    comentario: {
        type: db.Sequelize.STRING
    }
 
})

//Criar a tabela
    // Comentarios.sync({force: true})

module.exports = Comentarios