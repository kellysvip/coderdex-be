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

    const { data } = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    //find pokemon by id
    const targetIndex = data.findIndex((pokemon) => pokemon.id === pokeId);

    if (targetIndex < 0) {
      const exception = new Error(`Pokemon not found`);
      exception.statusCode = 404;
      throw exception;
    }

    
    res.status(200).send({
      pokemon: data[targetIndex],
      nextPokemon: data[targetIndex === data.length - 1 ? 0: targetIndex+1],
      previousPokemon: data[targetIndex === 0 ? data.length - 1: targetIndex-1]
    });
  } catch (error) {
    next(createHttpError(401, error))
    next();
  }
}

module.exports = { getPokeById };
