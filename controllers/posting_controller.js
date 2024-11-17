// controllers/posting_controller.js
const postingModel = require('../models/posting');  // 모델 임포트

// 게시글 추가
const createPosting = async (req, res) => {
    const { author, title, link, type } = req.body;

    // 유효성 검사
    if (!author || !title || !type) {
        return res.status(400).json({ message: '저자, 제목, 유형은 필수 항목입니다.' });
    }

    try {
        await postingModel.createPosting(author, title, link, type);
        res.status(201).json({ message: '게시글이 성공적으로 추가되었습니다.' });
    } catch (err) {
        console.error('게시글 추가 오류:', err);
        res.status(500).json({ message: '서버 오류' });
    }
};

// 게시글 목록 조회
const getPostings = async (req, res) => {
    try {
        const postings = await postingModel.getAllPostings();
        res.status(200).json(postings);
    } catch (err) {
        console.error('게시글 조회 오류:', err);
        res.status(500).json({ message: '서버 오류' });
    }
};

// 특정 게시글 조회
const getPostingById = async (req, res) => {
    const { id } = req.params;

    try {
        const posting = await postingModel.getPostingById(id);
        if (posting.length === 0) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        }
        res.status(200).json(posting[0]);
    } catch (err) {
        console.error('게시글 조회 오류:', err);
        res.status(500).json({ message: '서버 오류' });
    }
};

// 좋아요 수 증가
const likePosting = async (req, res) => {
    const { id } = req.params;

    try {
        await postingModel.updateGood(id);
        res.status(200).json({ message: '좋아요 수가 증가했습니다.' });
    } catch (err) {
        console.error('좋아요 증가 오류:', err);
        res.status(500).json({ message: '서버 오류' });
    }
};

// 댓글 수 증가
const addCommentToPosting = async (req, res) => {
    const { id } = req.params;

    try {
        await postingModel.updateCommentNum(id);
        res.status(200).json({ message: '댓글 수가 증가했습니다.' });
    } catch (err) {
        console.error('댓글 수 증가 오류:', err);
        res.status(500).json({ message: '서버 오류' });
    }
};

// 게시글 삭제
const deletePosting = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await postingModel.deletePosting(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        }

        res.status(200).json({ message: '게시글이 삭제되었습니다.' });
    } catch (err) {
        console.error('게시글 삭제 오류:', err);
        res.status(500).json({ message: '서버 오류' });
    }
};

module.exports = { createPosting, getPostings, getPostingById, likePosting, addCommentToPosting };
