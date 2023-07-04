'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const helpSocialSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: Buffer, // Utiliza el tipo de datos Buffer para almacenar los datos binarios de la imagen
    // required: false
  },
  claimed: {
    type: Boolean,
    default: false
  },
  claimDate: {
    type: Date,
    default: Date.now
  },
  claimantName: {
    type: String
  },
});

module.exports = mongoose.model('HelpSocial', helpSocialSchema);


{/* <p>title: {helpSocial.title}</p>
        <p>descripción: {helpSocial.description}</p>
        <p>image: {helpSocial.image}</p>
        <p>claimed: {helpSocial.claimDate}</p>
        <p>claimDate: {helpSocial.claimantName}</p> */}

