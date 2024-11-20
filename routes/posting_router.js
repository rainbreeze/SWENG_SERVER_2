// routes/posting_router.js
const express = require('express');
const PostingController = require('../controllers/posting_controller'); // 게시글 컨트롤러 임포트

class PostingRouter {
    constructor(db) {
        this.db = db; 
        this._router = express.Router();
        this.postingController = new PostingController(db); // DB 객체를 주입하여 PostingController 생성
        this.initializeRoutes();
    }

    // 라우트 초기화
    initializeRoutes() {
        this._router.post('/', (req, res) => this.postingController.createPosting(req, res)); // 게시글 추가
        this._router.get('/', (req, res) => this.postingController.getPostings(req, res)); // 모든 게시글 조회
        this._router.get('/:id', (req, res) => this.postingController.getPostingById(req, res)); // 특정 게시글 조회
        this._router.post('/:id/like', (req, res) => this.postingController.likePosting(req, res)); // 게시글 좋아요
        this._router.post('/:id/comment', (req, res) => this.postingController.addCommentToPosting(req, res)); // 게시글 댓글
        this._router.delete('/:id', (req, res) => this.postingController.deletePosting(req, res));  // 게시글 삭제
    }

    // 라우터 반환
    getRouter() {
        return this._router;
    }
}

module.exports = PostingRouter;
