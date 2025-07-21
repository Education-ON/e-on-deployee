import Header from "../../components/Common/Header";
import styles from "../../styles/Pages/MySchoolManagement.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { saveMySchool, deleteMySchool, getMySchool } from "../../api/schoolApi";
import { toast } from "react-toastify";

const MySchoolManagement = () => {
    const [mySchoolCode, setMySchoolCode] = useState(null);
    const { user } = useContext(AuthContext);
    const userId = user?.user_id; // 로그인된 사용자 ID

    useEffect(() => {
        const fetchMySchool = async () => {
            if (!userId) return;

            try {
                const res = await getMySchool(userId);
                setMySchoolCode(res.data?.schoolCode);
            } catch (err) {
                console.error("나의 학교 조회 실패", err);
            }
        };
        fetchMySchool();
    }, [userId]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.content}>
                <div className={styles.title}>나의 학교 관리</div>
                <div className={styles.mySchool}>
                    
                </div>
            </div>
        </div>
    );
};

export default MySchoolManagement;
