const Config = require("./config")();
const httpServer = requireHttpServer();
const server = httpServer({});

server.listen(
  { port: process.env.PORT || 3000, host: "localhost" },
  (err, address) => {
    console.log("ADDRESS", address)
    if (err) {
      console.log(err);
      process.exit(1);
    }
  }
);
