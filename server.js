const express = require('express')
const db = require('./db')
const cors = require('cors')
const apiRoutes = require('./routes/apiRoutes')

const app = express()
const PORT = 5000

app.use(express.json())
app.use(cors())

app.use('/api', apiRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

