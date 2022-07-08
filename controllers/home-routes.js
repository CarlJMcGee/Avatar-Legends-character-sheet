const PlayerChar = require("../models/playerChar");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const playerChar = await PlayerChar.findById("62c87ff066517a0f222a7b8b");

  res.render("character-stats", {
    loggedIn: req.session.loggedIn,
    playbook: playerChar.playbook,
  });
});

router.get("/login", async (req, res) => {
  const playerChar = await PlayerChar.findById("62c87c610238d97b36aa3b47");

  res.render("login-page", {
    playbook: playerChar.playbook,
  });
});

module.exports = router;
