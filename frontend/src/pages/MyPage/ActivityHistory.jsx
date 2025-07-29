// src/pages/MyPage/ActivityHistory.jsx

import { useState, useEffect } from "react";
import axios from "../../api/axiosInstance";
import { useAuth } from "../../hooks/useAuth";

export default function ActivityHistory() {
    const { user } = useAuth();

    const [type, setType] = useState("challenge");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async () => {
        try {
            const res = await axios.get("/user/activity-history", {
                params: { type, from, to, keyword, page, limit },
            });

            setData(res.data.data);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error("활동 이력 조회 실패:", err.response?.data || err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    if (!user) return <p>로딩 중...</p>;

    return (
        <div style={{ padding: "2rem" }}>
            <h2>📋 활동 이력 조회</h2>

            <div style={{ marginBottom: "1rem" }}>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="challenge">챌린지 참여</option>
                    <option value="post">게시글</option>
                    <option value="comment">댓글</option>
                    <option value="boardRequest">게시판 요청</option>
                </select>

                <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
                <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />

                <input
                    type="text"
                    placeholder="검색어 입력"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />

                <button onClick={() => { setPage(1); fetchData(); }}>
                    조회하기
                </button>
            </div>

            <ul>
                {data.map((item, i) => (
                    <li key={i} style={{ marginBottom: "1rem" }}>
                        {type === "challenge" && (
                            <div>
                                <strong>{item.Challenge?.title}</strong> <br />
                                참여 상태: {item.participating_state} <br />
                                기간: {item.Challenge?.start_date} ~ {item.Challenge?.end_date}
                            </div>
                        )}

                        {type === "post" && (
                            <div>
                                <strong>{item.title}</strong>
                                <p>{item.content}</p>
                                <small>{item.created_at}</small>
                            </div>
                        )}

                        {type === "comment" && (
                            <div>
                                <p>{item.content}</p>
                                <small>{item.created_at}</small>
                            </div>
                        )}

                        {type === "boardRequest" && (
                            <div>
                                <strong>{item.requested_board_name}</strong><br />
                                유형: {item.requested_board_type}, 상태: {item.request_status}
                                <br />
                                신청일: {item.request_date}
                            </div>
                        )}
                    </li>
                ))}
            </ul>

            <div style={{ marginTop: "1rem" }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                        key={p}
                        onClick={() => setPage(p)}
                        disabled={page === p}
                        style={{
                            marginRight: "0.25rem",
                            fontWeight: p === page ? "bold" : "normal",
                        }}
                    >
                        {p}
                    </button>
                ))}
            </div>
        </div>
    );
}
