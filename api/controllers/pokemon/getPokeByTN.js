const lodash = require("lodash");
const { validateSchema } = require("../../../ultis/joiValidate");
const fs = require("fs");
const Joi = require("joi");
const path = require("path");

const requestSchema = Joi.object({
  type: Joi.string(),
  search: Joi.string(),
  url: Joi.string(),
  page: Joi.number().default(1),
  limit: Joi.number().default(10),
});

function getPokeByTN(req, res, next) {
  try {
    const { page, limit, ...tempQuery } = validateSchema(
      requestSchema,
      req.query
    );
    let filterQuery = {};
    if (tempQuery.type) {
      filterQuery = { types: tempQuery.type };
    }

    if (tempQuery.search) {
      filterQuery = { name: tempQuery.search };
    }

    const filePath = path.join(__dirname, "../../../pokemon.json");

    const { pokemons } = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    let offset = limit * (page - 1);
    if (lodash.isEmpty(filterQuery)) {
      console.log("clg if isEmpty");
      res.status(200).send({data: pokemons.slice(offset, offset + limit)});
    }

    let result = [];

    Object.keys(filterQuery).forEach((condition) => {
      result = result.length
        ? result.filter((poke) => poke[condition] === filterQuery[condition])
        : pokemons.filter((poke) => poke[condition] === filterQuery[condition]);
    });
    //stuck at find by types

    //send response
    res.status(200).send({data: result.slice(offset, offset + page)});
  } catch (error) {
    next(error);
  }
}

module.exports = { getPokeByTN };
