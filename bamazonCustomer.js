var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    listProducts();
    connection.end;
});

// Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

// The app should then prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.

// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.

function listProducts() {
    connection.query("SELECT * FROM products",
        //hide mySQL index if possible
        function (err, res) {
            if (err) throw err;
            console.table(res);
            promptCustomer(res);
        });
}

function promptCustomer(tableData) {
    inquirer.prompt([
        {
            type: "input",
            name: "productID",
            message: "What is the ID of the product you would like to buy?"
        },
        {
            type: "input",
            name: "quantity",
            message: "How many units would you like to buy?"
        }
    ])



        .then(function (userInput) {
            console.log("\nYou have chosen item #" + userInput.productID);
            tableData[userInput.productID - (parseInt(1))].product_name;
            console.log("Quantity in cart: " + userInput.quantity);

            var desiredProductID = userInput.productID;
            var numWanted = userInput.quantity;
            var numAvailable;
            



            for (i = 0; i < tableData.length; i++) {
                if (parseInt(desiredProductID) === tableData[i].item_id) {
                    numAvailable = tableData[i].stock_quantity
                }
            }
            if (numWanted > numAvailable) {
                console.log("\n Sorry we do not have enough available to fullfil your order. Please choose a lower quantity or select another item.");
                inquirer.prompt([{
                    type: 'confirm',
                    name: 'shop',
                    message: "Is there anything else we can help you with?"
                }])
                // else complete the purchase - ie update the number available in the database
            } else {
                // call another function -> passing through the itemID and numrequested
                // Update table - connection.query
                connection.query("SELECT * FROM products WHERE item_id = ?", [desiredProductID], function (err, response) {
                    console.log(numWanted *= response[0].price)
                }
                )
                // .then
                connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?', [numWanted, desiredProductID], function (err, response) {
                    if (err) throw err;
                })
                inquirer.prompt([{
                    type: 'confirm',
                    name: 'shop',
                    message: "Is there anything else we can help you with?"
                }])
                    .then(function (res) {

                        if (!res.shop) {
                            console.log("Thanks for your business!")
                            process.exit()
                        }

                        // if (res.shop) {
                        //     inquirer.prompt([{
                        //         type: 'confirm',
                        //         name: 'shop',
                        //         message: "What is the next item ID #?"
                        //     }])

                        // }
                    })

            }
        });
}