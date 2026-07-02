const express = require("express");
const requestLogger = require("./middleware/logger");
const postsRouter = require("./routes/posts");
const authRouter = require("./routes/auth");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(requestLogger);
app.use("/posts", postsRouter);
app.use("/", authRouter);

app.get("/", (req, res) => {
  res.json({ message: "Data Hub API is running" });
});

app.listen(PORT, () => {
  console.log(`Data Hub server listening on http://localhost:${PORT}`);
});