// controllers/comment_controller.js
const commentModel = require('../models/comment');  // 모델 임포트
const postingModel = require('../models/posting');  // 게시글 모델 임포트

// 댓글 추가
const addCommentToPosting = async (req, res) => {
    const { id } = req.params;  // 게시글 ID
    const { commentor, comment } = req.body;  // 댓글 작성자와 내용

    // 유효성 검사
    if (!commentor || !comment) {
        return res.status(400).json({ message: '댓글 작성자와 내용은 필수입니다.' });
    }

    try {
        await commentModel.addComment(id, commentor, comment);
        // 댓글 수 증가
        await postingModel.updateCommentNum(id);
        res.status(201).json({ message: '댓글이 성공적으로 추가되었습니다.' });
    } catch (err) {
        console.error('댓글 추가 오류:', err);
        res.status(500).json({ message: '서버 오류' });
    }
};

// 특정 게시글의 댓글 조회
const getCommentsForPosting = async (req, res) => {
    const { id } = req.params;  // 게시글 ID

    try {
        const comments = await commentModel.getCommentsByPostingId(id);
        res.status(200).json(comments);
    } catch (err) {
        console.error('댓글 조회 오류:', err);
        res.status(500).json({ message: '서버 오류' });
    }
};

// 댓글 삭제
const deleteCommentFromPosting = async (req, res) => {
    const { commentId } = req.params;  // 댓글 ID
    const { commentor } = req.body;    // 댓글 작성자

    try {
        // 댓글 정보 가져오기
        const comments = await commentModel.getCommentsByPostingId(commentId);
        if (comments.length === 0) {
            return res.status(404).json({ message: '댓글을 찾을 수 없습니다.' });
        }

        const comment = comments[0];
        const commentAuthor = comment.commentor;

        // 작성자 확인
        if (commentor !== commentAuthor) {
            return res.status(403).json({ message: '자신의 댓글만 삭제할 수 있습니다.' });
        }

        // 댓글 삭제
        await commentModel.deleteComment(commentId);
        res.status(200).json({ message: '댓글이 삭제되었습니다.' });
    } catch (err) {
        console.error('댓글 삭제 오류:', err);
        res.status(500).json({ message: '서버 오류' });
    }
};

module.exports = { addCommentToPosting, getCommentsForPosting, deleteCommentFromPosting };
