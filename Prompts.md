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

**Prompt 7:** I don't want to just push and hope for the best — walk me through how to actually verify my .env isn't going to leak into the commit, and help me understand what a "clean" commit history should even look like here, not just give me the commands
 
**What I learned:** `git status` shows tracked/staged changes, so if .env doesn't appear anywhere in that output (not even under untracked), it means .gitignore is correctly excluding it. I also understood *why* commit structure matters, not just how to do it — grouping commits by what they logically change (server/config code, then env example + gitignore, then screenshots, then README last) makes the project's history readable to someone else later, instead of one dump-everything commit that hides the reasoning behind each change.
 
---
 
**Prompt 8:** Mongoose keeps throwing a connection timeout / "could not connect to any servers" error even though my URI looks right — before I start randomly editing the connection string, help me understand what's actually going on here
 
**What I learned:** the issue wasn't my code or my URI at all — Atlas blocks external IP addresses by default as a security measure, so my own machine's IP wasn't whitelisted under Network Access. Understanding *why* the block exists (not just how to remove it) made it click: it's a safeguard, not a bug I introduced. Added my IP (and 0.0.0.0/0 for dev purposes) under Network Access and the connection succeeded immediately after.
 
---
 
**Prompt 9:** I understand populate() replaces a referenced ObjectId with the actual document, but I want to actually understand *why* my schema needs to be shaped a certain way for that to work, not just copy a populate() call and hope it runs
 
**What I learned:** populate() only works because the Post schema's authorId field is explicitly typed as `mongoose.Schema.Types.ObjectId` with a `ref: 'User'` pointing at the model name — that ref is what tells Mongoose which collection to look in when it hydrates the field. Without declaring that relationship in the schema itself, calling .populate('authorId') would just silently return the raw ObjectId. Working through this myself also clarified why the User has to exist and be referenced *before* the Post is created — the relationship is enforced at the data level, not just the query level.
 
---
 
**Prompt 10:** for the "Top 3 Most Recent Posts" route, I don't want to just ask for a working aggregation snippet — help me reason through what MongoDB is actually doing when it sorts and limits, so I understand the query instead of memorizing it
 
**What I learned:** sorting by `createdAt: -1` orders documents newest-first because -1 means descending, and `.limit(3)` is applied *after* the sort, not before — so the order of chaining actually matters conceptually even if not syntactically. I also understood why this needs to happen at the database level via the query rather than fetching everything and slicing the array in JavaScript: it's far less efficient to pull the whole collection into memory just to discard most of it, especially as the Posts collection grows.
