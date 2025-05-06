const express = require('express');
const router = express.Router();
const { Autor } = require('../models');

router.get("/", async (req, res) => {
    const autores = await Autor.findAll();
    res.render(
        "base", {
            title: "Listar autores",
            view: "autores/show",
            autores,
    });
});

router.get("/add", async (req, res) => {
    res.render(
        "base", {
            title: "Adicionar Autor",
            view: "autores/add",
    });
});

router.post("/add", async(req, res) =>{
    await Autor.create({nome: req.body.nome});
    res.redirect("/autores")
});

router.get("/edit/:id", async (req, res) => {
    const Autor = await Autor.findByPk(req.params.id);
    res.render(
        "base", {
            title: "Editar Autor",
            view: "autores/edit",
            Autor,
    });
});

router.post("/edit/:id", async(req, res) =>{
    await Autor.update(
        {nome: req.body.nome},
        {where:{id: req.params.id}}
    );
    res.redirect("/autores")
});

router.post("/delete/:id", async(req, res) =>{
    await Autor.destroy({where:{id: req.params.id}});
    res.redirect("/autores")
});

module.exports = router;