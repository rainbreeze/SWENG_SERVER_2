// routes.js
const express = require('express');
const userController = require('../controllers/user_controller');  // 컨트롤러 임포트

const userRouter = express.Router();  // 라우터 객체 생성

// 회원가입 라우트
userRouter.post('/register', userController.registerUser);

// 로그인 라우트
userRouter.post('/login', userController.loginUser);

module.exports = userRouter;  // 라우터 내보냄
