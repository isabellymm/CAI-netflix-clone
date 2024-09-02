const API_KEY = '76bd8a2f7dd676fbf2a87971267b91e8'
const DNS = "https://api.themoviedb.org/3"
const LANGUAGE = 'pt-BR';
export const categories = [
  {
    name: "trending",
    title: "Em Alta",
    path: "/trending/all/week?api_key=" + API_KEY + "&language=pt-BR",
    isLarge: true,
  },
  {
    name: "netflixOriginals",
    title: "Originais Netflix",
    path: "/discover/tv?api_key=" + API_KEY + "&with_networks=213",
    isLarge: false,
  },
  {
    name: "topRated",
    title: "Populares",
    path: "/movie/top_rated?api_key=" + API_KEY + "&language=pt-BR",
    isLarge: false,
  },
  {
    name: "comedy",
    title: "Comédias",
    path: "/discover/tv?api_key=" + API_KEY + "&with_genres=35",
    isLarge: false,
  },
  {
    name: "romances",
    title: "Romances",
    path: "/discover/tv?api_key=" + API_KEY + "&with_genres=10749",
    isLarge: false,
  },
  {
    name: "documentaries",
    title: "Documentários",
    path: "/discover/tv?api_key=" + API_KEY + "&with_genres=99",
    isLarge: false,
  }
]

export const categoriesAdult = [
  {
    name: "trending",
    title: "Em Alta",
    path: "/trending/all/week?api_key=" + API_KEY + "&language=pt-BR&include_adult=true",
    isLarge: true,
  },
  {
    name: "netflixOriginals",
    title: "Originais Netflix",
    path: "/discover/tv?api_key=" + API_KEY + "&with_networks=213&include_adult=true",
    isLarge: false,
  },
  {
    name: "topRated",
    title: "Populares",
    path: "/movie/top_rated?api_key=" + API_KEY + "&language=pt-BR&include_adult=true",
    isLarge: false,
  },
  {
    name: "comedy",
    title: "Comédias",
    path: "/discover/tv?api_key=" + API_KEY + "&with_genres=35&include_adult=true",
    isLarge: false,
  },
  {
    name: "romances",
    title: "Romances",
    path: "/discover/tv?api_key=" + API_KEY + "&with_genres=10749&include_adult=true",
    isLarge: false,
  },
  {
    name: "documentaries",
    title: "Documentários",
    path: "/discover/tv?api_key=" + API_KEY + "&with_genres=99&include_adult=true",
    isLarge: false,
  }
]

export const getData = async (path) => {
  try {
    const token = localStorage.getItem('token');
    let URI = DNS + path
    const response = await fetch(URI, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from backend');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getDataRating = async (movies, age) => {
  try {
    const moviesWithCertifications = await Promise.all(movies.map(async (movie) => {
      const movieId = movie.id;
      const movieDetailsUrl = `${DNS}/movie/${movieId}?api_key=${API_KEY}&language=${LANGUAGE}&append_to_response=releases`;

      const response = await fetch(movieDetailsUrl);
      
      if (response.status === 404) {
        console.warn(`Filme não encontrado: ${movieId}`);
        return null; 
      }
      
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      const movieDetailsResponse = await response.json();
      const certification = movieDetailsResponse.releases.countries.find(c => c.certification)?.certification || 'N/A';

      
      return {
        ...movie,
        certification: certification
      };
    }));

    const validMovies = moviesWithCertifications.filter(movie => movie !== null);

    const filteredMoviesByAge = validMovies.filter(movie => {
      const movieCertification = parseInt(movie.certification);
      return isNaN(movieCertification) || movieCertification <= 10;
    });
    console.log(filteredMoviesByAge)
    return filteredMoviesByAge;

  } catch (error) {
    console.error('Erro ao obter filmes e classificações indicativas:', error.message);
    return [];
  }
}
