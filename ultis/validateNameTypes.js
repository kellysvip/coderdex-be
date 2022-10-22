const { pokemonTypes } = require("../src/pokemonTypes");

function throwError(text) {
  const exception = new Error(text);
  exception.statusCode = 404;
  throw exception;
}

function validateNameTypes(id, name, types, data) {
  const checkName = data.findIndex((pokemon) => pokemon.name === name);
  if (checkName > 0) {
    throwError(`Pokemon has exist`);
  }

  if (types.length > 2) throwError(`no more 2 types`);
  if (types[0] === types[1]) throwError(`ambiguous type`);
  const checkTypes = types.map((type) =>
    pokemonTypes.includes(type.toLowerCase())
  );
  checkTypes.map((check) => {
    if (!check) {
      throwError(`Types is not valid`);
    }
  });

  const checkId = data.findIndex((pokemon) => pokemon.id === id);
  if (checkId > 0) {
    throwError(`Pokemon has exist`);
  }
}

module.exports = { validateNameTypes };
