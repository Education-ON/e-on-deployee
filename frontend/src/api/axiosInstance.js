import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:4000",
  withCredentials: true,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

/* ───────── 요청 인터셉터 ─────────
   FormData 전송 시 Content-Type 헤더를 지워야
   Axios가 boundary 를 자동으로 붙입니다. */
axiosInstance.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

/* ───────── 응답 인터셉터 ─────────
   403 + “정지” 메시지를 만나면
   1) 토스트 경고
   2) 전역 이벤트(ban-update)로 bannedUntil 전달 */
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    const msg    = err.response?.data?.message;

    if (status === 403 && msg?.includes("정지")) {
      // 1) 사용자에게 알림
      toast(msg, { icon: "⚠️" });

      // 2) 앱 전역으로 현재 정지 만료일 전달 (AuthContext 등에서 청취)
      const bannedUntil = msg.match(/\d{4}-\d{2}-\d{2}[^ ]*/)?.[0] || null;
      window.dispatchEvent(new CustomEvent("ban-update", { detail: { bannedUntil } }));
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
