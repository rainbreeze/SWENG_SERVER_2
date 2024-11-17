const commentModel = require('../models/comment');  // 댓글 관련 모델

// 댓글 추가
const addComment = async (req, res) => {
    const { postId } = req.params;
    const { commentor, comment } = req.body;

    // 필수 항목 체크
    if (!commentor || !comment) {
        return res.status(400).json({ message: '댓글 작성자와 내용은 필수입니다.' });
    }

    try {
        await commentModel.addComment(postId, commentor, comment);
        
        // 댓글 수 증가 (게시글 모델을 업데이트)
        await commentModel.updateCommentCount(postId);

        res.status(201).json({ message: '댓글이 성공적으로 추가되었습니다.' });
    } catch (err) {
        console.error('댓글 추가 오류:', err);
        res.status(500).json({ message: '서버 오류' });
    }
};

// 특정 게시글의 댓글 조회
const getCommentsByPostingId = async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await commentModel.getCommentsByPostingId(postId);
        res.status(200).json(comments);
    } catch (err) {
        console.error('댓글 조회 오류:', err);
        res.status(500).json({ message: '서버 오류' });
    }
};

module.exports = { addComment, getCommentsByPostingId };
