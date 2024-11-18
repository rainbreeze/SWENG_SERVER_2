class Answer {
    constructor(db) {
        this.db = db; // DB 객체 주입
    }

    // 답변 추가
    async createAnswer(answer_text, question_id, user_name) {
        const query = 'INSERT INTO Answers (answer_text, question_id, user_name) VALUES (?, ?, ?)';
        const result = await this.db.query(query, [answer_text, question_id, user_name]);
        return result;
    }

    // 특정 질문에 대한 모든 답변 조회
    async getAnswersByQuestionId(question_id) {
        const query = 'SELECT * FROM Answers WHERE question_id = ?';
        const result = await this.db.query(query, [question_id]);
        return result;
    }

    // 답변 삭제
    async deleteAnswer(answer_id) {
        const query = 'DELETE FROM Answers WHERE id = ?';
        const result = await this.db.query(query, [answer_id]);
        return result;
    }
}

module.exports = Answer;
