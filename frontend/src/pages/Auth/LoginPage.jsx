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
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.loginBox}>
                <div className={styles.logoText}>E-ON</div>
                <div className={styles.loginTitle}>로그인</div>
                <LoginForm onSuccess={() => navigate("/")} />

                {/*카카오 로그인 추가*/}
                <button
                    onClick={handleKaKaoLogin}
                    className={styles.kakaoButton}
                >
                    카카오로 로그인 
                </button>
                {/* <div className={styles.loginBottom}>
                    <Link to="/find-email">이메일 찾기</Link>
                    <span className={styles.divider}>|</span>
                    <Link to="/find-password">비밀번호 찾기</Link>
                </div> */}
                <Link to="/signup" className={styles.signupButton}>
                    회원가입
                </Link>
            </div>
        </div>
    );
}
