// models/user.js
const db = require('../db/database');  // DB 연결 객체 임포트

// 사용자 존재 여부 확인
const checkUserExist = (username) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// 사용자 추가
const createUser = (username, password, role) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// 사용자 로그인 확인
const verifyUserLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = { checkUserExist, createUser, verifyUserLogin };
