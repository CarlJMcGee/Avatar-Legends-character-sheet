const router = require("express").Router();
const PlayerChar = require("../../models/playerChar");

router.get("/user/data", async (req, res) => {
  // get player character object
  try {
    const playerChar = await PlayerChar.findOne({ user: body.user });
    if (!playerChar) {
      res.status(200).send(`No user found`);
    }
    res.json(playerChar);
  } catch (err) {
    if (err) {
      console.error(err);
    }
  }
});

router.post("/user/data");
