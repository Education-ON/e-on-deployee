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
            const res = await axios.get("/api/user/activity-history", {
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
                    <option value="challengeCreated">챌린지 개설</option>
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
                {data.length === 0 ? (
                    <p style={{ marginTop: "1rem" }}>
                        해당 조건에 맞는 활동 이력이 없습니다.
                    </p>
                ) : (
                    data.map((item, i) => (
                        <li key={i} style={{ marginBottom: "1rem" }}>
                            {type === "challenge" && (
                                <div>
                                    <strong>{item.Challenge?.title}</strong> <br />
                                    참여 상태: {item.participating_state} <br />
                                    기간: {new Date(item.Challenge?.start_date).toLocaleDateString("ko-KR")} ~ {new Date(item.Challenge?.end_date).toLocaleDateString("ko-KR")}
                                </div>
                            )}

                            {type === "post" && (
                                <div>
                                    <strong>{item.title}</strong>
                                    <p>{item.content}</p>
                                    <small>{new Date(item.created_at).toLocaleString("ko-KR")}</small><br />
                                    💖 게시판: {item.Board?.board_name}
                                </div>
                            )}

                            {type === "comment" && (
                                <div>
                                    <p>{item.content}</p>
                                    <small>{new Date(item.created_at).toLocaleString("ko-KR")}</small>
                                </div>
                            )}

                            {type === "boardRequest" && (
                                <div>
                                    <strong>{item.requested_board_name}</strong><br />
                                    유형: {item.requested_board_type}, 
                                    상태: {item.request_status}
                                    <br />
                                    신청일: {new Date(item.request_date).toLocaleString("ko-KR")}
                                </div>
                            )}

                            {type === "challengeCreated" && (
                                <div className="activity-card">
                                    <h4>{item.challenge_title}</h4>
                                    <p>상태: {item.challenge_state}</p>
                                    <p>기간: {new Date(item.start_date).toLocaleDateString("ko-KR")} ~ {new Date(item.end_date).toLocaleDateString("ko-KR")}</p>
                                    <p>작성일: {new Date(item.created_at).toLocaleString("ko-KR")}</p>
                                    <p>개설자: {item.creator?.nickname}</p>
                                </div>
                            )}
                        </li>
                    ))
                )}
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
