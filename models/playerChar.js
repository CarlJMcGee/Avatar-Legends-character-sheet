const { Schema, model } = require("mongoose");

const playerCharSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: `Must have a userId`,
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
