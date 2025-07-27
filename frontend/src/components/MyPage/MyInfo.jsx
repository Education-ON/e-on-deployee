// src/pages/MyPage/MyInfo.jsx
import { useState, useEffect } from "react";
import api from "../../api/axiosInstance";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/MyPage/MyInfo.module.css";
import { toast } from "react-toastify";

const MyInfo = () => {
    const { user, setUser } = useAuth();

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [userType, setUserType] = useState("");
    const [emailNotification, setEmailNotification] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [message, setMessage] = useState({ type: "", text: "" });
    const [step, setStep] = useState(1); // 1단계: 비번 확인, 2단계: 정보 수정
    const [verifyPassword, setVerifyPassword] = useState("");

    // 초기값 세팅
    useEffect(() => {
        if (user) {
            setName(user.name);
            setAge(user.age);
            setEmailNotification(user.emailNotification ?? false);
            user.type === "student"
                ? setUserType("학생")
                : setUserType("학부모");
        }
    }, [user]);

    const handleVerifyPassword = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        try {
            const res = await api.post("/api/user/verify-password", {
                password: verifyPassword,
            });

            if (res.data.success) {
                toast("현재 비밀번호와 일치합니다.", {
                    icon: "🔐",
                    className: "my-toast",
                    progressClassName: "custom-progress-bar",
                });
                setCurrentPassword(verifyPassword);
                setVerifyPassword("");
                setStep(2); // 다음 단계로 이동
            }
        } catch (err) {
            setMessage({
                type: "error",
                text:
                    err.response?.data?.message ||
                    "비밀번호가 일치하지 않습니다.",
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        try {
            const payload = {
                currentPassword,
                ...(name !== undefined && { name }),
                ...(age !== undefined && { age }),
                ...(emailNotification !== undefined && { emailNotification }),
            };

            const res = await api.put("/api/user/me", payload);

            console.log("[1] ", res);

            setMessage({ type: "success", text: res.data.message });

            // 변경된 내 정보 다시 조회해서 Context 갱신
            try {
                const me = await api.get("/api/user/me");
                setUser(me.data.user);
            } catch (err) {
                console.warn("사용자 정보 재조회 실패", err);
                // 여기는 메시지 안 띄워도 됨
            }

            // 비밀번호 입력란 초기화
            setCurrentPassword("");
            // console.log("message 객체:", message); // 여기도 로그 추가
        } catch (err) {
            // console.log("message 객체:", message); // 여기도 로그 추가

            setMessage({
                type: "error",
                text: err.response?.data?.message || "수정에 실패했습니다.",
            });
        }
    };

    if (!user) return <p>로딩 중...</p>;

    return (
        <div className={styles.myInfoContainer}>
            {message.text && (
                <p
                    style={{
                        color: message.type === "error" ? "red" : "green",
                    }}>
                    {message.text}
                </p>
            )}
            {step === 1 && (
                <form onSubmit={handleVerifyPassword} className={styles.form}>
                    <h3 className={styles.sectionTitle}>내 정보 수정</h3>
                    <div className={styles.formGroup}>
                        <label>현재 비밀번호 입력</label>
                        <input
                            className={styles.input}
                            type="password"
                            value={verifyPassword}
                            onChange={(e) => setVerifyPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        확인
                    </button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>이름</label>
                        <input
                            className={styles.input}
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>나이</label>
                        <div className={styles.ageInputWrapper}>
                            <button
                                type="button"
                                className={`${styles.ageButton} ${
                                    age <= 8 ? styles.disabled : ""
                                }`}
                                onClick={() =>
                                    setAge((prev) => Math.max(8, prev - 1))
                                }
                                disabled={age <= 8}>
                                -
                            </button>
                            <input
                                type="number"
                                className={styles.input}
                                value={age}
                                min={8}
                                max={16}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value, 10);
                                    if (!isNaN(value)) {
                                        setAge(
                                            Math.max(8, Math.min(16, value))
                                        );
                                    }
                                }}
                            />
                            <button
                                type="button"
                                className={`${styles.ageButton} ${
                                    age >= 16 ? styles.disabled : ""
                                }`}
                                onClick={() =>
                                    setAge((prev) => Math.min(16, prev + 1))
                                }
                                disabled={age >= 16}>
                                +
                            </button>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>이메일</label>
                        <input
                            className={styles.input}
                            type="email"
                            value={user.email}
                            disabled
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>회원 종류</label>
                        <input
                            className={styles.input}
                            type="text"
                            value={userType}
                            disabled
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>
                            <input
                                type="checkbox"
                                checked={emailNotification}
                                onChange={(e) =>
                                    setEmailNotification(e.target.checked)
                                }
                            />
                            이메일 알림 수신 여부
                        </label>
                    </div>

                    {/* <div className={styles.formGroup}>
                        <label>현재 비밀번호</label>
                        <input
                            className={styles.input}
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div> */}

                    <button type="submit" className={styles.submitButton}>
                        저장하기
                    </button>
                </form>
            )}
        </div>
    );
};

export default MyInfo;

{
    /* <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label>이메일</label>
                    <input
                        className={styles.input}
                        type="email"
                        value={user.email}
                        disabled
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>이름</label>
                    <input
                        className={styles.input}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>이메일 알림</label>
                    <input
                        className={styles.input}
                        type="checkbox"
                        checked={emailNotification}
                        onChange={(e) => setEmailNotification(e.target.checked)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>현재 비밀번호</label>
                    <input
                        className={styles.input}
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    저장하기
                </button>
            </form>
        </div> */
}
