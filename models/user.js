// models/user.js
class User {
    constructor(db) {
        this.db = db; // DB 객체 주입
    }

    // 사용자 존재 여부 확인
    async checkUserExist(username) {
        const query = 'SELECT * FROM users WHERE username = ?';
        const result = await this.db.query(query, [username]);
        return result;
    }

    // 사용자 추가
    async createUser(username, password, role) {
        const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
        const result = await this.db.query(query, [username, password, role]);
        return result;
    }

    // 사용자 로그인 확인
    async verifyUserLogin(username, password) {
        const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
        const result = await this.db.query(query, [username, password]);
        return result;
    }
}

module.exports = User;
