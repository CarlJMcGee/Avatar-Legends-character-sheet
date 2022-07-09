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
  const playerChar = await PlayerChar.findOne({ user: session.user.id });

  res.render("character-stats", {
    loggedIn: session.loggedIn,
    playbook: playerChar.playbook,
  });
});

router.get("/login", async (req, res) => {
  res.render("login-page");
});

module.exports = router;
