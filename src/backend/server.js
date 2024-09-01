const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const tmdbRoutes = require('./routes/tmdbRoutes');


const app = express();
const JWT_SECRET = 'your_jwt_secret_key';
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(bodyParser.json());

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Token:', token);

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.error('Token verification error:', err);
        return res.status(403).json({ success: false, message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ success: false, message: 'No token provided' });
  }
};

 const users = [
  {
    id: 1,
    email: 'teste',
    password: bcrypt.hashSync('password', 8), 
    age: 15
  }
];

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, email: user.email, age: user.age }, JWT_SECRET, { expiresIn: '60h' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.use('/api/tmdb', authenticateJWT, tmdbRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
