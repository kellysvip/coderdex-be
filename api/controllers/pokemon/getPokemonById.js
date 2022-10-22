const lodash = require("lodash");
const { validateSchema } = require("../../../ultis/joiValidate");
const fs = require("fs");
const Joi = require("joi");
const path = require("path");
const createHttpError = require("http-errors");

const paramsSchema = Joi.object({
  pokeId: Joi.number(),
});

function getPokeById(req, res, next) {
  try {
    const { pokeId } = validateSchema(paramsSchema, req.params);

    const filePath = path.join(__dirname, "../../../pokemon.json");

    const { pokemons } = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    //find pokemon by id
    const targetIndex = pokemons.findIndex((pokemon) => pokemon.id === pokeId);

    if (targetIndex < 0) {
      const exception = new Error(`Pokemon not found`);
      exception.statusCode = 404;
      throw exception;
    }

    //stuck at find by types

    //send response
    res.status(200).send({
      pokemon: pokemons[targetIndex],
      nextPokemon: pokemons[targetIndex + 1],
      previousPokemon: pokemons[targetIndex - 1],
    });
  } catch (error) {
    next(createHttpError(401, error))
    next();
  }
}

module.exports = { getPokeById };
