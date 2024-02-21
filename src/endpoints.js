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
        ["post", "/blogs", "AddBlog"],
        ["get","/blogs","GetAllBlogs"],
        ["post", "/blogs/:uuid", "GetBlog"],
        ["post","/user-blogs","GetBlogs"],
        ["delete","/blogs/:uuid","RemoveBlog"],
        ["put","/blogs/:uuid","UpdateBlog"],

      ],
    },
  ];
};
