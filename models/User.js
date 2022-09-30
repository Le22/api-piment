// import
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// shema user
const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

// un seul User par email
userSchema.plugin(uniqueValidator);

// export
module.exports = mongoose.model('User', userSchema);