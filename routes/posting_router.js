// routes/posting_router.js
const express = require('express');
const PostingController = require('../controllers/posting_controller'); // 게시글 컨트롤러 임포트

class PostingRouter {
    constructor(db) {
        this.router = express.Router();
        this.postingController = new PostingController(db); // DB 객체를 주입하여 PostingController 생성
        this.initializeRoutes();
    }

    // 라우트 초기화
    initializeRoutes() {
        this.router.post('/postings', (req, res) => this.postingController.createPosting(req, res));
        this.router.get('/postings', (req, res) => this.postingController.getPostings(req, res));
        this.router.get('/postings/:id', (req, res) => this.postingController.getPostingById(req, res));
        this.router.post('/postings/:id/like', (req, res) => this.postingController.likePosting(req, res));
        this.router.post('/postings/:id/comment', (req, res) => this.postingController.addCommentToPosting(req, res));
        this.router.delete('/postings/:id', (req, res) => this.postingController.deletePosting(req, res));
    }

    // 라우터 반환
    getRouter() {
        return this.router;
    }
}

module.exports = PostingRouter;
