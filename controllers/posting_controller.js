// controllers/posting_controller.js
const Posting = require('../models/posting'); // 게시글 모델 임포트
const Comment = require('../models/comment'); // 댓글 모델 임포트

class PostingController {
    constructor(db) {
        this.postingModel = new Posting(db); // DB 객체를 전달하여 Posting 모델 생성
    }

    // 게시글 추가
    async createPosting(req, res) {
        const { author, title, link, type } = req.body;

        if (!author || !title || !type) {
            return res.status(400).json({ message: '저자, 제목, 유형은 필수 항목입니다.' });
        }

        try {
            await this.postingModel.create(author, title, link, type);
            res.status(201).json({ message: '게시글이 성공적으로 추가되었습니다.' });
        } catch (err) {
            console.error('게시글 추가 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }

    // 게시글 목록 조회
    async getPostings(req, res) {
        try {
            const postings = await this.postingModel.getAll();
            res.status(200).json(postings);
        } catch (err) {
            console.error('게시글 조회 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }

    // 특정 게시글 조회
    async getPostingById(req, res) {
        const { id } = req.params;

        try {
            const posting = await this.postingModel.getById(id);
            if (posting.length === 0) {
                return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
            }
            res.status(200).json(posting[0]);
        } catch (err) {
            console.error('게시글 조회 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }

    // 좋아요 수 증가
    async likePosting(req, res) {
        const { id } = req.params;

        try {
            await this.postingModel.updateGood(id);
            res.status(200).json({ message: '좋아요 수가 증가했습니다.' });
        } catch (err) {
            console.error('좋아요 증가 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }

    // 댓글 수 증가
    async addCommentToPosting(req, res) {
        const { id } = req.params;

        try {
            await this.postingModel.updateCommentNum(id);
            res.status(200).json({ message: '댓글 수가 증가했습니다.' });
        } catch (err) {
            console.error('댓글 수 증가 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }

    // 게시글 삭제
    async deletePosting(req, res) {
        const { id } = req.params;
        console.log('삭제할 게시글 ID:', id);  // ID 값 확인
        const { username } = req.body;

        try {
            const posting = await this.postingModel.getById(id);
            console.log('게시글 조회 결과:', posting);  // 게시글 정보 출력
            if (posting.length === 0) {
                return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
            }

            const author = posting[0].author;

            if (username !== author) {
                return res.status(403).json({ message: '게시글을 삭제할 권한이 없습니다.' });
            }

            // 댓글 삭제
            await Comment.deleteCommentsByPostingId(id);  // 게시글에 달린 모든 댓글 삭제

            // 게시글 삭제
            const result = await this.postingModel.deleteById(id);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
            }

            res.status(200).json({ message: '게시글과 관련된 댓글이 모두 삭제되었습니다.' });
        } catch (err) {
            console.error('게시글 삭제 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }
}

module.exports = PostingController;
