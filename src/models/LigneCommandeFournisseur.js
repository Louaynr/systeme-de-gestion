// models/LigneCommandeFournisseur.js

const mongoose = require('mongoose');

const ligneCommandeFournisseurSchema = new mongoose.Schema({
  idCommandeFournisseur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CommandeFournisseur',
    required: true,
  },
  idLivre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Livre',
    required: true,
  },
  quantite: {
    type: Number,
    required: true,
    min: 1
  },
  prixUnitaire: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true // Ajoute createdAt et updatedAt automatiquement
});

module.exports = mongoose.model('LigneCommandeFournisseur', ligneCommandeFournisseurSchema);
