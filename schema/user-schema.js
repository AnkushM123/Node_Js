const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email"
    },
    required: [true, "Email required"]

  },
  password: {
    type: String,
    required: true
  }

})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;