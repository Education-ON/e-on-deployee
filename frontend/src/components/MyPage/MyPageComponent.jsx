// src/components/MyPage/MyPage.jsx
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/MyPage/Mypage.module.css";

const MyPageComponent = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <p>로딩 중...</p>;
    if (!user) return <Navigate to="/login" />;

    return (
        <div className={styles.container}>
            {/* 관리자/유저 분기 타이틀 */}
            {user.type === "admin" ? (
                <h2 className={styles.title}>관리자 페이지</h2>
            ) : (
                <h2 className={styles.title}>마이페이지</h2>
            )}

            {/* 사용자 정보 영역 */}
            <div className={styles.userInfo}>
                <p className={styles.userName}>
                    <strong>{user.name}</strong>
                </p>
                <p className={styles.userEmail}>{user.email}</p>
            </div>

            {/* 메뉴 (관리자/유저 분기) */}
            <div className={styles.menuGrid}>
                {/* 일반 유저용 메뉴 */}
                {user.type !== "admin" && (
                    <>
                        <Link
                            to="/mypage/info"
                            className={`${styles.menuItem} ${
                                location.pathname === "/mypage/info" ? styles.active : ""
                            }`}
                        >
                            내 정보 수정
                        </Link>
                        <Link
                            to="/mypage/my-school"
                            className={`${styles.menuItem} ${
                                location.pathname === "/mypage/my-school" ? styles.active : ""
                            }`}
                        >
                            나의 학교 관리
                        </Link>
                        <Link
                            to="/mypage/password"
                            className={`${styles.menuItem} ${
                                location.pathname === "/mypage/password" ? styles.active : ""
                            }`}
                        >
                            비밀번호 변경
                        </Link>
                        <Link
                            to="/mypage/deactivate"
                            className={`${styles.menuItem} ${
                                location.pathname === "/mypage/deactivate" ? styles.active : ""
                            }`}
                        >
                            계정 탈퇴 / 비활성화
                        </Link>
                        <Link
                            to="/mypage/board-requests"
                            className={`${styles.menuItem} ${
                                location.pathname === "/mypage/board-requests" ? styles.active : ""
                            }`}
                        >
                            내 게시판 개설 요청 확인하기
                        </Link>
                        <Link
                            to="/mypage/challenge-requests"
                            className={`${styles.menuItem} ${
                                location.pathname === "/mypage/challenge-requests" ? styles.active : ""
                            }`}
                        >
                            챌린지 개설 요청 확인하기
                        </Link>
                    </>
                )}
                {/* 관리자용 메뉴 */}
                {user.type === "admin" && (
                    <>
                        <Link
                            to="/admin/board-requests"
                            className={styles.menuItem}
                        >
                            게시판 개설 요청 확인하기
                        </Link>
                        <Link
                            to="/admin/challenge-requests"
                            className={styles.menuItem}
                        >
                            챌린지 개설 요청 확인하기
                        </Link>
                    </>
                )}
            </div>

            {/* 하위 페이지 */}
            <div className={styles.contentArea}>
                <Outlet />
            </div>
        </div>
    );
};

export default MyPageComponent;
