require('dotenv').config()

const express = require('express');
const app = express();
const port = 3000

const cors = require('cors');
const helmet = require('helmet')
const morgan = require('morgan')
const session = require('express-session')
const uuid = require('uuid')
const cookieParser = require('cookie-parser');

// Get database utility
const database = require('./utilities/database')



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const start = async () => {
    
    // create connection to database
    database.connect();
    console.log('Database connected');

    // Logger
    app.use(morgan('combined'));

    //Secure headers
    app.use(helmet());

    app.use(cookieParser())

    //Setup Session
    app.use(session({
        genid: ()=> {
            return uuid.v4()
        }, 
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true, httpOnly: true, maxAge: 86400000 }
    }))

    //Cors setup
    app.use(
        cors({
        origin: "*",
        credentials: true,
        exposedHeaders: ['set-cookie']
    },
    ))

    app.post('/register', (req, res) => {
        res.send({
            message: `${req.body.email} registered!`
        })
    })

    // Setting routes
    app.use(require('./routes'))

    app.listen(port, ()=> {
        console.log(`Server is running on port ${port}`)
    })
}

start();

