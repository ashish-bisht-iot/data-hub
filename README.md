# The Data Hub

A small Express REST API server for a mock Blog resource. In-memory storage for now (DB comes in Sprint 10), custom request logging middleware, and a mock login endpoint that hands back a JWT-shaped token.

**Live API:** https://data-hub-5hv9.onrender.com

**Repo:** https://github.com/ashish-bisht-iot/data-hub

## Project structure

```
data-hub/
├── server.js              # app setup, mounts middleware + routes, starts on port 5000
├── routes/
│   ├── posts.js           # all 5 CRUD endpoints for the Blog resource
│   └── auth.js            # mock /login endpoint
├── middleware/
│   └── logger.js          # logs method + path + timestamp for every request
├── Prompts.md             # debugging log
└── README.md
```

## Endpoints

| Method | Route        | Description              |
|--------|--------------|---------------------------|
| GET    | /posts       | Get all posts             |
| GET    | /posts/:id   | Get a single post by id   |
| POST   | /posts       | Create a new post         |
| PUT    | /posts/:id   | Update an existing post   |
| DELETE | /posts/:id   | Delete a post              |
| POST   | /login       | Mock login, returns fake JWT |

## Screenshots

**GET /posts**
![GET all posts](screenshots/get-posts.png)

**POST /posts**
![Create post](screenshots/post-create.png)

**PUT /posts/:id**
![Update post](screenshots/put-update.png)

**DELETE /posts/:id**
![Delete post](screenshots/delete-post.png)

**POST /login**
![Mock JWT login](screenshots/post-login.png)

**Logger middleware in action**
![Server console logs](screenshots/logger-console.png)

## Testing in Postman / Thunder Client

**Get all posts**
```
GET /posts
```

**Create a post**
```
POST /posts
Body (JSON):
{
  "title": "My first post",
  "content": "Testing the API"
}
```

**Update a post**
```
PUT /posts/1
Body (JSON):
{
  "title": "Updated title"
}
```

**Delete a post**
```
DELETE /posts/1
```

**Mock login**
```
POST /login
Body (JSON):
{
  "username": "ashish",
  "password": "anything"
}
```

Swap `localhost:5000` for the live Render URL above once it's deployed. Every request — local or live — gets logged in the server console like:
```
[GET] /posts - 10:05:23 AM
```

## Notes / known limitations

- Data resets on every server restart since it's just an array in memory, no real DB yet.
- `/login` does NOT do real auth — no password hashing, no signature verification, no secret key. It just returns something shaped like a JWT so the endpoint demonstrates the right contract. Wiring up real verification felt out of scope until persistence exists anyway.
- Deployed to Render instead of Vercel since Vercel's serverless functions aren't a great fit for a long-running Express server with in-memory state — state would reset between invocations.
