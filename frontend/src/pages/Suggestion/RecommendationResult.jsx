import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchRecommendationsByPreference } from "../../api/preference";
import PersonalRecommendationCard from "../../components/Suggestion/PersonalRecommendationCard";
import Header from "../../components/Common/Header";
import styles from "./RecommendationResult.module.css";

export default function RecommendationResult() {
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))?.user_id;
    if (!userId) {
      console.error("❌ user_id를 localStorage에서 찾을 수 없습니다.");
      return;
    }
    fetchRecommendationsByPreference(userId)
      .then((data) => setRecommendations(Array.isArray(data?.items) ? data.items : []))
      .catch((err) => console.error("추천 로딩 실패:", err));
  }, []);

  return (
    <div className={styles.container}>
      <Header />

      {/* 상단 추천 유형 선택 (time 페이지와 동일 래퍼/그리드/스타일) */}
      <div className={styles.wrapper}>
        <div className={styles.tabGrid}>
          <button
            onClick={() => navigate("/recommend/time")}
            className={`${styles.tabCard} ${
              location.pathname === "/recommend/time" ? styles.activeTab : ""
            }`}
          >
            <div className={styles.tabTitle}>학년·월별 추천</div>
            <div className={styles.tabDesc}>
              학년과 월에 맞춰 계절·학습 흐름을 반영한 활동 추천
            </div>
          </button>

          <button
            onClick={() => navigate("/recommend/profile")}
            className={`${styles.tabCard} ${
              location.pathname === "/recommend/profile" ? styles.activeTab : ""
            }`}
          >
            <div className={styles.tabTitle}>내 프로필 맞춤</div>
            <div className={styles.tabDesc}>
              나의 관심사와 진로 목표에 맞춘 추천
            </div>
          </button>

          <button
            onClick={() => navigate("/recommend/history")}
            className={`${styles.tabCard} ${
              location.pathname === "/recommend/history" ? styles.activeTab : ""
            }`}
          >
            <div className={styles.tabTitle}>활동 기록 맞춤</div>
            <div className={styles.tabDesc}>
              챌린지·게시글·댓글 이력을 분석한 추천
            </div>
          </button>
        </div>
      </div>

      {/* 헤딩 */}
      <div className={styles.wrapper}>
        <h2 className={styles.sectionTitle}>추천 결과</h2>

        {/* 추천 카드 리스트 */}
        {recommendations.length === 0 ? (
          <div className={styles.emptyMessage}>추천된 챌린지가 없습니다.</div>
        ) : (
          <div className={styles.cardList}>
            {recommendations.map((item) =>
              item ? (
                <PersonalRecommendationCard
                  key={item.challenge_id}
                  challenge={item}
                />
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}
