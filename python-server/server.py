from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer, util
import torch

app = Flask(__name__)

# 한국어 문장 임베딩 모델 로드 (SBERT 기반)
model = SentenceTransformer('snunlp/KR-SBERT-V40K-klueNLI-augSTS')

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.get_json()

        # 사용자 설명 문장 (string)
        user_text = data.get('user_text')
        # 챌린지들 [{ id, text }]
        challenges = data.get('challenges', [])

        if not user_text or not challenges:
            return jsonify({'error': '입력값 부족'}), 400

        challenge_texts = [c['text'] for c in challenges]
        challenge_ids = [c['id'] for c in challenges]

        # 임베딩
        user_emb = model.encode(user_text, convert_to_tensor=True)
        challenge_embs = model.encode(challenge_texts, convert_to_tensor=True)

        # 유사도 계산
        similarities = util.cos_sim(user_emb, challenge_embs)[0]
        top_indices = torch.topk(similarities, k=min(5, len(challenges))).indices.tolist()
        recommended_ids = [challenge_ids[i] for i in top_indices]

        return jsonify({'recommended_ids': recommended_ids})

    except Exception as e:
        print("Error in /recommend:", str(e))
        return jsonify({'error': '서버 오류', 'detail': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
