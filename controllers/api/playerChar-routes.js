const router = require("express").Router();
const PlayerChar = require("../../models/playerChar");
const User = require("../../models/user");
const { compare } = require("bcrypt");

// get user's data
router.get("/user/data", async (req, res) => {
  // get player character object
  console.log(req.session);
  try {
    const playerChar = await PlayerChar.findOne({
      user: req.body.user,
    }).populate({
      path: "user",
      select: "-_v",
    });

    // if no player data exists, create a new document
    if (!playerChar) {
      const newPlayerChar = await PlayerChar.create(req.body);

      res.json(newPlayerChar);
      return;
    }
    res.json(playerChar);
  } catch (err) {
    if (err) {
      console.error(err);
    }
  }
});

// list all character sheets
router.get("/user/char-sheets", async (req, res) => {
  try {
    const playerChar = await PlayerChar.find().populate({
      path: "user",
      select: "-_v",
    });
    res.json(playerChar);
  } catch (err) {}
});

// list all users
router.get("/users/", async (req, res) => {
  if (!req.body.admin) {
    res.status(403).send(`Must be admin`);
    return;
  }
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    if (err) console.error(err);
  }
});

// login
router.post(
  "/user/login",
  async ({ body: { email, password }, session }, res) => {
    try {
      const user = await User.findOne({
        $or: [{ email: email }, { username: email }],
      });
      if (!user) {
        res.status(400).send({
          message: `Email and/or password incorrect`,
          code: `email/pass`,
        });
        return;
      }

      let passCheck = await compare(password, user.password);

      if (!passCheck) {
        res.status(400).send({
          message: `Email and/or password incorrect`,
          code: `email/pass`,
        });
        return;
      }

      session.user = {
        id: user.id,
        username: user.username,
        loggedIn: true,
      };
      session.save((err) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(session);

        res.json(user);
      });
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  }
);

// sign up
router.post("/user/signup", async ({ body, session }, res) => {
  try {
    const user = await User.create(body);

    session.save(() => {
      session.user = {
        id: user.id,
        username: user.username,
        loggedIn: true,
      };

      console.log(session);

      res.json(user);
    });
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
});

module.exports = router;
