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

    // 댓글 수 업데이트 (게시글의 댓글 수)
    async updateCommentCount(postId) {
        const sql = 'UPDATE posting SET comment_num = (SELECT COUNT(*) FROM comments WHERE posting_id = ?) WHERE id = ?';
        const params = [postId, postId];

        try {
            const result = await this.db.query(sql, params);
            return result;
        } catch (err) {
            throw new Error('댓글 수 업데이트 오류: ' + err);
        }
    }

// controllers/comment_controller.js
async deleteComment(req, res) {
    const { postId, commentId } = req.params;

    try {
        // 댓글 삭제
        const result = await this.commentModel.deleteComment(postId, commentId);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '해당 댓글을 찾을 수 없습니다.' });
        }

        // 댓글 수 업데이트
        const updateResult = await this.updateCommentCount(postId);

        if (updateResult.affectedRows === 0) {
            console.error('댓글 수 업데이트 실패');
            return res.status(500).json({ message: '댓글 수 업데이트 실패' });
        }

        res.status(200).json({ message: '댓글이 성공적으로 삭제되었습니다.' });
    } catch (err) {
        console.error('댓글 삭제 오류:', err);
        res.status(500).json({ message: '서버 오류' });
    }
}


    // 게시글의 모든 댓글 삭제
    async deleteCommentsByPostingId(postingId) {
        console.log('댓글 삭제 시작:', postingId);  // 로그 추가

        const sql = 'DELETE FROM comments WHERE posting_id = ?';
        const params = [postingId];

        try {
            const result = await this.db.query(sql, params);
            console.log('댓글 삭제 완료:', result);  // 정상 삭제 완료 시 로그 추가
            return result;
        } catch (err) {
            console.error('댓글 삭제 오류:', err);  // 에러 로그 추가
            throw new Error('댓글 삭제 오류: ' + err);
        }
    }
}

module.exports = Comment;
