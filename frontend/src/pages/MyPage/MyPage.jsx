// src/pages/MyPage/MyPage.jsx
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/MyPage/Mypage.module.css";
import Header from "../../components/Common/Header";
import MyPageComponent from "../../components/MyPage/MyPageComponent"

export default function MyPage() {
    const { user, loading } = useAuth();

    if (loading) return <p>로딩 중...</p>;
    if (!user) return <Navigate to="/login" />;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.content}>
                <MyPageComponent />
            </div>
        </div>
    );
}
