import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Row from './components/Row';
import Banner from './components/Banner';
import Nav from './components/Nav';
import './App.css';
import { categories, categoriesAdult } from './backend/api';

function Home() {
  const [userAge, setUserAge] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded);
      setUserAge(decoded.age);
    }
  }, []);

  if (userAge === null) {
    return <div>Loading...</div>;
  }

  const a = userAge < 18 ? categories : categoriesAdult;
  return (
    <div>
      <Nav></Nav>
      <Banner></Banner>

      {a.map((category) => {
        return <Row
          key={category.name}
          title={category.title}
          isLarge={category.isLarge}
          path={category.path}
        />
      })}
    </div>
  );
}

export default Home;