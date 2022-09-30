const Sauce = require('../models/sauce');
const fs = require('fs');

// création d'une sauce
exports.createSauce = (req, res, next) => {
  // récupération des infos
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;

  // création de la new Sauce
  const sauce = new Sauce({
    ...sauceObject,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  // enregistrement new Sauce
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

// modification de la sauce existante
exports.modifySauce = (req, res, next) => {
  // récupération des infos à modif
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
  // modif Sauce
  Sauce.updateOne({ _id: req.params.id, userId: res.locals.user }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

// supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  // trouver sauce avec l'ID
  Sauce.findOne({ _id: req.params.id, userId: res.locals.user })
    .then(sauce => {

      // supprime l'image sauce dans dossier images/
      const filname = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filname}`, () => {

        // supprime la sauce
        Sauce.deleteOne({ _id: req.params.id, userId: res.locals.user})
          .then(() => res.status(200).json({ message: 'Sauce supprimé'}))
          .catch(error => res.status.json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// récupération des info de la sauce
exports.getOneSauce = (req, res, next) => {
  // récupéré Sauce en fonction de l'ID
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

// récupération de toutes les sauces
exports.getAllSauces  = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

// liker / disliker une sauce
exports.likeSauce = (req, res, next) => {
  // récupération de la sauce en fonction de l'ID
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {

    // SI dislike
    if(req.body.like === -1) {
      // ajouter userID à userDisliked et +1 à dislike
      sauce.updateOne({ $push: { usersDisliked: req.body.userId }, $inc: {dislikes: +1}})

        .then(() => res.status(200).json("Dislike"))
        .catch(error => res.status(404).json({ error }));

    } 
    // SI like
    else if (req.body.like === 1) {
      // ajouter userID à userLiked et +1 à like
      sauce.updateOne({ $push: { usersLiked: req.body.userId }, $inc: {likes: +1}})

        .then(() => res.status(200).json("Like"))
        .catch(error => res.status(404).json({ error }));

    }
    // SI suppression de l'action
    else if(req.body.like === 0) {

      // SI ancien like
      if (sauce.usersLiked.includes(req.body.userId)) { 
        sauce.updateOne({ $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 }})

          .then(() => res.status(200).json({ message: "Delete like" }))
          .catch((error) => res.status(400).json({ error }))

      }
      // SI ancien dislike
      else if (sauce.usersDisliked.includes(req.body.userId)) { 
        sauce.updateOne({ $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 }})

          .then(() => res.status(200).json({ message: "Delete dislike" }))
          .catch((error) => res.status(400).json({ error }))
      }
    }
  }
  )
  .catch(error => res.status(404).json({ error }));
}