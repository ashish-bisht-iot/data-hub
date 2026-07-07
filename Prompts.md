# Prompts.md
Documents every AI interaction during this project.

---

**Prompt 1:** why is req.body coming back undefined when I send a POST in postman, even though I added the body and set it to JSON

**What I learned:** Express doesn't parse JSON bodies automatically, you have to manually mount express.json() as middleware before your routes, otherwise req.body is just undefined. Added `app.use(express.json())` in server.js before my routes and it started working.

---

**Prompt 2:** difference between app.use() and app.get()/app.post() in express, kept getting confused about when middleware runs

**What I learned:** app.use() runs for every request regardless of method or specific path (unless you scope it), while app.get/post/etc only run for that exact method+route match. That's why my logger needs to be app.use() — I want it to fire for GET, POST, PUT, DELETE, all of it, before it even reaches the route handler.

---

**Prompt 3:** my DELETE route says post not found even when I pass a valid id, what am I doing wrong

**What I learned:** req.params.id always comes through as a string, even if the id stored in my array is a number. Was comparing string to number directly so it never matched. Fixed by wrapping it with parseInt() before comparing.

---

**Prompt 4:** what's the actual point of a JWT, just need the concept for this sprint not full implementation

**What I learned:** JWT is basically three base64 encoded parts (header, payload, signature) joined by dots. The signature part is what proves it wasn't tampered with, normally signed server-side with a secret key. For this sprint I'm just mocking the shape of it since real signing/verification isn't required yet, that's coming later.

---

**Prompt 5:** nodemon installed but npx nodemon server.js not restarting on save, is there a config issue

**What I learned:** turned out my terminal was still pointed at the wrong folder root from an earlier mkdir, nodemon was technically running but watching an empty directory. Re-ran from the project root and it picked up file changes properly.

---

**Prompt 6:** I keep getting a 400 "E11000 duplicate key error" when I POST to /users, is something wrong with how I set up Mongoose

**What I learned:** it wasn't actually a bug. I had put a unique index on the email field in my User schema, and I kept resending the same email while testing. Mongo was correctly rejecting the duplicate. I got why this matters too — it's not just an annoying error, it's the constraint doing its job, so I ended up treating it as a valid test case rather than something to "fix."

---

**Prompt 7:** before I push, how do I actually check that my .env file isn't going to get committed by accident

**What I learned:** `git status` shows tracked/staged changes, so if .env doesn't appear anywhere in that output (not even under untracked), it means .gitignore is correctly excluding it. I also asked about commit structure and learned it's better to group commits by what they logically change — server/config code, then env example + gitignore, then screenshots, then README last — instead of dumping everything into one commit, since it makes the history easier to read later.

---

**Prompt 8:** my server works fine locally but Render logs show "MongoDB connection failed: the uri parameter must be a string, got undefined" — why would it work on my machine and not there

**What I learned:** Render doesn't read my local .env file at all in production — environment variables have to be added manually in the Render dashboard's Environment tab, and the key name there has to match exactly what my code reads via process.env. My db.js was reading process.env.MONGO_URI, but I hadn't added that variable on Render (or had it under a different name). Adding it with the exact matching name and letting Render redeploy fixed it — confirmed by seeing "MongoDB connected: ..." in the logs instead of the error.

---

**Prompt 9:** I'm planning my demo video and don't want to fumble on camera — how should I structure it so it actually proves the live deployment works, not just localhost

**What I learned:** proving persistence means showing the same data in two places — the API response and the Atlas dashboard — right after each other, not just showing one or the other. I also realized my Post model needs a real user's authorId to demonstrate the populate() relationship properly, so the order matters: create the user first, copy its _id from the response, then use that id when creating the post. Otherwise the populated author field on GET /posts would be empty and the demo wouldn't actually prove the relationship works.

---

**Prompt 10:** why does my Render app take forever to respond the first time I hit it after not using it for a while

**What I learned:** free-tier Render instances spin down after a period of inactivity, so the first request has to "wake" the server back up, which can take 50+ seconds. It's not a bug in my code — it's a platform limitation of the free tier. For the demo video specifically, I learned to send one throwaway request before I start recording so the instance is already warm, instead of getting a dead pause in the middle of the video.