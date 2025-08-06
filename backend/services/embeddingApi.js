const axios = require('axios');

module.exports = async function callEmbeddingRecommendation(userText, challengeTexts) {
  try {
    const response = await axios.post('http://localhost:5000/recommend', {
      user_text: userText,
      challenges: challengeTexts, // [{ id, text }]
    });
    console.log("🔥 백엔드에서 받은 추천 ID:", response.data.recommended_ids);
    return response.data.recommended_ids; // Flask에서 return한 ID 배열
  } catch (error) {
    console.error('🔥 추천 서버 오류:', error.message);
    console.error('📦 오류 응답:', error.response?.data || error);
    return [];
  }
};