const router = require("express").Router();
const PlayerChar = require("../../models/playerChar");
const User = require("../../models/user");
const { compare } = require("bcrypt");
const session = require("express-session");

// get user's data
router.get("/user/data", async ({ body, session }, res) => {
  // get player character object
  try {
    const playerChar = await PlayerChar.findOne({
      user: session.user.id,
    }).populate({
      path: "user",
      select: "-_v",
    });

    // if no player data exists, create a new document
    if (!playerChar) {
      const newPlayerChar = await PlayerChar.create(body);

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

// save character data
router.post("/user/data", async ({ body, session }, res) => {
  const playerChar = await PlayerChar.findOneAndUpdate(
    {
      user: session.user.id,
    },
    body
  );
  res.status(200).send(`character sheet updated`);
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

      session.loggedIn = true;
      session.user = {
        id: user.id,
        username: user.username,
      };
      session.save((err) => {
        if (err) {
          console.error(err);
          return;
        }

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

    session.loggedIn = true;
    session.user = {
      id: user.id,
      username: user.username,
    };
    session.save((err) => {
      if (err) {
        console.error(err);
        return;
      }

      res.json(user);
    });
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
});

// log out
router.post("/user/logout", ({ session }, res) => {
  session.destroy((err) => {
    if (err) {
      res.code(500).send(err);
    }
    res.status(200).send(`User logged out`);
  });
});

module.exports = router;
