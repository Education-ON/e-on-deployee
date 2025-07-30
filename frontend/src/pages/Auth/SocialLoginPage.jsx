import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../api/axiosInstance";
import Header from "../../components/Common/Header";
import styles from "../../styles/Auth/LoginPage.module.css";

export default function SocialLoginPage() {
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
    axiosInstance
      .post(
        "/auth/social-signup",  // baseURL 이미 포함돼 있음
        {
          name: formData.name,
          type: formData.type,
          age: formData.age,
          agreements: formData.agreements,
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
          alert(err.response?.data?.message || "오류가 발생했습니다.");
        }
      });
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.loginBox}>
        <div className={styles.logoText}>E-ON</div>
        <div className={styles.loginTitle}>추가 정보 입력</div>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className="inputGroup">
            <label>이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputGroup">
            <label>회원 유형</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className={styles.input}
            >
              <option value="">선택해주세요</option>
              <option value="student">학생</option>
              <option value="parent">학부모</option>
            </select>
          </div>

          <div className="inputGroup">
            <label>{formData.type === "parent" ? "자녀의 나이" : "나이"}</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min={8}
              max={16}
              required
            />
            {formData.type === "parent" && (
              <p style={{ fontSize: "0.9rem", color: "#555" }}>
                자녀의 나이를 입력해주세요. (8~16세 사이)
              </p>
            )}
          </div>

          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              name="service"
              checked={formData.agreements.service}
              onChange={handleChange}
              required
            />
            <label>서비스 이용약관 동의</label>
          </div>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              name="privacy"
              checked={formData.agreements.privacy}
              onChange={handleChange}
              required
            />
            <label>개인정보 수집 동의</label>
          </div>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              name="marketing"
              checked={formData.agreements.marketing}
              onChange={handleChange}
            />
            <label>마케팅 수신 동의 (선택)</label>
          </div>

          <button type="submit" className={styles.loginButton}>
            가입 완료
          </button>
        </form>
      </div>
    </div>
  );
}