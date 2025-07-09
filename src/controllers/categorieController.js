// controllers/categorieController.js
const Categorie = require('../models/Categorie');

// ➕ Créer une catégorie
exports.createCategorie = async (req, res) => {
  try {
    const { nom, description, codeClassification } = req.body;

    const categorie = new Categorie({
      nom,
      description,
      codeClassification
    });

    await categorie.save();
    res.status(201).json({ message: 'Catégorie créée.', categorie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Lire toutes les catégories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Lire une catégorie par ID
exports.getCategorieById = async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.id);
    if (!categorie) return res.status(404).json({ message: 'Catégorie non trouvée.' });
    res.json(categorie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏️ Mettre à jour une catégorie
exports.updateCategorie = async (req, res) => {
  try {
    const updates = req.body;
    const categorie = await Categorie.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!categorie) return res.status(404).json({ message: 'Catégorie non trouvée.' });

    res.json({ message: 'Catégorie mise à jour.', categorie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🗑️ Supprimer une catégorie
exports.deleteCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.findByIdAndDelete(req.params.id);
    if (!categorie) return res.status(404).json({ message: 'Catégorie non trouvée.' });
    res.json({ message: 'Catégorie supprimée.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
