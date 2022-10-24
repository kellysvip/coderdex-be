const request = require("supertest");
const fs = require("fs");
const app = require("../../../app");

describe("Books", () => {
  let pokemons;
  beforeAll(() => {
    pokemons = JSON.parse(fs.readFileSync("pokemon.json", "utf-8")).pokemons;
  });
  test("GET / --> get pokemon have id 721", async () => {
    const { body } = await request(app)
      .get("/pokemons/721")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(body).toEqual({
        "pokemon": {
          "id": 721,
          "name": "volcanion",
          "types": [
            "Fire",
            "Water"
          ],
          "url": "http://localhost:8000/images/721.jpg"
        },
        "nextPokemon": {
          "id": 1,
          "name": "bulbasaur",
          "types": [
            "Grass",
            "Poison"
          ],
          "url": "http://localhost:8000/images/1.jpg"
        },
        "previousPokemon": {
          "id": 720,
          "name": "hoopa-confined",
          "types": [
            "Psychic",
            "Ghost"
          ],
          "url": "http://localhost:8000/images/720.jpg"
        }
      });
  });

  test("GET / --> get pokemon have id 1", async () => {
    const { body } = await request(app)
      .get("/pokemons/1")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(body).toEqual({
        "pokemon": {
          "id": 1,
          "name": "bulbasaur",
          "types": [
            "Grass",
            "Poison"
          ],
          "url": "http://localhost:8000/images/1.jpg"
        },
        "nextPokemon": {
          "id": 2,
          "name": "ivysaur",
          "types": [
            "Grass",
            "Poison"
          ],
          "url": "http://localhost:8000/images/2.jpg"
        },
        "previousPokemon": {
          "id": 721,
          "name": "volcanion",
          "types": [
            "Fire",
            "Water"
          ],
          "url": "http://localhost:8000/images/721.jpg"
        }
      });
  });

  test("GET / --> get pokemon have id 400", async () => {
    const { body } = await request(app)
      .get("/pokemons/400")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(body).toEqual({
      "pokemon": {
        "id": 400,
        "name": "bibarel",
        "types": [
          "Normal",
          "Water"
        ],
        "url": "http://localhost:8000/images/400.jpg"
      },
      "nextPokemon": {
        "id": 401,
        "name": "kricketot",
        "types": [
          "Bug"
        ],
        "url": "http://localhost:8000/images/401.jpg"
      },
      "previousPokemon": {
        "id": 399,
        "name": "bidoof",
        "types": [
          "Normal"
        ],
        "url": "http://localhost:8000/images/399.jpg"
      }
    });
  });
});
