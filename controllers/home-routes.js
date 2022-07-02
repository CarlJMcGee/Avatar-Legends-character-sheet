const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("character-stats");
});

module.exports = router;
