import { useParams } from "react-router-dom";
import Header from "../../components/Common/Header";
import ChallengeDetailContent from "../../components/Challenge/ChallengeDetailContent";
import { useEffect, useState } from "react";
import { getChallengeDetail, getParticipationDetailForUser } from "../../api/challengeApi";
import { useAuth } from "../../hooks/useAuth";

const ChallengeDetail = () => {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const userId = user?.user_id;

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [participationId, setParticipationId] = useState(null);
  const [participationState, setParticipationState] = useState(null);


  // detail 정보와 참여상태를 모두 fetch하는 함수로 분리!
  const fetchDetail = async () => {
  setLoading(true);
  try {
    const res = await getChallengeDetail(id, userId);
    setChallenge(res.data);
    setBookmarked(!!res.data.is_bookmarked);

    try {
        const participationRes = await getParticipationDetailForUser(id, userId);
        console.log("참여 fetch 후 서버 응답:", participationRes.data);
        console.log("userId:", userId, "challengeId:", id);
        const mp = participationRes.data?.my_participation || null;
        if (mp) {
          setParticipationState(mp.participating_state);
          setIsJoined(mp.participating_state !== "취소");
          setParticipationId(mp.participating_id);
        } else {
          setParticipationState(null);
          setIsJoined(false);
          setParticipationId(null);
        }
    } catch (e) {
      // 참여 기록이 없어서 404 뜨면 여기에 들어옴. 여기선 participation 값만 null!
      setParticipationState(null);
      setIsJoined(false);
      setParticipationId(null);
    }
  } catch (e) {
    // 정말로 챌린지 자체가 없는 경우만 여기서 setChallenge(null)!
    setChallenge(null);
  }
  setLoading(false);
};


  useEffect(() => {
    fetchDetail();
  }, [id, userId]);

  if (loading) return (<div><Header /><div style={{ padding: 40, textAlign: "center" }}>로딩 중...</div></div>);
  if (!challenge) return (<div><Header /><div style={{ padding: 40, textAlign: "center" }}>존재하지 않는 챌린지입니다.</div></div>);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0',paddingLeft: '150px' }}>
          <Header />
        </div>
      <ChallengeDetailContent
        challenge={challenge}
        bookmarked={bookmarked}
        setBookmarked={setBookmarked}
        userId={userId}
        isJoined={isJoined}
        setIsJoined={setIsJoined}
        participationId={participationId}
        setParticipationId={setParticipationId}
        participationState={participationState}
        userAge={user?.age}
        refresh={fetchDetail} 
      />
    </div>
  );
};


export default ChallengeDetail;
