const session = require("express-session");
const PlayerChar = require("../models/playerChar");

const router = require("express").Router();

// if not logged in, redirect to login page
router.use("//", ({ session }, res, next) => {
  if (!session.loggedIn) {
    res.redirect("/login");
    return;
  }
  next();
});

router.get("/", async ({ session }, res) => {
  const playerChar = await PlayerChar.findById("62c87ff066517a0f222a7b8b");

  res.render("character-stats", {
    loggedIn: session.loggedIn,
    playbook: playerChar.playbook,
  });
});

router.get("/login", async (req, res) => {
  const playerChar = await PlayerChar.findById("62c87c610238d97b36aa3b47");

  res.render("login-page");
});

module.exports = router;
