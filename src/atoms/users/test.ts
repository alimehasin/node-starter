import request, { Response } from "supertest";
import server from "../../server";
import prisma from "../../prisma";

describe("Test auth system", () => {
  const req = request(server);
  let res: Response;

  beforeAll(() => {});

  beforeEach(() => {});

  afterEach(async () => {
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    server.close();
    await prisma.$disconnect();
  });

  const register = async (data: any = null) => {
    return req
      .post("/users/register")
      .send(data || { username: "adam", password: "password" });
  };

  test("registration", async () => {
    const data = {
      firstName: "Alice",
      lastName: "Bob",
      username: "username",
      password: "password",
    };

    // 1. Valid registration data
    res = await req.post("/users/register").send(data);
    expect(res.status).toEqual(200);

    // 2. Duplicated username
    res = await req.post("/users/register").send(data);
    expect(res.status).toEqual(400);
  });

  test("login", async () => {
    await register();

    res = await req.post("/users/login").send({
      username: "adam",
      password: "password",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("tokens");
    expect(res.body.tokens).toHaveProperty("access");
    expect(res.body.tokens).toHaveProperty("refresh");
  });

  test("profile", async () => {
    res = await register();

    const accessToken = res.body.tokens.access;

    res = await req.get("/users/profile").set({
      Authorization: `Bearer ${accessToken}`,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("username");
    expect(res.body).not.toHaveProperty("password");
    expect(res.body).not.toHaveProperty("tokens");
  });
});
