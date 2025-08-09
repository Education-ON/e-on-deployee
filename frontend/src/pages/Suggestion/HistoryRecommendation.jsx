// src/pages/Suggestion/HistoryRecommendation.jsx
import { useEffect, useState } from "react";

export default function HistoryRecommendation() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const API = (import.meta.env.VITE_API_BASE_URL || "") + "/api/ai/recommend/history";

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),         // 백엔드가 로그인 유저 기준으로 처리
          credentials: "include",           // 세션 쿠키 전송 (중요)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || data?.error || `HTTP ${res.status}`);
        setItems(Array.isArray(data) ? data : (data.items || []));
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [API]);

  return (
    <div style={{ padding: 24 }}>
      <h2>활동 이력 기반 추천</h2>
      {loading && <p>불러오는 중…</p>}
      {err && <p style={{ color: "crimson" }}>⚠️ {err}</p>}
      {!loading && !err && items.length === 0 && <p>추천 결과가 없습니다.</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
        {items.map((c) => (
          <article key={c.challenge_id} style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
            <h3 style={{ margin: 0 }}>{c.title || `챌린지 #${c.challenge_id}`}</h3>
            <p style={{ marginTop: 6, color: "#444" }}>{c.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
