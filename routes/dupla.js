const express = require('express');
const router = express.Router();

//Rota principal - index
router.get("/", (req, res) => {
    res.render("base",{
        title: "Dupla",
        view: "dupla",
    });
});


module.exports = router;