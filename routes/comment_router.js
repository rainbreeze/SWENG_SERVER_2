// routes/comment_router.js
const express = require('express');
const commentController = require('../controllers/comment_controller');  // 컨트롤러 임포트

const commentRouter = express.Router();  // 라우터 객체 생성

// 댓글 추가
commentRouter.post('/postings/:id/comment', commentController.addCommentToPosting);

// 댓글 조회
commentRouter.get('/postings/:id/comments', commentController.getCommentsForPosting);

// 댓글 삭제
commentRouter.delete('/comments/:commentId', commentController.deleteCommentFromPosting);

module.exports = commentRouter;
