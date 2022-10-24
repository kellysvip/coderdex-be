const request = require("supertest");
const fs = require("fs");
const app = require("../../../app");

describe("Pokemon", () => {
  let pokemons;
  beforeAll(() => {
    pokemons = JSON.parse(fs.readFileSync("pokemon.json", "utf-8")).data;
  });
  test("DELETE / --> delete a pokemon", async () => {
    const { body } = await request(app).delete(`/pokemons/${pokemons[pokemons.length-1].id}`).send({
    }).expect(200);

    expect(body).toEqual({
    });
  });
});