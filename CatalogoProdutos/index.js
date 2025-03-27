const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Produto = require("./database/Produtos");

// Conexão com o Banco de Dados
connection
    .authenticate()
    .then(() => {
        console.log("Conexão com BD feita com sucesso!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

// Configuração do EJS como View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Configuração do Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota principal - Listar produtos
app.get("/", async (req, res) => {
    try {
        const produtos = await Produto.findAll({
            raw: true, 
            order: [["id", "DESC"]]
        });

        res.render("index", { addproduto: produtos }); // Certifique-se de que 'addproduto' está sendo passado
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        res.status(500).send("Erro ao carregar produtos");
    }
});

// Rota para exibir formulário de adicionar produto
app.get("/addproduto", (req, res) => {
    res.render("addproduto");
});

// Rota para salvar um novo produto
app.post("/salvarproduto", async (req, res) => {
    try {
        const { nome, descricao, preco, url } = req.body;

        if (!nome || !descricao || !preco || !url) {
            return res.status(400).send("Todos os campos são obrigatórios!");
        }

        await Produto.create({
            nome: nome,
            descricao: descricao,
            preco: preco,
            url: url
        });

        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao salvar produto");
    }
});

// Rota para visualizar um produto específico
app.get("/verproduto/:id", async (req, res) => {
    try {
        const id = req.params.id;
        
        if (!id) {
            return res.redirect("/");
        }

        const produto = await Produto.findOne({
            where: { id: id }
        });

        if (!produto) {
            return res.redirect("/");
        }

        res.render("verproduto", { produto: produto });
    } catch (error) {
        console.error(error);
        res.redirect("/");
    }
});

// Inicialização do servidor
app.listen(4000, () => {
    console.log("Servidor rodando na porta 4000!");
});
