const express = require('express');
const router = express.Router();


var orderRouter = function (orders, fees, orders_with_fees, orders_with_distributions) {
    router.get('/fees', (req, res) => {
        res.json(orders_with_fees);
    });

    router.get('/distributions', (req, res) => {
        res.json(orders_with_distributions);
    });

    router.get('/fees/:id', (req, res) => {
        var id = req.params.id;
        var foundData = orders_with_fees.filter((obj) => {
            return obj['Order Id'] === id;
        })[0]; // gets first match (probably only match)
        res.send(foundData);
    });


    router.get('/distributions/:id', (req, res) => {
        var id = req.params.id;
        var foundData = orders_with_distributions.filter((obj) => {
            return obj['Order Id'] === id;
        })[0]; // gets first match (probably only match)
        res.send(foundData);
    });

    return router;
};


module.exports = orderRouter;