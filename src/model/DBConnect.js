const mysql = require('mysql')
class DBConnect {
    host;
    port;
    user;
    database;
    password
    constructor() {
        this.host = '127.0.0.1';
        this.port = 3306;
        this.database = 'classicmodels';
        this.user = 'admin';
        this.password = '123456@Abc'
    }

    connect() {
        return mysql.createConnection({
            host: this.host,
            database: this.database,
            port: this.port,
            user: this.user,
            password: this.password
        })
    }
}

module.exports = DBConnect;
