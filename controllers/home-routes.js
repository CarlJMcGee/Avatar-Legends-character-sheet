const session = require("express-session");
const PlayerChar = require("../models/playerChar");

const router = require("express").Router();

router.get("/", async ({ session }, res) => {
  const playerChar = await PlayerChar.findById("62c87ff066517a0f222a7b8b");

  console.log(session);

  res.render("character-stats", {
    loggedIn: session.user.loggedIn,
    playbook: playerChar.playbook,
  });
});

router.get("/login", async (req, res) => {
  const playerChar = await PlayerChar.findById("62c87c610238d97b36aa3b47");

  console.log(req.session);

  res.render("login-page");
});

module.exports = router;
