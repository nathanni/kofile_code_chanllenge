const jsonfile = require('jsonfile');
const _ = require('underscore');
const feesFile = '../doc/fees.json';
const ordersFile = '../doc/orders.json';

//ENABLE for testing
// readFiles()
//     .then((ret) =>
//         organizeOrders(ret[0], ret[1])
//     )
//     .then((ret) => {
//         console.log(ret[0]);
//         console.log(ret[1]);
//     });


//read fees.json and orders.json
function readFiles() {
    return new Promise(function (resolve, reject) {

        var orders = [];
        var fees = [];
        readFile(ordersFile)
            .then((obj) => {
                orders = obj;
                return readFile(feesFile);
            })
            .then((obj) => {
                fees = obj;
                resolve([orders, fees]);
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


function organizeOrders(orders, fees) {
    return new Promise(function (resolve, reject) {

        var orders_with_fees = []; //entire orders info with fees
        var orders_with_distributions = []; // entire orders info with distributions
        var total_funds = {};
        var total_other = 0;
        //iterate orders
        for (var i in orders) {

            var order_with_fees = {};
            var order_with_distributions = {};

            //order id
            var order_id = orders[i].order_number;
            order_with_fees["Order Id"] = order_id;
            order_with_distributions["Order Id"] = order_id;

            //order total fees
            var total_price = 0;

            //order funds
            var other_funds = 0;

            //order items in each order
            var order_items = orders[i].order_items;

            //iterator each order item
            for (var j in order_items) {

                //order type to be refereed in fees.json
                var type = order_items[j].type;

                //how many pages
                var pages = order_items[j].pages;



                //calculate for fees
                //search fees in fees.json by type
                var fee = _.where(fees, {"order_item_type": type})[0]['fees'];
                try {
                    //flat file price
                    var first_page_price = fee[0]['amount'];
                    //additional pages price, if this is not accessible will throw exception
                    var additional_pages_price = fee[1]['amount'];
                } catch (err) {
                    //exception  means this type of item only has first_page_price, reset additional pages price to 0
                    additional_pages_price = 0;
                }
                //calculate item price
                var order_item_price = first_page_price * pages + additional_pages_price * (pages - 1);
                var idx = parseInt(j) + 1;
                //save order item price
                order_with_fees["Order Item " + idx] = order_item_price.toFixed(2);
                total_price += order_item_price;



                //calculate for distributions
                //search distributions in fees.json by type
                var distributions = _.where(fees, {"order_item_type": type})[0]['distributions'];

                //extra money associated with the order that isn't allocated to a fund should be assigned to a generic "Other" fund.
                //initial to first_page_price, so we can calculate the remaining price
                var remaining_fund = first_page_price;

                for (var k in distributions) {
                    remaining_fund -= distributions[k]['amount'];

                    var fund_name = distributions[k]['name'];
                    var fund_price = distributions[k]['amount'] * pages;


                    order_with_distributions[fund_name] =
                                            (parseFloat(order_with_distributions[fund_name] ? order_with_distributions[fund_name] : 0)
                                            + parseFloat(fund_price)).toFixed(2);

                    total_funds[fund_name] =
                                            (parseFloat(total_funds[fund_name] ? total_funds[fund_name] : 0)
                                            + parseFloat(fund_price)).toFixed(2);

                }

                //additional page price will be counted as other_funds as well
                other_funds =  (parseFloat(other_funds) + parseFloat(remaining_fund * pages + (pages - 1))).toFixed(2);


            }

            //save to entire orders_with_fees
            order_with_fees["Order Total"] = total_price.toFixed(2); //save order total
            orders_with_fees.push(order_with_fees);

            //save to entire orders_with distributions
            order_with_distributions['Other'] = other_funds;
            total_other = parseFloat(total_other) + parseFloat(other_funds);
            orders_with_distributions.push(order_with_distributions);

            //last order, save total funds
            if (i == orders.length - 1) {
                total_funds['Other'] = total_other.toFixed(2);
                orders_with_distributions.push({'Total Distributions': total_funds});
            }


        }

        resolve([orders_with_fees, orders_with_distributions]);
    });

}

module.exports ={
    readFiles: readFiles,
    organizeOrders: organizeOrders
};