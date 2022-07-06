const router = require("express").Router();
const PlayerChar = require("../../models/playerChar");
const User = require("../../models/user");
const { compare } = require("bcrypt");

// get user's data
router.get("/user/data", async (req, res) => {
  // get player character object
  try {
    const playerChar = await PlayerChar.findOne({ user: body.user });

    // if no player data exists, create a new document
    if (!playerChar) {
      const newPlayerChar = await PlayerChar.create(req.body);
      console.log(newPlayerChar.isNew);
      res.json(newPlayerChar);
    }
    res.json(playerChar);
  } catch (err) {
    if (err) {
      console.error(err);
    }
  }
});

// login
router.post("/user/login", async ({ body: { email, password } }, res) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).send({
        message: `Email and/or password incorrect`,
        code: `email/pass`,
      });
      return;
    }

    passCheck = await compare(password, user.password);

    if (!passCheck) {
      res.status(400).send({
        message: `Email and/or password incorrect`,
        code: `email/pass`,
      });
      return;
    }

    res.json(user);
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
});

// sign up
router.post("/user/signup", async ({ body }, res) => {
  try {
    const user = await User.create(body);
    res.json(user);
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
});

module.exports = router;
