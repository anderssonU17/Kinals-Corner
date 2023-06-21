'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name: { 
        type: String,
        required: true 
    },
    mail:{
        type: String,
        require: true
    },
    photo: { 
        type: String 
    },
    subject: { 
        type: String,
        required: true
    }
  });
  
module.exports = mongoose.model('Teacher', teacherSchema);