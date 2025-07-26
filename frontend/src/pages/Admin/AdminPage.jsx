// src/pages/MyPage/MyPage.jsx (관리자 페이지)

import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/MyPage/Mypage.module.css";
import { toast } from "react-toastify";

export default function AdminPage() {
    const { user, loading } = useAuth();

    if (loading) return <p>로딩 중...</p>;
    if (!user) return <Navigate to="/login" />;

    if (user.type !== "admin") {
        toast("일반 사용자는 관리자 페이지에 접근할 수 없습니다.", {
            icon: "💜",
            className: "my-toast",
            progressClassName: "custom-progress-bar",
        });
        return <Navigate to="/calendar" />; // return 추가!
    }

    return (
        <div className={styles.container}>
            <h2>관리자 페이지</h2>
            <div className={styles.userInfo}>
                <p>
                    <strong>{user.name}</strong>
                </p>
                <p>{user.email}</p>
            </div>

            <div className={styles.menuGrid}>
                <Link to="/admin/user-management" className={styles.menuBox}>
                    사용자 관리
                </Link>
                <Link to="/admin/board-requests" className={styles.menuBox}>
                    게시판 개설 요청 확인하기
                </Link>
                <Link to="/admin/challenge-requests" className={styles.menuBox}>
                    챌린지 개설 요청 확인하기
                </Link>
            </div>
        </div>
    );
}
