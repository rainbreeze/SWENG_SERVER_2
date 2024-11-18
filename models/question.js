// models/question.js
class Question {
    constructor(db) {
        this.db = db; // DB 객체 주입
    }

    // 질문 추가
    async createQuestion(title, content, user_id) {
        const query = 'INSERT INTO questions (title, content, user_id) VALUES (?, ?, ?)';
        const result = await this.db.query(query, [title, content, user_id]);
        return result;
    }

    // 모든 질문 조회
    async getAllQuestions() {
        const query = 'SELECT * FROM questions';
        const result = await this.db.query(query);
        return result;
    }

    // 특정 질문 조회
    async getQuestionById(question_id) {
        const query = 'SELECT * FROM questions WHERE id = ?';
        const result = await this.db.query(query, [question_id]);
        return result;
    }
}

module.exports = Question;
