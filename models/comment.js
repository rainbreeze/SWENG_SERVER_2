const db = require('../db/database');  // DB 연결 객체

// 댓글 추가
const addComment = (postId, commentor, comment) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO comments (posting_id, commentor, comment) VALUES (?, ?, ?)',
            [postId, commentor, comment],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

// 특정 게시글의 댓글 조회
const getCommentsByPostingId = (postingId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM comments WHERE posting_id = ? ORDER BY date DESC',
            [postingId],
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
};

// 게시글의 댓글 수 업데이트 (댓글 추가 후 호출)
const updateCommentCount = (postId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE posting SET comment_num = comment_num + 1 WHERE id = ?',
            [postId],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

module.exports = { addComment, getCommentsByPostingId, updateCommentCount };
