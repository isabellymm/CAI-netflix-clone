require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const tmdbRoutes = require('./routes/tmdbRoutes');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use('/api/tmdb', tmdbRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
