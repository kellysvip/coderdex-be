const lodash = require("lodash");
const { validateSchema } = require("../../../ultis/joiValidate");
const fs = require("fs");
const Joi = require("joi");
const path = require("path");

const requestSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  types: Joi.string(),
  url: Joi.string(),
});

function getPokeByTN(req, res, next) {
  try {
    const { ...filterQuery } = validateSchema(requestSchema, req.query);

    const filePath = path.join(__dirname, "../../../pokemon.json");

    const { pokemons } = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (    lodash.isEmpty(filterQuery)) {
      console.log("clg if isEmpty", pokemons);
      res.status(200).send(pokemons);
    }

    let result = [];

    Object.keys(filterQuery).forEach((condition) => {
      result = result.length
        ? result.filter((poke) => poke[condition] === filterQuery[condition])
        : pokemons.filter((poke) => poke[condition] === filterQuery[condition]);
    });
    //stuck at find by types

    //send response
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {getPokeByTN}
