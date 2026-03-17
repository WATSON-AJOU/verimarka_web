const tabs = document.querySelectorAll(".tab");
const pageByTab = {
  home: "page-home",
  add: "page-add",
  mypage: "page-mypage",
  verify: "page-home",
  history: "page-history"
};
const appPages = {
  home: document.getElementById("page-home"),
  add: document.getElementById("page-add"),
  history: document.getElementById("page-history"),
  mypage: document.getElementById("page-mypage")
};
const quickTabButtons = document.querySelectorAll("[data-go-tab]");

function setActiveTab(tabName) {
  const normalizedTab = pageByTab[tabName] ? tabName : "home";
  const targetPageId = pageByTab[normalizedTab];

  tabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.tab === normalizedTab);
  });

  Object.values(appPages).forEach((page) => {
    if (!page) return;
    const isTarget = page.id === targetPageId;
    page.hidden = !isTarget;
    page.classList.toggle("is-active", isTarget);
  });

  const mypageShortcut = document.getElementById("openMypageBtn");
  if (mypageShortcut) {
    mypageShortcut.classList.toggle("is-active", normalizedTab === "mypage");
  }

  if (normalizedTab === "history") {
    closeHistoryDetail();
    if (selectedHistoryRecordId) {
      selectedHistoryRecordId = null;
      renderHistoryList();
    }
  }

  if (normalizedTab !== "add") {
    stopAnalysisSimulation();
    stopWatermarkSimulation();
    stopMintSimulation();
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActiveTab(tab.dataset.tab || "home");
  });
});

quickTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveTab(button.dataset.goTab || "home");
  });
});

const progressBars = document.querySelectorAll(".bar");
progressBars.forEach((bar) => {
  const value = Number(bar.dataset.progress ?? 0);
  requestAnimationFrame(() => {
    bar.style.width = `${Math.max(0, Math.min(100, value))}%`;
  });
});

const loginBtn = document.getElementById("openLoginBtn");
const signupOpenBtn = document.getElementById("openSignupBtn");
const guestActions = document.getElementById("guestActions");
const loginModal = document.getElementById("loginModal");
const loginCloseBtn = document.querySelector(".login-modal-close");
const loginPanel = document.getElementById("loginPanel");
const signupPanel = document.getElementById("signupPanel");
const authSwitchLinks = document.querySelectorAll(".auth-switch-link");
const signupSubmitBtn = document.querySelector(".signup-submit");
const signupForm = document.querySelector(".signup-form");
const socialLoginBtns = document.querySelectorAll(".login-action[data-provider]");
const userSession = document.getElementById("userSession");
const userNickname = document.getElementById("userNickname");
const openMypageBtn = document.getElementById("openMypageBtn");
const headerProfileInitial = document.getElementById("headerProfileInitial");
const mypageAvatar = document.getElementById("mypageAvatar");
const mypageName = document.getElementById("mypageName");
const mypageEmail = document.getElementById("mypageEmail");
const mypagePhone = document.getElementById("mypagePhone");
const mypageIdentityChip = document.getElementById("mypageIdentityChip");
const mypageIdentityDescription = document.getElementById("mypageIdentityDescription");
const openIdentityModalBtn = document.getElementById("openIdentityModalBtn");
const mypageTokenCount = document.getElementById("mypageTokenCount");
const mypageVoteStatusChip = document.getElementById("mypageVoteStatusChip");
const mypageVoteStatusText = document.getElementById("mypageVoteStatusText");
const logoutBtn = document.getElementById("logoutBtn");
const identityModal = document.getElementById("identityModal");
const identityModalCloseBtn = document.getElementById("identityModalCloseBtn");
const identityPhoneInput = document.getElementById("identityPhoneInput");
const identityCodeInput = document.getElementById("identityCodeInput");
const identitySendCodeBtn = document.getElementById("identitySendCodeBtn");
const identityTimer = document.getElementById("identityTimer");
const identityCompleteBtn = document.getElementById("identityCompleteBtn");
const loginToast = document.getElementById("loginToast");
const loginToastText = document.getElementById("loginToastText");
const loginToastProgressBar = document.getElementById("loginToastProgressBar");
const uploadDropzone = document.getElementById("uploadDropzone");
const uploadInput = document.getElementById("uploadInput");
const uploadEmpty = document.getElementById("uploadEmpty");
const uploadPreview = document.getElementById("uploadPreview");
const uploadReadyView = document.getElementById("uploadReadyView");
const analysisRunningView = document.getElementById("analysisRunningView");
const analysisResultView = document.getElementById("analysisResultView");
const watermarkRunningView = document.getElementById("watermarkRunningView");
const watermarkCompleteView = document.getElementById("watermarkCompleteView");
const mintRunningView = document.getElementById("mintRunningView");
const mintCompleteView = document.getElementById("mintCompleteView");
const analysisResultLayout = document.querySelector(".analysis-result-layout");
const resultRejectSpotlight = document.getElementById("resultRejectSpotlight");
const resultRejectMetrics = document.getElementById("resultRejectMetrics");
const uploadPreviewImage = document.getElementById("uploadPreviewImage");
const analysisPreviewImage = document.getElementById("analysisPreviewImage");
const analysisProgressRing = document.getElementById("analysisProgressRing");
const analysisProgressValue = document.getElementById("analysisProgressValue");
const analysisStatusLine = document.getElementById("analysisStatusLine");
const analysisSteps = Array.from(document.querySelectorAll(".analysis-step"));
const watermarkRunningImage = document.getElementById("watermarkRunningImage");
const watermarkProgressRing = document.getElementById("watermarkProgressRing");
const watermarkProgressValue = document.getElementById("watermarkProgressValue");
const watermarkStatusLine = document.getElementById("watermarkStatusLine");
const watermarkSteps = Array.from(document.querySelectorAll(".watermark-step"));
const mintRunningImage = document.getElementById("mintRunningImage");
const mintProgressRing = document.getElementById("mintProgressRing");
const mintProgressValue = document.getElementById("mintProgressValue");
const mintStatusLine = document.getElementById("mintStatusLine");
const mintSteps = Array.from(document.querySelectorAll(".mint-step"));
const watermarkOriginalCard = document.getElementById("watermarkOriginalCard");
const watermarkResultCard = document.getElementById("watermarkResultCard");
const analysisResultImage = document.getElementById("analysisResultImage");
const analysisResultOriginImage = document.getElementById("analysisResultOriginImage");
const analysisResultCandidateImage = document.getElementById("analysisResultCandidateImage");
const analysisRejectSourceLabel = document.getElementById("analysisRejectSourceLabel");
const analysisRejectCandidateLabel = document.getElementById("analysisRejectCandidateLabel");
const analysisRejectSimilarity = document.getElementById("analysisRejectSimilarity");
const analysisRejectThreshold = document.getElementById("analysisRejectThreshold");
const analysisRejectDeltaLabel = document.getElementById("analysisRejectDeltaLabel");
const analysisRejectDelta = document.getElementById("analysisRejectDelta");
const analysisRejectPhashDistance = document.getElementById("analysisRejectPhashDistance");
const analysisRejectPhashThreshold = document.getElementById("analysisRejectPhashThreshold");
const analysisResultBadge = document.getElementById("analysisResultBadge");
const analysisResultTitle = document.getElementById("analysisResultTitle");
const analysisResultSubtitle = document.getElementById("analysisResultSubtitle");
const analysisResultFileName = document.getElementById("analysisResultFileName");
const analysisResultFileMeta = document.getElementById("analysisResultFileMeta");
const analysisResultSimilarity = document.getElementById("analysisResultSimilarity");
const analysisResultSimilarityPercent = document.getElementById("analysisResultSimilarityPercent");
const analysisResultChecklist = document.getElementById("analysisResultChecklist");
const analysisResultNote = document.getElementById("analysisResultNote");
const resultModeButtons = document.querySelectorAll(".result-mode-btn[data-result-mode]");
const resultPrimaryBtn = document.getElementById("resultPrimaryBtn");
const resultSecondaryBtn = document.getElementById("resultSecondaryBtn");
const uploadFileName = document.getElementById("uploadFileName");
const uploadFileMeta = document.getElementById("uploadFileMeta");
const changeFileBtn = document.getElementById("changeFileBtn");
const pickAnotherFileBtn = document.getElementById("pickAnotherFileBtn");
const cancelAnalysisBtn = document.getElementById("cancelAnalysisBtn");
const goHomeBtn = document.getElementById("goHomeBtn");
const startRegisterBtn = document.getElementById("startRegisterBtn");
const watermarkCompleteOriginalImage = document.getElementById("watermarkCompleteOriginalImage");
const watermarkCompleteResultImage = document.getElementById("watermarkCompleteResultImage");
const watermarkCompleteFileName = document.getElementById("watermarkCompleteFileName");
const watermarkCompleteFileMeta = document.getElementById("watermarkCompleteFileMeta");
const startMintBtn = document.getElementById("startMintBtn");
const watermarkDownloadBtn = document.getElementById("watermarkDownloadBtn");
const watermarkCompleteHistoryBtn = document.getElementById("watermarkCompleteHistoryBtn");
const watermarkCompleteUploadBtn = document.getElementById("watermarkCompleteUploadBtn");
const mintCompleteImage = document.getElementById("mintCompleteImage");
const mintFileName = document.getElementById("mintFileName");
const mintCreatedAt = document.getElementById("mintCreatedAt");
const mintNetwork = document.getElementById("mintNetwork");
const mintTokenId = document.getElementById("mintTokenId");
const mintContentHash = document.getElementById("mintContentHash");
const mintTxHash = document.getElementById("mintTxHash");
const mintWallet = document.getElementById("mintWallet");
const mintMintedAt = document.getElementById("mintMintedAt");
const mintCopyUrlBtn = document.getElementById("mintCopyUrlBtn");
const mintGoHistoryBtn = document.getElementById("mintGoHistoryBtn");
const mintUploadAgainBtn = document.getElementById("mintUploadAgainBtn");
const historyListView = document.getElementById("historyListView");
const historyDetailView = document.getElementById("historyDetailView");
const historyList = document.getElementById("historyList");
const historyFilterButtons = document.querySelectorAll(".history-filter-btn[data-history-filter]");
const historyDetailBadge = document.getElementById("historyDetailBadge");
const historyDetailTitle = document.getElementById("historyDetailTitle");
const historyDetailSubtitle = document.getElementById("historyDetailSubtitle");
const historyDetailGrid = document.getElementById("historyDetailGrid");
const historyDetailPrimaryBtn = document.getElementById("historyDetailPrimaryBtn");
const historyBackToListBtn = document.getElementById("historyBackToListBtn");
const footerLangLabel = document.getElementById("footerLangLabel");
const langOptions = document.querySelectorAll(".lang-option");
const langSwitches = Array.from(document.querySelectorAll("[data-lang-switch]")).map((root) => ({
  root,
  trigger: root.querySelector("button"),
  menu: root.querySelector(".lang-menu")
}));

let lastFocusedElement = null;
let toastHideTimer = null;
let uploadPreviewUrl = null;
let analysisTimer = null;
let analysisProgressValueInternal = 0;
let watermarkTimer = null;
let watermarkProgressValueInternal = 0;
let mintTimer = null;
let mintProgressValueInternal = 0;
let watermarkRenderedUrl = "";
let watermarkDownloadName = "sample_watermarked.png";
let watermarkBuildToken = 0;
let currentMintRecord = null;
let currentLanguage = "ko";
let currentResultMode = "allow";
let mockCandidateImageUrl = "";
let isLoggedIn = false;
let isIdentityVerified = false;
let hasIdentityCodeSent = false;
let identityRemainingSeconds = 0;
let identityCountdownTimer = null;
let currentHistoryFilter = "all";
let selectedHistoryRecordId = null;
let currentHistoryDetailId = null;
const defaultMypagePhone = "010-1234-5678";
const defaultMypageEmail = "user@verimarka.com";
const defaultMypageNickname = "VeriMarka 사용자";
const minimumVoteTokenCount = 3;
let currentTokenCount = 2;
const providerNicknameMap = {
  google: "구글사용자",
  apple: "애플사용자",
  kakao: "카카오사용자"
};
const languageLabelMap = {
  ko: "한국어",
  en: "English",
  ja: "日本語"
};
const htmlLangMap = {
  ko: "ko",
  en: "en",
  ja: "ja"
};
const historyRecords = [
  {
    id: "82401",
    type: "allow",
    fileName: "풍경_최종.png",
    summary: "워터마크 삽입 완료 (토큰 #82401)",
    timestamp: "2026.02.26 14:30",
    thumbClass: "history-thumb-landscape",
    analysis: {
      cosine: "0.1243 (12.4%)",
      phash: "Distance 5 / Threshold 8",
      decision: "중복 후보 없음"
    },
    blockchain: {
      network: "Polygon",
      tokenId: "#82401",
      contentHash: "0x9a8b...7c6d",
      txHash: "0x1f2e...3d4c",
      mintedAt: "2026.02.26 14:30:12 UTC",
      explorerUrl: "https://polygonscan.com/tx/0x1f2e3d4c"
    },
    watermark: {
      model: "WAM (Watson AI Model)",
      version: "v2.1.0",
      status: "성공 (100% 일치)"
    }
  },
  {
    id: "82396",
    type: "review",
    fileName: "캐릭터_시안A.jpg",
    summary: "투표 진행 중 · D-1",
    timestamp: "2026.02.25 09:15",
    thumbClass: "history-thumb-character",
    analysis: {
      cosine: "0.7421 (74.2%)",
      phash: "Distance 8 / Threshold 8",
      decision: "경계값 탐지 · 수동 검토 필요"
    },
    review: {
      progress: 68,
      due: "2026.02.26 18:00",
      votes: "찬성 14 · 반대 6",
      participants: "참여자 20명"
    }
  },
  {
    id: "82374",
    type: "allow",
    fileName: "도시풍경_B.png",
    summary: "저작물 등록 승인 완료 (토큰 #82374)",
    timestamp: "2026.02.24 11:20",
    thumbClass: "history-thumb-city",
    analysis: {
      cosine: "0.1832 (18.3%)",
      phash: "Distance 12 / Threshold 8",
      decision: "중복 가능성 낮음"
    },
    blockchain: {
      network: "Polygon",
      tokenId: "#82374",
      contentHash: "0x7cd1...23af",
      txHash: "0x8a3b...11dc",
      mintedAt: "2026.02.24 11:20:45 UTC",
      explorerUrl: "https://polygonscan.com/tx/0x8a3b11dc"
    },
    watermark: {
      model: "WAM (Watson AI Model)",
      version: "v2.1.0",
      status: "성공 (99.6% 일치)"
    }
  },
  {
    id: "82358",
    type: "review",
    fileName: "포스터_컨셉C.png",
    summary: "투표 진행 중 · D-2",
    timestamp: "2026.02.23 16:45",
    thumbClass: "history-thumb-landscape",
    analysis: {
      cosine: "0.7593 (75.9%)",
      phash: "Distance 7 / Threshold 8",
      decision: "유사 후보 존재 · 추가 확인 진행"
    },
    review: {
      progress: 41,
      due: "2026.02.25 18:00",
      votes: "찬성 6 · 반대 4",
      participants: "참여자 10명"
    }
  },
  {
    id: "82341",
    type: "allow",
    fileName: "브랜드배너_메인_v2.png",
    summary: "저작물 등록 승인 완료 (토큰 #82341)",
    timestamp: "2026.02.22 12:10",
    thumbClass: "history-thumb-city",
    analysis: {
      cosine: "0.2017 (20.2%)",
      phash: "Distance 10 / Threshold 8",
      decision: "중복 후보 없음"
    },
    blockchain: {
      network: "Polygon",
      tokenId: "#82341",
      contentHash: "0x67fa...92cd",
      txHash: "0x30bc...8a11",
      mintedAt: "2026.02.22 12:10:33 UTC",
      explorerUrl: "https://polygonscan.com/tx/0x30bc8a11"
    },
    watermark: {
      model: "WAM (Watson AI Model)",
      version: "v2.1.0",
      status: "성공 (99.3% 일치)"
    }
  },
  {
    id: "82322",
    type: "review",
    fileName: "상세페이지_시안_긴파일명_테스트A.png",
    summary: "투표 진행 중 · D-3",
    timestamp: "2026.02.21 15:40",
    thumbClass: "history-thumb-character",
    analysis: {
      cosine: "0.7315 (73.1%)",
      phash: "Distance 8 / Threshold 8",
      decision: "경계 구간 진입 · 검토 필요"
    },
    review: {
      progress: 35,
      due: "2026.02.24 18:00",
      votes: "찬성 5 · 반대 3",
      participants: "참여자 8명"
    }
  },
  {
    id: "82305",
    type: "allow",
    fileName: "일러스트_완성본_수정3.jpg",
    summary: "워터마크 삽입 완료 (토큰 #82305)",
    timestamp: "2026.02.20 10:05",
    thumbClass: "history-thumb-landscape",
    analysis: {
      cosine: "0.1549 (15.5%)",
      phash: "Distance 11 / Threshold 8",
      decision: "중복 가능성 낮음"
    },
    blockchain: {
      network: "Polygon",
      tokenId: "#82305",
      contentHash: "0xaa21...7bb0",
      txHash: "0x128f...4de3",
      mintedAt: "2026.02.20 10:05:27 UTC",
      explorerUrl: "https://polygonscan.com/tx/0x128f4de3"
    },
    watermark: {
      model: "WAM (Watson AI Model)",
      version: "v2.1.0",
      status: "성공 (98.9% 일치)"
    }
  },
  {
    id: "82298",
    type: "review",
    fileName: "홍보카드뉴스_2안.png",
    summary: "투표 진행 중 · D-1",
    timestamp: "2026.02.19 18:12",
    thumbClass: "history-thumb-city",
    analysis: {
      cosine: "0.7681 (76.8%)",
      phash: "Distance 7 / Threshold 8",
      decision: "유사 후보 다수 탐지"
    },
    review: {
      progress: 77,
      due: "2026.02.20 18:00",
      votes: "찬성 17 · 반대 5",
      participants: "참여자 22명"
    }
  }
];
const analysisStageConfig = [
  { key: "embedding", label: "의미 기반 임베딩 분석", start: 0, end: 28 },
  { key: "pixel", label: "픽셀 정밀 비교", start: 28, end: 57 },
  { key: "search", label: "기존 등록 콘텐츠 탐색", start: 57, end: 84 },
  { key: "decision", label: "최종 판정 생성", start: 84, end: 100 }
];
const watermarkStageConfig = [
  { key: "wm-embed", label: "워터마크 삽입", start: 0, end: 44 },
  { key: "wm-hash", label: "해시 생성", start: 44, end: 78 },
  { key: "wm-token", label: "토큰 발행 준비", start: 78, end: 100 }
];
const mintStageConfig = [
  { key: "mint-meta", label: "메타데이터 구성", start: 0, end: 30 },
  { key: "mint-contract", label: "스마트컨트랙트 호출", start: 30, end: 74 },
  { key: "mint-confirm", label: "트랜잭션 확정 대기", start: 74, end: 100 }
];
const resultModeConfig = {
  allow: {
    badge: "ALLOW",
    title: "등록 가능한 콘텐츠입니다.",
    subtitle: "유사한 콘텐츠가 발견되지 않았습니다.",
    similarity: "0.1243",
    similarityPercent: "12.4%",
    checklist: [
      "의미 기반 임베딩 비교 완료",
      "픽셀 정밀 비교 완료",
      "DB 후보 탐색 결과 없음"
    ],
    primaryLabel: "워터마크 삽입 진행하기",
    secondaryLabel: "업로드 화면으로 돌아가기",
    note: "워터마크 삽입 후 블록체인 기반 신뢰 기록이 생성됩니다.",
    primaryToast: "워터마크 삽입 단계로 이동합니다."
  },
  pending: {
    badge: "REVIEW",
    title: "보류 판정입니다.",
    subtitle: "유사 후보가 감지되어 수동 검토가 필요합니다.",
    similarity: "0.7421",
    similarityPercent: "74.2%",
    threshold: "0.7500",
    phashDistance: 8,
    phashThreshold: 8,
    candidateName: "concept_scene.jpg",
    checklist: [
      "의미 기반 임베딩 비교 완료",
      "픽셀 정밀 비교 완료",
      "유사 후보 검토 큐 등록됨"
    ],
    primaryLabel: "수동 검토 요청하기",
    secondaryLabel: "업로드 화면으로 돌아가기",
    note: "검토 담당자 승인 후 등록 가능 여부가 확정됩니다.",
    primaryToast: "수동 검토 요청이 접수되었습니다."
  },
  reject: {
    badge: "BLOCK",
    title: "등록이 제한된 콘텐츠입니다.",
    subtitle: "유사도가 임계치를 초과했습니다.",
    similarity: "0.9628",
    similarityPercent: "96.3%",
    threshold: "0.8500",
    phashDistance: 4,
    phashThreshold: 8,
    candidateName: "concept_scene.jpg",
    checklist: [
      "의미 기반 임베딩 비교 완료",
      "픽셀 정밀 비교 완료",
      "임계값 초과로 등록 차단"
    ],
    primaryLabel: "다른 이미지 업로드",
    secondaryLabel: "업로드 화면으로 돌아가기",
    note: "원본성 확인이 어려워 현재 파일 등록이 제한됩니다.",
    primaryToast: "다른 이미지를 선택해주세요."
  }
};

function getHistoryStatusLabel(type) {
  return type === "allow" ? "ALLOW" : "REVIEW";
}

function getHistoryStatusClass(type) {
  return type === "allow" ? "is-allow" : "is-review";
}

function getHistoryRecordById(id) {
  return historyRecords.find((record) => record.id === id) || null;
}

function getFilteredHistoryRecords(filter = "all") {
  if (filter === "all") return historyRecords;
  return historyRecords.filter((record) => record.type === filter);
}

function buildAllowExpandHtml(record) {
  return `
    <div class="history-expand-card">
      <h4>AI 분석 결과</h4>
      <ul class="history-expand-list">
        <li>의미 기반 유사도: ${record.analysis.cosine}</li>
        <li>pHash 비교: ${record.analysis.phash}</li>
        <li>판정: ${record.analysis.decision}</li>
      </ul>
    </div>
    <div class="history-expand-card">
      <h4>블록체인 기록</h4>
      <ul class="history-expand-list">
        <li>Token ID: ${record.blockchain.tokenId}</li>
        <li>Content Hash: ${record.blockchain.contentHash}</li>
        <li>Transaction: ${record.blockchain.txHash}</li>
      </ul>
      <div class="history-expand-actions">
        <button class="btn btn-primary" type="button" data-history-open-detail="${record.id}">
          토큰 발행 상세 보기
        </button>
      </div>
    </div>
  `;
}

function buildReviewExpandHtml(record) {
  return `
    <div class="history-expand-card">
      <h4>AI 분석 결과</h4>
      <ul class="history-expand-list">
        <li>의미 기반 유사도: ${record.analysis.cosine}</li>
        <li>pHash 비교: ${record.analysis.phash}</li>
        <li>판정: ${record.analysis.decision}</li>
      </ul>
    </div>
    <div class="history-expand-card">
      <h4>검토 진행 현황</h4>
      <ul class="history-expand-list">
        <li>마감 예정: ${record.review.due}</li>
        <li>투표 현황: ${record.review.votes}</li>
        <li>${record.review.participants}</li>
      </ul>
      <div class="history-review-progress">
        <span>진행률 ${record.review.progress}%</span>
        <div class="line" style="--review-progress:${record.review.progress}%"></div>
      </div>
      <div class="history-expand-actions">
        <button class="btn btn-primary" type="button" data-history-open-detail="${record.id}">
          검토 상세 보기
        </button>
      </div>
    </div>
  `;
}

function buildHistoryExpandedRow(record) {
  if (record.type === "allow") return buildAllowExpandHtml(record);
  return buildReviewExpandHtml(record);
}

function renderHistoryList() {
  if (!historyList) return;
  const filteredRecords = getFilteredHistoryRecords(currentHistoryFilter);

  if (!filteredRecords.length) {
    historyList.innerHTML = '<p class="history-empty">조건에 맞는 기록이 없습니다.</p>';
    return;
  }

  if (selectedHistoryRecordId && !filteredRecords.some((record) => record.id === selectedHistoryRecordId)) {
    selectedHistoryRecordId = null;
  }

  historyList.innerHTML = filteredRecords
    .map((record) => {
      const statusClass = getHistoryStatusClass(record.type);
      const statusLabel = getHistoryStatusLabel(record.type);
      const isSelected = record.id === selectedHistoryRecordId;
      const expandedRow = isSelected
        ? `<div class="history-log-expand">${buildHistoryExpandedRow(record)}</div>`
        : "";

      return `
        <article class="history-log-item">
          <button class="history-log-main" type="button" data-history-select="${record.id}">
            <div class="history-log-left">
              <div class="history-log-thumb ${record.thumbClass}" aria-hidden="true"></div>
              <div>
                <div class="history-log-title">
                  <strong>${record.fileName}</strong>
                  <span class="history-state-badge ${statusClass}">${statusLabel}</span>
                </div>
                <p class="history-log-desc">${record.summary}</p>
              </div>
            </div>
            <span class="history-log-time">${record.timestamp}</span>
          </button>
          ${expandedRow}
        </article>
      `;
    })
    .join("");
}

function buildAllowDetailHtml(record) {
  return `
    <article class="history-detail-card">
      <h3>저작물 정보</h3>
      <div class="history-detail-media">
        <div class="history-detail-image ${record.thumbClass}" aria-hidden="true"></div>
      </div>
      <div class="history-detail-meta">
        <div class="history-meta-row"><span>파일명</span><strong>${record.fileName}</strong></div>
        <div class="history-meta-row"><span>등록 일시</span><strong>${record.timestamp}:00</strong></div>
        <div class="history-meta-row"><span>워터마크 모델</span><strong>${record.watermark.model}</strong></div>
        <div class="history-meta-row"><span>워터마크 버전</span><strong>${record.watermark.version}</strong></div>
        <div class="history-meta-row"><span>검증 상태</span><strong>${record.watermark.status}</strong></div>
      </div>
    </article>
    <article class="history-detail-card">
      <h3>블록체인 기록 데이터</h3>
      <div class="history-detail-meta">
        <div class="history-meta-row"><span>네트워크</span><strong>${record.blockchain.network}</strong></div>
        <div class="history-meta-row"><span>Token ID</span><strong>${record.blockchain.tokenId}</strong></div>
        <div class="history-meta-row"><span>Content Hash</span><strong>${record.blockchain.contentHash}</strong></div>
        <div class="history-meta-row"><span>Tx Hash</span><strong>${record.blockchain.txHash}</strong></div>
        <div class="history-meta-row"><span>발행 시각</span><strong>${record.blockchain.mintedAt}</strong></div>
      </div>
    </article>
  `;
}

function buildReviewDetailHtml(record) {
  return `
    <article class="history-detail-card">
      <h3>검토 대상 정보</h3>
      <div class="history-detail-media">
        <div class="history-detail-image ${record.thumbClass}" aria-hidden="true"></div>
      </div>
      <div class="history-detail-meta">
        <div class="history-meta-row"><span>파일명</span><strong>${record.fileName}</strong></div>
        <div class="history-meta-row"><span>접수 일시</span><strong>${record.timestamp}:00</strong></div>
        <div class="history-meta-row"><span>의미 유사도</span><strong>${record.analysis.cosine}</strong></div>
        <div class="history-meta-row"><span>pHash 비교</span><strong>${record.analysis.phash}</strong></div>
      </div>
    </article>
    <article class="history-detail-card">
      <h3>투표/검토 진행 현황</h3>
      <div class="history-detail-meta">
        <div class="history-meta-row"><span>현재 상태</span><strong>검토 진행 중</strong></div>
        <div class="history-meta-row"><span>마감 예정</span><strong>${record.review.due}</strong></div>
        <div class="history-meta-row"><span>투표 현황</span><strong>${record.review.votes}</strong></div>
        <div class="history-meta-row"><span>참여 인원</span><strong>${record.review.participants}</strong></div>
      </div>
      <div class="history-review-progress">
        <span>진행률 ${record.review.progress}%</span>
        <div class="line" style="--review-progress:${record.review.progress}%"></div>
      </div>
    </article>
  `;
}

function renderHistoryDetail(record) {
  if (!historyDetailBadge || !historyDetailTitle || !historyDetailSubtitle || !historyDetailGrid) return;
  const isAllow = record.type === "allow";

  historyDetailBadge.textContent = isAllow ? "ALLOW" : "REVIEW";
  historyDetailBadge.classList.toggle("is-allow", isAllow);
  historyDetailBadge.classList.toggle("is-review", !isAllow);
  historyDetailTitle.textContent = isAllow ? "토큰 발행 상세 정보" : "보류 검토 상세 정보";
  historyDetailSubtitle.textContent = isAllow
    ? "블록체인에 안전하게 저장된 자산 보호 기록입니다."
    : "경계 유사도 케이스로 수동 검토 및 투표가 진행 중입니다.";
  historyDetailGrid.innerHTML = isAllow ? buildAllowDetailHtml(record) : buildReviewDetailHtml(record);

  if (historyDetailPrimaryBtn) {
    historyDetailPrimaryBtn.textContent = isAllow ? "블록체인 URL 복사" : "검토 현황 새로고침";
  }
}

function openHistoryDetail(recordId) {
  const record = getHistoryRecordById(recordId);
  if (!record) return;
  currentHistoryDetailId = record.id;
  renderHistoryDetail(record);
  if (historyListView) historyListView.hidden = true;
  if (historyDetailView) historyDetailView.hidden = false;
}

function closeHistoryDetail() {
  currentHistoryDetailId = null;
  if (historyDetailView) historyDetailView.hidden = true;
  if (historyListView) historyListView.hidden = false;
}

function handleHistoryPrimaryAction() {
  const record = getHistoryRecordById(currentHistoryDetailId);
  if (!record) return;

  if (record.type === "allow") {
    const explorerUrl = record.blockchain.explorerUrl;
    if (navigator.clipboard?.writeText && explorerUrl) {
      navigator.clipboard.writeText(explorerUrl).catch(() => {});
    }
    showLoginToast("블록체인 URL을 복사했습니다.", 1600);
    return;
  }

  showLoginToast("검토 현황을 새로고침했습니다.", 1600);
}

function setupHistoryEvents() {
  historyFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentHistoryFilter = button.dataset.historyFilter || "all";
      historyFilterButtons.forEach((node) => {
        node.classList.toggle("is-active", node === button);
      });
      selectedHistoryRecordId = null;
      renderHistoryList();
    });
  });

  historyList?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const detailButton = target.closest("[data-history-open-detail]");
    if (detailButton) {
      const recordId = detailButton.getAttribute("data-history-open-detail");
      if (recordId) openHistoryDetail(recordId);
      return;
    }

    const selectButton = target.closest("[data-history-select]");
    if (!selectButton) return;
    const recordId = selectButton.getAttribute("data-history-select");
    if (!recordId) return;
    selectedHistoryRecordId = selectedHistoryRecordId === recordId ? null : recordId;
    renderHistoryList();
  });

  historyBackToListBtn?.addEventListener("click", closeHistoryDetail);
  historyDetailPrimaryBtn?.addEventListener("click", handleHistoryPrimaryAction);
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatKoreanDateTime(value) {
  const date = value instanceof Date ? value : new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${year}.${month}.${day} ${hour}:${minute}`;
}

function randomHex(length = 12) {
  const chars = "0123456789abcdef";
  let result = "";
  for (let i = 0; i < length; i += 1) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function createMockMintRecord(fileName = "sample.png") {
  const now = new Date();
  const tokenId = `#${Math.floor(82000 + Math.random() * 1200)}`;
  const txCore = randomHex(64);
  return {
    fileName,
    createdAt: formatKoreanDateTime(now),
    network: "Polygon",
    tokenId,
    contentHash: `0x${randomHex(8)}...${randomHex(4)}`,
    txHash: `0x${txCore.slice(0, 6)}...${txCore.slice(-4)}`,
    wallet: `0x${randomHex(4)}...${randomHex(4)}`,
    mintedAt: `${formatKoreanDateTime(now)} UTC`,
    explorerUrl: `https://polygonscan.com/tx/0x${txCore}`
  };
}

function revokeWatermarkRenderedUrl() {
  if (!watermarkRenderedUrl) return;
  if (watermarkRenderedUrl.startsWith("blob:")) {
    URL.revokeObjectURL(watermarkRenderedUrl);
  }
  watermarkRenderedUrl = "";
}

function toWatermarkedFileName(fileName) {
  const normalized = String(fileName || "image").trim();
  const dotIndex = normalized.lastIndexOf(".");
  const stem = dotIndex > 0 ? normalized.slice(0, dotIndex) : normalized;
  return `${stem}_watermarked.png`;
}

function setWatermarkCardLayoutByRatio(ratio) {
  const safeRatio = Number(ratio) || 1;
  const mode = safeRatio < 0.85 ? "portrait" : safeRatio > 1.15 ? "landscape" : "square";
  const cards = [watermarkOriginalCard, watermarkResultCard];

  cards.forEach((card) => {
    if (!card) return;
    card.classList.remove("is-portrait", "is-landscape", "is-square");
    card.classList.add(`is-${mode}`);
  });
}

function loadImageFromUrl(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("이미지 로딩 실패"));
    img.src = url;
  });
}

async function buildWatermarkedAsset(sourceUrl, fileName) {
  if (!sourceUrl) return;
  const token = ++watermarkBuildToken;
  try {
    const image = await loadImageFromUrl(sourceUrl);
    if (token !== watermarkBuildToken) return;

    const width = image.naturalWidth || image.width;
    const height = image.naturalHeight || image.height;
    if (!width || !height) return;
    setWatermarkCardLayoutByRatio(width / height);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(image, 0, 0, width, height);

    const minEdge = Math.min(width, height);
    const fontSize = Math.max(22, Math.round(minEdge * 0.065));
    const stepX = Math.max(180, Math.round(fontSize * 5.6));
    const stepY = Math.max(120, Math.round(fontSize * 2.5));

    ctx.save();
    ctx.translate(width * 0.5, height * 0.5);
    ctx.rotate(-Math.PI / 8);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `700 ${fontSize}px "Pretendard Variable", "Noto Sans KR", sans-serif`;
    for (let y = -height; y <= height; y += stepY) {
      for (let x = -width; x <= width; x += stepX) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.16)";
        ctx.fillText("VeriMarka", x, y);
      }
    }
    ctx.restore();

    const badgeWidth = Math.max(164, Math.round(width * 0.24));
    const badgeHeight = Math.max(42, Math.round(height * 0.08));
    const badgeX = width - badgeWidth - Math.max(16, Math.round(width * 0.02));
    const badgeY = height - badgeHeight - Math.max(16, Math.round(height * 0.02));

    const gradient = ctx.createLinearGradient(badgeX, badgeY, badgeX + badgeWidth, badgeY + badgeHeight);
    gradient.addColorStop(0, "rgba(47, 103, 194, 0.84)");
    gradient.addColorStop(1, "rgba(174, 68, 122, 0.84)");
    ctx.fillStyle = gradient;
    const radius = Math.max(10, Math.round(badgeHeight * 0.36));
    if (typeof ctx.roundRect === "function") {
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, radius);
      ctx.fill();
    } else {
      ctx.fillRect(badgeX, badgeY, badgeWidth, badgeHeight);
    }

    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `700 ${Math.max(14, Math.round(badgeHeight * 0.38))}px "Pretendard Variable", "Noto Sans KR", sans-serif`;
    ctx.fillText("VeriMarka Watermark", badgeX + badgeWidth / 2, badgeY + badgeHeight / 2);

    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob((value) => {
        if (value) resolve(value);
        else reject(new Error("워터마크 이미지 생성 실패"));
      }, "image/png");
    });
    if (token !== watermarkBuildToken) return;

    revokeWatermarkRenderedUrl();
    watermarkRenderedUrl = URL.createObjectURL(blob);
    watermarkDownloadName = toWatermarkedFileName(fileName);
    if (watermarkCompleteResultImage) {
      watermarkCompleteResultImage.src = watermarkRenderedUrl;
    }
  } catch {
    if (token !== watermarkBuildToken) return;
    revokeWatermarkRenderedUrl();
    watermarkDownloadName = toWatermarkedFileName(fileName);
  }
}

function setUploadPreviewMode(mode = "ready") {
  if (uploadReadyView) uploadReadyView.hidden = mode !== "ready";
  if (analysisRunningView) analysisRunningView.hidden = mode !== "running";
  if (analysisResultView) analysisResultView.hidden = mode !== "result";
  if (watermarkRunningView) watermarkRunningView.hidden = mode !== "wm-running";
  if (watermarkCompleteView) watermarkCompleteView.hidden = mode !== "wm-complete";
  if (mintRunningView) mintRunningView.hidden = mode !== "mint-running";
  if (mintCompleteView) mintCompleteView.hidden = mode !== "mint-complete";
}

function renderResultChecklist(items) {
  if (!analysisResultChecklist) return;
  analysisResultChecklist.innerHTML = "";
  items.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    analysisResultChecklist.append(li);
  });
}

function setResultMode(mode = "allow") {
  const normalizedMode = resultModeConfig[mode] ? mode : "allow";
  currentResultMode = normalizedMode;
  const config = resultModeConfig[normalizedMode];
  const isComparisonMode = normalizedMode === "pending" || normalizedMode === "reject";

  if (analysisResultView) {
    analysisResultView.dataset.result = normalizedMode;
  }
  if (analysisResultLayout) analysisResultLayout.hidden = isComparisonMode;
  if (resultRejectSpotlight) resultRejectSpotlight.hidden = !isComparisonMode;
  if (resultRejectMetrics) resultRejectMetrics.hidden = !isComparisonMode;
  if (analysisResultBadge) analysisResultBadge.textContent = config.badge;
  if (analysisResultTitle) analysisResultTitle.textContent = config.title;
  if (analysisResultSubtitle) analysisResultSubtitle.textContent = config.subtitle;
  if (analysisResultSimilarity) analysisResultSimilarity.textContent = config.similarity;
  if (analysisResultSimilarityPercent) {
    analysisResultSimilarityPercent.textContent = config.similarityPercent;
  }
  if (analysisRejectSimilarity) analysisRejectSimilarity.textContent = config.similarity;
  const thresholdValue = Number(config.threshold || 0.85);
  const similarityValue = Number(config.similarity || 0);
  const deltaValue = similarityValue - thresholdValue;
  if (analysisRejectThreshold) analysisRejectThreshold.textContent = thresholdValue.toFixed(4);
  if (analysisRejectDeltaLabel) {
    analysisRejectDeltaLabel.textContent = deltaValue >= 0 ? "초과값" : "임계값 차이";
  }
  if (analysisRejectDelta) {
    const signed = deltaValue >= 0 ? `+${deltaValue.toFixed(4)}` : deltaValue.toFixed(4);
    analysisRejectDelta.textContent = signed;
  }
  if (analysisRejectPhashDistance) {
    analysisRejectPhashDistance.textContent = String(config.phashDistance ?? 4);
  }
  if (analysisRejectPhashThreshold) {
    analysisRejectPhashThreshold.textContent = `기준 ≤ ${config.phashThreshold ?? 8}`;
  }
  if (analysisRejectCandidateLabel) {
    const candidateName = config.candidateName || "candidate_image.jpg";
    analysisRejectCandidateLabel.textContent = `유사 후보 · ${candidateName}`;
  }
  if (analysisResultNote) analysisResultNote.textContent = config.note;
  if (resultPrimaryBtn) resultPrimaryBtn.textContent = config.primaryLabel;
  if (resultSecondaryBtn) resultSecondaryBtn.textContent = config.secondaryLabel;
  renderResultChecklist(config.checklist);

  resultModeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.resultMode === normalizedMode);
  });
}

function showAnalysisResult(mode = "allow") {
  setResultMode(mode);
  setUploadPreviewMode("result");
  if (uploadPreviewImage?.src && analysisResultImage) {
    analysisResultImage.src = uploadPreviewImage.src;
  }
  if (uploadPreviewImage?.src && analysisResultOriginImage) {
    analysisResultOriginImage.src = uploadPreviewImage.src;
  }
  if (analysisResultCandidateImage) {
    analysisResultCandidateImage.src = mockCandidateImageUrl || uploadPreviewImage?.src || "";
  }
  if (analysisRejectSourceLabel && analysisResultFileName) {
    analysisRejectSourceLabel.textContent = `업로드 원본 · ${analysisResultFileName.textContent}`;
  }
}

function getStageStatus(progress, stage) {
  if (progress >= stage.end) return "done";
  if (progress >= stage.start) return "running";
  return "pending";
}

function getStageStatusLabel(status) {
  if (status === "done") return "완료";
  if (status === "running") return "진행 중";
  return "대기";
}

function stopAnalysisSimulation() {
  if (!analysisTimer) return;
  clearInterval(analysisTimer);
  analysisTimer = null;
}

function stopWatermarkSimulation() {
  if (!watermarkTimer) return;
  clearInterval(watermarkTimer);
  watermarkTimer = null;
}

function renderWatermarkState(progress, forcedStatusMap = null) {
  const clampedProgress = Math.max(0, Math.min(100, Number(progress) || 0));
  watermarkProgressValueInternal = clampedProgress;

  if (watermarkProgressRing) {
    watermarkProgressRing.style.setProperty("--progress", clampedProgress.toFixed(2));
  }
  if (watermarkProgressValue) {
    watermarkProgressValue.textContent = `${Math.round(clampedProgress)}%`;
  }

  let currentStageLabel = "워터마크 작업 대기 중입니다.";

  watermarkSteps.forEach((step, index) => {
    const stage = watermarkStageConfig[index];
    if (!stage) return;

    const forcedStatus = forcedStatusMap?.[stage.key];
    const status = forcedStatus || getStageStatus(clampedProgress, stage);

    step.classList.toggle("is-done", status === "done");
    step.classList.toggle("is-running", status === "running");
    step.classList.toggle("is-pending", status === "pending");

    const stateNode = step.querySelector(".watermark-step-state");
    if (stateNode) stateNode.textContent = `[${getStageStatusLabel(status)}]`;

    if (status === "running") currentStageLabel = `${stage.label}을(를) 진행 중입니다.`;
  });

  if (clampedProgress >= 100) {
    currentStageLabel = "워터마크 삽입 및 토큰 발행 준비가 완료되었습니다.";
  }

  if (watermarkStatusLine) {
    watermarkStatusLine.textContent = currentStageLabel;
  }
}

function showWatermarkCompleteView() {
  setUploadPreviewMode("wm-complete");

  if (uploadPreviewImage?.src && watermarkCompleteOriginalImage) {
    watermarkCompleteOriginalImage.src = uploadPreviewImage.src;
  }
  if (watermarkCompleteResultImage) {
    watermarkCompleteResultImage.src = watermarkRenderedUrl || uploadPreviewImage?.src || "";
  }

  const fileNameText = analysisResultFileName?.textContent || uploadFileName?.textContent || "sample.png";
  const fileMetaText = analysisResultFileMeta?.textContent || uploadFileMeta?.textContent || "0 KB · 준비 완료";

  if (watermarkCompleteFileName) watermarkCompleteFileName.textContent = fileNameText;
  if (watermarkCompleteFileMeta) watermarkCompleteFileMeta.textContent = fileMetaText;
}

function startWatermarkSimulation() {
  if (!uploadDropzone?.classList.contains("has-file")) return;
  stopWatermarkSimulation();
  setUploadPreviewMode("wm-running");
  renderWatermarkState(0);

  const totalDurationMs = 7600;
  const tickMs = 160;
  const baseStep = 100 / (totalDurationMs / tickMs);
  watermarkProgressValueInternal = 0;

  watermarkTimer = setInterval(() => {
    const jitter = Math.random() * 1.1;
    watermarkProgressValueInternal = Math.min(100, watermarkProgressValueInternal + baseStep + jitter);
    renderWatermarkState(watermarkProgressValueInternal);

    if (watermarkProgressValueInternal >= 100) {
      stopWatermarkSimulation();
      showWatermarkCompleteView();
      showLoginToast("워터마크 삽입이 완료되었습니다.", 1900);
    }
  }, tickMs);
}

function stopMintSimulation() {
  if (!mintTimer) return;
  clearInterval(mintTimer);
  mintTimer = null;
}

function renderMintState(progress, forcedStatusMap = null) {
  const clampedProgress = Math.max(0, Math.min(100, Number(progress) || 0));
  mintProgressValueInternal = clampedProgress;

  if (mintProgressRing) {
    mintProgressRing.style.setProperty("--progress", clampedProgress.toFixed(2));
  }
  if (mintProgressValue) {
    mintProgressValue.textContent = `${Math.round(clampedProgress)}%`;
  }

  let currentStageLabel = "토큰 발행 작업 대기 중입니다.";

  mintSteps.forEach((step, index) => {
    const stage = mintStageConfig[index];
    if (!stage) return;

    const forcedStatus = forcedStatusMap?.[stage.key];
    const status = forcedStatus || getStageStatus(clampedProgress, stage);

    step.classList.toggle("is-done", status === "done");
    step.classList.toggle("is-running", status === "running");
    step.classList.toggle("is-pending", status === "pending");

    const stateNode = step.querySelector(".mint-step-state");
    if (stateNode) stateNode.textContent = `[${getStageStatusLabel(status)}]`;

    if (status === "running") currentStageLabel = `${stage.label}을(를) 진행 중입니다.`;
  });

  if (clampedProgress >= 100) {
    currentStageLabel = "토큰 발행이 완료되었습니다.";
  }

  if (mintStatusLine) {
    mintStatusLine.textContent = currentStageLabel;
  }
}

function showMintCompleteView() {
  const fallbackName = analysisResultFileName?.textContent || uploadFileName?.textContent || "sample.png";
  if (!currentMintRecord) {
    currentMintRecord = createMockMintRecord(fallbackName);
  }

  setUploadPreviewMode("mint-complete");

  if (mintCompleteImage) {
    mintCompleteImage.src = watermarkRenderedUrl || uploadPreviewImage?.src || "";
  }
  if (mintFileName) mintFileName.textContent = currentMintRecord.fileName;
  if (mintCreatedAt) mintCreatedAt.textContent = currentMintRecord.createdAt;
  if (mintNetwork) mintNetwork.textContent = currentMintRecord.network;
  if (mintTokenId) mintTokenId.textContent = currentMintRecord.tokenId;
  if (mintContentHash) mintContentHash.textContent = currentMintRecord.contentHash;
  if (mintTxHash) mintTxHash.textContent = currentMintRecord.txHash;
  if (mintWallet) mintWallet.textContent = currentMintRecord.wallet;
  if (mintMintedAt) mintMintedAt.textContent = currentMintRecord.mintedAt;
}

function startMintSimulation() {
  if (!uploadDropzone?.classList.contains("has-file")) return;
  stopMintSimulation();
  currentMintRecord = createMockMintRecord(
    watermarkCompleteFileName?.textContent || analysisResultFileName?.textContent || "sample.png"
  );
  setUploadPreviewMode("mint-running");
  renderMintState(0);

  if (mintRunningImage) {
    mintRunningImage.src = watermarkRenderedUrl || uploadPreviewImage?.src || "";
  }

  const totalDurationMs = 7000;
  const tickMs = 170;
  const baseStep = 100 / (totalDurationMs / tickMs);
  mintProgressValueInternal = 0;

  mintTimer = setInterval(() => {
    const jitter = Math.random() * 1.2;
    mintProgressValueInternal = Math.min(100, mintProgressValueInternal + baseStep + jitter);
    renderMintState(mintProgressValueInternal);

    if (mintProgressValueInternal >= 100) {
      stopMintSimulation();
      showMintCompleteView();
      showLoginToast("NFT 토큰 발행이 완료되었습니다.", 2000);
    }
  }, tickMs);
}

function renderAnalysisState(progress, forcedStatusMap = null) {
  const clampedProgress = Math.max(0, Math.min(100, Number(progress) || 0));
  analysisProgressValueInternal = clampedProgress;

  if (analysisProgressRing) {
    analysisProgressRing.style.setProperty("--progress", clampedProgress.toFixed(2));
  }
  if (analysisProgressValue) {
    analysisProgressValue.textContent = `${Math.round(clampedProgress)}%`;
  }

  let currentStageLabel = "분석 대기 중입니다.";

  analysisSteps.forEach((step, index) => {
    const stage = analysisStageConfig[index];
    if (!stage) return;

    const forcedStatus = forcedStatusMap?.[stage.key];
    const status = forcedStatus || getStageStatus(clampedProgress, stage);

    step.classList.toggle("is-done", status === "done");
    step.classList.toggle("is-running", status === "running");
    step.classList.toggle("is-pending", status === "pending");

    const stateNode = step.querySelector(".analysis-step-state");
    if (stateNode) stateNode.textContent = `[${getStageStatusLabel(status)}]`;

    if (status === "running") currentStageLabel = `${stage.label}을(를) 진행 중입니다.`;
  });

  if (clampedProgress >= 100) {
    currentStageLabel = "분석이 완료되었습니다. 결과를 확인하세요.";
  }

  if (analysisStatusLine) {
    analysisStatusLine.textContent = currentStageLabel;
  }
}

function startAnalysisSimulation() {
  if (!uploadDropzone?.classList.contains("has-file")) return;
  stopAnalysisSimulation();
  setResultMode("allow");
  setUploadPreviewMode("running");
  renderAnalysisState(0);

  const totalDurationMs = 9200;
  const tickMs = 170;
  const baseStep = 100 / (totalDurationMs / tickMs);
  analysisProgressValueInternal = 0;

  analysisTimer = setInterval(() => {
    const jitter = Math.random() * 0.8;
    analysisProgressValueInternal = Math.min(100, analysisProgressValueInternal + baseStep + jitter);
    renderAnalysisState(analysisProgressValueInternal);

    if (analysisProgressValueInternal >= 100) {
      stopAnalysisSimulation();
      showLoginToast("분석이 완료되었습니다.", 1900);
      showAnalysisResult("allow");
    }
  }, tickMs);
}

function applyAnalysisProgress(payload) {
  const progress = Number(payload?.progress);
  if (!Number.isFinite(progress)) return;
  stopAnalysisSimulation();
  const resultMode = payload?.resultMode;
  const isFinished = progress >= 100 || payload?.phase === "result";

  if (isFinished) {
    renderAnalysisState(100, payload?.stageStatus ?? null);
    showAnalysisResult(resultMode || "allow");
    return;
  }

  setUploadPreviewMode("running");
  renderAnalysisState(progress, payload?.stageStatus ?? null);
}

window.applyRegistrationAnalysis = applyAnalysisProgress;
window.applyRegistrationResult = (mode) => {
  showAnalysisResult(mode);
};

window.applyWatermarkProgress = (payload) => {
  const progress = Number(payload?.progress);
  if (!Number.isFinite(progress)) return;
  stopWatermarkSimulation();
  const isFinished = progress >= 100 || payload?.phase === "result";

  if (isFinished) {
    renderWatermarkState(100, payload?.stageStatus ?? null);
    showWatermarkCompleteView();
    return;
  }

  setUploadPreviewMode("wm-running");
  renderWatermarkState(progress, payload?.stageStatus ?? null);
};

window.applyWatermarkResult = () => {
  stopWatermarkSimulation();
  renderWatermarkState(100);
  showWatermarkCompleteView();
};

window.applyMintProgress = (payload) => {
  const progress = Number(payload?.progress);
  if (!Number.isFinite(progress)) return;
  stopMintSimulation();
  const isFinished = progress >= 100 || payload?.phase === "result";

  if (payload?.record && typeof payload.record === "object") {
    currentMintRecord = { ...currentMintRecord, ...payload.record };
  }

  if (isFinished) {
    renderMintState(100, payload?.stageStatus ?? null);
    showMintCompleteView();
    return;
  }

  setUploadPreviewMode("mint-running");
  renderMintState(progress, payload?.stageStatus ?? null);
};

window.applyMintResult = (record = null) => {
  stopMintSimulation();
  if (record && typeof record === "object") {
    currentMintRecord = { ...currentMintRecord, ...record };
  }
  renderMintState(100);
  showMintCompleteView();
};
window.applyRegistrationCandidate = (candidate) => {
  if (!candidate) return;
  const candidateUrl = candidate.imageUrl || candidate.url || "";
  const candidateName = candidate.fileName || candidate.name || "";
  const phashDistance = candidate.phashDistance;
  const phashThreshold = candidate.phashThreshold;
  if (candidateUrl) {
    mockCandidateImageUrl = candidateUrl;
    if (analysisResultCandidateImage) analysisResultCandidateImage.src = candidateUrl;
  }
  if (candidateName && analysisRejectCandidateLabel) {
    analysisRejectCandidateLabel.textContent = `유사 후보 · ${candidateName}`;
  }
  if (candidateName && resultModeConfig.reject) {
    resultModeConfig.reject.candidateName = candidateName;
  }
  if (candidateName && resultModeConfig.pending) {
    resultModeConfig.pending.candidateName = candidateName;
  }
  if (Number.isFinite(phashDistance) && resultModeConfig.reject) {
    resultModeConfig.reject.phashDistance = phashDistance;
  }
  if (Number.isFinite(phashDistance) && resultModeConfig.pending) {
    resultModeConfig.pending.phashDistance = phashDistance;
  }
  if (Number.isFinite(phashThreshold) && resultModeConfig.reject) {
    resultModeConfig.reject.phashThreshold = phashThreshold;
  }
  if (Number.isFinite(phashThreshold) && resultModeConfig.pending) {
    resultModeConfig.pending.phashThreshold = phashThreshold;
  }
  if (currentResultMode === "reject") {
    setResultMode("reject");
  }
  if (currentResultMode === "pending") {
    setResultMode("pending");
  }
};

window.applyTokenPortfolio = (payload) => {
  const tokenCount = Number(payload?.nftCount ?? payload?.tokenCount ?? payload);
  if (!Number.isFinite(tokenCount)) return;
  updateTokenGate(tokenCount);
};

window.applyIdentityVerification = (payload) => {
  const verified = Boolean(payload?.verified ?? payload?.isVerified ?? payload);
  const phone = payload?.phone;
  isIdentityVerified = verified;
  hasIdentityCodeSent = false;
  stopIdentityTimer();
  identityRemainingSeconds = 0;
  renderIdentityTimer();
  if (verified && phone && mypagePhone) {
    mypagePhone.textContent = formatPhoneNumber(phone);
  }
  updateIdentityStatus(verified);
};

function setUploadState(file) {
  if (!uploadDropzone || !uploadPreview || !uploadEmpty) return;
  if (!file) {
    stopAnalysisSimulation();
    stopWatermarkSimulation();
    stopMintSimulation();
    watermarkBuildToken += 1;
    revokeWatermarkRenderedUrl();
    watermarkDownloadName = "sample_watermarked.png";
    currentMintRecord = null;
    uploadDropzone.classList.remove("has-file");
    uploadEmpty.hidden = false;
    uploadPreview.hidden = true;
    setUploadPreviewMode("ready");
    setResultMode("allow");
    renderAnalysisState(0);
    if (uploadPreviewImage) uploadPreviewImage.removeAttribute("src");
    if (analysisPreviewImage) analysisPreviewImage.removeAttribute("src");
    if (analysisResultImage) analysisResultImage.removeAttribute("src");
    if (analysisResultOriginImage) analysisResultOriginImage.removeAttribute("src");
    if (analysisResultCandidateImage) analysisResultCandidateImage.removeAttribute("src");
    if (watermarkRunningImage) watermarkRunningImage.removeAttribute("src");
    if (watermarkCompleteOriginalImage) watermarkCompleteOriginalImage.removeAttribute("src");
    if (watermarkCompleteResultImage) watermarkCompleteResultImage.removeAttribute("src");
    if (mintRunningImage) mintRunningImage.removeAttribute("src");
    if (mintCompleteImage) mintCompleteImage.removeAttribute("src");
    if (uploadFileName) uploadFileName.textContent = "sample.png";
    if (uploadFileMeta) uploadFileMeta.textContent = "0 KB · 준비 완료";
    if (analysisResultFileName) analysisResultFileName.textContent = "sample.png";
    if (analysisResultFileMeta) analysisResultFileMeta.textContent = "0 KB · 2026.03.07 00:00";
    if (watermarkCompleteFileName) watermarkCompleteFileName.textContent = "sample.png";
    if (watermarkCompleteFileMeta) watermarkCompleteFileMeta.textContent = "0 KB · 준비 완료";
    if (mintFileName) mintFileName.textContent = "sample.png";
    if (mintCreatedAt) mintCreatedAt.textContent = "2026.03.17 00:00";
    if (mintNetwork) mintNetwork.textContent = "Polygon";
    if (mintTokenId) mintTokenId.textContent = "#82401";
    if (mintContentHash) mintContentHash.textContent = "0x9a8b...7c6d";
    if (mintTxHash) mintTxHash.textContent = "0x1f2e...3d4c";
    if (mintWallet) mintWallet.textContent = "0xAb58...E12a";
    if (mintMintedAt) mintMintedAt.textContent = "2026.03.17 00:00 UTC";
    if (analysisRejectSourceLabel) analysisRejectSourceLabel.textContent = "업로드 원본 · sample.png";
    if (analysisRejectCandidateLabel) {
      analysisRejectCandidateLabel.textContent = "유사 후보 · concept_scene.jpg";
    }
    if (resultModeConfig.reject) resultModeConfig.reject.candidateName = "concept_scene.jpg";
    renderWatermarkState(0);
    renderMintState(0);
    setWatermarkCardLayoutByRatio(1);
    mockCandidateImageUrl = "";
    return;
  }

  if (!/^image\/(jpeg|png)$/i.test(file.type)) {
    alert("JPG 또는 PNG 파일만 업로드할 수 있습니다.");
    return;
  }

  const maxBytes = 20 * 1024 * 1024;
  if (file.size > maxBytes) {
    alert("파일 크기는 20MB 이하만 가능합니다.");
    return;
  }

  if (uploadPreviewUrl) {
    URL.revokeObjectURL(uploadPreviewUrl);
    uploadPreviewUrl = null;
  }

  uploadPreviewUrl = URL.createObjectURL(file);
  watermarkBuildToken += 1;
  revokeWatermarkRenderedUrl();
  watermarkDownloadName = toWatermarkedFileName(file.name);
  stopAnalysisSimulation();
  stopWatermarkSimulation();
  stopMintSimulation();
  currentMintRecord = null;
  if (uploadPreviewImage) uploadPreviewImage.src = uploadPreviewUrl;
  if (analysisPreviewImage) analysisPreviewImage.src = uploadPreviewUrl;
  if (analysisResultImage) analysisResultImage.src = uploadPreviewUrl;
  if (analysisResultOriginImage) analysisResultOriginImage.src = uploadPreviewUrl;
  if (watermarkRunningImage) watermarkRunningImage.src = uploadPreviewUrl;
  if (watermarkCompleteOriginalImage) watermarkCompleteOriginalImage.src = uploadPreviewUrl;
  if (watermarkCompleteResultImage) watermarkCompleteResultImage.src = uploadPreviewUrl;
  if (mintRunningImage) mintRunningImage.src = uploadPreviewUrl;
  if (mintCompleteImage) mintCompleteImage.src = uploadPreviewUrl;
  if (analysisResultCandidateImage) {
    analysisResultCandidateImage.src = mockCandidateImageUrl || uploadPreviewUrl;
  }
  if (uploadFileName) uploadFileName.textContent = file.name;
  if (uploadFileMeta) {
    uploadFileMeta.textContent = `${formatFileSize(file.size)} · ${formatKoreanDateTime(new Date())}`;
  }
  if (analysisResultFileName) analysisResultFileName.textContent = file.name;
  if (analysisResultFileMeta && uploadFileMeta) {
    analysisResultFileMeta.textContent = uploadFileMeta.textContent;
  }
  if (watermarkCompleteFileName) watermarkCompleteFileName.textContent = file.name;
  if (watermarkCompleteFileMeta && uploadFileMeta) {
    watermarkCompleteFileMeta.textContent = uploadFileMeta.textContent;
  }
  if (mintFileName) mintFileName.textContent = file.name;
  if (mintCreatedAt) mintCreatedAt.textContent = formatKoreanDateTime(new Date());
  if (analysisRejectSourceLabel) analysisRejectSourceLabel.textContent = `업로드 원본 · ${file.name}`;
  showLoginToast("이미지 업로드가 완료되었습니다.", 1600);

  uploadDropzone.classList.add("has-file");
  uploadEmpty.hidden = true;
  uploadPreview.hidden = false;
  setResultMode("allow");
  setUploadPreviewMode("ready");
  renderAnalysisState(0);
  renderWatermarkState(0);
  renderMintState(0);
  buildWatermarkedAsset(uploadPreviewUrl, file.name);
}

function showAuthPanel(target) {
  const isSignup = target === "signup";
  loginPanel?.classList.toggle("is-active", !isSignup);
  signupPanel?.classList.toggle("is-active", isSignup);
}

function getProfileInitial(name) {
  const text = String(name || "").trim();
  if (!text) return "V";
  return text[0].toUpperCase();
}

function toEmailAlias(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "")
    .slice(0, 20);
}

function setMypageProfile({ nickname, email, phone }) {
  const displayName = nickname?.trim() ? `${nickname.trim()}님` : defaultMypageNickname;
  const displayEmail = email?.trim() || defaultMypageEmail;
  const displayPhone = phone?.trim() || defaultMypagePhone;
  const profileInitial = getProfileInitial(nickname || "V");

  if (headerProfileInitial) headerProfileInitial.textContent = profileInitial;
  if (mypageAvatar) mypageAvatar.textContent = profileInitial;
  if (mypageName) mypageName.textContent = displayName;
  if (mypageEmail) mypageEmail.textContent = displayEmail;
  if (mypagePhone) mypagePhone.textContent = displayPhone;
}

function normalizePhoneNumber(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 11);
}

function formatPhoneNumber(value) {
  const digits = normalizePhoneNumber(value);
  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return digits;
}

function updateIdentityStatus(verified = false) {
  if (mypageIdentityChip) {
    mypageIdentityChip.textContent = verified ? "인증 완료" : "인증 필요";
    mypageIdentityChip.classList.toggle("is-verified", verified);
    mypageIdentityChip.classList.toggle("is-pending", !verified);
  }

  if (mypageIdentityDescription) {
    mypageIdentityDescription.textContent = verified
      ? "휴대폰 본인 인증이 완료되었습니다."
      : "서비스 이용을 위해 휴대폰 인증을 진행해주세요.";
  }

  if (openIdentityModalBtn) {
    openIdentityModalBtn.textContent = verified ? "인증 완료" : "인증하기";
    openIdentityModalBtn.disabled = verified;
    openIdentityModalBtn.classList.toggle("is-static", verified);
    openIdentityModalBtn.setAttribute("aria-disabled", verified ? "true" : "false");
  }
}

function renderIdentityTimer() {
  if (!identityTimer) return;
  const safeValue = Math.max(0, identityRemainingSeconds);
  const minute = String(Math.floor(safeValue / 60)).padStart(2, "0");
  const second = String(safeValue % 60).padStart(2, "0");
  identityTimer.textContent = `${minute}:${second}`;
}

function stopIdentityTimer() {
  if (identityCountdownTimer) {
    clearInterval(identityCountdownTimer);
    identityCountdownTimer = null;
  }
}

function startIdentityTimer(seconds = 180) {
  stopIdentityTimer();
  identityRemainingSeconds = seconds;
  renderIdentityTimer();
  identityCountdownTimer = setInterval(() => {
    identityRemainingSeconds = Math.max(0, identityRemainingSeconds - 1);
    renderIdentityTimer();
    if (identityRemainingSeconds === 0) {
      stopIdentityTimer();
      hasIdentityCodeSent = false;
    }
  }, 1000);
}

function syncBodyModalLock() {
  const hasOpenModal = Boolean(
    (loginModal && !loginModal.hidden) || (identityModal && !identityModal.hidden)
  );
  document.body.classList.toggle("modal-open", hasOpenModal);
}

function updateTokenGate(tokenCount = 0) {
  const safeCount = Math.max(0, Number(tokenCount) || 0);
  currentTokenCount = safeCount;

  if (mypageTokenCount) mypageTokenCount.textContent = String(safeCount);

  const isEligible = safeCount >= minimumVoteTokenCount;
  if (mypageVoteStatusChip) {
    mypageVoteStatusChip.textContent = isEligible ? "투표 가능" : "대기";
    mypageVoteStatusChip.classList.toggle("is-eligible", isEligible);
    mypageVoteStatusChip.classList.toggle("is-ineligible", !isEligible);
  }
  if (mypageVoteStatusText) {
    if (isEligible) {
      mypageVoteStatusText.textContent = "조건을 충족하여 블록체인 투표 참여가 가능합니다.";
    } else {
      const gap = minimumVoteTokenCount - safeCount;
      mypageVoteStatusText.textContent = `현재 ${gap} NFT 부족하여 투표 권한이 활성화되지 않았습니다.`;
    }
  }
}

function closeAllLanguageMenus() {
  langSwitches.forEach(({ root, trigger, menu }) => {
    root.classList.remove("is-open");
    if (menu) menu.hidden = true;
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  });
}

function setLanguage(lang) {
  const normalizedLang = languageLabelMap[lang] ? lang : "ko";
  currentLanguage = normalizedLang;

  langOptions.forEach((option) => {
    option.classList.toggle("is-active", option.dataset.lang === normalizedLang);
  });

  if (footerLangLabel) {
    footerLangLabel.textContent = languageLabelMap[normalizedLang];
  }

  document.documentElement.lang = htmlLangMap[normalizedLang] || "ko";
}

function setLoggedInUI(nickname, profile = {}) {
  const safeNickname = nickname?.trim() ? nickname.trim() : "사용자";
  const generatedAlias = toEmailAlias(safeNickname) || "user";
  const safeEmail = profile.email?.trim() || `${generatedAlias}@verimarka.com`;
  const safePhone = profile.phone?.trim() || defaultMypagePhone;

  isLoggedIn = true;
  if (userNickname) userNickname.textContent = `${safeNickname}님`;
  if (userSession) userSession.hidden = false;
  if (guestActions) guestActions.hidden = true;
  isIdentityVerified = false;
  hasIdentityCodeSent = false;
  stopIdentityTimer();
  identityRemainingSeconds = 0;
  renderIdentityTimer();
  setMypageProfile({
    nickname: safeNickname,
    email: safeEmail,
    phone: safePhone
  });
  updateIdentityStatus(false);
  updateTokenGate(currentTokenCount);
}

function setLoggedOutUI() {
  isLoggedIn = false;
  if (userSession) userSession.hidden = true;
  if (guestActions) guestActions.hidden = false;
  if (userNickname) userNickname.textContent = "게스트";
  isIdentityVerified = false;
  hasIdentityCodeSent = false;
  stopIdentityTimer();
  identityRemainingSeconds = 0;
  renderIdentityTimer();
  setMypageProfile({
    nickname: defaultMypageNickname,
    email: defaultMypageEmail,
    phone: defaultMypagePhone
  });
  updateIdentityStatus(false);
  updateTokenGate(0);
}

function openMypage() {
  if (!isLoggedIn) {
    showLoginToast("로그인 후 이용 가능합니다.", 1800);
    openLoginModal();
    return;
  }
  setActiveTab("mypage");
}

function openIdentityModal() {
  if (!isLoggedIn) {
    showLoginToast("로그인 후 이용 가능합니다.", 1800);
    openLoginModal();
    return;
  }
  if (!identityModal) return;
  lastFocusedElement = document.activeElement;
  closeAllLanguageMenus();

  if (identityPhoneInput) {
    identityPhoneInput.value = normalizePhoneNumber(mypagePhone?.textContent || "");
  }
  if (identityCodeInput) {
    identityCodeInput.value = "";
  }
  if (!hasIdentityCodeSent) {
    identityRemainingSeconds = 0;
    renderIdentityTimer();
  }

  identityModal.hidden = false;
  syncBodyModalLock();
  identityPhoneInput?.focus();
}

function closeIdentityModal() {
  if (!identityModal) return;
  identityModal.hidden = true;
  syncBodyModalLock();
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

function sendIdentityCode() {
  const rawPhone = identityPhoneInput?.value || "";
  const phoneDigits = normalizePhoneNumber(rawPhone);
  const isValidPhone = /^01\d{8,9}$/.test(phoneDigits);

  if (!isValidPhone) {
    alert("휴대폰 번호를 정확히 입력해주세요.");
    identityPhoneInput?.focus();
    return;
  }

  if (identityPhoneInput) {
    identityPhoneInput.value = formatPhoneNumber(phoneDigits);
  }

  hasIdentityCodeSent = true;
  startIdentityTimer(180);
  showLoginToast("인증번호를 전송했습니다.", 1600);
  identityCodeInput?.focus();
}

function completeIdentityVerification() {
  const code = String(identityCodeInput?.value || "").trim();
  if (!hasIdentityCodeSent || identityRemainingSeconds <= 0) {
    alert("인증번호를 먼저 전송하거나, 재전송 후 다시 시도해주세요.");
    return;
  }
  if (!/^\d{6}$/.test(code)) {
    alert("인증코드 6자리를 입력해주세요.");
    identityCodeInput?.focus();
    return;
  }

  const verifiedPhone = formatPhoneNumber(identityPhoneInput?.value || "");
  isIdentityVerified = true;
  hasIdentityCodeSent = false;
  stopIdentityTimer();
  identityRemainingSeconds = 0;
  renderIdentityTimer();
  if (mypagePhone && verifiedPhone) mypagePhone.textContent = verifiedPhone;
  updateIdentityStatus(true);
  closeIdentityModal();
  showLoginToast("본인 인증이 완료되었습니다.", 1800);
}

function showLoginToast(message = "로그인 완료했습니다.", duration = 2000) {
  if (!loginToast || !loginToastText || !loginToastProgressBar) return;
  if (toastHideTimer) clearTimeout(toastHideTimer);

  loginToastText.textContent = message;
  loginToast.hidden = false;

  loginToastProgressBar.style.transition = "none";
  loginToastProgressBar.style.width = "100%";

  requestAnimationFrame(() => {
    loginToastProgressBar.style.transition = `width ${duration}ms linear`;
    loginToastProgressBar.style.width = "0%";
  });

  toastHideTimer = setTimeout(() => {
    loginToast.hidden = true;
  }, duration + 120);
}

function openAuthModal(target = "login") {
  if (!loginModal) return;
  lastFocusedElement = document.activeElement;
  closeAllLanguageMenus();
  showAuthPanel(target);
  loginModal.hidden = false;
  syncBodyModalLock();
  loginCloseBtn?.focus();
}

function openLoginModal() {
  openAuthModal("login");
}

function openSignupModal() {
  openAuthModal("signup");
}

function closeLoginModal() {
  if (!loginModal) return;
  loginModal.hidden = true;
  syncBodyModalLock();
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

loginBtn?.addEventListener("click", openLoginModal);
signupOpenBtn?.addEventListener("click", openSignupModal);
loginCloseBtn?.addEventListener("click", closeLoginModal);

uploadDropzone?.addEventListener("click", (event) => {
  const isActionButton = event.target instanceof Element
    ? Boolean(event.target.closest("button"))
    : false;
  const isFileSelected = uploadDropzone.classList.contains("has-file");
  if (!isActionButton && !isFileSelected) {
    uploadInput?.click();
  }
});

uploadDropzone?.addEventListener("keydown", (event) => {
  const isFileSelected = uploadDropzone.classList.contains("has-file");
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (!isFileSelected) uploadInput?.click();
  }
});

uploadDropzone?.addEventListener("dragover", (event) => {
  event.preventDefault();
  uploadDropzone.classList.add("is-dragover");
});

uploadDropzone?.addEventListener("dragleave", () => {
  uploadDropzone.classList.remove("is-dragover");
});

uploadDropzone?.addEventListener("drop", (event) => {
  event.preventDefault();
  uploadDropzone.classList.remove("is-dragover");
  const file = event.dataTransfer?.files?.[0];
  if (file) setUploadState(file);
});

uploadInput?.addEventListener("change", () => {
  const file = uploadInput.files?.[0];
  if (file) setUploadState(file);
});

changeFileBtn?.addEventListener("click", () => {
  stopAnalysisSimulation();
  stopWatermarkSimulation();
  stopMintSimulation();
  uploadInput?.click();
});

pickAnotherFileBtn?.addEventListener("click", () => {
  stopAnalysisSimulation();
  stopWatermarkSimulation();
  stopMintSimulation();
  uploadInput?.click();
});

startRegisterBtn?.addEventListener("click", () => {
  if (!uploadDropzone?.classList.contains("has-file")) {
    alert("먼저 업로드할 이미지를 선택해주세요.");
    return;
  }
  stopWatermarkSimulation();
  stopMintSimulation();
  showLoginToast("저작물 등록 요청이 접수되었습니다.", 2200);
  startAnalysisSimulation();
});

cancelAnalysisBtn?.addEventListener("click", () => {
  stopAnalysisSimulation();
  stopWatermarkSimulation();
  stopMintSimulation();
  setUploadPreviewMode("ready");
  uploadInput?.click();
});

goHomeBtn?.addEventListener("click", () => {
  stopAnalysisSimulation();
  stopWatermarkSimulation();
  stopMintSimulation();
  setActiveTab("home");
});

resultModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setResultMode(button.dataset.resultMode || "allow");
  });
});

resultPrimaryBtn?.addEventListener("click", () => {
  const config = resultModeConfig[currentResultMode] || resultModeConfig.allow;
  if (currentResultMode === "allow") {
    showLoginToast(config.primaryToast, 1500);
    startWatermarkSimulation();
    return;
  }
  if (currentResultMode === "reject") {
    stopWatermarkSimulation();
    setUploadPreviewMode("ready");
    uploadInput?.click();
    showLoginToast(config.primaryToast, 1800);
    return;
  }
  showLoginToast(config.primaryToast, 1800);
});

resultSecondaryBtn?.addEventListener("click", () => {
  stopWatermarkSimulation();
  stopMintSimulation();
  setUploadPreviewMode("ready");
});

startMintBtn?.addEventListener("click", () => {
  if (!uploadDropzone?.classList.contains("has-file")) {
    showLoginToast("먼저 이미지를 업로드해주세요.", 1500);
    return;
  }
  showLoginToast("NFT 토큰 발행을 시작합니다.", 1500);
  startMintSimulation();
});

watermarkDownloadBtn?.addEventListener("click", () => {
  const downloadUrl = watermarkRenderedUrl || watermarkCompleteResultImage?.src || uploadPreviewImage?.src;
  if (!downloadUrl) {
    showLoginToast("다운로드할 이미지가 없습니다.", 1500);
    return;
  }

  const anchor = document.createElement("a");
  anchor.href = downloadUrl;
  anchor.download = watermarkDownloadName || "watermarked_image.png";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  showLoginToast("워터마크 이미지를 다운로드했습니다.", 1700);
});

watermarkCompleteHistoryBtn?.addEventListener("click", () => {
  stopWatermarkSimulation();
  stopMintSimulation();
  setActiveTab("history");
});

watermarkCompleteUploadBtn?.addEventListener("click", () => {
  stopWatermarkSimulation();
  stopMintSimulation();
  setUploadPreviewMode("ready");
  uploadInput?.click();
});

mintCopyUrlBtn?.addEventListener("click", () => {
  const explorerUrl = currentMintRecord?.explorerUrl;
  if (!explorerUrl) {
    showLoginToast("복사할 블록체인 URL이 없습니다.", 1500);
    return;
  }
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(explorerUrl).catch(() => {});
  }
  showLoginToast("블록체인 URL을 복사했습니다.", 1700);
});

mintGoHistoryBtn?.addEventListener("click", () => {
  stopMintSimulation();
  setActiveTab("history");
});

mintUploadAgainBtn?.addEventListener("click", () => {
  stopMintSimulation();
  setUploadPreviewMode("ready");
  uploadInput?.click();
});

langSwitches.forEach(({ root, trigger, menu }) => {
  trigger?.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = Boolean(menu?.hidden);
    closeAllLanguageMenus();
    if (!menu || !willOpen) return;
    menu.hidden = false;
    root.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
  });
});

langOptions.forEach((option) => {
  option.addEventListener("click", () => {
    setLanguage(option.dataset.lang || "ko");
    closeAllLanguageMenus();
  });
});

authSwitchLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const target = link.dataset.authTarget === "signup" ? "signup" : "login";
    showAuthPanel(target);
  });
});

socialLoginBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const provider = button.dataset.provider || "";
    const nickname = providerNicknameMap[provider] || "소셜사용자";
    setLoggedInUI(nickname, {
      email: `${provider || "social"}.user@verimarka.com`
    });
    closeLoginModal();
    showLoginToast("로그인 완료했습니다.", 2000);
  });
});

signupSubmitBtn?.addEventListener("click", () => {
  const emailInput = signupForm?.querySelector('input[name="email"]');
  const passwordInput = signupForm?.querySelector('input[name="password"]');
  const confirmInput = signupForm?.querySelector('input[name="passwordConfirm"]');

  const email = emailInput?.value.trim() || "";
  const password = passwordInput?.value || "";
  const passwordConfirm = confirmInput?.value || "";

  if (!email || !password || !passwordConfirm) {
    alert("이메일과 비밀번호를 모두 입력해주세요.");
    return;
  }

  if (password.length < 8) {
    alert("비밀번호는 8자 이상 입력해주세요.");
    return;
  }

  if (password !== passwordConfirm) {
    alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    return;
  }

  const nicknameFromEmail = email.split("@")[0] || "신규회원";
  setLoggedInUI(nicknameFromEmail, { email });
  signupForm?.reset();
  closeLoginModal();
  showLoginToast("로그인 완료했습니다.", 2000);
});

logoutBtn?.addEventListener("click", () => {
  setLoggedOutUI();
  setActiveTab("home");
  showLoginToast("로그아웃 되었습니다.", 1600);
});

openMypageBtn?.addEventListener("click", openMypage);
openIdentityModalBtn?.addEventListener("click", openIdentityModal);
identityModalCloseBtn?.addEventListener("click", closeIdentityModal);
identitySendCodeBtn?.addEventListener("click", sendIdentityCode);
identityCompleteBtn?.addEventListener("click", completeIdentityVerification);
identityCodeInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    completeIdentityVerification();
  }
});

loginModal?.addEventListener("click", (event) => {
  if (event.target === loginModal) {
    closeLoginModal();
  }
});

identityModal?.addEventListener("click", (event) => {
  if (event.target === identityModal) {
    closeIdentityModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (loginModal && !loginModal.hidden) {
      closeLoginModal();
    }
    if (identityModal && !identityModal.hidden) {
      closeIdentityModal();
    }
    closeAllLanguageMenus();
  }
});

document.addEventListener("click", (event) => {
  const target = event.target;
  const clickedInsideSwitch = target instanceof Element
    ? Boolean(target.closest("[data-lang-switch]"))
    : false;
  if (!clickedInsideSwitch) {
    closeAllLanguageMenus();
  }
});

window.addEventListener("beforeunload", () => {
  stopAnalysisSimulation();
  stopWatermarkSimulation();
  stopMintSimulation();
  if (uploadPreviewUrl) {
    URL.revokeObjectURL(uploadPreviewUrl);
    uploadPreviewUrl = null;
  }
  revokeWatermarkRenderedUrl();
});

setLoggedOutUI();
setLanguage(currentLanguage);
setupHistoryEvents();
renderHistoryList();
closeHistoryDetail();
setResultMode("allow");
setActiveTab("home");
