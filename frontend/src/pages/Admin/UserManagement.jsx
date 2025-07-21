import { useEffect, useState } from "react";

import Header from "../../components/Common/Header";
import styles from "../../styles/Admin/UserManagement.module.css";

const UserManagement = () => {
    const [userList, setUserList] = useState([]);

    const fetchAllUsers = async () => {
        try {
            // const response = await getAllUsers();
            // setUserList(response.data.requests);
        } catch (error) {
            console.error("게시판 개설 신청 목록 조회 실패", error);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div className={styles.container}>
            <Header />
            <h2 className={styles.title}>사용자 목록</h2>

            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <div>사용자명</div>
                    <div>나이</div>
                    <div>타입</div>
                    <div>이메일</div>
                    <div>상태</div>
                    <div>상태변경</div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
