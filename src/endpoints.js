module.exports = (app) => {
  app.get("/liveness", async (req, res) => {
    return res.code(200).send({ status: "I am alive" });
  });

  app.get("/readiness", async (req, res) => {
    return res.code(200).send({ status: "I am ready" });
  });

  app.post("/mirror", async (req, res) => {
    return res.code(200).send(req.body);
  });

  return [
    {
      endpoints: [

        ["post", "/register", "UserCanRegister"],
        ["post", "/login", "UserCanLogin"],
        ["get","/blogs","GetAllBlogs"],
        ["post", "/blogs", "AddBlogs"],
        ["post","/user-blogs","GetUserBlogs"],
        ["put","/blogs/:uuid","UpdateUserBlogs"],
        ["delete","/blogs/:uuid","RemoveBlog"],

      ],
    },
  ];
};
