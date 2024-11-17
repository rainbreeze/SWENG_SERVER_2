// routes/posting_router.js
const express = require('express');
const postingController = require('../controllers/posting_controller');  // 컨트롤러 임포트

const postingRouter = express.Router();  // 라우터 객체 생성

// 게시글 추가
postingRouter.post('/postings', postingController.createPosting);

// 게시글 목록 조회
postingRouter.get('/postings', postingController.getPostings);

// 특정 게시글 조회
postingRouter.get('/postings/:id', postingController.getPostingById);

// 좋아요 수 증가
postingRouter.post('/postings/:id/like', postingController.likePosting);

// 댓글 수 증가
postingRouter.post('/postings/:id/comment', postingController.addCommentToPosting);

module.exports = postingRouter;  // 라우터 내보냄
