// utils/generateUserSummary.js
const extractKeywordsFromTextArray = require('./extractKeywords'); // 또는 내부 정의

function generateUserSummaryText({ participated, created, posts, comments, boardRequests, interest, vision }) {
  const challengeTitles = participated.slice(0, 3).map(p => `"${p.Challenge?.title}"`).join(", ") || "챌린지 없음";
  const createdTitles = created.slice(0, 2).map(c => `"${c.challenge_title}"`).join(", ") || "없음";
  const postKeywords = extractKeywordsFromTextArray(posts.map(p => `${p.title} ${p.content}`));
  const commentKeywords = extractKeywordsFromTextArray(comments.map(c => c.content));
  const boardNames = boardRequests.map(b => b.requested_board_name).join(", ") || "없음";
  const allKeywords = [...new Set([...postKeywords, ...commentKeywords])].slice(0, 5).join(", ") || "없음";

  return `
사용자는 ${challengeTitles} 등의 챌린지에 참여했고,
${createdTitles} 챌린지를 개설했습니다.
자주 작성한 글 주제는 ${allKeywords}이며,
${boardNames} 게시판을 개설 요청한 이력이 있습니다.
관심분야는 "${interest}"이고,
진로희망은 "${vision}"입니다.
  `.trim();
}

module.exports = generateUserSummaryText;
