const Sequelize = require ("sequelize");
const connection = require("./database");

const Produto = connection.define('produtos',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    preco:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    url:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Produto.sync({force: false}).then(() => {});

module.exports = Produto;