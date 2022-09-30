const jwt = require('jsonwebtoken');

// pour route avec authentification
module.exports = (req, res, next) => {
  try {
    // récupération token
    const token = req.headers.authorization.split(' ')[1];
    // décodage token

    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    // SI user identifié
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      res.locals.user = userId;
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};