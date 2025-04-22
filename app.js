const express = require("express");

const path = require("path");

const app = express();

const db = require("./models");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Configuração do EJS como view engine

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

// Rota principal

const indexRouter = require("./routes/index");

app.use("/", indexRouter);

// Rotas para categorias e produtos

const categoriaRouter = require("./routes/categorias");
const professorRouter = require("./routes/professor");
const alunoRouter = require("./routes/aluno");
const duplaRouter = require("./routes/dupla");


//const produtoRouter = require("./routes/produtos");

app.use("/categorias", categoriaRouter);
app.use("/professores", professorRouter);
app.use('/dupla', duplaRouter)
app.use("/alunos", alunoRouter);


// Iniciar o servidor e sincronizar com o banco de dados

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor em execução na porta ${PORT}`);
  });
});

module.exports = app;
