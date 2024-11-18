// models/posting.js
class Posting {
    constructor(db) {
        this.db = db;  // DB 객체를 생성자에서 주입받음
    }

    // 새 게시글 추가
    async create(author, title, link, type) {
        const sql = 'INSERT INTO posting (author, title, link, good, comment_num, type) VALUES (?, ?, ?, 0, 0, ?)';
        const params = [author, title, link || null, type];

        try {
            const result = await this.db.query(sql, params);
            return result;
        } catch (err) {
            throw new Error('게시글 추가 오류: ' + err);
        }
    }

    // 게시글 목록 조회
    async getAll() {
        const sql = 'SELECT * FROM posting ORDER BY id DESC';

        try {
            const result = await this.db.query(sql);
            return result;
        } catch (err) {
            throw new Error('게시글 조회 오류: ' + err);
        }
    }

    // 특정 게시글 조회
    async getById(id) {
        const sql = 'SELECT * FROM posting WHERE id = ?';
        const params = [id];

        try {
            const result = await this.db.query(sql, params);
            return result;
        } catch (err) {
            throw new Error('게시글 조회 오류: ' + err);
        }
    }

    // 좋아요 수 증가
    async updateGood(id) {
        const sql = 'UPDATE posting SET good = good + 1 WHERE id = ?';
        const params = [id];

        try {
            const result = await this.db.query(sql, params);
            return result;
        } catch (err) {
            throw new Error('좋아요 수 증가 오류: ' + err);
        }
    }

    // 댓글 수 증가
    async updateCommentNum(id, increment = 1) {
        const sql = 'UPDATE posting SET comment_num = comment_num + ? WHERE id = ?';
        const params = [increment, id];

        try {
            const result = await this.db.query(sql, params);
            return result;
        } catch (err) {
            throw new Error('댓글 수 증가 오류: ' + err);
        }
    }

    // 게시글 삭제
    async deleteById(id) {
        const sql = 'DELETE FROM posting WHERE id = ?';
        const params = [id];

        try {
            const result = await this.db.query(sql, params);
            return result;
        } catch (err) {
            throw new Error('게시글 삭제 오류: ' + err);
        }
    }
}

module.exports = Posting;
