"use strict";

const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const storeSchema = new Schema({
  name: { type: String },
  parent: { type: Schema.ObjectId, ref: 'store' },
  order: Number,
  createdBy: { type: Schema.ObjectId, ref: 'user' },
  createdAt: { type: Date, default: Date.now },
});

storeSchema.set('autoIndex', true);
const store = Mongoose.model('store', storeSchema);

module.exports = store;
