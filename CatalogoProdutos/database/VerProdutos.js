const Sequelize = require ("sequelize");
const connection = require("./database");

const Verproduto = connection.define('verprodutos',{
    corpo:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    produtosId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Verproduto.sync({force: false});

module.exports = Verproduto;