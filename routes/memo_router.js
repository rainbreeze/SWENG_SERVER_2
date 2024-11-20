// routes/memo_router.js
const express = require('express');
const MemoController = require('../controllers/memo_controller'); // MemoController 임포트

class MemoRouter {
    constructor(db) {
        this.db = db; // DB 객체 주입
        this.memoController = new MemoController(db); // MemoController 인스턴스 생성
        this.router = express.Router();
        this.initializeRoutes();
    }

    // 라우트 초기화
    initializeRoutes() {
        this.router.post('/', (req, res) => this.memoController.createMemo(req, res));  // 메모 추가
        this.router.get('/', (req, res) => this.memoController.getAllMemos(req, res));  // 모든 메모 조회
        this.router.get('/:id', (req, res) => this.memoController.getMemo(req, res));  // 특정 메모 조회 (ID로)
        this.router.put('/:id', (req, res) => this.memoController.updateMemo(req, res));  // 메모 수정
        this.router.delete('/:id', (req, res) => this.memoController.deleteMemo(req, res));  // 메모 삭제
    }

    getRouter() {
        return this.router;
    }
}

module.exports = MemoRouter;
