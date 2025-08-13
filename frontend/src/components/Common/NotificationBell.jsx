import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../hooks/useNotifications";
import styles from "../../styles/Common/NotificationBell.module.css";

// 간단 상대시간 포맷터
function relativeTime(ts) {
  try {
    const t = new Date(ts).getTime();
    const diff = Math.floor((Date.now() - t) / 1000);
    if (diff < 10) return "방금 전";
    if (diff < 60) return `${diff}초 전`;
    const m = Math.floor(diff / 60);
    if (m < 60) return `${m}분 전`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}시간 전`;
    const d = Math.floor(h / 24);
    if (d < 7) return `${d}일 전`;
    return new Date(t).toLocaleString("ko-KR");
  } catch {
    return "";
  }
}

const TypeIcon = ({ type }) => {
  // 간단한 이모지 아이콘 (원하면 SVG로 바꿔도 OK)
  const map = {
    comment: "💬",
    challenge: "🏁",
    board: "📋",
    system: "🔔",
  };
  return <span aria-hidden className={styles.typeIcon}>{map[type] || "🔔"}</span>;
};

export default function NotificationBell() {
  const navigate = useNavigate();
  const {
    items,
    unread,
    open,
    toggle,
    close,
    page,
    setPage,
    pageSize,
    markAllRead,
    markRead,
    refetch,
  } = useNotifications();

  // UI 전용 상태
  const [onlyUnread, setOnlyUnread] = useState(false);
  const boxRef = useRef(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const onClick = (e) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target)) close();
    };
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open, close]);

  const view = useMemo(
    () => (onlyUnread ? items.filter((x) => !x.is_read) : items),
    [items, onlyUnread]
  );

  // 항목 클릭 → 이동 & 읽음 처리
  const onItemClick = async (n) => {
    if (!n.is_read) await markRead([n.id]);
    close();
    if (!n.link && !n.meta) return;

    // 1) 절대 URL이면 그대로 이동
    if (n.link && /^https?:\/\//.test(n.link)) {
      window.location.href = n.link;
      return;
    }

    // 2) 레거시 boards 경로를 community 경로로 매핑
    let to = n.link || "";
    if (to.startsWith("/boards/")) {
      // /boards/:boardId/posts/:postId  ->  /community/posts/:postId
      const m = to.match(/\/posts\/(\d+)/);
      if (m) to = `/community/posts/${m[1]}`;
    }

    // 3) 백엔드가 meta로만 보내줄 때를 대비 (권장: entity, postId, boardId)
    if (!to && n.meta?.entity === "post" && n.meta.postId) {
      to = `/community/posts/${n.meta.postId}`;
    }

    if (to) navigate(to); // 항상 절대 경로 사용
  };

  // 더보기 (간단: page+1 후 재조회)
  const onLoadMore = async () => {
    setPage(page + 1);
    // 간단 구현: 다음 페이지로 교체가 아니라 재호출 후 합치려면 훅을 확장해야 함
    // 여기서는 호출 후 상단 새로고침 버튼으로 대체하거나, 훅을 append 형태로 바꿔도 됨.
    await refetch();
  };

  return (
    <div className={styles.wrapper} ref={boxRef}>
      <button
        className={styles.bellBtn}
        aria-label="알림 보기"
        onClick={toggle}
      >
        <span className={styles.bellIcon}>🔔</span>
        {unread > 0 && <span className={styles.badge}>{unread > 99 ? "99+" : unread}</span>}
      </button>

      {open && (
        <div className={styles.dropdown} role="dialog" aria-label="알림 목록">
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <span className={styles.title}>알림</span>
              <label className={styles.unreadToggle}>
                <input
                  type="checkbox"
                  checked={onlyUnread}
                  onChange={(e) => setOnlyUnread(e.target.checked)}
                />
                <span>읽지 않은 것만</span>
              </label>
            </div>
            <button className={styles.markAllBtn} onClick={markAllRead}>
              모두 읽음
            </button>
          </div>

          <div className={styles.list}>
            {view.length === 0 ? (
              <div className={styles.empty}>알림이 없습니다.</div>
            ) : (
              view.map((n) => (
                <button
                  key={n.id}
                  className={`${styles.item} ${!n.is_read ? styles.unread : ""}`}
                  onClick={() => onItemClick(n)}
                >
                  <div className={styles.leftCol}>
                    <TypeIcon type={n.type} />
                  </div>
                  <div className={styles.rightCol}>
                    <div className={styles.itemTitle}>{n.title}</div>
                    {n.body ? <div className={styles.itemBody}>{n.body}</div> : null}
                    <div className={styles.meta}>
                      <span className={styles.time}>{relativeTime(n.created_at)}</span>
                      {!n.is_read && <span className={styles.unreadDot} />}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          <div className={styles.footer}>
            <button className={styles.moreBtn} onClick={onLoadMore}>
              더 보기
            </button>
            <button className={styles.refreshBtn} onClick={refetch}>
              새로고침
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
