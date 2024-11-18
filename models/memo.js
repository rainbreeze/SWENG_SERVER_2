// models/memo.js
class Memo {
    constructor(db) {
        this.db = db; // DB 객체 주입
    }

    // 메모 추가
    async createMemo(memo_date, memo_content, memo_pdf) {
        const query = 'INSERT INTO memo (memo_date, memo_content, memo_pdf) VALUES (?, ?, ?)';
        const result = await this.db.query(query, [memo_date, memo_content, memo_pdf]);
        return result;
    }

    // 메모 조회 (ID로)
    async getMemoById(id) {
        const query = 'SELECT * FROM memo WHERE id = ?';
        const result = await this.db.query(query, [id]);
        return result;
    }

    // 모든 메모 조회
    async getAllMemos() {
        const query = 'SELECT * FROM memo';
        const result = await this.db.query(query);
        return result;
    }

    // 메모 수정
    async updateMemo(id, memo_date, memo_content, memo_pdf) {
        const query = 'UPDATE memo SET memo_date = ?, memo_content = ?, memo_pdf = ? WHERE id = ?';
        const result = await this.db.query(query, [memo_date, memo_content, memo_pdf, id]);
        return result;
    }

    // 메모 삭제
    async deleteMemo(id) {
        const query = 'DELETE FROM memo WHERE id = ?';
        const result = await this.db.query(query, [id]);
        return result;
    }
}

module.exports = Memo;
