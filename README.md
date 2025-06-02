## E-ON

### 📁 프로젝트 디렉토리 구조

#### 📦 `backend/`

```text
backend/
├── controllers/           # 요청을 받아서 응답 처리 (req, res)
│   └── userController.js
├── services/              # 비즈니스 로직 처리 (데이터베이스와 API 요청 등)
│   └── userService.js
├── models/                # DB 모델 정의 또는 쿼리 처리
│   └── userModel.js
├── routes/                # URL 별로 컨트롤러 연결
│   └── userRoutes.js
├── views/                 # (선택) 템플릿 엔진 사용 시
├── database/              # DB 연결 설정
│   └── db.js
├── utils/                 # 유틸 함수 모음
├── app.js                 # 앱 구성 (미들웨어, 라우터 등 설정)
└── index.js               # 서버 실행 진입점
```

---

#### 📦 `frontend/` (React + Vite)

```text
frontend/
├── public/                # 정적 파일 (favicon, index.html 등)
├── src/
│   ├── api/               # API 요청 처리 (axios, 서버 api 등)
│   ├── assets/            # 이미지, 폰트 등 static 리소스
│   ├── components/        # 재사용 가능한 UI 컴포넌트
│   ├── pages/             # 라우팅되는 각 페이지 (Home, Login 등)
│   ├── layouts/           # 공통 레이아웃 구성 (Header, Footer 등)
│   ├── hooks/             # 커스텀 훅 (useAuth 등)
│   ├── utils/             # 유틸 함수 모음
│   ├── constants/         # 상수 (API 주소, 메시지 등)
│   ├── contexts/          # 전역 상태 관리 (React Context API)
│   ├── router/            # react-router 설정
│   ├── styles/            # 전역 스타일 또는 Tailwind 설정
│   └── main.jsx           # React 앱 진입점
├── index.html             # Vite HTML 템플릿
├── package.json           # 프로젝트 메타 정보 및 의존성
├── vite.config.js         # Vite 설정 파일
└── .env                   # 환경 변수 (VITE_API_URL 등)
```
