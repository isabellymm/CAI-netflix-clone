const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const axios = require('axios');

const API_KEY = '76bd8a2f7dd676fbf2a87971267b91e8'
const DNS = "https://api.themoviedb.org/3";

router.get('/data', async (req, res) => {
  const path = req.query.path;
  
  if (!path) {
    return res.status(400).json({ error: "Path is required" });
  }

  try {
    const URI = `${DNS}${path}?api_key=${API_KEY}`; 
    console.log('Fetching URI:', URI);
    const response = await fetch(URI);

    if (!response.ok) {
      throw new Error('Failed to fetch data from TMDB');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from TMDB:', error);
    res.status(500).json({ error: 'An error occurred while fetching data from TMDB' });
  }
});

router.get('/genre/tv/list', async (req, res) => {
  try {
    const response = await axios.get(`${DNS}/data?api_key=${API_KEY}`);
    let tvShows = response.data;

    console.log('Sessão atual:', req.session);

    if (req.session && req.session.user) {
      if (req.session.user.age < 18) {
        tvShows.genres = tvShows.genres.filter(genre => genre.name !== 'Adult');
      }
    } else {
      console.warn('Usuário não autenticado ou sessão não inicializada');
    }

    res.json(tvShows);
  } catch (error) {
    console.error('Error fetching TV genres:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


module.exports = router;