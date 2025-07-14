const User = require("../models/User");

// 1. mySchool에 선택한 schoolCode를 저장
async function saveMySchool(userId, schoolCode) {
    if (!userId || !schoolCode) {
        throw new Error("모든 파라미터를 입력해주세요.");
    }

    try {
        // userId로 사용자 조회
        const user = await User.findOne({
            where: { user_id: userId },
        });

        if (!user) {
            throw new Error("사용자를 찾을 수 없습니다.");
        }

        // DB에 이미 mySchool이 존재하는지 확인
        if (user.mySchool) {
            deleteMySchool(userId);
            console.log("기존 mySchool 정보가 삭제되었습니다.");
        }

        // 정보 업데이트
        await User.update(
            { my_school: schoolCode },
            { where: { user_id: userId } }
        );
    } catch (error) {
        console.error("나의 학교 저장 API 호출 실패:", error);
        throw new Error("나의 학교 저장 API 호출 실패");
    }
}

// 2. mySchool에서 schoolCode를 삭제
async function deleteMySchool(userId) {
    if (!userId) {
        throw new Error("userId를 입력해주세요.");
    }

    try {
        // userId로 사용자 조회
        const user = await User.findOne({
            where: { user_id: userId },
        });

        if (!user) {
            throw new Error("사용자를 찾을 수 없습니다.");
        }

        // DB에 mySchool이 존재하는지 확인
        if (!user.mySchool) {
            throw new Error("삭제할 mySchool이 존재하지 않습니다.");
        }

        // my_school 정보 삭제
        await User.update(
            { my_school: null },
            { where: { user_id: userId } }
        );
    } catch (error) {
        console.error("나의 학교 삭제 API 호출 실패:", error);
        throw new Error("나의 학교 삭제 API 호출 실패");
    }
}

// 3. mySchool에 저장된 schoolCode를 조회
async function getMySchool(userId) {
    if (!userId) {
        throw new Error("userId를 입력해주세요.");
    }

    try {
        // userId로 사용자 조회
        const user = await User.findOne({
            where: { user_id: userId },
        });

        if (!user) {
            throw new Error("사용자를 찾을 수 없습니다.");
        }

        // DB에 mySchool이 존재하는지 확인
        if (!user.my_school) {
            throw new Error("조회할 my_school이 존재하지 않습니다.");
        }

        // 정보 조회
        return user.my_school;
    } catch (error) {
        console.error("나의 학교 조회 API 호출 실패:", error);
        throw new Error("나의 학교 조회 API 호출 실패");
    }
}
