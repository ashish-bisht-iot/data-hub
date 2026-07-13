require("dotenv").config();

const express = require("express");
const requestLogger = require("./middleware/logger");
const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const connectDB = require("./db");

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(requestLogger);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/", authRouter);
app.get("/", (req, res) => {
  res.json({ message: "Data Hub API is running" });
});

app.listen(PORT, () => {
  console.log(`Data Hub server listening on http://localhost:${PORT}`);
});
