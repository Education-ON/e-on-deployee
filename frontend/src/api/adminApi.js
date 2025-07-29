import axios from "./axiosInstance";

// 1. 전체 사용자 계정 상태 조회 (관리자용)
export const getAllUserState = async () => {
    return axios.get("/api/user/state");
};

// 2. 사용자 계정 상태 업데이트 (관리자용)
export const updateUserState = async (userId, stateCode) => {
    return axios.patch("/api/user/state", {
        user_id: userId,
        state_code: stateCode,
    });
};
