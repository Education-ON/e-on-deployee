const mySchoolService = require("../services/mySchoolService");

exports.saveMySchool = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const schoolCode = req.body;

        // 필수 파라미터 확인
        if (!userId || !schoolCode) {
            return res
                .status(400)
                .json({ error: "모든 파라미터를 입력해주세요." });
        }

        // mySchool 저장 서비스 호출
        await mySchoolService.saveMySchool(userId, schoolCode);
        res.status(200).json({ message: "나의 학교가 저장되었습니다." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "나의 학교 저장 실패" });
    }
};

exports.deleteMySchool = async (req, res) => {
    try {
        const userId = req.user.user_id;

        // 필수 파라미터 확인
        if (!userId) {
            return res
                .status(400)
                .json({ error: "모든 파라미터를 입력해주세요." });
        }

        // mySchool 삭제 서비스 호출
        await mySchoolService.deleteMySchool(userId);
        res.status(200).json({ message: "나의 학교가 삭제되었습니다." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "나의 학교 삭제 실패" });
    }
};

exports.getMySchool = async (req, res) => {
    try {
        const userId = req.user.user_id;

        // 필수 파라미터 확인
        if (!userId) {
            return res
                .status(400)
                .json({ error: "모든 파라미터를 입력해주세요." });
        }

        // mySchool 조회 서비스 호출
        const schoolCode = await mySchoolService.getMySchool(userId);
        res.status(200).json({ schoolCode });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "나의 학교 조회 실패" });
    }
};
