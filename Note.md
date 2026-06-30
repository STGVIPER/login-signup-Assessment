# Node.js Day 4 — Login & Signup with JWT Auth

## 🚀 Live Demo
- **Frontend (Vercel)** → https://full-stack-bootcamp-nine.vercel.app/login
- **Backend (Render)** → https://auth-backend-vtsx.onrender.com

---

## Topics Covered
- User Registration with bcrypt password hashing
- User Login with JWT token generation
- JWT Middleware for protected routes
- Deploying backend on **Render**
- Deploying frontend on **Vercel**

---

## Packages Used

| Package | Purpose |
|---|---|
| `express` | Web framework |
| `bcrypt` | Password hashing |
| `jsonwebtoken` | JWT token generation & verification |
| `cors` | Allow frontend to talk to backend |
| `dotenv` | Read environment variables from `.env` file |
| `nodemon` | Auto-restart server on file change (dev only) |

Install all at once:
```bash
npm install express bcrypt jsonwebtoken cors dotenv
npm install nodemon --save-dev
```

---

## Project Structure

```
Login-signup-backend/
├── index.js               → Entry point, Express server
├── Controller/
│   └── Api.js             → register, login, home, dashboard logic
├── Routes/
│   └── UserRoutes.js      → All API routes defined here
├── Middleware/
│   └── auth.js            → JWT verification middleware
├── .env                   → Secret keys (never push to GitHub)
└── package.json
```

---

## index.js — Server Setup

```js
const express = require('express')
const app = express()
const routes = require('./Routes/UserRoutes')
const cors = require('cors')

app.use(cors({ origin: '*' }))   // Allow all origins
app.use(express.json())          // Parse JSON request body

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" })
})

app.use('/pages', routes)        // All routes prefixed with /pages

app.listen(8888, () => {
  console.log("Server running on port 8888")
})
```

---

## Routes — UserRoutes.js

```js
const route = require("express").Router()
const { login, register, home, dashboard } = require("../Controller/Api")
const auth = require('../Middleware/auth')

route.post("/register", register)       // Public
route.post("/login", login)             // Public
route.get('/home', home)                // Public
route.get('/dashboard', auth, dashboard) // Protected — needs JWT token

module.exports = route
```

### API Endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/pages/register` | No | Register new user |
| POST | `/pages/login` | No | Login user |
| GET | `/pages/home` | No | Public page |
| GET | `/pages/dashboard` | Yes | Protected page |

---

## Controller — Api.js

### Register
```js
const register = (req, res) => {
  const data = req.body

  // Check if email already exists
  const account = arr.find((item) => item.email === data.email)
  if (account) return res.send({ msg: "Email already exists" })

  // Hash password before saving
  data.password = bcrypt.hashSync(data.password, 10)
  arr.push(data)

  // Generate JWT token
  const token = jwt.sign({ user: data.email }, secretKey)
  res.send({ msg: "Registered successfully", token })
}
```

### Login
```js
const login = async (req, res) => {
  const data = req.body

  const account = arr.find((item) => item.email === data.email)
  if (!account) return res.send("User not registered")

  // Compare entered password with hashed password
  const match = await bcrypt.compare(data.password, account.password)
  if (match) {
    const token = jwt.sign({ user: data.email }, secretKey, { expiresIn: "365d" })
    return res.send({ msg: "Login successful", token })
  } else {
    return res.send("Password is incorrect")
  }
}
```

---

## Middleware — auth.js (JWT Verification)

```js
const jwt = require('jsonwebtoken')
const secretKey = 'mohit'

const auth = (req, res, next) => {
  const data = req.headers["authorization"]  // "Bearer <token>"
  const token = data.split(' ')[1]           // Extract token

  if (token) {
    jwt.verify(token, secretKey, (err, validate) => {
      if (err) return res.send("Error while accessing")
      if (validate) return next()              // Token valid → proceed
      return res.send("User not authorized")
    })
  } else {
    return res.send({ msg: "No token provided" })
  }
}

module.exports = auth
```

### How to send token from frontend/Postman:
```
Header → Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

---

## How JWT Works

```
1. User registers/logs in
        ↓
2. Server creates a token:
   jwt.sign({ user: email }, secretKey, { expiresIn: "365d" })
        ↓
3. Token sent to frontend → stored in localStorage
        ↓
4. On protected routes, frontend sends:
   Authorization: Bearer <token>
        ↓
5. Middleware verifies token with jwt.verify()
        ↓
6. If valid → next() → access granted
   If invalid → access denied
```

---

## bcrypt — Password Hashing

```js
// Hashing (during register)
const hashed = bcrypt.hashSync("mypassword", 10)
// → "$2b$10$gJLAsucy2yviXq..."

// Comparing (during login)
const match = await bcrypt.compare("mypassword", hashed)
// → true or false
```

> Never store plain text passwords. bcrypt is a one-way hash — you can never reverse it back to the original password.

---

## Deployment

### Backend → Render

| Field | Value |
|---|---|
| Root Directory | `Node-Day4/Login-signup-backend` |
| Build Command | `npm install` |
| Start Command | `node index.js` |
| Env Variable PORT | `8888` |
| Env Variable FRONTEND_URL | `*` |

### Frontend → Vercel

| Field | Value |
|---|---|
| Root Directory | `Node-Day4/frontend` |
| Framework | Create React App |
| Env Variable | `REACT_APP_API_URL=https://your-backend.onrender.com` |

---

## Common Errors & Fixes

| Error | Cause | Fix |
|---|---|---|
| `Cannot find module 'ajv'` | Node version conflict | `npm install --legacy-peer-deps` |
| `Not Found` on Render | Wrong start command | Use `node index.js` not `yarn start` |
| `Network Error` on frontend | Backend not running | Start backend first |
| `Password is incorrect` | Wrong password entered | Re-check password |
| `User not authorized` | Token missing/expired | Login again to get new token |

---

## Key Concepts Summary

- **bcrypt** → hash passwords so they are never stored as plain text
- **JWT** → stateless token-based authentication, no session needed
- **Middleware** → runs before the route handler to check auth
- **CORS** → allows the frontend domain to make requests to the backend
- **Environment Variables** → keep secrets like `JWT_SECRET` out of code
