# AuthFlow — Login & Signup Assessment

A full-stack authentication app built with React + Node.js/Express using JWT.

🔗 **Live Demo:** [https://login-signup-assessment.vercel.app](https://login-signup-assessment.vercel.app/login)  
⚙️ **Backend API:** [https://login-signup-assessment-8qzo.onrender.com](https://login-signup-assessment-8qzo.onrender.com)

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React, React Router, CSS |
| Backend | Node.js, Express.js |
| Auth | JWT (jsonwebtoken) |
| Password | bcrypt |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

---

## Features

- ✅ User Signup with name, email, password
- ✅ Password strength meter
- ✅ User Login with JWT token
- ✅ Protected Dashboard route
- ✅ Logout functionality
- ✅ Responsive dark UI

---

## Project Structure

```
login-signup-Assessment/
├── frontend/                  # React app
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   └── Dashboard.js
│   │   ├── components/
│   │   │   └── Scene.js
│   │   ├── api.js
│   │   └── App.js
│   ├── .env.example
│   └── vercel.json
│
└── Login-signup-backend/      # Express API
    ├── Controller/
    │   └── Api.js
    ├── Routes/
    │   └── UserRoutes.js
    ├── Middleware/
    │   └── auth.js
    ├── .env.example
    └── index.js
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/pages/register` | Register new user |
| POST | `/pages/login` | Login user |
| GET | `/pages/dashboard` | Protected route (JWT required) |

---

## Run Locally

### Backend
```bash
cd Login-signup-backend
npm install
node index.js
# runs on http://localhost:8888
```

### Frontend
```bash
cd frontend
npm install
npm start
# runs on http://localhost:3000
```

Create `frontend/.env`:
```
REACT_APP_API_URL=http://localhost:8888
```

---

## Deployment

- **Frontend** → [Vercel](https://vercel.com) with root directory `frontend`
- **Backend** → [Render](https://render.com) with root directory `Login-signup-backend`

---

## Author

**Kunal Rai** — [@STGVIPER](https://github.com/STGVIPER)
