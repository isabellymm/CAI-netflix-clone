const BASE_URL = 'http://localhost:5000/api/tmdb';

export const categories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/categories`);
      const data = await response.json();
      return Array.isArray(data) ? data : []; 
    } catch (error) {
      console.error('Error fetching categories:', error);
      return []; 
    }
  };
  
export const getData = async (path) => {
  try {
    const response = await fetch(`${BASE_URL}/data?path=${encodeURIComponent(path)}`);
    console.log(response)
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
