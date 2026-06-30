const express = require('express')
const app = express()
const routes = require('./Routes/UserRoutes');
const cors = require('cors')
require('dotenv').config()

app.use(cors({
  origin: '*',
  credentials: false
}))

app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "Backend is running ✅", status: "ok" })
})

app.use('/pages', routes)

const PORT = process.env.PORT || 8888
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
