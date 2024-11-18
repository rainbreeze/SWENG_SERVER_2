// controllers/answer_controller.js
const Answer = require('../models/answer'); // Answer 모델 임포트

class AnswerController {
    constructor(db) {
        this.db = db; // DB 연결 객체 주입
        this.answerModel = new Answer(db); // Answer 모델 인스턴스 생성
    }

    // 답변 추가
    async createAnswer(req, res) {
        const { question_id, user_id, answer_text } = req.body;

        if (!question_id || !user_id || !answer_text) {
            return res.status(400).json({ message: '질문 ID, 사용자 ID, 답변 내용을 입력하세요.' });
        }

        try {
            // 답변 추가
            await this.answerModel.createAnswer(question_id, user_id, answer_text);
            res.status(201).json({ message: '답변이 추가되었습니다.' });
        } catch (err) {
            console.error('DB 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }

    // 특정 질문에 대한 모든 답변 조회
    async getAnswersByQuestionId(req, res) {
        const { question_id } = req.params;

        try {
            const answers = await this.answerModel.getAnswersByQuestionId(question_id);
            res.status(200).json({ answers });
        } catch (err) {
            console.error('DB 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }

    // 특정 답변 조회
    async getAnswerById(req, res) {
        const { id } = req.params;

        try {
            const answer = await this.answerModel.getAnswerById(id);
            if (answer.length === 0) {
                return res.status(404).json({ message: '해당 답변을 찾을 수 없습니다.' });
            }
            res.status(200).json({ answer: answer[0] });
        } catch (err) {
            console.error('DB 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }
}

module.exports = AnswerController;
