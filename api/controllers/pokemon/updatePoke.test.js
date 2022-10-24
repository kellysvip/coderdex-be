const request = require("supertest");
const fs = require("fs");
const app = require("../../../app");
const { any } = require("joi");

describe("Pokemons", () => {
  let pokemons;
  beforeAll(() => {
    pokemons = JSON.parse(fs.readFileSync("pokemon.json", "utf-8")).data;
  });

  test("PUT /pokemons --> update a pokemons", async () => {
    const { body } = await request(app)
      .put(`/pokemons/${pokemons[pokemons.length - 1].id}`)
      .send({
        name: "tramz",
        types: ["Fire", "Water"],
        url: "http://localhost:8000/images/721.jpg"
      })
      .expect(200);

    expect(body).toEqual({
      "id": expect.any(Number),
      "name": "tramz",
      "types": [
        "Fire",
        "Water"
      ],
      "url": "http://localhost:8000/images/721.jpg"
    });
  });
});
