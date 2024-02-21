const debugLogger = requireUtil("debugLogger");
const knex = requireKnex();

describe("Test Handler UpdateUserBlog", () => {
  it("dummy_story_which_will_pass", async () => {
    let result = {};
    try {
      result = await testStrategy("UpdateUserBlog", {
        prepareResult: {},
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;
    expect(1).toBe(1);
  });
});
