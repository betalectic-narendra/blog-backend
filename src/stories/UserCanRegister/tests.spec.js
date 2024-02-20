const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();

describe("Test Handler UserCanRegister", () => {
  it("user_can_register", async () => {
    let result = {};
    try {
      result = await testStrategy("UserCanRegister", {
        prepareResult: {
          email: "bob@example.com",
          password: "verySecrective",
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
  
    expect(respondResult).toMatchObject({
      uuid: expect.any(String),
      email: "bob@example.com",
      password: expect.not.stringMatching("verySecretive"),
    });
  });
});


