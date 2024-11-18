class AnswerController {
    constructor(db) {
        this.db = db; // DB 연결 객체 주입
        this.answerModel = new Answer(db); // Answer 모델 인스턴스 생성
    }

    // 답변 추가
    async createAnswer(req, res) {
        const { answer_text, question_id, user_name } = req.body;

        if (!answer_text || !question_id || !user_name) {
            return res.status(400).json({ message: '답변 내용, 질문 ID, 사용자 이름을 입력하세요.' });
        }

        try {
            // 답변 추가
            await this.answerModel.createAnswer(answer_text, question_id, user_name);
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
            
            // 답변이 없을 경우 빈 배열 반환
            res.status(200).json({ answers });
        } catch (err) {
            console.error('DB 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }

    // 답변 삭제
    async deleteAnswer(req, res) {
        const { answer_id } = req.params;

        if (!answer_id) {
            return res.status(400).json({ message: '삭제할 답변 ID를 제공해주세요.' });
        }

        try {
            // 답변 삭제
            const result = await this.answerModel.deleteAnswer(answer_id);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: '답변을 찾을 수 없습니다.' });
            }

            res.status(200).json({ message: '답변이 삭제되었습니다.' });
        } catch (err) {
            console.error('DB 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }
}

module.exports = AnswerController;
