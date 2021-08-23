"use strict";

const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  storeId: { type: Schema.ObjectId, ref: 'store' },
  gender: { type: String, enum: ["Male", "Female"], default: "Male" },
  role: String,
  createdBy: { type: Schema.ObjectId, ref: 'user' },
  createdAt: { type: Date, default: Date.now },
});

userSchema.set('autoIndex', true);
const user = Mongoose.model('user', userSchema);

module.exports = user;
