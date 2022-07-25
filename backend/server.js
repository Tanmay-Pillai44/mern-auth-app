const express = require('express')
const path = require('path');
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8080
const cors = require("cors")
const authRoutes = require("./routes/auth.route")
const employeesRoutes = require('./routes/employees.route')
const connectDB = require('./config/db')
const { errorHandler } = require('./middlewares/error.middleware')

connectDB()

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/auth', authRoutes)
app.use('/api/employees', employeesRoutes)

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
        )
    );
} else {
    app.get('/', (req, res) => res.send('Please set to production'));
}


app.use(errorHandler)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


// mongodb+srv://omtej4499:<password>@mycluster.5g2hlqv.mongodb.net/authapp -- mongodb compass connect