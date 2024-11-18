// controllers/question_controller.js
const Question = require('../models/question'); // Question 모델 임포트

class QuestionController {
    constructor(db) {
        this.db = db; // DB 연결 객체 주입
        this.questionModel = new Question(db); // Question 모델 인스턴스 생성
    }

    // 질문 추가
    async createQuestion(req, res) {
        const { title, content, user_id } = req.body;

        if (!title || !content || !user_id) {
            return res.status(400).json({ message: '제목, 내용, 사용자 ID를 입력하세요.' });
        }

        try {
            // 질문 추가
            await this.questionModel.createQuestion(title, content, user_id);
            res.status(201).json({ message: '질문이 추가되었습니다.' });
        } catch (err) {
            console.error('DB 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }

    // 모든 질문 조회
    async getAllQuestions(req, res) {
        try {
            const questions = await this.questionModel.getAllQuestions();
            res.status(200).json({ questions });
        } catch (err) {
            console.error('DB 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }

    // 특정 질문 조회
    async getQuestionById(req, res) {
        const { id } = req.params;

        try {
            const question = await this.questionModel.getQuestionById(id);
            if (question.length === 0) {
                return res.status(404).json({ message: '해당 질문을 찾을 수 없습니다.' });
            }
            res.status(200).json({ question: question[0] });
        } catch (err) {
            console.error('DB 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }
}

module.exports = QuestionController;
