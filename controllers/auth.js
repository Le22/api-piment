const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// import shemas User
const User = require('../models/User');

// inscription
exports.signup =(req, res, next) => {

  // récupération et hashage du mdp
	bcrypt.hash(req.body.password, 10)
	.then( hash => {

    // creation new User
		const user = new User({
			email: req.body.email,
			password: hash
		});

    // enregistrement du new User
		user.save()
			.then(() => res.status(201).json({ message: 'Nouvel utilisateur !' }))
			.catch(error => res.status(400).json({ error }));
	})
	.catch(error => res.status(500).json({ error }));
};

// connexion
exports.login = (req, res, next) => {
  // recherche User avec le mail
  User.findOne({ email: req.body.email })
    .then(user => {
      // SI pas de mail trouvé
      if (!user) {
        return res.status(401).json({ error: 'Mot de passe ou utilisateur incorrect' });
      }
      // hashage du mdp et comparaison
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          // SI mauvais mdp
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe ou utilisateur incorrect' });
          }
          res.status(200).json({
            // création d'un new token
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};