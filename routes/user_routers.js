// routes.js
const express = require('express');
const db = require('../db/database'); // DB 연결 객체 임포트

const userRouter = express.Router();  // router -> userRouter로 이름 변경

// 회원가입 라우트
userRouter.post('/register', (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ message: '사용자 이름, 비밀번호, 역할을 입력하세요.' });
    }

    // 역할이 '멘토' 또는 '멘티'인지 확인
    if (role !== '멘토' && role !== '멘티') {
        return res.status(400).json({ message: '잘못된 역할입니다. 멘토 또는 멘티만 가능합니다.' });
    }

    // 사용자 존재 여부 확인
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('DB 오류:', err);
            return res.status(500).json({ message: '서버 오류' });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: '이미 존재하는 사용자입니다.' });
        }

        // 새 사용자 삽입
        db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role], (err, result) => {
            if (err) {
                console.error('DB 오류:', err);
                return res.status(500).json({ message: '서버 오류' });
            }

            res.status(201).json({ message: '회원가입 성공' });
        });
    });
});

// 로그인 라우트
userRouter.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: '사용자 이름과 비밀번호를 입력하세요.' });
    }

    // 사용자 확인
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) {
            console.error('DB 오류:', err);
            return res.status(500).json({ message: '서버 오류' });
        }
        if (results.length === 0) {
            return res.status(400).json({ message: '사용자 이름 또는 비밀번호가 잘못되었습니다.' });
        }

        // 로그인 성공 후 role 정보 반환
        const userRole = results[0].role;
        res.status(200).json({ message: '로그인 성공', role: userRole });
    });
});

module.exports = userRouter;  // router를 userRouter로 내보냄
