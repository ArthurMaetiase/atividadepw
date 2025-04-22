const express = require("express");
const router = express.Router();
const { Autor, Livro } = require("../models"); 

router.get("/", async (req, res) => {
  try {
    const autores = await Produto.findAll({
      include: [{ model: Livro, as: "Livro" }],
    }); 

    res.render("base", {
      title: "Autores",
      view: "autores/show",
      autores,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar autores");
  }
});

router.get("/add", async (req, res) => {
  try {
    const livros = await Livro.findAll();
    res.render("base", {
      title: "Add Autor",
      view: "autores/add",
      livros,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar livros");
  }
});

router.post("/add", async (req, res) => {
  try {
    const { nome, email } = req.body;
    await Autor.create({
      nome,
      email
    });
    res.redirect("/boletins");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao adicionar autor");
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const autor = await Autor.findByPk(id, {
      include: [{ model: Livro, as: "Livro" }],
    });
    const livros = await Livro.findAll();
    if (autor) {
      res.render("base", {
        title: "Edit Autor",
        view: "autores/edit",
        autor,
        email,
      });
    } else {
      res.status(404).send("Autor não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar autor");
  }
});

router.post("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;
    const autor = await Autor.findByPk(id);
    if (autor) {
      await autor.update({ nome, email });
      res.redirect("/autores");
    } else {
      res.status(404).send("Autor não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar o autor");
  }
});

router.post("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const autor = await Autor.findByPk(id);
    if (autor) {
      await autor.destroy();
      res.redirect("/autores");
    } else {
      res.status(404).send("Autor não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao excluir boletim");
  }
});

module.exports = router;