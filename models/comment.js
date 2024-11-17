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
            'UPDATE posting SET comment_num = (SELECT COUNT(*) FROM comments WHERE posting_id = ?) WHERE id = ?',
            [postId, postId],  // COUNT(*)를 이용해 정확한 댓글 수를 계산
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

// 댓글 삭제
const deleteComment = (postId, commentId) => {
    return new Promise((resolve, reject) => {
        // 댓글 삭제
        db.query(
            'DELETE FROM comments WHERE posting_id = ? AND id = ?',
            [postId, commentId],
            (err, result) => {
                if (err) return reject(err);

                // 댓글 삭제 후 댓글 수 업데이트
                updateCommentCount(postId)
                    .then(() => resolve(result))
                    .catch(err => reject(err));
            }
        );
    });
};

// 댓글 삭제 함수 (댓글 모델)
const deleteCommentsByPostingId = (postingId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'DELETE FROM comments WHERE posting_id = ?',
            [postingId],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};


module.exports = { addComment, getCommentsByPostingId, updateCommentCount, deleteComment, deleteCommentsByPostingId};
