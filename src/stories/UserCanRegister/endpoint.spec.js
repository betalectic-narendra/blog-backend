const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();

describe("Test API UserCanRegister", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`, // An authenticated user is making the api call
    };
  });

  it("user_can_register", async () => {
    let respondResult;
    try {
      const app = httpServer();
  
      const payload = {
        email: "bob@example.com",
        password: "verySecrective",
      };
  
      respondResult = await app.inject({
        method: "POST",
        url: "/register",
        payload,
      });
    } catch (error) {
      respondResult = error;
    }
  
    expect(respondResult.statusCode).toBe(200);
    expect(respondResult.json()).toMatchObject({
      uuid: expect.any(String),
      email: "bob@example.com",
      password: expect.not.stringMatching("verySecretive"),
    });
  });
});
