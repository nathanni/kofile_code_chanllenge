const orderService = require('./orderService');


// function to initialize
// 1. read files
// 2. organize the orders
function initializeData() {

    return new Promise(function (resolve, reject) {
        orderService.readFiles()
            .then((ret) => {
                orderService.organizeOrders(ret[0], ret[1])
                    .then((ret2) => {
                        resolve([ret, ret2]);
                    })
            })
    })
}


module.exports = initializeData;