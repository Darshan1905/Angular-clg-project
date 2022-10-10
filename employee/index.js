const createError = require('http-errors');
let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongodb = require('./database/db.js');
    


mongoose.Promise = global.Promise;
mongoose.connect(mongodb.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected successful !!")
}),
    error => {
        console.log("Database Error:" + error)

    }

// Port and server

const employeeRoute = require("./node-backend/routes/employee.routes");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());
// Create static path

app.use(express.static(path.join(__dirname, 'dist/employeedb')));

// API roor

app.use('/api', employeeRoute);

// POrt Create

const port = process.env.port || 8000;
app.listen(port, () => {
    console.log('Listening Port on;' + port);
})

// 404 error handler

app.use((req,res,next)=>{
    next(createError(404));
});

// Base route

app.get('/', (req,res)=>{
    res.send('Invalid Endpoint');
});

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,'dist/employeedb/index.html'));
});

app.use(function(err,req,res,next){
    console.log(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

