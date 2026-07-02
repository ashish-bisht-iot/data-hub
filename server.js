// server.js
const express = require("express");
const requestLogger = require("./middleware/logger");
const postsRouter = require("./routes/posts");
const authRouter = require("./routes/auth");

const app = express();
const PORT = 5000;

// parse JSON bodies - without this req.body is undefined on POST/PUT
app.use(express.json());

// log every request that hits the server
app.use(requestLogger);

// routes
app.use("/posts", postsRouter);
app.use("/", authRouter); // handles POST /login

app.get("/", (req, res) => {
  res.json({ message: "Data Hub API is running" });
});

app.listen(PORT, () => {
  console.log(`Data Hub server listening on http://localhost:${PORT}`);
});
