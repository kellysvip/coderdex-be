const path = require("path");
const fs = require("fs");

function deletePoke(req, res, next) {
  try {
    const { pokeId } = req.params;

    const filePath = path.join(__dirname, "../../../pokemon.json");
    //Read data from db.json then parse to JSobject
    const { pokemons } = (poke = JSON.parse(
      fs.readFileSync(filePath, "utf-8")
    ));

    //find pokemon by id
    const targetIndex = pokemons.findIndex((pokemon) => pokemon.id === pokeId);
    if (targetIndex < 0) {
      const exception = new Error(`Pokemon not found`);
      exception.statusCode = 404;
      throw exception;
    }

    //filter db books object
    poke.pokemons = pokemons.filter((pokemon) => pokemon.id !== pokeId);
    //save to pokemon.json
    fs.writeFileSync(filePath, JSON.stringify(poke));
    res.status(200).send({});
  } catch (error) {
    next(error)
  }
}

module.exports = { deletePoke };
