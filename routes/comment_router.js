const express = require('express');
const commentController = require('../controllers/comment_controller');  // 댓글 관련 컨트롤러

const commentRouter = express.Router();

// 특정 게시글에 댓글 추가
commentRouter.post('/comments/:postId', commentController.addComment);

// 특정 게시글의 댓글 조회
commentRouter.get('/comments/:postId', commentController.getCommentsByPostingId);

module.exports = commentRouter;
