// backend/controllers/auth.js
const VALID_USER_TYPES = ["student", "parent"];
const bcrypt = require("bcrypt");
const passport = require("passport");
const transporter = require("../config/mail");
const db = require("../models");
const User = db.User;

// 1단계: 회원 구분 저장
exports.signupStep1 = (req, res) => {
    const { userType } = req.body;
    if (userType === "admin") {
        return res.status(403).json({ message: "권한이 없습니다." });
    }
    if (!VALID_USER_TYPES.includes(userType)) {
        return res
            .status(400)
            .json({ message: "유효하지 않은 회원 유형입니다." });
    }
    req.session.signup = { type: userType };
    req.session.save(() => {
        res.json({ success: true });
    });
    console.log("🔥 [STEP1] 세션 전체:", req.session);
};

// 2단계: 약관 동의 저장
exports.signupStep2 = (req, res) => {
    if (!req.session.signup) {
        return res.status(400).json({ message: "Step1 먼저 진행해주세요." });
    }
    req.session.signup.agreements = req.body.agreements;
    req.session.save(() => {
        console.log("🔥 [STEP2] 세션 전체:", req.session);
        res.json({ success: true });
    });
};

// 이메일 인증번호 발송
exports.sendEmailCode = async (req, res, next) => {
    try {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        req.session.emailCode = code;
        req.session.emailForCode = req.body.email;
        await transporter.sendMail({
            from: `"E-ON" <${process.env.SMTP_USER}>`,
            to: req.body.email,
            subject: "E-ON 이메일 인증번호",
            html: `<p>인증번호: <strong>${code}</strong></p>`,
        });
        req.session.save(() => {
            console.log("📮 인증번호 세션 저장 완료:", code);
            res.json({ success: true });
        });
    } catch (err) {
        next(err);
    }
};

// 이메일 인증번호 검증
exports.verifyEmailCode = (req, res) => {
    if (
        req.body.email !== req.session.emailForCode ||
        req.body.code !== req.session.emailCode
    ) {
        return res.status(400).json({
            success: false,
            message: "이메일 또는 코드가 일치하지 않습니다.",
        });
    }
    res.json({ success: true });
};

// 3단계: 실제 회원 생성
exports.signupStep3 = async (req, res, next) => {
    console.log("🔥 [STEP3] 세션 전체:", req.session);
    const { name, email, code, password, confirm, age } = req.body;
    const su = req.session.signup || {};

    if (!su.type || !su.agreements) {
        clearSignupSession(req);
        return res
            .status(400)
            .json({ message: "이전 단계가 완료되지 않았습니다." });
    }
    if (su.type === "admin") {
        clearSignupSession(req);
        return res
            .status(403)
            .json({ message: "관리자 계정은 생성할 수 없습니다." });
    }
    if (email !== req.session.emailForCode || code !== req.session.emailCode) {
        clearSignupSession(req);
        return res.status(400).json({ message: "이메일 또는 인증 코드 오류" });
    }
    if (password !== confirm) {
        clearSignupSession(req);
        return res
            .status(400)
            .json({ message: "비밀번호와 확인이 일치하지 않습니다." });
    }

    try {
        if (await User.findOne({ where: { email } })) {
            clearSignupSession(req);
            return res
                .status(409)
                .json({ message: "이미 사용 중인 이메일입니다." });
        }

        const newUser = await User.create({
            name,
            email,
            age,
            password,
            state_code: "active",
            type: su.type,
            agreements: su.agreements,
        });

        clearSignupSession(req);
        res.status(201).json({ success: true, user: newUser.toJSON() });
    } catch (err) {
        next(err);
    }
};

exports.login = (req, res, next) => {
    passport.authenticate("local", async (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: info.message });

        try {
            const foundUser = await User.findByPk(user.user_id, {
                attributes: ["user_id", "email", "state_code", "type", "name"],
            });
            console.log("🧨 로그인 시도 유저:", foundUser);

            if (!foundUser) {
                console.log("❌ DB에서 유저 못 찾음");
                return res.status(403).json({ message: "유저 없음" });
            }

            if (foundUser.state_code !== "active") {
                return res
                    .status(403)
                    .json({ message: "비활성화된 계정입니다." });
            }

            req.login(foundUser, (loginErr) => {
                if (loginErr) return next(loginErr);
                return res.json({ success: true, user: foundUser.toJSON() });
            });
        } catch (e) {
            return next(e);
        }
    })(req, res, next);
};

exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            res.json({ success: true, message: "로그아웃 되었습니다." });
        });
    });
};

// ✅ 카카오 소셜 로그인 추가 정보 처리
exports.socialSignup = async (req, res, next) => {
    const socialData = req.session.socialUser;

    if (!socialData) {
        return res.status(400).json({ message: "소셜 세션이 없습니다." });
    }

    const { name, type, age, agreements } = req.body;

    if (!name || !type || !agreements || !age) {
        return res.status(400).json({ message: "필수 항목이 누락되었습니다." });
    }

    if (type === "admin") {
        return res
            .status(403)
            .json({ message: "관리자 유형은 생성할 수 없습니다." });
    }

    if (age < 8 || age > 16) {
        return res
            .status(400)
            .json({ message: "나이는 8세 이상 16세 이하로 입력해주세요." });
    }

    try {
        const existing = await User.findOne({
            where: { sns_id: socialData.sns_id, provider: socialData.provider },
        });
        if (existing) {
            return res.status(409).json({ message: "이미 가입된 계정입니다." });
        }

        // 이메일 중복 검사
        const emailExists = await User.findOne({
            where: { email: socialData.email },
        });
        if (emailExists) {
            return res
                .status(409)
                .json({
                    message: " 이미 해당 이메일로 가입된 계정이 있습니다. ",
                });
        }

        const user = await User.create({
            name,
            email: socialData.email,
            sns_id: socialData.sns_id,
            provider: socialData.provider,
            age,
            type,
            state_code: "active",
            agreements,
        });

        delete req.session.socialUser;

        req.login(user, (err) => {
            if (err) return next(err);
            res.status(201).json({
                success: true,
                user: {
                    user_id: newUser.user_id,
                    email: newUser.email,
                    name: newUser.name,
                    age: newUser.age,
                    type: newUser.type,
                    state_code: newUser.state_code,
                    agreements: newUser.agreements,
                    email_notification: newUser.email_notification,
                },
            });
        });
    } catch (err) {
        next(err);
    }
};

function clearSignupSession(req) {
    delete req.session.signup;
    delete req.session.emailCode;
    delete req.session.emailForCode;
    console.log("🔥 세션 정리됨:", req.session);
}
