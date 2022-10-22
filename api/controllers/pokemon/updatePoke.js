const { validateSchema } = require("../../../ultis/joiValidate");
const { validateNameTypes } = require("../../../ultis/validateNameTypes");
const fs = require("fs");
const Joi = require("joi");
const path = require("path");
const createHttpError = require("http-errors");


const requestSchema = Joi.object({
  name: Joi.string(),
  types: Joi.array(),
  url: Joi.string(),
});

const paramsSchema = Joi.object({
  pokeId: Joi.number().required()
})

function updatePoke(req, res, next) {
  try {
    const { name, types } = (updates = validateSchema(
      requestSchema,
      req.body
    ));
    const { pokeId } = validateSchema(paramsSchema, req.params)

    const filePath = path.join(__dirname, "../../../pokemon.json");
    
    //Read data from db.json then parse to JSobject
    const { pokemons } = (poke = JSON.parse(
      fs.readFileSync(filePath, "utf-8")
    ));
    validateNameTypes(name, types, pokemons)

    //find pokemon by id
    const targetIndex = pokemons.findIndex((pokemon) => pokemon.id === pokeId);

    if (targetIndex < 0) {
      const exception = new Error(`Pokemon not found`);
      exception.statusCode = 404;
      throw exception;
    }
    //Update new content to pokemon  JS object
    const updatePoke = { ...poke.pokemons[targetIndex], ...updates };
    poke.pokemons[targetIndex] = updatePoke;

    //save to pokemon.json
    fs.writeFileSync(filePath, JSON.stringify(poke));
    //put send response
    res.status(200).send(updatePoke);
  } catch (error) {
    next(createHttpError(401, error))
    next(error);
  }
}

module.exports = { updatePoke };
