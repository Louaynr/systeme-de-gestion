// controllers/commandeFournisseurController.js
const CommandeFournisseur = require('../models/CommandeFournisseur');

// ➕ Créer une commande fournisseur
exports.createCommande = async (req, res) => {
  try {
    const { fournisseurId, employeId, montantTotal, statut } = req.body;

    const commande = new CommandeFournisseur({
      fournisseurId,
      employeId,
      montantTotal,
      statut: statut || 'En attente'
    });

    await commande.save();
    res.status(201).json({ message: 'Commande fournisseur créée.', commande });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Lire toutes les commandes
exports.getAllCommandes = async (req, res) => {
  try {
    const commandes = await CommandeFournisseur.find()
      .populate('fournisseurId employeId');
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Lire une commande par ID
exports.getCommandeById = async (req, res) => {
  try {
    const commande = await CommandeFournisseur.findById(req.params.id)
      .populate('fournisseurId employeId');
    if (!commande) return res.status(404).json({ message: 'Commande non trouvée.' });
    res.json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏️ Mettre à jour une commande
exports.updateCommande = async (req, res) => {
  try {
    const updates = req.body;
    const commande = await CommandeFournisseur.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!commande) return res.status(404).json({ message: 'Commande non trouvée.' });

    res.json({ message: 'Commande mise à jour.', commande });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🗑️ Supprimer une commande
exports.deleteCommande = async (req, res) => {
  try {
    const commande = await CommandeFournisseur.findByIdAndDelete(req.params.id);
    if (!commande) return res.status(404).json({ message: 'Commande non trouvée.' });
    res.json({ message: 'Commande supprimée.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
