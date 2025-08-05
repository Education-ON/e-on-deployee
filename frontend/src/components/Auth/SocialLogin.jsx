import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import styles from "../../styles/Auth/SocialLogin.module.css";

const SocialLogin = () => {
    const navigate = useNavigate();
    const [socialUser, setSocialUser] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        age: "",
        agreements: {
            service: false,
            privacy: false,
            marketing: false,
        },
    });

    useEffect(() => {
        axiosInstance
            .get("/auth/social-session")
            .then((res) => setSocialUser(res.data))
            .catch(() => {
                alert("유효하지 않은 접근입니다.");
                navigate("/login");
            });
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name in formData.agreements) {
            setFormData((prev) => ({
                ...prev,
                agreements: {
                    ...prev.agreements,
                    [name]: checked,
                },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        
            const selectedAgreements = Object.entries(formData.agreements)
                .filter(([_, v]) => v)
                .map(([k]) => k);

            console.log("🟢 보내는 데이터:", {
                name: formData.name,
                type: formData.type,
                age: formData.age,
                agreements: selectedAgreements,
            });

        axiosInstance
            .post(
                "/auth/social-signup", // baseURL 이미 포함돼 있음
                {
                    name: formData.name,
                    type: formData.type,
                    age: formData.age,
                    agreements: selectedAgreements, 
                    email_notification: true, 
                },
                { withCredentials: true }
            )

            .then(() => {
                alert("회원가입이 완료되었습니다.");
                navigate("/");
            })
            .catch((err) => {
                if (err.response?.status === 409) {
                    alert(err.response.data.message); // 이메일 중복 안내
                    navigate("/login");
                } else {
                    alert(
                        err.response?.data?.message || "오류가 발생했습니다."
                    );
                }
            });
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.logoText}>E-ON</div>
            <div className={styles.loginTitle}>추가 정보 입력</div>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <div className={styles.inputGroup}>
                    <label>이름</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        className={styles.input}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>회원 유형</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className={styles.input}>
                        <option value="">-- 회원 유형 선택 --</option>
                        <option value="student">학생</option>
                        <option value="parent">학부모</option>
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label>
                        {formData.type === "parent" ? "자녀의 나이" : "나이"}
                    </label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        className={styles.input}
                        onChange={handleChange}
                        min={8}
                        max={16}
                        required
                    />
                    {formData.type === "parent" && (
                        <p className={styles.smallText}>
                            자녀의 나이를 입력해주세요. (8~16세 사이)
                        </p>
                    )}
                </div>

                <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="service"
                            checked={formData.agreements.service}
                            onChange={handleChange}
                            required
                        />
                        서비스 이용약관 동의
                    </label>
                </div>
                <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="privacy"
                            checked={formData.agreements.privacy}
                            onChange={handleChange}
                            required
                        />
                        개인정보 수집 동의
                    </label>
                </div>
                <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="marketing"
                            checked={formData.agreements.marketing}
                            onChange={handleChange}
                        />
                        마케팅 수신 동의 (선택)
                    </label>
                </div>

                <button type="submit" className={styles.loginButton}>
                    가입 완료
                </button>
            </form>
        </div>
    );
};

export default SocialLogin;
