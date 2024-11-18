// controllers/user_controller.js
const User = require('../models/user'); // User 모델 임포트

class UserController {
    constructor(db) {
        this.db = db; // DB 연결 객체 주입
        this.userModel = new User(db); // User 모델 인스턴스 생성
    }

    // 회원가입 처리
    async registerUser(req, res) {
        const { username, password, role } = req.body;

        if (!username || !password || !role) {
            return res.status(400).json({ message: '사용자 이름, 비밀번호, 역할을 입력하세요.' });
        }

        if (role !== '멘토' && role !== '멘티') {
            return res.status(400).json({ message: '잘못된 역할입니다. 멘토 또는 멘티만 가능합니다.' });
        }

        try {
            // 사용자 존재 여부 확인
            const existingUser = await this.userModel.checkUserExist(username);
            if (existingUser.length > 0) {
                return res.status(400).json({ message: '이미 존재하는 사용자입니다.' });
            }

            // 새 사용자 추가
            await this.userModel.createUser(username, password, role);
            res.status(201).json({ message: '회원가입 성공' });
        } catch (err) {
            console.error('DB 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }

    // 로그인 처리
    async loginUser(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: '사용자 이름과 비밀번호를 입력하세요.' });
        }

        try {
            // 사용자 확인
            const user = await this.userModel.verifyUserLogin(username, password);
            if (user.length === 0) {
                return res.status(400).json({ message: '사용자 이름 또는 비밀번호가 잘못되었습니다.' });
            }

            // 로그인 성공 후 role 정보 반환
            const userRole = user[0].role;
            res.status(200).json({ message: '로그인 성공', role: userRole });
        } catch (err) {
            console.error('DB 오류:', err);
            res.status(500).json({ message: '서버 오류' });
        }
    }
}

module.exports = UserController;
