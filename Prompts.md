# Prompts.md

Log of AI prompts used during Sprint 09 for debugging / concept explanation.

---

**Prompt:** why is req.body coming back undefined when I send a POST in postman, even though I added the body and set it to JSON

**What I learned:** Express doesn't parse JSON bodies automatically, you have to manually mount express.json() as middleware before your routes, otherwise req.body is just undefined. Added `app.use(express.json())` in server.js before my routes and it started working.

---

**Prompt:** difference between app.use() and app.get()/app.post() in express, kept getting confused about when middleware runs

**What I learned:** app.use() runs for every request regardless of method or specific path (unless you scope it), while app.get/post/etc only run for that exact method+route match. That's why my logger needs to be app.use() — I want it to fire for GET, POST, PUT, DELETE, all of it, before it even reaches the route handler.

---

**Prompt:** my DELETE route says post not found even when I pass a valid id, what am I doing wrong

**What I learned:** req.params.id always comes through as a string, even if the id stored in my array is a number. Was comparing string to number directly so it never matched. Fixed by wrapping it with parseInt() before comparing.

---

**Prompt:** what's the actual point of a JWT, just need the concept for this sprint not full implementation

**What I learned:** JWT is basically three base64 encoded parts (header, payload, signature) joined by dots. The signature part is what proves it wasn't tampered with, normally signed server-side with a secret key. For this sprint I'm just mocking the shape of it since real signing/verification isn't required yet, that's coming later.

---

**Prompt:** nodemon installed but npx nodemon server.js not restarting on save, is there a config issue

**What I learned:** turned out my terminal was still pointed at the wrong folder root from an earlier mkdir, nodemon was technically running but watching an empty directory. Re-ran from the project root and it picked up file changes properly.

