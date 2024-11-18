const express = require('express');
const CommentController = require('../controllers/comment_controller');  // 댓글 컨트롤러 임포트

class CommentRouter {
    constructor(db) {
        this.router = express.Router();
        this.controller = new CommentController(db);  // 댓글 컨트롤러 인스턴스 생성
        this.initializeRoutes();
    }

    // 라우트 설정
    initializeRoutes() {
        this.router.post('/comments/:postId', this.controller.addComment.bind(this.controller));  // 댓글 추가
        this.router.get('/comments/:postId', this.controller.getCommentsByPostingId.bind(this.controller));  // 댓글 조회
        this.router.delete('/comments/:postId/:commentId', this.controller.deleteComment.bind(this.controller));  // 댓글 삭제
    }

    // 라우터 반환
    getRouter() {
        return this.router;
    }
}

module.exports = CommentRouter;
