// routes/user_router.js
const express = require('express');
const UserController = require('../controllers/user_controller'); // UserController 임포트

class UserRouter {
    constructor(db) {
        this.db = db; // DB 객체 주입
        this.userController = new UserController(db); // UserController 인스턴스 생성
        this.router = express.Router();
        this.initializeRoutes();
    }

    // 라우트 초기화
    initializeRoutes() {
        this.router.post('/register', (req, res) => this.userController.registerUser(req, res));
        this.router.post('/login', (req, res) => this.userController.loginUser(req, res));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = UserRouter;
