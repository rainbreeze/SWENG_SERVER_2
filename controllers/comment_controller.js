const commentModel = require('../models/comment');  // 댓글 관련 모델

// 댓글 추가
const addComment = async (req, res) => {
    const { postId } = req.params;  // 게시글 ID
    const { commentor, comment } = req.body;  // 댓글 작성자와 내용

    // 필수 항목 체크
    if (!commentor || !comment) {
        return res.status(400).json({ message: '댓글 작성자와 내용은 필수입니다.' });
    }

    try {
        // 댓글 추가
        await commentModel.addComment(postId, commentor, comment);
        
        // 게시글의 댓글 수 업데이트
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

        // 댓글이 없을 경우 빈 배열을 반환
        if (comments.length === 0) {
            return res.status(200).json({ comments: [] });
        }

        // 댓글이 있으면 댓글 목록 반환
        res.status(200).json({ comments });
    } catch (err) {
        console.error('댓글 조회 오류:', err);
        res.status(500).json({ message: '서버 오류' });
    }
};

// 댓글 삭제
const deleteComment = async (req, res) => {
    const { postId, commentId } = req.params;

    try {
        // 댓글 삭제
        const result = await commentModel.deleteComment(postId, commentId);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '해당 댓글을 찾을 수 없습니다.' });
        }

        // 게시글의 댓글 수 업데이트
        await commentModel.updateCommentCount(postId);

        res.status(200).json({ message: '댓글이 성공적으로 삭제되었습니다.' });
    } catch (err) {
        console.error('댓글 삭제 오류:', err);
        res.status(500).json({ message: '서버 오류' });
    }
};

module.exports = { addComment, getCommentsByPostingId, deleteComment };
