'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    rol:{
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }, 
    banned: { 
        type: Boolean, 
        default: false 
    },
    notificationsEnabled: { 
        type: Boolean, 
        default: true 
    },
    notifications: [
    {
        type: { type: String, required: true },
        message: { type: String, required: true },
        date: { type: Date, default: Date.now },
        read: { type: Boolean, default: false },
    },
  ],
})

module.exports = mongoose.model('User', UserSchema);