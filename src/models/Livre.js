const mongoose = require('mongoose');

const livreSchema = mongoose.Schema({
    idLivre: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
    },
  titre: {
    type: String,
    required: true
  },
  auteur: {
    type: String,
    required: true
  },
  isbn: {
    type: Number,
    unique: true
  },
  anneePublication: {
    type: date,
  },
  editeur: {
    type: String
  },
  langue: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Livre', livreSchema);