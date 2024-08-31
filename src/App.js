import React, { useState, useEffect } from 'react';
import { categories } from './api'; 
import Row from './components/Row';
import Banner from './components/Banner';
import Nav from './components/Nav';
import './App.css';
function App() {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await categories(); 
        if (Array.isArray(result)) {
          setCategoryList(result);
        } else {
          console.error('Categories is not an array:', result);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories(); 
  }, []);

  return (
    <div className="app"> 
      <Nav />
      <Banner />
      {isLoading ? (
        <p>Loading...</p> 
      ) : (
        categoryList.map((category) => (
          <Row
            key={category.name}
            title={category.title}
            isLarge={category.isLarge}
            path={category.path}
          />
        ))
      )}
    </div>
  );
}

export default App;
