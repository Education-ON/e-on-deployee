import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Common/Header";
import styles from "./HistoryRecommendation.module.css";

export default function HistoryRecommendation() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const API =
    (import.meta.env.VITE_API_BASE_URL || "") +
    "/api/ai/recommend/history";

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}), // 로그인 유저 기준
          credentials: "include",   // 세션 쿠키 전송(중요)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || data?.error || `HTTP ${res.status}`);
        setItems(Array.isArray(data) ? data : data.items || []);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [API]);

  return (
    <div className={styles.container}>
      <Header />

      {/* 상단 추천 유형 선택 — select/time/profile과 동일 */}
      <div className={styles.wrapper}>
        <div className={styles.tabGrid}>
          <button
            onClick={() => navigate("/recommend/time")}
            className={`${styles.tabCard} ${location.pathname === "/recommend/time" ? styles.activeTab : ""}`}
          >
            <div className={styles.tabTitle}>학년·월별 추천</div>
            <div className={styles.tabDesc}>
              학년과 월에 맞춰 계절·학습 흐름을 반영한 활동 추천
            </div>
          </button>

          <button
            onClick={() => navigate("/recommend/profile")}
            className={`${styles.tabCard} ${location.pathname === "/recommend/profile" ? styles.activeTab : ""}`}
          >
            <div className={styles.tabTitle}>내 프로필 맞춤</div>
            <div className={styles.tabDesc}>
              나의 관심사와 진로 목표에 맞춘 추천
            </div>
          </button>

          <button
            onClick={() => navigate("/recommend/history")}
            className={`${styles.tabCard} ${location.pathname === "/recommend/history" ? styles.activeTab : ""}`}
          >
            <div className={styles.tabTitle}>활동 기록 맞춤</div>
            <div className={styles.tabDesc}>
              챌린지·게시글·댓글 이력을 분석한 추천
            </div>
          </button>
        </div>
      </div>

      {/* 본문 */}
      <div className={styles.wrapper}>
        <h2 className={styles.sectionTitle}>추천 결과</h2>

        {loading && <p className={styles.infoText}>불러오는 중…</p>}
        {err && <p className={styles.errorText}>⚠️ {err}</p>}
        {!loading && !err && items.length === 0 && (
          <p className={styles.infoText}>추천 결과가 없습니다.</p>
        )}

        {items.length > 0 && (
          <div className={styles.cardList}>
            {items.map((c) => (
              <article key={c.challenge_id} className={styles.card}>
                <h3 className={styles.cardTitle}>
                  {c.title || `챌린지 #${c.challenge_id}`}
                </h3>
                {c.description && (
                  <p className={styles.cardDesc}>{c.description}</p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
