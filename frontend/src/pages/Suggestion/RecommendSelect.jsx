// src/pages/Suggestion/RecommendSelect.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Common/Header";

export default function RecommendSelect() {
  const navigate = useNavigate();
  const location = useLocation();

  const cards = [
    {
      path: "/recommend/time",
      title: "학년·월별 추천",
      desc: "학년과 월에 맞춰 계절과 학습 흐름을 반영한 활동 추천 목록 제공",
    },
    {
      path: "/recommend/profile",
      title: "내 프로필 맞춤",
      desc: "나의 관심사와 진로 희망을 바탕으로, 흥미와 목표에 맞는 챌린지 추천",
    },
    {
      path: "/recommend/history",
      title: "활동 기록 맞춤",
      desc: "챌린지·게시글·댓글 이력 등을 분석한 추천",
    },
  ];

  return (
    <>
      <Header />
      {/* ✅ 두 페이지 동일 래퍼: 폭/여백 통일 */}
      <div style={wrapperStyle}>
        {/* ✅ 동일 그리드 */}
        <div style={gridStyle}>
          {cards.map((c) => (
            <ButtonCard
              key={c.path}
              title={c.title}
              desc={c.desc}
              active={location.pathname === c.path}
              onClick={() => navigate(c.path)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

/** 카드형 버튼 (hover/active + 폭 고정) */
function ButtonCard({ title, desc, active, onClick }) {
  const [hover, setHover] = useState(false);

  const base = {
    display: "block",
    width: "100%",              // ✅ 버튼 가로폭 강제
    textAlign: "left",
    borderRadius: 14,
    border: "1px solid #e5e7eb",
    padding: "16px 14px",
    background: "#fff",
    boxShadow: hover
      ? "0 6px 16px rgba(0,0,0,.06)"
      : "0 4px 12px rgba(0,0,0,.04)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    transform: hover ? "translateY(-2px)" : "translateY(0)",
    boxSizing: "border-box",
  };

  const activeStyle = active
    ? { background: "#f0f9ff", border: "1px solid #38bdf8" }
    : null;

  return (
    <button
      onClick={onClick}
      style={{ ...base, ...activeStyle }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={titleStyle}>{title}</div>
      <div style={descStyle}>{desc}</div>
    </button>
  );
}

/* 공통 스타일(두 페이지 동일 적용) */
const wrapperStyle = { maxWidth: 960, margin: "24px auto", padding: "0 16px" };
const gridStyle = {
  display: "grid",
  gap: 12,
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
};
const titleStyle = { fontWeight: 700, marginBottom: 4 };
const descStyle = { color: "#64748b", fontSize: 14, lineHeight: 1.4 };
