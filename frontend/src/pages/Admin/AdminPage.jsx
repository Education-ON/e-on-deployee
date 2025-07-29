import styles from "../../styles/MyPage/Mypage.module.css";
import Header from "../../components/Common/Header";
import AdminPageComponent from "../../components/Admin/AdminPageComponent";

export default function AdminPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.content}>
                <AdminPageComponent />
            </div>
        </div>
    );
}
