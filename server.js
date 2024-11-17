// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./db/database');  // DB 연결 객체 임포트
const userRouter = require('./routes/user_routers');  // routes에서 내보낸 userRouter 사용

const app = express();
const port = 3000;

// .env 파일 로드
dotenv.config();

// Express 서버 설정
app.use(express.json());  // 요청 본문을 JSON으로 파싱
app.use(cors());  // CORS 설정

// 라우터 설정
app.use('/', userRouter);  // '/' 경로로 모든 라우트를 처리

// 서버 실행
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
