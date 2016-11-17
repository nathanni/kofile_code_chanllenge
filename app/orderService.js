const jsonfile = require('jsonfile');
const _ = require('underscore');
const feesFile = '../doc/fees.json';
const ordersFile = '../doc/orders.json';

var orders = [];
var fees = [];

readFiles()
    .then(() =>
        calculateFees(orders, fees)
    )
    .then((orders_with_fees) => {
        console.log(orders_with_fees);
        return calculateDistributions(orders, fees)
    });


//read fees.json and orders.json
function readFiles() {
    return new Promise(function (resolve, reject) {

        readFile(ordersFile)
            .then((obj) => {
                orders = obj;
                return readFile(feesFile);
            })
            .then((obj) => {
                fees = obj;
                resolve();
            })
            .catch(err => console.error(err.message));

    });
}


//wrap jsonfile.readFile() as promise
function readFile(filename, options) {
    return new Promise(function (resolve, reject) {
        jsonfile.readFile(filename, options, function (err, obj) {
            if (err) {
                reject(err);
            } else {
                resolve(obj);
            }
        });
    });
}


function calculateFees(orders, fees) {
    return new Promise(function (resolve, reject) {
        var orders_with_fees = []; //entire organized orders info
        for (var i in orders) {
            var order_id = orders[i].order_number;
            var order_with_fees = {};
            order_with_fees["Order_Id"] = order_id; //order id
            var total_price = 0; //order total
            var order_items = orders[i].order_items; //order items in each order
            for (var j in order_items) { //iterator each order item and calculate the price
                var type = order_items[j].type; //order type to be refered in fees.json
                var pages = order_items[j].pages; //how many pages
                var fee = _.where(fees, {"order_item_type": type}); //search in fees.json by type
                try {
                    var first_page_price = fee[0]['fees'][0]['amount']; // flat file price
                    var additional_pages_price = fee[0]['fees'][1]['amount']; //additional pages price, if this is not accessed will throw expection
                } catch (err) {
                    additional_pages_price = 0; //which means this type of item only has first_page_price, reset addtional pages price to 0
                }

                var order_item_price = first_page_price * pages + additional_pages_price * (pages - 1); //calculate item price
                var idx = parseInt(j) + 1;
                order_with_fees["Order_Item" + idx] = order_item_price.toFixed(2); //save order item price
                total_price += order_item_price;
            }
            order_with_fees["Order_Total"] = total_price.toFixed(2); //save order total
            orders_with_fees.push(order_with_fees);
        }
        resolve(orders_with_fees);
    });
}

function calculateDistributions(orders, fees) {
    return new Promise(function (resolve, reject) {

    });
}