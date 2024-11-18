class Question {
    constructor(db) {
        this.db = db; // DB 객체 주입
    }

    // 질문 추가
    async createQuestion(question_text, user_name) {
        const query = 'INSERT INTO Questions (question_text, user_name) VALUES (?, ?)';
        const result = await this.db.query(query, [question_text, user_name]);
        return result;
    }

    // 모든 질문 조회
    async getAllQuestions() {
        const query = 'SELECT * FROM Questions';
        const result = await this.db.query(query);
        return result;
    }

    // 특정 질문 조회
    async getQuestionById(question_id) {
        const query = 'SELECT * FROM Questions WHERE id = ?';
        const result = await this.db.query(query, [question_id]);
        return result;
    }

    // 특정 질문 삭제
    async deleteQuestion(id) {
        const query = 'DELETE FROM Questions WHERE id = ?';
        const result = await this.db.query(query, [id]);
        return result;
    }
}

module.exports = Question;
