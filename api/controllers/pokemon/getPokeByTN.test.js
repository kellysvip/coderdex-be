const request = require("supertest");
const fs = require("fs");
const app = require("../../../app");

describe("Books", () => {
  let pokemons;
  beforeAll(() => {
    pokemons = JSON.parse(fs.readFileSync("pokemon.json", "utf-8")).data;
  });
  test("GET / --> get all pokemon", async () => {
    const { body } = await request(app)
      .get("/pokemons")
      .query({ search: "pikachu" })
      .expect("Content-Type", /json/)
      .expect(200);
    expect(body).toEqual({
      data: [
        {
          "id": 25,
          "name": "pikachu",
          "types": ["Electric"],
          "url": "http://localhost:8000/images/25.jpg"
        },
      ],
      totalPokemons: 1,
    });
  });

  test("GET / --> get pokemon not found", async () => {
    const { body } = await request(app)
      .get("/pokemons")
      .query({ search: "Hello" })
      .expect("Content-Type", /json/)
      .expect(200);
    expect(body).toEqual({
      data: [],
      totalPokemons: 0,
    });
  });
});
