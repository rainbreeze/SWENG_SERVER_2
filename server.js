const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const Database = require('./db/database'); // DB 객체 임포트
const UserRouter = require('./routes/user_router'); // UserRouter 임포트
const PostingRouter = require('./routes/posting_router'); // PostingRouter 임포트
const CommentRouter = require('./routes/comment_router'); // CommentRouter 임포트
const MemoRouter = require('./routes/memo_router'); // MemoRouter 임포트
const QuestionRouter = require('./routes/question_router'); // QuestionRouter 임포트
const AnswerRouter = require('./routes/answer_router'); // AnswerRouter 임포트

class Server {
    constructor() {
        this.app = express();
        this.port = 3000;
        this.db = new Database(); // DB 연결 객체 생성

        // 라우터들을 클래스의 인스턴스 변수로 설정
        this.userRouter = new UserRouter(this.db);
        this.postingRouter = new PostingRouter(this.db);
        this.commentRouter = new CommentRouter(this.db);
        this.memoRouter = new MemoRouter(this.db);
        this.questionRouter = new QuestionRouter(this.db);
        this.answerRouter = new AnswerRouter(this.db);
    }

    // 서버 설정
    configureServer() {
        dotenv.config(); // .env 파일 로드

        this.app.use(express.json());  // 요청 본문을 JSON으로 파싱
        this.app.use(cors());  // CORS 설정

        // 인스턴스 변수로 접근
        this.app.use('/users', this.userRouter.getRouter()); // "/users" 경로로 라우터 등록
        this.app.use('/postings', this.postingRouter.getRouter()); // "/posts" 경로로 라우터 등록
        this.app.use('/comments', this.commentRouter.getRouter()); // "/comments" 경로로 라우터 등록
        this.app.use('/memos', this.memoRouter.getRouter()); // "/memos" 경로로 라우터 등록
        this.app.use('/questions', this.questionRouter.getRouter()); // "/questions" 경로로 라우터 등록
        this.app.use('/answers', this.answerRouter.getRouter()); // "/answers" 경로로 라우터 등록
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
