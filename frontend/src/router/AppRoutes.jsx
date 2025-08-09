import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";

// Auth
import Login from "../pages/Auth/LoginPage";
import Signup from "../pages/Auth/SignupPage";
import TermsPage from "../pages/Auth/TermsPage";
import PrivacyPage from "../pages/Auth/PrivacyPage";
import MarketingPage from "../pages/Auth/MarketingPage";
import SocialLoginPage from "../pages/Auth/SocialLoginPage";

// Calendar & Suggestion
import Calendar from "../pages/Calendar/Calendar";
import Suggestion from "../pages/Suggestion/Suggestion";
import TimeRecommendation from "../pages/Suggestion/TimeRecommendation";
import PreferenceInterest from "../pages/Suggestion/PreferenceInterest";
import PreferenceVision from "../pages/Suggestion/PreferenceVision";
import RecommendationResult from "../pages/Suggestion/RecommendationResult";

// Challenge
import Challenge from "../pages/Challenge/Challenge";
import ChallengeCreate from "../pages/Challenge/ChallengeCreate";
import ChallengeDetail from "../pages/Challenge/ChallengeDetail";
import Attendance from "../pages/Challenge/Attendance";
import ReviewList from "../pages/Challenge/ReviewList";
import ReviewCreate from "../pages/Challenge/ReviewCreate";
import ChallengeEdit from "../pages/Challenge/ChallengeEdit";
import ReviewEdit from "../pages/Challenge/ReviewEdit";

// Community
import CommunityList from "../pages/Community/CommunityList";
import CommunityWrite from "../pages/Community/CommunityWrite";
import CommunityEdit from "../pages/Community/CommunityEdit";
import BoardRequestPage from "../pages/Community/BoardRequestPage";
import PostDetail from "../pages/Community/PostDetail";

// MyPage
import MyPage from "../pages/MyPage/MyPage";
import MyInfoPage from "../pages/MyPage/MyInfoPage";
import ChangePasswordPage from "../pages/MyPage/ChangePasswordPage";
import DeactivateAccountPage from "../pages/MyPage/DeactivateAccountPage";
import MySchoolManagementPage from "../pages/MyPage/MySchoolManagementPage";
import MyBoardRequest from "../pages/MyPage/MyBoardRequest";
import ActivityHistory from "../pages/MyPage/ActivityHistory";
import MyParticipatedChallenges from "../pages/MyPage/MyParticipatedChallenges";
import MyCreatedChallenges from "../pages/MyPage/MyCreatedChallenges";
import PreferencesAndVisions from "../pages/MyPage/PreferencesAndVisions";
import ChooseInterest from "../pages/MyPage/ChooseInterest";
import ChooseVision from "../pages/MyPage/ChooseVision";

// Admin
import AdminPage from "../pages/Admin/AdminPage";
import UserManagement from "../pages/Admin/UserManagement";
import BoardRequestList from "../pages/Admin/BoardRequestList";
import ChallengeRequests from "../pages/MyPage/ChallengeRequests";
import AdminChallengeDetail from "../pages/MyPage/AdminChallengeDetail";
import ReportList from "../pages/Community/ReportList";

const AppRoutes = () => {
    return (
        <Routes>
            {/* 기본 라우트 */}
            <Route path="/" element={<Calendar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/marketing" element={<MarketingPage />} />

            {/* 소셜 로그인 */}
            <Route path="/social-login" element={<SocialLoginPage />} />

            {/* Calendar */}
            <Route path="/calendar" element={<Calendar />} />

            {/* Challenge */}
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/challenge/create" element={<ChallengeCreate />} />
            <Route path="/attendance/:challengeId" element={<Attendance />} />
            <Route path="/challenge/:id" element={<ChallengeDetail />} />
            <Route path="/challenge/:id/edit" element={<ChallengeEdit />} />
            <Route
                path="/challenge/:challengeId/reviews"
                element={<ReviewList />}
            />
            <Route
                path="/challenge/:challengeId/review/create"
                element={<ReviewCreate />}
            />
            <Route
                path="/challenge/:challengeId/review/:reviewId/edit"
                element={<ReviewEdit />}
            />

            {/* Suggestion */}
            <Route path="/suggestion" element={<Suggestion />} />
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

            {/* Community */}
            <Route path="/community" element={<CommunityList />} />
            <Route
                path="/community/:board_id/write"
                element={<CommunityWrite />}
            />
            <Route
                path="/community/:board_id/edit"
                element={<CommunityEdit />}
            />
            <Route path="/posts/:post_id" element={<PostDetail />} />
            <Route
                path="/community/board-requests"
                element={<BoardRequestPage />}
            />

            {/* MyPage (중첩 라우트) */}
            <Route
                path="/mypage"
                element={
                    <PrivateRoutes>
                        <MyPage />
                    </PrivateRoutes>
                }>
                <Route index element={<Navigate to="info" replace />} />
                <Route path="info" element={<MyInfoPage />} />
                <Route path="my-school" element={<MySchoolManagementPage />} />
                <Route path="password" element={<ChangePasswordPage />} />
                <Route path="deactivate" element={<DeactivateAccountPage />} />
                <Route path="boardrequest" element={<MyBoardRequest />} />
                <Route path="activity-history" element={<ActivityHistory />} />
                <Route
                    path="my-challenges"
                    element={<MyParticipatedChallenges />}
                />
                <Route
                    path="created-challenges"
                    element={<MyCreatedChallenges />}
                />
                <Route
                    path="preferences-visions"
                    element={<PreferencesAndVisions />}
                />
                <Route path="choose-interests" element={<ChooseInterest />} />
                <Route path="choose-visions" element={<ChooseVision />} />
            </Route>

            {/* Admin (중첩 라우트) */}
            <Route
                path="/admin"
                element={
                    <PrivateRoutes>
                        <AdminPage />
                    </PrivateRoutes>
                }>
                <Route
                    index
                    element={<Navigate to="user-management" replace />}
                />
                <Route path="user-management" element={<UserManagement />} />
                <Route path="board-requests" element={<BoardRequestList />} />
                <Route
                    path="challenge-requests"
                    element={<ChallengeRequests />}
                />
                <Route
                    path="challenge-requests/:id"
                    element={<AdminChallengeDetail />}
                />
                <Route path="reports" element={<ReportList />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
