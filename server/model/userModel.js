const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  DOB: {
    type: String,
    required: true
  },
  Experience: {
    type: String,
    required: true
  },
  Date: {
    type: String,
    required: true
  }
});

userSchema.set('timestamps', true);
module.exports = mongoose.model("user", userSchema);
