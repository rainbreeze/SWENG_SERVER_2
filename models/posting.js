// models/posting.js
const db = require('../db/database');  // DB 연결 객체 임포트

// 새 게시글 추가
const createPosting = (author, title, link = null, type) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO posting (author, title, link, good, comment_num, type) VALUES (?, ?, ?, 0, 0, ?)',  // type 추가
            [author, title, link, type],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

// 게시글 목록 조회
const getAllPostings = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM posting ORDER BY id DESC', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// 특정 게시글 조회
const getPostingById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM posting WHERE id = ?', [id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// 좋아요 수 증가
const updateGood = (id) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE posting SET good = good + 1 WHERE id = ?', [id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// 댓글 수 증가
const updateCommentNum = (id, increment = 1) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE posting SET comment_num = comment_num + ? WHERE id = ?',
            [increment, id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

// 게시글 삭제
const deletePosting = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            'DELETE FROM posting WHERE id = ?',
            [id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);  // 삭제된 행의 수를 반환
            }
        );
    });
};

module.exports = { createPosting, getAllPostings, getPostingById, updateGood, updateCommentNum };
