const express = require('express');
const { dbConnection } = require('./config/db.config');
const app = express();
require('dotenv').config()
const cors = require('cors')
const port = 8000 || process.env.PORT

// Import Routes
const patientRouter = require('./routers/patientRoute')


// Midleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello')
})

app.use('/api/patient', patientRouter)

app.get('/test', (req, res) => {
    res.json({ok: 'ok'})
    console.log('ok');
})


// connected to the db
dbConnection()
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))