// routes/auth.js
const express = require("express");
const router = express.Router();

// POST /login - mock auth, just checks fields exist and hands back a fake JWT
// NOTE: this is NOT a real JWT (no signing, no secret). Just a 3-part base64-ish
// string so the shape looks right for the demo. Real auth is a later sprint.
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "username and password are required" });
  }

  const fakeHeader = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64");
  const fakePayload = Buffer.from(
    JSON.stringify({ user: username, iat: Date.now() })
  ).toString("base64");
  const fakeSignature = "mocksignature123";

  const mockToken = `${fakeHeader}.${fakePayload}.${fakeSignature}`;

  res.json({
    message: "Login successful (mock)",
    token: mockToken,
  });
});

module.exports = router;
