# api-piment

L'API Piment permet aux utilisateurs d'ajouter leurs sauces pimentées favorites dans la base de données.

L'API comprend également un système de like/dislike qui permet à chaque utilisateur de donner son avis sur les autres sauces présentes dans la DB.

## Installation

Installez les dépendances du projet

```npm install```

Initialisez la clef MongoDB dans le fichier

```.env```

## Démarrage

Dans la console, à la racine du projet

```nodemon server``` si vous avez installé la dépendance nodemon ou ```node server```

## Spécifications de l'API

### Routes User

```POST /api/signup``` Ajout de l'utilisateur

```POST /api/login``` Connection de l'utilisateur

### Routes Sauces

```GET /api/sauces``` Renvoie toutes les sauces

```GET /api/sauces/:id``` Renvoie la sauce avec l'ID

```POST /api/sauces``` Création d'une sauce

```PUT /api/sauces/:id``` Modifie la sauce avec l'ID

```DELETE /api/sauces/:id``` Supprime la sauce avec l'ID

```POST /api/sauces/:id/like``` Ajoute un like/dislike à la sauce avec l'ID

## Auteurs

**Louis-Étienne** [@Le22](https://github.com/Le22)

