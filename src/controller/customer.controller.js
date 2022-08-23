const fs = require('fs');
const qs = require('qs');
const url = require('url')

const CustomerModel = require('../model/customer.model')

class CustomerController {

    customerModel;

    constructor() {
        this.customerModel = new CustomerModel();
    }


    async index(req, res) {
        let customers = await this.customerModel.getCustomers();

        fs.readFile('./views/customers/list.html', 'utf8', ((err, data) =>  {
            if (err) {
                throw new Error(err.message)
            }

            let html = '';
            customers.forEach((item, index) => {
                html += "<tr>";
                html += `<td>${index + 1}</td>`;
                html += `<td>${item.customerName}</td>`;
                html += `<td>${item.phone}</td>`;
                html += `<td>${item.city}</td>`;
                html += `<td><a href="/customers/orders?id=${item.customerNumber}" class="btn btn-success">Xem đơn hàng</a></td>`;
                html += "</tr>";
            })
            data = data.replace('{list-customers}', html)
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            res.end();
        }))
    }

    async searchCustomer(req, res) {
        let keyword = qs.parse(url.parse(req.url).query).keyword;

        let customers = await this.customerModel.findByName(keyword);

        let html = '';
        if (customers.length > 0) {
            customers.forEach((item, index) => {
                html += "<tr>";
                html += `<td>${index + 1}</td>`;
                html += `<td>${item.customerName}</td>`;
                html += `<td>${item.phone}</td>`;
                html += `<td>${item.city}</td>`;
                html += `<td><a href="/customers/orders?id=${item.customerNumber}" class="btn btn-success">Xem đơn hàng</a></td>`;

                html += "</tr>";
            })
        } else {
            html += "<tr>";
            html += `<td colspan="4" class="text-center">Không có dữ liệu</td>`;
            html += "</tr>";
        }

        fs.readFile('./views/customers/list.html', 'utf8', ((err, data) =>  {
            if (err) {
                throw new Error(err.message)
            }

            data = data.replace('{list-customers}', html)
            data = data.replace(' <input type="text" name="keyword" placeholder="Enter your name" class="form-control">', `<input type="text" name="keyword" value="${keyword}" placeholder="Enter your name" class="form-control">`)
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            res.end();
        }))
    }

    async showListOrder(req, res) {
        let customerID = qs.parse(url.parse(req.url).query).id;
        let result = await this.customerModel.getListOrderOfCustomer(customerID)
        let nameCustomer = result[0][0].customerName;
        let phone = result[0][0].phone;
        let city = result[0][0].city;
        let country = result[0][0].country;
        let listOrder = result[0][0];

        fs.readFile('./views/customers/order.html', 'utf8', (err, data) => {
            data = data.replace('{name}', nameCustomer)
            data = data.replace('{phone}', phone)
            data = data.replace('{city}', city)
            console.log(nameCustomer)
            res.end(data)
        })


    }
 }

module.exports = CustomerController;
