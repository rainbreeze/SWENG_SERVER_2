// models/comment.js
const db = require('../db/database');  // DB 연결 객체 임포트

// 댓글 추가
const addComment = (postingId, commentor, comment) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO comments (posting_id, commentor, comment) VALUES (?, ?, ?)',
            [postingId, commentor, comment],
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

// 댓글 삭제
const deleteComment = (commentId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'DELETE FROM comments WHERE id = ?',
            [commentId],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

// 댓글 조회 (댓글 하나를 찾을 때)
const getCommentById = (commentId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM comments WHERE id = ?',
            [commentId],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

module.exports = { addComment, getCommentsByPostingId, deleteComment, getCommentById };
