const lodash = require("lodash");
const { validateSchema } = require("../../../ultis/joiValidate");
const fs = require("fs");
const Joi = require("joi");
const path = require("path");
const createHttpError = require("http-errors");

const requestSchema = Joi.object({
  type: Joi.string(),
  search: Joi.string(),
  url: Joi.string(),
  page: Joi.number().default(1),
  limit: Joi.number().default(10),
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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

    const { data } = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    let offset = limit * (page - 1);
    if (lodash.isEmpty(filterQuery)) {
      res.status(200).send({ data: data.slice(offset, offset + limit), totalPokemons: data.slice(offset, offset + limit).length });
    }
    
    
    let result = [];


    Object.keys(filterQuery).forEach((condition) => {
      if (condition === "name") {
        result = result.length
        ? result.filter((pokemon) => pokemon.name.includes(filterQuery.name))
        : data.filter((pokemon) => pokemon.name.includes(filterQuery.name));
        // result = data.filter(
        //   (poke) => poke[condition] === filterQuery[condition]
        // );
      } else if (condition === "types") {
        result = data.filter((poke) => {
          return (
            poke[condition][0] ===
              capitalizeFirstLetter(filterQuery[condition]) ||
            poke[condition][1] === capitalizeFirstLetter(filterQuery[condition])
          );
        });
      }
    });
    //send response
    res.status(200).send({ data: result.slice(offset, offset + limit), totalPokemons: result.slice(offset, offset + limit).length });
  } catch (error) {
    next(createHttpError(401, error))
    next(error);
  }
}

module.exports = { getPokeByTN };
