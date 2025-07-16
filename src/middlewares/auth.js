const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const


// Authentication middleware
const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé.' });
    }
    
    if (user.statut !== 'actif') {
      return res.status(401).json({ message: 'Compte utilisateur inactif ou suspendu.' });
    }
    
    // Add user to request object
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide.' });
  }
};

// Authorization middleware
const authorize = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentification requise.' });
    }
    
    if (role && req.user.role !== role) {
      return res.status(403).json({ message: 'Accès refusé. Permissions insuffisantes.' });
    }
    
    next();
  };
};

module.exports = { auth, authorize };
