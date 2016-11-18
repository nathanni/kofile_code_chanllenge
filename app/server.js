const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const initializeData = require('./initializeData');
const apiRouter = require('./route/api');


//global variables for api reference
var orders_cache = [];
var fees_cache = [];
var orders_with_fees_cache = [];
var orders_with_distributions_cache = [];



//initialize the data and save to cache
const server = app.listen(port, () => {
    console.log("server starts on port: " + port);
    initializeData().then((ret) => {
        orders_cache = ret[0][0];
        fees_cache = ret[0][1];
        orders_with_fees_cache = ret[1][0];
        orders_with_distributions_cache = ret[1][1];
        app.use('/api', apiRouter(orders_cache, fees_cache, orders_with_fees_cache, orders_with_distributions_cache));
    })
});



