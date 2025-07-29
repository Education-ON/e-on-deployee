import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Auth/LoginPage";
import Signup from "../pages/Auth/SignupPage";
import MyInfoPage from "../pages/MyPage/MyInfoPage";
import ChangePasswordPage from "../pages/MyPage/ChangePasswordPage";
import DeactivateAccountPage from "../pages/MyPage/DeactivateAccountPage";
import Calendar from "../pages/Calendar/Calendar";
import Challenge from "../pages/Challenge/Challenge";
import Suggestion from "../pages/Suggestion/Suggestion";

//커뮤니티 라우터
import CommunityList from "../pages/Community/CommunityList";
import CommunityWrite from "../pages/Community/CommunityWrite";
import CommunityEdit from "../pages/Community/CommunityEdit";
import BoardRequestPage from "../pages/Community/BoardRequestPage";
import PostDetail from "../pages/Community/PostDetail";
import MyPage from "../pages/MyPage/MyPage";
import BoardRequestList from "../pages/Admin/BoardRequestList";
import PrivateRoutes from "./PrivateRoutes";
import ChallengeCreate from "../pages/Challenge/ChallengeCreate";
import ChallengeDetail from "../pages/Challenge/ChallengeDetail";
import Attendance from "../pages/Challenge/Attendance";
import ReviewList from "../pages/Challenge/ReviewList";
import ReviewCreate from "../pages/Challenge/ReviewCreate";
import ChallengeEdit from "../pages/Challenge/ChallengeEdit";
import ReviewEdit from "../pages/Challenge/ReviewEdit";
import TimeRecommendation from "../pages/Suggestion/TimeRecommendation";
import PreferenceInterest from "../pages/Suggestion/PreferenceInterest";
import PreferenceVision from "../pages/Suggestion/PreferenceVision";
import RecommendationResult from "../pages/Suggestion/RecommendationResult";
import AdminPage from "../pages/Admin/AdminPage";
import UserManagement from "../pages/Admin/UserManagement";
import MySchoolManagementPage from "../pages/MyPage/MySchoolManagementPage";
import TermsPage from "../pages/Auth/TermsPage";
import PrivacyPage from "../pages/Auth/PrivacyPage";
import MarketingPage from "../pages/Auth/MarketingPage";
import MyBoardRequest from "../pages/MyPage/MyBoardRequest";

const AppRoutes = () => {
    return (
        <Routes>
            {/* 기본 라우트 */}
            <Route path="/" element={<Calendar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Signup 라우트 */}
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/marketing" element={<MarketingPage />} />

            {/* Calendar 라우트 */}
            <Route path="/calendar" element={<Calendar />} />

            {/* Challenge 라우트 */}
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/challenge/create" element={<ChallengeCreate />} />
            <Route path="/suggestion" element={<Suggestion />} />
            <Route path="/attendance/:challengeId" element={<Attendance />} />
            <Route
                path="/challenge/:challengeId/reviews"
                element={<ReviewList />}
            />
            <Route
                path="/challenge/:challengeId/review/create"
                element={<ReviewCreate />}
            />
            <Route path="/challenge/:id" element={<ChallengeDetail />} />
            <Route path="/challenge/:id/edit" element={<ChallengeEdit />} />
            <Route
                path="/challenge/:challengeId/review/:reviewId/edit"
                element={<ReviewEdit />}
            />

            {/* AI 추천 기능 라우트 */}
            <Route
                path="/recommendation/time"
                element={<TimeRecommendation />}
            />
            <Route
                path="/suggestion/preferences"
                element={<PreferenceInterest />}
            />
            <Route
                path="/suggestion/preferences/vision"
                element={<PreferenceVision />}
            />
            <Route
                path="/suggestion/recommendation"
                element={<RecommendationResult />}
            />

            {/* Community 라우트 */}
            <Route path="/community" element={<CommunityList />} />
            <Route
                path="/community/:board_id/write"
                element={<CommunityWrite />}
            />
            <Route path="/posts/:post_id" element={<PostDetail />} />
            <Route
                path="/community/board-requests"
                element={<BoardRequestPage />}
            />

            {/* MyPage 라우트 */}
            <Route
                path="/mypage"
                element={
                    <PrivateRoutes>
                        <MyPage />
                    </PrivateRoutes>
                }>
                <Route index element={<Navigate to="info" replace />} />{" "}
                {/* 기본 페이지 설정 */}
                <Route path="info" element={<MyInfoPage />} />
                <Route path="my-school" element={<MySchoolManagementPage />} />
                <Route path="password" element={<ChangePasswordPage />} />
                <Route path="deactivate" element={<DeactivateAccountPage />} />
                <Route path="boardrequest" element={<MyBoardRequest />} />
            </Route>

            {/* 관리자 페이지 라우트 */}
            <Route
                path="/admin"
                element={
                    <PrivateRoutes>
                        <AdminPage />
                    </PrivateRoutes>
                }>
                <Route
                    index
                    element={<Navigate to="/admin/user-management" replace />}
                />{" "}
                {/* 기본 페이지 설정 */}
                <Route
                    path="/admin/user-management"
                    element={
                        <PrivateRoutes>
                            <UserManagement />
                        </PrivateRoutes>
                    }
                />
                <Route
                    path="/admin/board-requests"
                    element={
                        <PrivateRoutes>
                            <BoardRequestList />
                        </PrivateRoutes>
                    }
                />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
