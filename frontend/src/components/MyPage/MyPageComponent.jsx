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
            {/* <h2 className={styles.title}>마이페이지</h2>
            <div className={styles.userInfo}>
                <p className={styles.userName}>
                    <strong>{user.name}</strong>
                </p>
                <p className={styles.userEmail}>{user.email}</p>
            </div> */}

            <div className={styles.menuGrid}>
                <Link
                    to="/mypage/info"
                    className={`${styles.menuItem} ${
                        location.pathname === "/mypage/info"
                            ? styles.active
                            : ""
                    }`}>
                    내 정보 수정
                </Link>
                <Link
                    to="/mypage/my-school"
                    className={`${styles.menuItem} ${
                        location.pathname === "/mypage/my-school"
                            ? styles.active
                            : ""
                    }`}>
                    나의 학교 관리
                </Link>
                <Link
                    to="/mypage/boardrequest"
                    className={`${styles.menuItem} ${
                        location.pathname === "/mypage/boardrequest"
                            ? styles.active
                            : ""
                    }`}>
                    게시판 개설 신청 현황
                </Link>
                <Link
                    to="/mypage/password"
                    className={`${styles.menuItem} ${
                        location.pathname === "/mypage/password"
                            ? styles.active
                            : ""
                    }`}>
                    비밀번호 변경
                </Link>
                <Link
                    to="/mypage/deactivate"
                    className={`${styles.menuItem} ${
                        location.pathname === "/mypage/deactivate"
                            ? styles.active
                            : ""
                    }`}>
                    계정 탈퇴 / 비활성화
                </Link>
            </div>
            <div className={styles.contentArea}>
                {/* 하위 페이지 컴포넌트 로딩 */}
                <Outlet />
            </div>
        </div>
    );
};

export default MyPageComponent;
