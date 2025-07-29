import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Common/Header";
import LoginForm from "../../components/Auth/LoginForm";
import styles from "../../styles/Auth/LoginPage.module.css";

export default function Login() {
    const navigate = useNavigate();

    const handleKaKaoLogin = () => {
        window.location.href = "http://localhost:4000/auth/kakao";
    };

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <Header />
                </div>
                <div className={styles.content}>
                    <div className={styles.loginBox}>
                        <div className={styles.logoText}>E-ON</div>
                        <div className={styles.loginTitle}>로그인</div>
                        <LoginForm
                            onSuccess={() => {
                                setTimeout(() => {
                                    navigate("/");
                                    window.location.reload(); // 로그인 후 새로고침 (1)
                                    window.location.reload(); // 로그인 후 새로고침 (2)
                                }, 200);
                            }}
                        />
                        {/* ✅ 너의 카카오 로그인 버튼 추가 */}
                        <button
                            onClick={handleKaKaoLogin}
                            className={styles.kakaoButton}
                        >
                            카카오로 로그인
                        </button>

                        {/* ✅ 회원가입 버튼 아래에 유지 */}
                        <Link to="/signup" className={styles.signupButton}>
                            회원가입
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
