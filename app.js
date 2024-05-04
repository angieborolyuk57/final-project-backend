const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/auth");
const boardsRouter = require("./routes/boardsRouter");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/welcome", (req, res) => {
  res.send("<h1>Welcome Page</h1>");
});
app.use("/users", authRouter);

app.use("/boards", boardsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
