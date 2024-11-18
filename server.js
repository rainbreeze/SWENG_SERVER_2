// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const Database = require('./db/database'); // DB 객체 임포트
const UserRouter = require('./routes/user_router'); // UserRouter 임포트
const PostingRouter = require('./routes/posting_router'); // PostingRouter 임포트

class Server {
    constructor() {
        this.app = express();
        this.port = 3000;
        this.db = new Database(); // DB 연결 객체 생성
    }

    // 서버 설정
    configureServer() {
        dotenv.config(); // .env 파일 로드

        this.app.use(express.json());  // 요청 본문을 JSON으로 파싱
        this.app.use(cors());  // CORS 설정

        const userRouter = new UserRouter(this.db); // UserRouter 인스턴스 생성
        this.app.use('/', userRouter.getRouter()); // 라우터 등록

        const postingRouter = new PostingRouter(this.db);
        this.app.use('/', postingRouter.getRouter());

        // 다른 라우터들도 추가 가능
        // const postingRouter = new PostingRouter(this.db);
        // this.app.use('/', postingRouter.getRouter());
    }

    // 서버 실행
    async start() {
        try {
            await this.db.connect();
            console.log('MySQL에 연결되었습니다.');
            this.configureServer();
            this.app.listen(this.port, () => {
                console.log(`서버가 http://localhost:${this.port}에서 실행 중입니다.`);
            });
        } catch (err) {
            console.error('DB 연결 실패:', err);
        }
    }
}

const server = new Server();
server.start();
