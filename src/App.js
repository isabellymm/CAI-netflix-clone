import React, { useState } from 'react';
import Login from './Login';
import Row from './components/Row';
import Banner from './components/Banner';
import Nav from './components/Nav';
import { categories } from './api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      <Nav />
      <Banner />
      {categories.map((category) => (
        <Row
          key={category.name}
          title={category.title}
          isLarge={category.isLarge}
          path={category.path}
        />
      ))}
    </div>
  );
}

export default App;
