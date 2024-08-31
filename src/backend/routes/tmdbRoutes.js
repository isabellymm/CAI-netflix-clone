const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const API_KEY = '76bd8a2f7dd676fbf2a87971267b91e8';
const DNS = "https://api.themoviedb.org/3";

router.get('/categories', async (req, res) => {
  const categories = [
    {
      name: "trending",
      title: "Em Alta",
      path: `/trending/all/week?api_key=${API_KEY}&language=pt-BR`,
      isLarge: true,
    },
    {
      name: "netflixOriginals",
      title: "Originais Netflix",
      path: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
      isLarge: false,
    },
    {
      name: "topRated",
      title: "Populares",
      path: `/movie/top_rated?api_key=${API_KEY}&language=pt-BR`,
      isLarge: false,
    },
    {
      name: "comedy",
      title: "Comédias",
      path: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
      isLarge: false,
    },  
    {
      name: "romances",
      title: "Romances",
      path: `/discover/tv?api_key=${API_KEY}&with_genres=10749`,
      isLarge: false,
    },                
    {
      name: "documentaries",
      title: "Documentários",
      path: `/discover/tv?api_key=${API_KEY}&with_genres=99`,
      isLarge: false,
    }
  ];
  res.json(categories);
});

router.get('/data', async (req, res) => {
  const path = req.query.path;
  
  if (!path) {
    return res.status(400).json({ error: "Path is required" });
  }

  try {
    const URI = `${DNS}${path}`;
    const response = await fetch(URI);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data from TMDB' });
  }
});

module.exports = router;
