const express = require('express');
const router = express.Router();
const { Livro } = require('../models');

router.get("/", async (req, res) => {
    const livros = await Livro.findAll();
    res.render(
        "base", {
            title: "Listar Categorias",
            view: "livros/show",
            atribuicoes,
    });
});

router.get("/add", async (req, res) => {
    res.render(
        "base", {
            title: "Adicionar Livro",
            view: "livros/add",
    });
});

router.post("/add", async(req, res) =>{
    await Livro.create({
        titulo: req.body.titulo,
        tema: req.body.tema,

    });
    res.redirect("/livros")
});

router.get("/edit/:id", async (req, res) => {
    const livro = await Livro.findByPk(req.params.id);
    res.render(
        "base", {
            title: "Editar Livro",
            view: "livros/edit",
            livro,
    });
});

router.post("/edit/:id", async(req, res) =>{
    await Livro.update(
        {
            titulo: req.body.titulo,
            tema: req.body.tema,
        },
        {where:{id: req.params.id}}
    );
    res.redirect("/atribuicoes")
});

router.post("/delete/:id", async(req, res) =>{
    await Atribuicao.destroy({where:{id: req.params.id}});
    res.redirect("/atribuicoes")
});

module.exports = router;