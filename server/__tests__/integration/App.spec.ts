import request from "supertest";

import { Connection, getConnection, getRepository } from "typeorm";
import createConnection from "../../src/database";

import app from "../../src/app";

let connection: Connection;

describe("App", () => {
  beforeAll(async () => {
    connection = await createConnection("test-connection");

    await connection.query("DROP TABLE IF EXISTS point_items");
    await connection.query("DROP TABLE IF EXISTS items");
    await connection.query("DROP TABLE IF EXISTS points");
    await connection.query("DROP TABLE IF EXISTS migrations");

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query("DELETE FROM point_items");
    await connection.query("DELETE FROM points");
  });

  afterAll(async () => {
    const mainConnection = getConnection();
    await connection.close();
    await mainConnection.close();
  });

  it("should be able to return all items", async () => {
    const response = await request(app).get("/items");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(6);
  });

  it("should be able to create a point", async () => {
    const response = await request(app).post("/points").send({
      name: "Test Point",
      email: "tp@ecoleta.com.br",
      whatsapp: "5546999554433",
      latitude: -26.0755733,
      longitude: -53.0647391,
      city: "Francisco Beltrão",
      uf: "PR",
      items: "1,2,3",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
});
