const express = require('express');
const { dbConnection } = require('./config/db.config');
const app = express();
require('dotenv').config()
const cors = require('cors')
const port = 8000 || process.env.PORT

// Import Routes
const patientRouter = require('./routers/patientRoute')
const wacthRoter = require('./routers/watchRoute')
const adminRouter = require('./routers/adminRoute')
const doctorRouter = require('./routers/doctorRoute')
const apointmentRouter = require('./routers/apointmentRoute')
const alertRouter = require('./routers/alertRoute')


// Midleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello')
})

app.use('/api/patient', patientRouter)

app.use('/api/smart-watch', wacthRoter)
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/apointment', apointmentRouter)
app.use('/api/alert', alertRouter)

// connected to the db
dbConnection()
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))