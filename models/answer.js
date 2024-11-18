// models/answer.js
class Answer {
    constructor(db) {
        this.db = db; // DB 객체 주입
    }

    // 답변 추가
    async createAnswer(question_id, user_id, answer_text) {
        const query = 'INSERT INTO answers (question_id, user_id, answer_text) VALUES (?, ?, ?)';
        const result = await this.db.query(query, [question_id, user_id, answer_text]);
        return result;
    }

    // 특정 질문에 대한 답변 조회
    async getAnswersByQuestionId(question_id) {
        const query = 'SELECT * FROM answers WHERE question_id = ?';
        const result = await this.db.query(query, [question_id]);
        return result;
    }

    // 특정 답변 조회
    async getAnswerById(answer_id) {
        const query = 'SELECT * FROM answers WHERE id = ?';
        const result = await this.db.query(query, [answer_id]);
        return result;
    }
}

module.exports = Answer;
