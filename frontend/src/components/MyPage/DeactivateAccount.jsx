import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/MyPage/MyInfo.module.css";
import api from "../../api/axiosInstance";
import ConfirmModal from "../Common/ConfirmModal";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

const DeactivateAccount = () => {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [verifyPassword, setVerifyPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [action, setAction] = useState("deactivate"); // deactivate | delete
    const [msg, setMsg] = useState({ type: "", text: "" });
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();
        setMsg({ type: "", text: "" });

        if (!verifyPassword) {
            setMsg({ type: "error", text: "비밀번호를 입력해주세요." });
            return;
        }

        try {
            const res = await api.post("/api/user/verify-password", {
                password: verifyPassword,
            });

            if (res.data.success) {
                setCurrentPassword(verifyPassword);
                setVerifyPassword("");
                setStep(2);
            }
        } catch (err) {
            setMsg({
                type: "error",
                text:
                    err.response?.data?.message ||
                    "비밀번호가 일치하지 않습니다.",
            });
        }
    };

    const handlePreSubmit = (e) => {
        e.preventDefault();
        setOpen(true); // 모달 열기
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg({ type: "", text: "" });

        try {
            if (action === "deactivate") {
                const res = await api.patch("/api/user/me/deactivate", {
                    currentPassword,
                });
                setMsg({ type: "success", text: res.data.message });
            } else {
                const res = await api.delete("/api/user/me", {
                    data: { currentPassword },
                });
                setMsg({ type: "success", text: res.data.message });
            }

            await logout();
            navigate("/");
            // setTimeout(() => navigate("/"), 500);
        } catch (err) {
            setMsg({
                type: "error",
                text: err.response?.data?.message || "처리에 실패했습니다.",
            });
        }
    };

    return (
        <div className={styles.myInfoContainer}>
            {msg.text && (
                <p
                    className={
                        msg.type === "error"
                            ? styles.errorMessage
                            : styles.successMessage
                    }>
                    {msg.text}
                </p>
            )}

            {step === 1 && (
                <form onSubmit={handleVerify} className={styles.form}>
                    <h3 className={styles.sectionTitle}>
                        계정 {action === "deactivate" ? "비활성화" : "탈퇴"}
                    </h3>
                    <div className={styles.formGroup}>
                        <label>현재 비밀번호 입력</label>
                        <input
                            className={styles.input}
                            type="password"
                            value={verifyPassword}
                            onChange={(e) => setVerifyPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        확인
                    </button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handlePreSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>처리 선택</label>
                        <div style={{ display: "flex", gap: "1rem" }}>
                            <label>
                                <input
                                    type="radio"
                                    name="action"
                                    value="deactivate"
                                    checked={action === "deactivate"}
                                    onChange={() => setAction("deactivate")}
                                />
                                비활성화
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="action"
                                    value="delete"
                                    checked={action === "delete"}
                                    onChange={() => setAction("delete")}
                                />
                                탈퇴
                            </label>
                        </div>
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        {action === "deactivate"
                            ? "계정 비활성화"
                            : "회원 탈퇴"}
                    </button>
                    <ConfirmModal
                        open={open}
                        title={
                            action === "deactivate"
                                ? "정말 계정을 비활성화하시겠습니까?"
                                : "정말 탈퇴하시겠습니까?"
                        }
                        message="이 작업은 되돌릴 수 없습니다."
                        onConfirm={async () => {
                            await handleSubmit(new Event("submit")); // 가짜 submit 이벤트 전달
                            setOpen(false);
                            toast.success("삭제 완료!", {
                                className: "my-toast",
                                progressClassName: "custom-progress-bar",
                            });
                        }}
                        onCancel={() => setOpen(false)}
                    />
                </form>
            )}
        </div>
    );
};

export default DeactivateAccount;
