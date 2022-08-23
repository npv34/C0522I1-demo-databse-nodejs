const DBConnect = require("./DBConnect");

class CustomerModel {
    conn;
    constructor() {
        let db = new DBConnect();
        this.conn = db.connect();
    }

    querySQL(sql) {
        return new Promise(((resolve, reject) => {
            this.conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result)
            })
        }))
    }

    async getCustomers(){
        const sql = `SELECT customerNumber, customerName, phone, city 
                 FROM customers LIMIT 0,10`;
        return await this.querySQL(sql)
    }

    async findByName(name) {
        const sql = `SELECT customerNumber, customerName, phone, city 
                 FROM customers WHERE customerName LIKE '%${name}%'`;
        return await this.querySQL(sql)
    }

    async getListOrderOfCustomer(customerId) {
        const sql = `call get_order_customer(${customerId})`;
        return await this.querySQL(sql)
    }
}

module.exports = CustomerModel;
