# VeriMarka Web (UI Preview)

저작물 등록/검증 플로우 화면 시안 프로젝트입니다.  
백엔드 연동 전, 프론트 UI/상태 전환 검토 목적입니다.

## 요구 사항
- Node.js 18+ (권장: 20+)

## 빠른 시작
```bash
git clone <repo-url>
cd WATON_WEB
npm install
npm run dev
```

브라우저 접속:
- `http://127.0.0.1:5173`

## 주요 파일 구조
```text
WATON_WEB/
├─ index.html          # 페이지 마크업
├─ styles.css          # 전체 스타일
├─ app.js              # 상태 전환/이벤트 로직
├─ dev-server.js       # Node 로컬 서버
├─ assets/             # 로고/이미지 자산
├─ server.py           # (옵션) Python 정적 서버
└─ run_server.command  # (옵션) macOS 더블클릭 실행
```

## npm 스크립트
- `npm run dev` : 로컬 개발 서버 실행
- `npm start` : 로컬 개발 서버 실행 (동일)

## 옵션 실행 (Python)
```bash
python3 server.py --host 127.0.0.1 --port 4173
```

## 협업 메모
- UI 상태 전환(진행/결과)은 `app.js` 기준으로 구현됨
- 실시간 백엔드 연동 시 아래 함수를 사용해 상태를 주입 가능
  - `window.applyRegistrationAnalysis(payload)`
  - `window.applyRegistrationResult(mode)`
