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
        ["post", "/photos", "CanManagePhotos"],
        ["post", "/register", "UserCanRegister"],
        ["post", "/login", "UserCanLogin"],
        ["put","/photos/:uuid","CanUpdatePhotos"],
        ["delete","/photos/:uuid","CanDeletePhotos"],
        ["get","/photo/:uuid","CanGetPhoto"],
        ["get","/photos","CanGetPhotos"],
        ["post","/my-photos","CanGetMyPhotos"]
      ],
    },
  ];
};
