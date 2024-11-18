const db = require('../db/database'); // DB 연결 객체 임포트

class CommentModel {
    constructor(db) {
        this.db = db; // DB 객체 주입
    }

    // 댓글 추가
    addComment(postId, commentor, comment) {
        return new Promise((resolve, reject) => {
            this.db.query(
                'INSERT INTO comments (posting_id, commentor, comment) VALUES (?, ?, ?)',
                [postId, commentor, comment],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            );
        });
    }

    // 특정 게시글의 댓글 조회
    getCommentsByPostingId(postingId) {
        return new Promise((resolve, reject) => {
            this.db.query(
                'SELECT * FROM comments WHERE posting_id = ? ORDER BY date DESC',
                [postingId],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                }
            );
        });
    }

    // 댓글 수 업데이트 (게시글의 댓글 수)
    updateCommentCount(postId) {
        return new Promise((resolve, reject) => {
            this.db.query(
                'UPDATE posting SET comment_num = (SELECT COUNT(*) FROM comments WHERE posting_id = ?) WHERE id = ?',
                [postId, postId],  // COUNT(*)를 이용해 정확한 댓글 수를 계산
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            );
        });
    }

    // 댓글 삭제
    deleteComment(postId, commentId) {
        return new Promise((resolve, reject) => {
            this.db.query(
                'DELETE FROM comments WHERE posting_id = ? AND id = ?',
                [postId, commentId],
                (err, result) => {
                    if (err) return reject(err);

                    // 댓글 삭제 후 댓글 수 업데이트
                    this.updateCommentCount(postId)
                        .then(() => resolve(result))
                        .catch(err => reject(err));
                }
            );
        });
    }

    // 게시글의 모든 댓글 삭제
    deleteCommentsByPostingId(postingId) {
        return new Promise((resolve, reject) => {
            this.db.query(
                'DELETE FROM comments WHERE posting_id = ?',
                [postingId],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                }
            );
        });
    }
}

module.exports = CommentModel;
