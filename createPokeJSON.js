const fs = require("fs");
const csv = require("csvtojson");
const crypto = require("crypto");
const createPokemon = async () => {
  let newData = await csv().fromFile("pokemon.csv");
  //   let data = JSON.parse(fs.readFileSync("pokemon.json"));
  newData = newData.map((e, i) => {
    if (i < 721)
      if (e.Type2) {
        return {
          id: i+1,
          name: e.Name,
          types: [e.Type1, e?.Type2],
          url: `http://localhost:8000/images/${i + 1}.jpg`,
        };
      } else
        return {
          id: i+1,
          name: e.Name,
          types: [e.Type1],
          url: `http://localhost:8000/images/${i + 1}.jpg`,
        };
    else return;
  });
// console.log(newData)
//   // newData.map((data) => {
//   //   // if () delete data;
//   //   console.log(data === undefined)
//   // });
  let db = {data: newData.slice(0,721), totalPokemons: newData.slice(0,721).length }
  fs.writeFileSync("pokemon.json",  JSON.stringify(db));

  
};

createPokemon();
