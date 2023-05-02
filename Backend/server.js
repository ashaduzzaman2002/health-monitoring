const express = require('express');
const { dbConnection } = require('./config/db.config');
const app = express();
require('dotenv').config()
const port = 8000 || process.env.PORT

const patientRouter = require('./routers/patientRoute')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello')
})

app.use('/api/patient', patientRouter)


// connected to the db
dbConnection()
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))