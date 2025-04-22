const express = require('express');
const router = express.Router();
const {Professor} = require('../models');

router.get("/", async (req, res) => {
    const professores = await Professor.findAll();
    res.render(
        "base", {
        title: "Listar Professores",
        view: "professores/show",
        professores,
        }
    );
});

router.get("/add", async (req, res) => {
  res.render(
    "base",
    {
      title: "Add Professores",
      view: "professores/add",
    }
  );
});

router.post("/add", async (req, res) => {
  await Professor.create({
    nome: req.body.nome,
    cpf: req.body.cpf
  });
  res.redirect("/professores");
});

router.get("/edit/:id", async (req, res) => {
  const professor = await Professor.findByPk(req.params.id); 
  res.render(
    "base",
    {
      title: "edit Professores",
      view: "professores/edit",
      professor,
    }
  );
});

router.post("/edit/:id", async (req, res) => {
  await Professor.update(
    {
      nome: req.body.nome,
      cpf: req.body.cpf
    },
    {
      where: { id: req.params.id }
    }
  );
  res.redirect("/professores");
});

router.post("/delete/:id", async(req, res) =>{
  await Professor.destroy({where:{id: req.params.id}});
  res.redirect("/professores")
});

module.exports = router;