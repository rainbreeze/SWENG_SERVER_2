// routes/comment_router.js
const express = require('express');
const CommentController = require('../controllers/comment_controller'); // 댓글 컨트롤러 임포트

class CommentRouter {
    constructor(db) {
        this.router = express.Router();
        this.controller = new CommentController(db);  // 댓글 컨트롤러 인스턴스 생성
        this.initializeRoutes();
    }

    // 라우트 설정
    initializeRoutes() {
        this.router.post('/:postId', this.controller.addComment.bind(this.controller));  // 댓글 추가
        this.router.get('/:postId', this.controller.getCommentsByPostingId.bind(this.controller));  // 특정 게시글에 대한 댓글 조회
        this.router.delete('/:postId/:commentId', this.controller.deleteComment.bind(this.controller));  // 댓글 삭제
    }

    // 라우터 반환
    getRouter() {
        return this.router;
    }
}

module.exports = CommentRouter;
