// models/comment.js
class Comment {
    constructor(db) {
        this.db = db; // DB 객체 주입
    }

    // 댓글 추가
    async addComment(postId, commentor, comment) {
        const sql = 'INSERT INTO comments (posting_id, commentor, comment) VALUES (?, ?, ?)';
        const params = [postId, commentor, comment];

        try {
            const result = await this.db.query(sql, params);
            return result;
        } catch (err) {
            throw new Error('댓글 추가 오류: ' + err);
        }
    }

    // 특정 게시글의 댓글 조회
    async getCommentsByPostingId(postingId) {
        const sql = 'SELECT * FROM comments WHERE posting_id = ? ORDER BY date DESC';
        const params = [postingId];

        try {
            const results = await this.db.query(sql, params);
            return results;
        } catch (err) {
            throw new Error('댓글 조회 오류: ' + err);
        }
    }

    // 댓글 수 조회
    async countComments(postId) {
        const sql = 'SELECT COUNT(*) AS count FROM comments WHERE posting_id = ?';
        const params = [postId];

        try {
            const result = await this.db.query(sql, params);
            return result[0].count;  // 첫 번째 결과의 count 값을 반환
        } catch (err) {
            throw new Error('댓글 수 조회 오류: ' + err);
        }
    }

    // 댓글 수 업데이트 (게시글의 댓글 수)
    async updateCommentCount(postId, commentCount) {
        const sql = 'UPDATE posting SET comment_num = ? WHERE id = ?';
        const params = [commentCount, postId];

        try {
            const result = await this.db.query(sql, params);
            return result;
        } catch (err) {
            throw new Error('댓글 수 업데이트 오류: ' + err);
        }
    }

    // 댓글 삭제
    async deleteComment(postId, commentId) {
        const sql = 'DELETE FROM comments WHERE posting_id = ? AND id = ?';
        const params = [postId, commentId];

        try {
            const result = await this.db.query(sql, params);
            return result;
        } catch (err) {
            throw new Error('댓글 삭제 오류: ' + err);
        }
    }

    // 게시글의 모든 댓글 삭제
    async deleteCommentsByPostingId(postingId) {
        const sql = 'DELETE FROM comments WHERE posting_id = ?';
        const params = [postingId];

        try {
            const result = await this.db.query(sql, params);
            return result;
        } catch (err) {
            throw new Error('댓글 삭제 오류: ' + err);
        }
    }
}

module.exports = Comment;
