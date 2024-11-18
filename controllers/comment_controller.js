const CommentModel = require('../models/comment'); // 댓글 모델 임포트

class CommentController {
    constructor(db) {
        this.commentModel = new CommentModel(db); // DB 객체를 주입하여 댓글 모델 인스턴스 생성
    }

    // 댓글 추가
    async addComment(req, res) {
        const { postId } = req.params;  // 게시글 ID
        const { commentor, comment } = req.body;  // 댓글 작성자와 내용

        // 필수 항목 체크
        if (!commentor || !comment) {
            return res.status(400).json({ message: '댓글 작성자와 내용은 필수입니다.' });
        }

        try {
            // 댓글 추가
            await this.commentModel.addComment(postId, commentor, comment);
            
            // 게시글의 댓글 수 업데이트
            await this.commentModel.updateCommentCount(postId);

            res.status(201).json({ message: '댓글이 성공적으로 추가되었습니다.' });
        } catch (err) {
            console.error('댓글 추가 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }

    // 특정 게시글의 댓글 조회
    async getCommentsByPostingId(req, res) {
        const { postId } = req.params;

        try {
            const comments = await this.commentModel.getCommentsByPostingId(postId);

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
    }

    // 댓글 삭제
    async deleteComment(req, res) {
        const { postId, commentId } = req.params;

        try {
            // 댓글 삭제
            const result = await this.commentModel.deleteComment(postId, commentId);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: '해당 댓글을 찾을 수 없습니다.' });
            }

            // 게시글의 댓글 수 업데이트
            await this.commentModel.updateCommentCount(postId);

            res.status(200).json({ message: '댓글이 성공적으로 삭제되었습니다.' });
        } catch (err) {
            console.error('댓글 삭제 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }

        // 게시글의 모든 댓글 삭제
        async deleteCommentsByPostingId(req, res) {
            const { postingId } = req.params;
            console.log('댓글 삭제 시작:', postingId);  // 디버깅 로그
    
            try {
                const result = await this.commentModel.deleteCommentsByPostingId(postingId);
                console.log('댓글 삭제 결과:', result);  // 댓글 삭제 결과 확인
                res.status(200).json({ message: '댓글이 모두 삭제되었습니다.' });
            } catch (err) {
                console.error('댓글 삭제 오류:', err);
                res.status(500).json({ message: '댓글 삭제 오류' });
            }
        }
}

module.exports = CommentController;
