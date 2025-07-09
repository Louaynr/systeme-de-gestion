// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// ✅ Créer un utilisateur (Employé, Étudiant ou Fournisseur)
exports.createUser = async (req, res) => {
  try {
    const {
      nom, prenom, email, motDePasse, role,
      matricule, departement, roleEmploye,
      numeroEtudiant, filiere, niveauEtude, maxEmprunts,
      nomEntreprise, siret, adresseEntreprise, contactPrincipal
    } = req.body;

    // Vérifie que le role est valide
    if (!['employe', 'etudiant', 'supplier'].includes(role)) {
      return res.status(400).json({ message: 'Role invalide.' });
    }

    // Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(motDePasse, salt);

    const user = new User({
      nom, prenom, email, motDePasse: hashedPassword, role,
      matricule, departement, roleEmploye,
      numeroEtudiant, filiere, niveauEtude, maxEmprunts,
      nomEntreprise, siret, adresseEntreprise, contactPrincipal
    });

    await user.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès.', user });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Lire tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Lire un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;

    if (updates.motDePasse) {
      const salt = await bcrypt.genSalt(10);
      updates.motDePasse = await bcrypt.hash(updates.motDePasse, salt);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    res.json({ message: 'Utilisateur mis à jour.', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    res.json({ message: 'Utilisateur supprimé.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
