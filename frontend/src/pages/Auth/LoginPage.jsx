import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Common/Header";
import LoginForm from "../../components/Auth/LoginForm";
import styles from "../../styles/Auth/LoginPage.module.css";

export default function Login() {
    const navigate = useNavigate();

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
                                    // star_filled 렌더링 문제 해결 전까지는 임시로 설정
                                }, 200);
                            }}
                        />

                        <Link to="/signup" className={styles.signupButton}>
                            회원가입
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
