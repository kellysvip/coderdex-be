const request = require("supertest");
const fs = require("fs");
const app = require("../../../app");

describe("Books", () => {
  let pokemons;
  beforeAll(() => {
    pokemons = JSON.parse(fs.readFileSync("pokemon.json", "utf-8")).data;
    datalength = pokemons.length+1
  });
  test("POST /books --> post a book", async () => {
    const { body } = await request(app)
      .post("/pokemons")
      .send({
        name: "xsx",
        types: ["Fire", "Water"],
        url: "http://localhost:8000/images/8.jpg",
      })
      .expect(200);
    expect(body).toEqual({
      id: datalength,
      name: "xsx",
      types: ["Fire", "Water"],
      url: "http://localhost:8000/images/8.jpg",
    });
  });

  test("POST /books --> post a book fail", async () => {
    const { body } = await request(app)
      .post("/pokemons")
      .send({
        types: ["Fire", "Water"],
        url: "http://localhost:8000/images/8.jpg",
      })
      .expect(401);
  });

  test("POST /books --> post a book fail", async () => {
    const { body } = await request(app)
      .post("/pokemons")
      .send({
        name: "xsx",
        url: "http://localhost:8000/images/8.jpg",
      })
      .expect(401);
  });

  test("POST /books --> post a book fail", async () => {
    const { body } = await request(app)
      .post("/pokemons")
      .send({
        "name": "xsx",
        "types": ["Fire", "Water"]
      })
      .expect(401);
  });
});
