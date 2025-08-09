// src/pages/Suggestion/TimeRecommendation.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchTimeRecommendations } from "../../api/timeRecommendation";
import TimeRecommendationCard from "../../components/Suggestion/TimeRecommendationCard";
import RecommendationModal from "../../components/Suggestion/RecommendationModal";
import Header from "../../components/Common/Header";
import styles from "./TimeRecommendation.module.css";

export default function TimeRecommendation() {
  const [schoolType, setSchoolType] = useState("elementary");
  const [month, setMonth] = useState(1);
  const [grade, setGrade] = useState(1);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // 추천 보기
  const handleFetch = async () => {
    try {
      const result = await fetchTimeRecommendations(schoolType, month, grade);
      setRecommendations(result);
    } catch (err) {
      console.error(err);
      alert("추천 정보를 불러오는 데 실패했습니다.");
    }
  };

  // 학년 변경 시 초/중 자동 설정
  const handleGradeChange = (e) => {
    const selectedGrade = Number(e.target.value);
    setGrade(selectedGrade);
    setSchoolType(selectedGrade <= 6 ? "elementary" : "middle");
  };

  return (
    <div className={styles.container}>
      <Header />

      {/* 상단 추천 유형 선택 (select 페이지와 동일 래퍼/그리드/스타일) */}
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

      {/* 학년/월 선택 */}
      <div className={styles.selectRow}>
        <label>
          학년
          <select value={grade} onChange={handleGradeChange}>
            <optgroup label="초등학교">
              {[1, 2, 3, 4, 5, 6].map((g) => (
                <option key={g} value={g}>
                  초등 {g}학년
                </option>
              ))}
            </optgroup>
            <optgroup label="중학교">
              {[7, 8, 9].map((g) => (
                <option key={g} value={g}>
                  중등 {g - 6}학년
                </option>
              ))}
            </optgroup>
          </select>
        </label>

        <label>
          월
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          >
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}월
              </option>
            ))}
          </select>
        </label>

        <button className={styles.fetchBtn} onClick={handleFetch}>
          추천 보기
        </button>
      </div>

      {/* 추천 카드 리스트 */}
      {recommendations.length === 0 ? (
        <div className={styles.emptyMessage}>
          학년과 월을 선택하고 <strong>추천 보기</strong> 버튼을 눌러주세요.
        </div>
      ) : (
        <div className={styles.cardList}>
          {recommendations.map((item) => (
            <TimeRecommendationCard
              key={item.item_id}
              item={item}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      )}

      {/* 상세 모달 */}
      <RecommendationModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
