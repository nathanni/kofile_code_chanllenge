const express = require('express');
const router = express.Router();


var orderRouter = function (orders, fees, orders_with_fees, orders_with_distributions) {

    //get all fees info
    router.get('/fees', (req, res) => {
        res.json(orders_with_fees);
    });


    //get all distributions
    router.get('/distributions', (req, res) => {
        res.json(orders_with_distributions);
    });

    //get fees by ids
    router.get('/fees/:id', (req, res) => {
        var id = req.params.id;
        var idArr = [];
        idArr = id.split(',');
        var foundDatas = [];
        for (var i in idArr) {
            var foundData = orders_with_fees.filter((obj) => {
                return obj['Order Id'] === idArr[i];
            })[0]; // gets first match (probably only match)
            foundDatas.push(foundData);
        }
        res.send(foundDatas);
    });


    //get distibutions by ids
    router.get('/distributions/:id', (req, res) => {
        var id = req.params.id;
        var idArr = [];
        idArr = id.split(',');
        var foundDatas = [];
        for (var i in idArr) {
            var foundData = orders_with_distributions.filter((obj) => {
                return obj['Order Id'] === idArr[i];
            })[0]; // gets first match (probably only match)
            foundDatas.push(foundData);
        }

        res.send(foundDatas);

    });

    return router;
};


module.exports = orderRouter;