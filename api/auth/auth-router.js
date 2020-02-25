const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../users/users-model.js');
const secrets = require('../../config/secrets.js');


router.post('/authenticate', (req, res) => {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodeToken)=> {
      if (err) {
        res.status(200).json({loggedIn: "false"})
      } else {
        res.status(200).json({loggedIn: "true"})
      }
    })
  } else {
    res.status(200).json({loggedIn: "false"})
  }
})
// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  console.log("USER", user)
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  db.add(user)
    .then(user => {
      const token = generateToken(user);

      res.status(201).json({email: user.email, title: user.title, tagline: user.tagline, token});
    })
    .catch(error => {
      console.log("ERROR", error)
      res.status(500).json({message: "Unable to create user."});
    });
});

router.post('/login', (req, res) => {
  let { email, password } = req.body;

  db.findBy({ email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); // <<<<<<<<<<<<<<<<<<<<<<<<<

        res.status(200).json({
          email: user.email,
          title: user.title,
          tagline: user.tagline,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      console.log("ERROR", error)
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id, // standard claim = sub
    email: user.email
  };

  const options = {
    expiresIn: '7d'
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
