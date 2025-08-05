import { useEffect, useState } from 'react';
import { getAllReports } from '../../api/communityApi';
import styles from '../../styles/Community/ReportList.module.css';

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await getAllReports();
      setReports(res.data);
    } catch (err) {
      console.error('신고 목록 조회 실패:', err);
      alert('신고 목록을 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🚨 신고된 콘텐츠 목록</h2>
      {loading ? (
        <p>로딩 중...</p>
      ) : reports.length === 0 ? (
        <p>신고된 항목이 없습니다.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>타입</th>
              <th>대상 ID</th>
              <th>신고자 ID</th>
              <th>신고 사유</th>
              <th>신고일시</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.report_id}>
                <td>{report.report_id}</td>
                <td>{report.report_type === 'post' ? '게시글' : '댓글'}</td>
                <td>{report.post_id || report.comment_id}</td>
                <td>{report.reporter_id}</td>
                <td>{report.reason}</td>
                <td>{new Date(report.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportList;
