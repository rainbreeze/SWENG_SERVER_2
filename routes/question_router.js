const express = require('express');
const QuestionController = require('../controllers/question_controller'); // QuestionController 임포트

class QuestionRouter {
    constructor(db) {
        this.db = db; // DB 객체 주입
        this.questionController = new QuestionController(db); // QuestionController 인스턴스 생성
        this.router = express.Router();
        this.initializeRoutes();
    }

    // 라우트 초기화
    initializeRoutes() {
        this.router.post('/questions', (req, res) => this.questionController.createQuestion(req, res)); // 질문 추가
        this.router.get('/questions', (req, res) => this.questionController.getAllQuestions(req, res)); // 모든 질문 조회
        this.router.get('/questions/:id', (req, res) => this.questionController.getQuestionById(req, res)); // 특정 질문 조회
        this.router.delete('/questions/:id', (req, res) => questionController.deleteQuestion(req, res));  // 질문 삭제
    }

    getRouter() {
        return this.router;
    }
}

module.exports = QuestionRouter;
