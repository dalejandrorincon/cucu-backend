var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var methodOverride = require("method-override");
const knex = require('./db');
const api = require('./api');

var router = express.Router();

const exphbs = require('express-handlebars');
const path = require('path');

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Permite todos los origins mientras tanto...
app.use(cors());

app.get('/', async (req, res) => {
    try {
        const connectionStatus = await knex.raw('select 1+1 as result');
        if (connectionStatus)
            return res.status(200).send({
                database: 'Connection with Database has been established successfully',
                service: 'CUCU service is still running'
            });
    } catch (error) {
        return res
            .status(500)
            .send({ message: 'Something went wrong with the database' });
    }
});

app.use('/api', api);


router.get('/', function (req, res) {
    res.send("Hello World!");
});
app.use(router);
app.listen(3000, function () {
    console.log("Node server running on http://localhost:3000");
});
