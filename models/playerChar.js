const { Schema, model } = require("mongoose");

const playerCharSchema = new Schema({
  user: {
    type: String,
    unique: true,
    required: `Must have a username`,
  },
  playbook: {
    type: String,
  },
  background: {
    type: String,
  },
  demeanor: {
    type: String,
  },
  fightingStyle: {
    type: String,
  },
  training: {
    type: String,
  },
  balance: {
    type: String,
  },
  posStat: {
    type: [String],
  },
  negStats: {
    type: [String],
  },
  conditions: {
    type: [String],
  },
  fatigue: {
    type: [String],
  },
});

const PlayerChar = model("PlayerChar", playerCharSchema);
module.exports = PlayerChar;
