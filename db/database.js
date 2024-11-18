// db/database.js
const mysql = require('mysql2');
require('dotenv').config();

class Database {
    constructor() {
        this.db = mysql.createConnection({
            uri: process.env.MYSQL_PUBLIC_URL, // 공용 URL을 사용
        });
    }

    // MySQL 연결
    connect() {
        return new Promise((resolve, reject) => {
            this.db.connect((err) => {
                if (err) {
                    reject('MySQL 연결 오류: ' + err);
                } else {
                    resolve('MySQL에 연결되었습니다.');
                }
            });
        });
    }

    // 쿼리 실행
    query(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.query(sql, params, (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}

module.exports = Database;
