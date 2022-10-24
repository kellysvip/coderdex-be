const path = require("path");
const fs = require("fs");
const Joi = require("joi");
const { validateSchema } = require("../../../ultis/joiValidate");

const paramsSchema = Joi.object({
  pokeId: Joi.number().required()
})

function deletePoke(req, res, next) {
  try {
    const { pokeId } = validateSchema(paramsSchema, req.params)
    console.log('poked', pokeId)

    const filePath = path.join(__dirname, "../../../pokemon.json");
    //Read data from db.json then parse to JSobject
    const { data } = (poke = JSON.parse(
      fs.readFileSync(filePath, "utf-8")
    ));

    //find pokemon by id
    const targetIndex = data.findIndex((pokemon) => pokemon.id === pokeId);

    console.log('targetIndex', targetIndex)
    if (targetIndex < 0) {
      const exception = new Error(`Pokemon not found`);
      exception.statusCode = 404;
      throw exception;
    }

    //filter db books object
    poke.data = data.filter((pokemon) => pokemon.id !== Number(pokeId));
    poke.totalPokemons = data.length
    //save to pokemon.json
    fs.writeFileSync(filePath, JSON.stringify(poke));

    res.status(200).send({});
  } catch (error) {
    next(createError(401, error))
    next(error)
  }
}

module.exports = { deletePoke };
