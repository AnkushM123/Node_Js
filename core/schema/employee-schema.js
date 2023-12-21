const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  mobile: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[0-9]{10}$/.test(value);
      },
      message: props => `${props.value} is not a valid mobile number!`,
    },
  },
  is_active: {
    type: Boolean
  },
  date: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String
  }
})

const employeeModel = mongoose.model("employee", employeeSchema);

module.exports = employeeModel;