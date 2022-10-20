const { validateSchema } = require("../../../ultis/joiValidate");
const {validateNameTypes} = require("../../../ultis/validateNameTypes");
const fs = require("fs");
const Joi = require("joi");
const path = require("path");
const crypto = require("crypto");


const requestSchema = Joi.object({
  //   id: Joi.number().required(),
  name: Joi.string().required(),
  types: Joi.array().required(),
  url: Joi.string().required(),
});

function createPoke(req, res, next) {
  try {
    const { name, types, url } = validateSchema(requestSchema, req.body);
    const filePath = path.join(__dirname, "../../../pokemon.json");

    const { pokemons } = (poke = JSON.parse(
      fs.readFileSync(filePath, "utf-8")
    ));
    validateNameTypes(name, types, pokemons)

    const newPokemon = {
      id: crypto.randomBytes(4).toString("hex"),
      name,
      types,
      url,
    };

    pokemons.push(newPokemon);
    poke.pokemons = pokemons;

    fs.writeFileSync(filePath, JSON.stringify(poke));
    res.status(200).send(newPokemon);
  } catch (error) {
    next(error);
  }
}

module.exports = { createPoke };
