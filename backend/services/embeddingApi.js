const axios = require('axios');

module.exports = async function callEmbeddingRecommendation(userText, challengeTexts) {
  try {
    const response = await axios.post('http://localhost:5000/recommend', {
      user_text: userText,
      challenge_texts: challengeTexts, // [{ id, text }]
    });

    return response.data.recommended_ids; // Flask에서 return한 ID 배열
  } catch (error) {
    console.error('추천 서버 오류:', error.message);
    return [];
  }
};