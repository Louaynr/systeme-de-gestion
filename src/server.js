const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/UserRoutes');
const amendeRoutes = require('./routes/AmendeRoutes');
const categorieRoutes = require('./routes/CategorieRoutes');
const commandeRoutes = require('./routes/CommandeFournisseurRoutes');
const livreRoutes = require('./routes/LivreRoutes');
const notificationRoutes = require('./routes/NotificationRoutes');
const exemplaireRoutes = require('./routes/ExemplaireRoutes');


dotenv.config();

connectDB(); // Connexion à la base de données

const app = express();
app.use(express.json());
app.get('/', (req, res) => res.send('Backend opérationnel'));
app.use('/api/users', userRoutes);
app.use('/api/amendes', amendeRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/api/commandes', commandeRoutes);
app.use('/api/livres', livreRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/exemplaires', exemplaireRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${process.env.PORT}`);
});
