const router = require("express").Router();

const playerCharRoutes = require("./playerChar-routes");

router.use("/", playerCharRoutes);

module.exports = router;
