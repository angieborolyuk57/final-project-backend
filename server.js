const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Anhelina:WYaQMNLNimB0ydbK@cluster0.mnkibze.mongodb.net/task_pro";

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log;
      ("Server is running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
