import Header from "../../components/Common/Header";
import SocialLogin from "../../components/Auth/SocialLogin";
import styles from "../../styles/Auth/SocialLogin.module.css";

const SocialLoginPage = () => {
    return (
        <div className={styles.loginWrapper}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.loginBox}>
                <SocialLogin />
            </div>
        </div>
    );
};

export default SocialLoginPage;
