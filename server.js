const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors'); // CORS 모듈 추가
const app = express();
const port = 3000;

// .env 파일 로드
dotenv.config();

// MySQL 연결 설정
const db = mysql.createConnection(process.env.MYSQL_PUBLIC_URL);

// 데이터베이스 연결 확인
db.connect((err) => {
    if (err) {
        console.error('DB 연결 실패:', err);
        return;
    }
    console.log('DB 연결 성공');
});

// Express 서버 설정
app.use(express.json()); // 요청 본문을 JSON으로 파싱\
app.use(cors());

// 회원가입 라우트
app.post('/register', (req, res) => {
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
app.post('/login', (req, res) => {
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

// 서버 실행
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
