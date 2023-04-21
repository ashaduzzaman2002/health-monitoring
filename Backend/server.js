const express = require('express');
const { dbConnection } = require('./config/db.config');
const app = express();
require('dotenv').config()
const port = 8000 || process.env.PORT

const userRouter = require('./routers/userRoutes')


app.get('/', (req, res) => {
    res.send('Hello')
})

app.use('/user', userRouter)


// connected to the db
dbConnection()
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))