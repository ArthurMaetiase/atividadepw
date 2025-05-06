const express = require("express");
const router = express.Router();
const { Livro, Autor } = require("../models");

router.get("/", async (req, res) => {
  try {
    const livros = await Livro.findAll({
      include: [{ model: Autor, as: "Autor" }],
    });

    res.render("base", {
      title: "livros",
      view: "livros/show",
      livros,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar livros");
  }
});

router.get("/add", async (req, res) => {
  try {
    const autores = await Autor.findAll();
    res.render("base", {
      title: "Add Livro",
      view: "livros/add",
      autores,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar autores");
  }
});

router.post("/add", async (req, res) => {
  try {
    const { titulo, tema, autorId } = req.body;
    await Livro.create({
      titulo,
      tema,
      autorId,
    });
    res.redirect("/livros");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao adicionar livro");
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const livro = await Livro.findByPk(id, {
      include: [{ model: Autor, as: "Autor" }],
    });
    const autores = await Autor.findAll();
    if (livro) {
      res.render("base", {
        title: "Edit Livro",
        view: "livros/edit",
        livro,
        autores,
      });
    } else {
      res.status(404).send("Livro não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao recuperar livro");
  }
});

router.post("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, tema, autorId } = req.body;
    const livro = await Livro.findByPk(id);
    if (livro) {
      await livro.update({ titulo, tema, autorId });
      res.redirect("/livros");
    } else {
      res.status(404).send("Livro não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar o livro");
  }
});

router.post("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const livro = await Livro.findByPk(id);
    if (livro) {
      await livro.destroy();
      res.redirect("/livros");
    } else {
      res.status(404).send("Livro não encontrado");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao excluir livro");
  }
});

module.exports = router;