const mongoose = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = require("../../app");
const { User } = require("../../models/user");
const { response } = require("../../app");

const { DB_HOST, PORT } = process.env;

describe("test auth routes", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach(() => {
    mongoose.connect(DB_HOST);
  });

  afterEach(() => {
    mongoose.connection.close();
  });
  let newUser;
  const existingEmail = "example@gmail.com";
  const tmpPass = "password_hash";
  beforeEach(async () => {
    const encryptedPassword = await bcrypt.hash(tmpPass, 10);
    newUser = await User.create({
      email: existingEmail,
      password: encryptedPassword,
      avatarURL: "public/avatars/6356bc767e162fefe20469b6_IMG_0106.JPG",
    });
  });
  afterEach(async () => {
    await User.findByIdAndDelete(newUser._id);
  });
  test("should return 200", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: existingEmail, password: tmpPass });
    expect(response.statusCode).toBe(200);

    expect(response.body.data.token).toBeDefined();
    const { user } = response.body.data;
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });
});
