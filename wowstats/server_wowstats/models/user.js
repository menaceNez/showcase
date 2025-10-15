const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  characters: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Character' }] // ref to owned character IDS
  },
  isAdmin: {
    type: Boolean,
    required: true
  } 
});

module.exports = mongoose.model('User', userSchema);