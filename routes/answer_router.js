// routes/answer_router.js
const express = require('express');
const AnswerController = require('../controllers/answer_controller'); // AnswerController 임포트

class AnswerRouter {
    constructor(db) {
        this.db = db; // DB 객체 주입
        this.answerController = new AnswerController(db); // AnswerController 인스턴스 생성
        this.router = express.Router();
        this.initializeRoutes();
    }

    // 라우트 초기화
    initializeRoutes() {
        this.router.post('/', (req, res) => this.answerController.createAnswer(req, res)); // 답변 추가
        this.router.get('/:question_id', (req, res) => this.answerController.getAnswersByQuestionId(req, res)); // 특정 질문에 대한 답변 조회
        this.router.delete('/:answer_id', (req, res) => this.answerController.deleteAnswer(req, res)); // 답변 삭제
    }

    getRouter() {
        return this.router;
    }
}

module.exports = AnswerRouter;
