const express = require("express");
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const conn = require("./src/databases/connection");

const userRouter = require("./src/routes/user");
const dataRouter = require("./src/routes/data");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/data", dataRouter);

const initApp = async () => {
  try {
    await conn.authenticate();
    console.log("Success to Connect");
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  } catch (error) {
    console.error("Failed to Connect", error);
  }
};

initApp();

module.exports = app;
