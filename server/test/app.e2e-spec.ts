import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/modules/app/app.module";
import { ValidationPipe } from "@nestjs/common";
import { TransformInterceptor } from "../src/interceptors/transform.interceptor";

describe("AppController (e2e)", () => {
  let app;
  let bearer;
  let payload;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new TransformInterceptor());

    await app.init();
  });

  it("/api/auth/login (POST) validate email is valid email", () => {
    return request(app.getHttpServer())
      .post("/api/auth/login")
      .send({
        email: "@#!@@/$%%^)(*+_=",
        password: "Test@123456789",
      })
      .expect(400)
      .expect({
        statusCode: 400,
        error: "Bad Request",
        message: ["email must be an email"],
      });
  });

  it("/api/auth/login (POST) validate password is at least 8 characters", () => {
    return request(app.getHttpServer())
      .post("/api/auth/login")
      .send({
        email: "test@gmail.com",
        password: "Ra@<8",
      })
      .expect(400)
      .expect({
        statusCode: 400,
        error: "Bad Request",
        message: ["Password must be at least 8 characters long."],
      });
  });

  it("/api/auth/login (POST) validate password contains at least one special character", () => {
    return request(app.getHttpServer())
      .post("/api/auth/login")
      .send({
        email: "test@gmail.com",
        password: "Raaaaaaa8",
      })
      .expect(400)
      .expect({
        statusCode: 400,
        error: "Bad Request",
        message: ["Password must contain at least one special character."],
      });
  });

  it("/api/auth/login (POST) validate password contains at least one number", () => {
    return request(app.getHttpServer())
      .post("/api/auth/login")
      .send({
        email: "test@gmail.com",
        password: "Raaaaaaa@",
      })
      .expect(400)
      .expect({
        statusCode: 400,
        error: "Bad Request",
        message: ["Password must contain at least one number."],
      });
  });

  it("/api/auth/login (POST) validate password contains at least one letter", () => {
    return request(app.getHttpServer())
      .post("/api/auth/login")
      .send({
        email: "test@gmail.com",
        password: "@12345678",
      })
      .expect(400)
      .expect({
        statusCode: 400,
        error: "Bad Request",
        message: ["Password must contain at least one letter."],
      });
  });

  it("/api/auth/login (POST) try to login with unregistered account", () => {
    return request(app.getHttpServer())
      .post("/api/auth/login")
      .send({
        email: "BeforeCreatedProfiles@gmail.com",
        password: "IDontExist@1234",
      })
      .expect(401)
      .expect({
        statusCode: 401,
        error: "Unauthorized",
        message: "Could not authenticate. Please try again.",
      });
  });

  it("/api/auth/register (POST) create an account", () => {
    return request(app.getHttpServer())
      .post("/api/auth/register")
      .send({
        name: "Test Richard",
        email: "test.test@gmail.com",
        password: "test@123456789",
      })
      .expect(201);
  });

  it("/api/auth/login (POST) login to created account", () => {
    return request(app.getHttpServer())
      .post("/api/auth/login")
      .send({
        email: "test.test@gmail.com",
        password: "test@123456789",
      })
      .expect(201)
      .then((res) => (bearer = res.body.token));
  });

  it("/api/auth/register (POST) validate that the same account fails to register", () => {
    return request(app.getHttpServer())
      .post("/api/auth/register")
      .send({
        name: "test sir",
        email: "test.test@gmail.com",
        password: "test@123456789",
      })
      .expect(406)
      .expect({
        statusCode: 406,
        error: "Not Acceptable",
        message:
          "The account with the provided email currently exists. Please choose another one.",
      });
  });

  it("/api/auth/register (POST) create an account to delete", () => {
    return request(app.getHttpServer())
      .post("/api/auth/register")
      .send({
        username: "delete",
        name: "to delete",
        email: "delete.test@gmail.com",
        password: "A@123456789",
      })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
