const { Schema, model } = require("mongoose");
const { hash } = require("bcrypt");

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: `Must have a username`,
  },
  email: {
    type: String,
    trim: true,
    match: [/.+@.+\..+/, `Must have a valid email`],
    unique: true,
  },
  password: {
    type: String,
    required: `Must have password`,
  },
  admin: {
    type: Boolean,
  },
});

UserSchema.pre("save", async function () {
  if (this.$isNew) {
    this.password = await hash(this.password, 10);
  }
});

const User = model("User", UserSchema);
module.exports = User;
