const http = require('http');
const url = require('url')
const CustomerController = require("./src/controller/customer.controller");
const PORT = 8000;

let customerController = new CustomerController();

const server = http.createServer(((req, res) => {
    let urlPath = url.parse(req.url).pathname;

    switch (urlPath) {
        case '/customers':
            customerController.index(req, res).catch(err => {
                console.log(err.message);
            });
            break;
        case '/customers/search':
            customerController.searchCustomer(req, res).catch()
            break;

        case '/customers/orders':
            customerController.showListOrder(req, res).catch();
            break;

        default:
            res.end();
    }
}))

server.listen(PORT, 'localhost', () => {
    console.log(`server listening on http://localhost:${PORT}`)
})
