// controllers/memo_controller.js
const Memo = require('../models/memo'); // Memo 모델 임포트

class MemoController {
    constructor(db) {
        this.db = db; // DB 객체 주입
        this.memoModel = new Memo(db); // Memo 모델 인스턴스 생성
    }

    // 메모 추가
    async createMemo(req, res) {
        const { memo_date, memo_content, memo_pdf } = req.body;

        if (!memo_date || !memo_content) {
            return res.status(400).json({ message: '날짜와 내용을 입력하세요.' });
        }

        try {
            const result = await this.memoModel.createMemo(memo_date, memo_content, memo_pdf || null);
            res.status(201).json({ message: '메모가 성공적으로 추가되었습니다.', id: result.insertId });
        } catch (err) {
            console.error('DB 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }

    // 메모 조회
    async getMemo(req, res) {
        const { id } = req.params;

        try {
            const memo = await this.memoModel.getMemoById(id);
            if (memo.length === 0) {
                return res.status(404).json({ message: '메모를 찾을 수 없습니다.' });
            }
            res.status(200).json(memo[0]);
        } catch (err) {
            console.error('DB 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }

    // 모든 메모 조회
    async getAllMemos(req, res) {
        try {
            const memos = await this.memoModel.getAllMemos();
            res.status(200).json(memos);
        } catch (err) {
            console.error('DB 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }

    // 메모 수정
    async updateMemo(req, res) {
        const { id } = req.params;
        const { memo_date, memo_content, memo_pdf } = req.body;

        if (!memo_date || !memo_content) {
            return res.status(400).json({ message: '날짜와 내용을 입력하세요.' });
        }

        try {
            const result = await this.memoModel.updateMemo(id, memo_date, memo_content, memo_pdf || null);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: '메모를 찾을 수 없습니다.' });
            }
            res.status(200).json({ message: '메모가 성공적으로 수정되었습니다.' });
        } catch (err) {
            console.error('DB 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }

    // 메모 삭제
    async deleteMemo(req, res) {
        const { id } = req.params;

        try {
            const result = await this.memoModel.deleteMemo(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: '메모를 찾을 수 없습니다.' });
            }
            res.status(200).json({ message: '메모가 성공적으로 삭제되었습니다.' });
        } catch (err) {
            console.error('DB 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }
}

module.exports = MemoController;
