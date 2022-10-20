var express = require('express');

var router = express.Router();
const pokemonRouter = require('./pokemon.api.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send("Welcome to CoderSchool!")
});

router.use('/pokemons', pokemonRouter)

module.exports = router;
