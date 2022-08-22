const { Schema, model } = require("mongoose");

const playerCharSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: `Must have a userId`,
  },
  name: {
    type: String,
    default: "",
  },
  playbook: {
    type: String,
    default: "",
  },
  background: {
    type: String,
    default: "",
  },
  demeanor: {
    type: String,
    default: "",
  },
  fightingStyle: {
    type: String,
    default: "",
  },
  training: {
    type: String,
    default: "",
  },
  balance: {
    principle1: {
      type: String,
      default: "",
    },
    principle2: {
      type: String,
      default: "",
    },
  },
  posStats: {
    type: [String],
  },
  negStats: {
    type: [String],
  },
  conditions: {
    type: [String],
  },
  fatigue: {
    type: String,
  },
  stats: {
    creativity: {
      type: String,
      default: "",
    },
    focus: {
      type: String,
      default: "",
    },
    harmony: {
      type: String,
      default: "",
    },
    passion: {
      type: String,
      default: "",
    },
    techniques: {
      type: Object,
      default: {
        t1: {},
        t2: {},
        t3: {},
        t4: {},
        t5: {},
        t6: {},
      },
    },
  },
});

const PlayerChar = model("PlayerChar", playerCharSchema);
module.exports = PlayerChar;
