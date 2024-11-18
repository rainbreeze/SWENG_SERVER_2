const Question = require('../models/question'); // Question 모델 임포트
const AnswerController = require('./answer_controller'); // AnswerController 임포트

class QuestionController {
    constructor(db) {
        this.db = db; // DB 연결 객체 주입
        this.questionModel = new Question(db); // Question 모델 인스턴스 생성
        this.answerController = new AnswerController(db); // AnswerController 인스턴스 생성
    }

    // 질문 추가
    async createQuestion(req, res) {
        const { question_text, user_name } = req.body;

        if (!question_text || !user_name) {
            return res.status(400).json({ message: '질문 내용과 사용자 이름을 입력하세요.' });
        }

        try {
            // 질문 추가
            await this.questionModel.createQuestion(question_text, user_name);
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

    // 질문 삭제 (답변도 함께 삭제)
    async deleteQuestion(req, res) {
        const { id } = req.params;

        try {
            console.log("답변 삭제");
            // 1. 질문에 해당하는 답변들 삭제
            await this.answerController.deleteAnswersByQuestionId(id);
            console.log("질문 삭제");
            // 2. 질문 삭제
            const result = await this.questionModel.deleteQuestion(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: '해당 질문을 삭제할 수 없습니다.' });
            }

            res.status(200).json({ message: '질문과 답변이 성공적으로 삭제되었습니다.' });
        } catch (err) {
            console.error('삭제 중 오류 발생:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }
}

module.exports = QuestionController;
