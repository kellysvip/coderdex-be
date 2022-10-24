const { validateSchema } = require("../../../ultis/joiValidate");
const {validateNameTypes} = require("../../../ultis/validateNameTypes");
const fs = require("fs");
const Joi = require("joi");
const path = require("path");
const createHttpError = require("http-errors");


const requestSchema = Joi.object({
  id: Joi.number(),
  name: Joi.string().required(),
  types: Joi.array().required(),
  url: Joi.string().required(),
});

function createPoke(req, res, next) {
  try {
    const {id, name, types, url } = validateSchema(requestSchema, req.body);
    const filePath = path.join(__dirname, "../../../pokemon.json");

    const { data } = (poke = JSON.parse(
      fs.readFileSync(filePath, "utf-8")
    ));
    validateNameTypes(id, name, types, data)

    const newPokemon = {
      id: id || data.length+1,
      name,
      types,
      url,
    };
    console.log(newPokemon)
    data.push(newPokemon);
    poke.data = data;
    poke.totalPokemons = data.length
    
    fs.writeFileSync(filePath, JSON.stringify(poke));
    res.status(200).send(newPokemon);
  } catch (error) {
    next(createHttpError(401, error))
    next();
  }
}

module.exports = { createPoke };
