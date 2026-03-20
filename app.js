const tabs = document.querySelectorAll(".tab");
const pageByTab = {
  home: "page-home",
  add: "page-add",
  mypage: "page-mypage",
  verify: "page-verify",
  history: "page-history",
  admin: "page-admin"
};
const appPages = {
  home: document.getElementById("page-home"),
  add: document.getElementById("page-add"),
  verify: document.getElementById("page-verify"),
  history: document.getElementById("page-history"),
  mypage: document.getElementById("page-mypage"),
  admin: document.getElementById("page-admin")
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
  if (normalizedTab !== "verify") {
    stopVerifySimulation();
  }

  document.body.classList.toggle("admin-mode", normalizedTab === "admin");
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
const watermarkCompareLayout = document.getElementById("watermarkCompareLayout");
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
const verifyDropzone = document.getElementById("verifyDropzone");
const verifyInput = document.getElementById("verifyInput");
const verifyEmpty = document.getElementById("verifyEmpty");
const verifyContent = document.getElementById("verifyContent");
const verifyReadyView = document.getElementById("verifyReadyView");
const verifyRunningView = document.getElementById("verifyRunningView");
const verifySuccessView = document.getElementById("verifySuccessView");
const verifyFailView = document.getElementById("verifyFailView");
const verifyPreviewImage = document.getElementById("verifyPreviewImage");
const verifyRunningImage = document.getElementById("verifyRunningImage");
const verifySuccessImage = document.getElementById("verifySuccessImage");
const verifyFailSourceImage = document.getElementById("verifyFailSourceImage");
const verifyFailCandidateImage = document.getElementById("verifyFailCandidateImage");
const verifyFileName = document.getElementById("verifyFileName");
const verifyFileMeta = document.getElementById("verifyFileMeta");
const startVerifyBtn = document.getElementById("startVerifyBtn");
const changeVerifyFileBtn = document.getElementById("changeVerifyFileBtn");
const verifyAgainBtn = document.getElementById("verifyAgainBtn");
const verifyFailRetryBtn = document.getElementById("verifyFailRetryBtn");
const verifyProgressRing = document.getElementById("verifyProgressRing");
const verifyProgressValue = document.getElementById("verifyProgressValue");
const verifyStatusLine = document.getElementById("verifyStatusLine");
const verifySuccessTokenInfo = document.getElementById("verifySuccessTokenInfo");
const verifyFailMetrics = document.getElementById("verifyFailMetrics");
const verifyStepItems = Array.from(document.querySelectorAll(".verify-step"));
const verifyScenarioButtons = document.querySelectorAll(".verify-scenario-btn[data-verify-scenario]");
const verifyUploaderName = document.getElementById("verifyUploaderName");
const verifyRegisteredAt = document.getElementById("verifyRegisteredAt");
const verifyCandidateFileName = document.getElementById("verifyCandidateFileName");
const verifyCandidateOwner = document.getElementById("verifyCandidateOwner");
const verifyCandidateDate = document.getElementById("verifyCandidateDate");
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
const adminViewTitle = document.getElementById("adminViewTitle");
const adminViewButtons = document.querySelectorAll("[data-admin-view]");
const adminViews = {
  dashboard: document.getElementById("admin-dashboard-view"),
  users: document.getElementById("admin-users-view"),
  userDetail: document.getElementById("admin-user-detail-view"),
  images: document.getElementById("admin-images-view"),
  imageDetail: document.getElementById("admin-image-detail-view"),
  votes: document.getElementById("admin-votes-view"),
  voteDetail: document.getElementById("admin-vote-detail-view")
};
const adminUserSearchInput = document.getElementById("adminUserSearchInput");
const adminUserSearchBtn = document.getElementById("adminUserSearchBtn");
const adminUserTypeFilter = document.getElementById("adminUserTypeFilter");
const adminUserApplyBtn = document.getElementById("adminUserApplyBtn");
const adminUserTableBody = document.getElementById("adminUserTableBody");
const adminBackToUsersBtn = document.getElementById("adminBackToUsersBtn");
const adminUserDetailEmail = document.getElementById("adminUserDetailEmail");
const adminUserDetailStatus = document.getElementById("adminUserDetailStatus");
const adminUserRoleSelect = document.getElementById("adminUserRoleSelect");
const adminUserRoleUpdateBtn = document.getElementById("adminUserRoleUpdateBtn");
const adminUserStatusSelect = document.getElementById("adminUserStatusSelect");
const adminUserStatusUpdateBtn = document.getElementById("adminUserStatusUpdateBtn");
const adminUserBasicInfo = document.getElementById("adminUserBasicInfo");
const adminUserAuthInfo = document.getElementById("adminUserAuthInfo");
const adminUserWalletInfo = document.getElementById("adminUserWalletInfo");
const adminUserLogTable = document.getElementById("adminUserLogTable");
const adminImageSearchInput = document.getElementById("adminImageSearchInput");
const adminImageStatusFilter = document.getElementById("adminImageStatusFilter");
const adminImageSortFilter = document.getElementById("adminImageSortFilter");
const adminImageSearchBtn = document.getElementById("adminImageSearchBtn");
const adminImageTableBody = document.getElementById("adminImageTableBody");
const adminBackToImagesBtn = document.getElementById("adminBackToImagesBtn");
const adminImageDetailName = document.getElementById("adminImageDetailName");
const adminImageDetailStatus = document.getElementById("adminImageDetailStatus");
const adminImageOriginalThumb = document.getElementById("adminImageOriginalThumb");
const adminImageWatermarkedThumb = document.getElementById("adminImageWatermarkedThumb");
const adminImageMetrics = document.getElementById("adminImageMetrics");
const adminImageVoteInfo = document.getElementById("adminImageVoteInfo");
const adminImageChainInfo = document.getElementById("adminImageChainInfo");
const adminVoteSearchInput = document.getElementById("adminVoteSearchInput");
const adminVoteSearchBtn = document.getElementById("adminVoteSearchBtn");
const adminVoteStatusFilter = document.getElementById("adminVoteStatusFilter");
const adminVoteSortFilter = document.getElementById("adminVoteSortFilter");
const adminVoteTableBody = document.getElementById("adminVoteTableBody");
const adminBackToVotesBtn = document.getElementById("adminBackToVotesBtn");
const adminVoteDetailId = document.getElementById("adminVoteDetailId");
const adminVoteDetailStatus = document.getElementById("adminVoteDetailStatus");
const adminVoteDetailThumb = document.getElementById("adminVoteDetailThumb");
const adminVoteImageInfo = document.getElementById("adminVoteImageInfo");
const adminVoteInfo = document.getElementById("adminVoteInfo");
const adminVoteYesBar = document.getElementById("adminVoteYesBar");
const adminVoteNoBar = document.getElementById("adminVoteNoBar");
const adminVoteYesText = document.getElementById("adminVoteYesText");
const adminVoteNoText = document.getElementById("adminVoteNoText");
const adminVoteRelatedTableBody = document.getElementById("adminVoteRelatedTableBody");
const adminActivityFeed = document.getElementById("adminActivityFeed");
const adminTotalUsers = document.getElementById("adminTotalUsers");
const adminVerifiedUsers = document.getElementById("adminVerifiedUsers");
const adminEligibleUsers = document.getElementById("adminEligibleUsers");
const adminTotalImages = document.getElementById("adminTotalImages");
const adminTodayUploads = document.getElementById("adminTodayUploads");
const adminVotingActive = document.getElementById("adminVotingActive");
const adminVotingClosed = document.getElementById("adminVotingClosed");
const adminPendingReview = document.getElementById("adminPendingReview");
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
let verifyPreviewUrl = null;
let verifyTimer = null;
let verifyProgressValueInternal = 0;
let verifyScenario = "success";
let watermarkRenderedUrl = "";
let watermarkDownloadName = "sample_watermarked.png";
let watermarkBuildToken = 0;
let currentMintRecord = null;
let currentLanguage = "ko";
let currentResultMode = "allow";
let mockCandidateImageUrl = "";
let verifyCandidateMeta = {
  fileName: "concept_scene.jpg",
  owner: "artist@verimarka.com",
  registeredAt: "2026.03.18 16:05"
};
let isLoggedIn = false;
let isIdentityVerified = false;
let hasIdentityCodeSent = false;
let identityRemainingSeconds = 0;
let identityCountdownTimer = null;
let currentHistoryFilter = "all";
let selectedHistoryRecordId = null;
let currentHistoryDetailId = null;
let currentAdminView = "dashboard";
let selectedAdminUserId = null;
let selectedAdminImageId = null;
let selectedAdminVoteId = null;
let adminUserKeyword = "";
let adminUserFilter = "all";
let adminImageKeyword = "";
let adminImageFilter = "all";
let adminImageSort = "latest";
let adminVoteKeyword = "";
let adminVoteFilter = "all";
let adminVoteSort = "latest";
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
const adminUsers = [
  {
    id: "1",
    email: "test@watson.com",
    nickname: "유저",
    role: "일반회원",
    verified: true,
    nftCount: 5,
    joinedAt: "2022-10-08 14:27",
    lastLogin: "2026-03-18 09:15",
    status: "정상",
    ip: "192.168.1.x",
    wallet: "0x9d4f...a9D65E",
    walletType: "Web3Auth",
    walletLinkedAt: "2024-04-23",
    voteEligible: true
  },
  {
    id: "2",
    email: "junari@watson.com",
    nickname: "전라이",
    role: "일반회원",
    verified: true,
    nftCount: 2,
    joinedAt: "2022-10-29 13:11",
    lastLogin: "2026-03-18 08:41",
    status: "정상",
    ip: "172.31.25.x",
    wallet: "0xAB58...E12a",
    walletType: "Privy",
    walletLinkedAt: "2024-05-01",
    voteEligible: false
  },
  {
    id: "3",
    email: "artist@watson.com",
    nickname: "표시명",
    role: "일반회원",
    verified: true,
    nftCount: 7,
    joinedAt: "2022-10-18 11:02",
    lastLogin: "2026-03-18 08:31",
    status: "정상",
    ip: "10.31.4.x",
    wallet: "0x12ee...2B91",
    walletType: "Web3Auth",
    walletLinkedAt: "2024-04-20",
    voteEligible: true
  },
  {
    id: "4",
    email: "blocked@watson.com",
    nickname: "이미지",
    role: "일반회원",
    verified: false,
    nftCount: 0,
    joinedAt: "2022-10-18 08:35",
    lastLogin: "2026-03-12 12:56",
    status: "정지",
    ip: "211.204.31.x",
    wallet: "-",
    walletType: "-",
    walletLinkedAt: "-",
    voteEligible: false
  },
  {
    id: "5",
    email: "review@watson.com",
    nickname: "표시명",
    role: "일반회원",
    verified: true,
    nftCount: 3,
    joinedAt: "2022-03-19 16:20",
    lastLogin: "2026-03-17 16:53",
    status: "정상",
    ip: "172.22.9.x",
    wallet: "0x98ad...12f3",
    walletType: "Privy",
    walletLinkedAt: "2024-05-13",
    voteEligible: true
  },
  {
    id: "6",
    email: "admin@watson.com",
    nickname: "관리자",
    role: "관리자",
    verified: true,
    nftCount: 12,
    joinedAt: "2022-06-19 09:03",
    lastLogin: "2026-03-17 17:53",
    status: "정상",
    ip: "10.11.90.x",
    wallet: "0x77a1...9f4d",
    walletType: "Web3Auth",
    walletLinkedAt: "2024-03-02",
    voteEligible: true
  }
];
const adminImages = [
  {
    id: "82401",
    fileName: "풍경_최종.png",
    uploader: "test@watson.com",
    uploadedAt: "2026-02-26",
    status: "allow",
    voteStatus: "진행중",
    thumbClass: "thumb-illustration",
    metrics: { embedding: 12, phash: 5, threshold: 85, decision: "등록 가능" },
    vote: { state: "진행 중", id: "VOTE-82401", yes: 60, no: 40, remain: "D-2" },
    chain: {
      tokenId: "#82401",
      txHash: "0x9a8b...7c6d",
      blockNumber: "18402931",
      mintedAt: "2026-02-26 14:35"
    }
  },
  {
    id: "82396",
    fileName: "캐릭터_A.png",
    uploader: "user@example.com",
    uploadedAt: "2026-02-24",
    status: "review",
    voteStatus: "진행중",
    thumbClass: "thumb-owl",
    metrics: { embedding: 74, phash: 41, threshold: 85, decision: "검토 필요" },
    vote: { state: "진행 중", id: "VOTE-82396", yes: 47, no: 53, remain: "D-1" },
    chain: {
      tokenId: "미발행",
      txHash: "-",
      blockNumber: "-",
      mintedAt: "-"
    }
  },
  {
    id: "82374",
    fileName: "배경이미지.jpg",
    uploader: "admin@watson.com",
    uploadedAt: "2026-02-23",
    status: "block",
    voteStatus: "종료",
    thumbClass: "thumb-window",
    metrics: { embedding: 96, phash: 85, threshold: 85, decision: "등록 차단" },
    vote: { state: "종료", id: "VOTE-82374", yes: 12, no: 88, remain: "종료" },
    chain: {
      tokenId: "차단",
      txHash: "-",
      blockNumber: "-",
      mintedAt: "-"
    }
  },
  {
    id: "82358",
    fileName: "자연풍경.png",
    uploader: "test@watson.com",
    uploadedAt: "2026-02-22",
    status: "allow",
    voteStatus: "진행중",
    thumbClass: "thumb-illustration",
    metrics: { embedding: 16, phash: 11, threshold: 85, decision: "등록 가능" },
    vote: { state: "진행 중", id: "VOTE-82358", yes: 71, no: 29, remain: "D-2" },
    chain: {
      tokenId: "#82358",
      txHash: "0x8f12...ab31",
      blockNumber: "18401291",
      mintedAt: "2026-02-22 13:18"
    }
  }
];
const adminVotes = [
  {
    id: "VOTE-82401",
    imageId: "82401",
    fileName: "풍경_최종.png",
    uploader: "test@watson.com",
    thumbClass: "thumb-illustration",
    status: "in-progress",
    startDate: "2026-02-26",
    endDate: "2026-02-29",
    yes: 60,
    no: 40,
    participants: 1204,
    finalDecision: "미정",
    finalDecisionClass: "pending",
    topSimilarity: "82%",
    note: "이미지 등록 심사가 진행 중입니다."
  },
  {
    id: "VOTE-82338",
    imageId: "82338",
    fileName: "케다터_A.png",
    uploader: "user@example.com",
    thumbClass: "thumb-owl",
    status: "ended",
    startDate: "2026-02-20",
    endDate: "2026-02-23",
    yes: 35,
    no: 65,
    participants: 982,
    finalDecision: "등록 거절",
    finalDecisionClass: "block",
    topSimilarity: "91%",
    note: "유사도 임계값 초과로 등록이 거절되었습니다."
  },
  {
    id: "VOTE-82387",
    imageId: "82387",
    fileName: "배경이미지_시안.png",
    uploader: "test@watson.com",
    thumbClass: "thumb-window",
    status: "ended",
    startDate: "2026-02-23",
    endDate: "2026-02-24",
    yes: 60,
    no: 40,
    participants: 339,
    finalDecision: "등록 가능",
    finalDecisionClass: "success",
    topSimilarity: "64%",
    note: "검토 종료 후 등록 가능으로 확정되었습니다."
  },
  {
    id: "VOTE-82376",
    imageId: "82376",
    fileName: "배경이미지C.png",
    uploader: "admin@watson.com",
    thumbClass: "thumb-window",
    status: "ended",
    startDate: "2026-02-11",
    endDate: "2026-02-13",
    yes: 64,
    no: 36,
    participants: 1327,
    finalDecision: "등록 가능",
    finalDecisionClass: "success",
    topSimilarity: "54%",
    note: "찬성률 우세로 등록 승인되었습니다."
  },
  {
    id: "VOTE-82372",
    imageId: "82372",
    fileName: "숲의_장면_리파인.png",
    uploader: "artist@watson.com",
    thumbClass: "thumb-illustration",
    status: "in-progress",
    startDate: "2026-02-27",
    endDate: "2026-03-01",
    yes: 48,
    no: 52,
    participants: 768,
    finalDecision: "미정",
    finalDecisionClass: "pending",
    topSimilarity: "78%",
    note: "찬반이 근접해 추가 투표가 필요합니다."
  },
  {
    id: "VOTE-82366",
    imageId: "82366",
    fileName: "카드뉴스_타이틀.png",
    uploader: "review@watson.com",
    thumbClass: "thumb-owl",
    status: "ended",
    startDate: "2026-02-15",
    endDate: "2026-02-17",
    yes: 42,
    no: 58,
    participants: 421,
    finalDecision: "등록 거절",
    finalDecisionClass: "block",
    topSimilarity: "88%",
    note: "유사 콘텐츠 다수 탐지로 거절되었습니다."
  }
];
const adminFeedRecords = [
  "1분 전 · 유저 test@watson.com 소속 인증 승인",
  "5분 전 · 새 이미지 투표 개시 (VOTE-82401)",
  "7분 전 · 블록체인 토큰 발행 완료 (#82401)",
  "10분 전 · 보류 이미지 검토 요청 접수 (캐릭터_A.png)",
  "14분 전 · 관리자 admin@watson.com 설정 변경"
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
const verifyStageConfig = [
  { key: "detect", label: "워터마크 검출 시도", start: 0, end: 35 },
  { key: "token", label: "토큰 연계 정보 확인", start: 35, end: 65 },
  { key: "similar", label: "유사 이미지 탐색", start: 65, end: 90 },
  { key: "decision", label: "최종 검증 결과 생성", start: 90, end: 100 }
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

function formatCount(value = 0) {
  return Number(value || 0).toLocaleString("ko-KR");
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getAdminStatusClass(status = "") {
  if (status === "allow" || status === "ALLOW") return "allow";
  if (status === "review" || status === "REVIEW") return "review";
  if (status === "block" || status === "BLOCK") return "block";
  if (status === "정상" || status === "활성") return "success";
  return "pending";
}

function getAdminStatusLabel(status = "") {
  if (status === "allow") return "ALLOW";
  if (status === "review") return "REVIEW";
  if (status === "block") return "BLOCK";
  return status || "대기";
}

function renderDefinitionList(container, rows) {
  if (!container) return;
  container.innerHTML = rows
    .map(
      (row) => `
        <div>
          <dt>${escapeHtml(row.label)}</dt>
          <dd>${escapeHtml(row.value)}</dd>
        </div>
      `
    )
    .join("");
}

function applyThumbClass(element, thumbClass) {
  if (!element) return;
  element.classList.remove("thumb-illustration", "thumb-owl", "thumb-window");
  element.classList.add(thumbClass || "thumb-illustration");
}

function renderAdminDashboard() {
  if (adminTotalUsers) adminTotalUsers.textContent = formatCount(28451);
  if (adminVerifiedUsers) adminVerifiedUsers.textContent = `${formatCount(21890)}명`;
  if (adminEligibleUsers) adminEligibleUsers.textContent = `${formatCount(12300)}명`;
  if (adminTotalImages) adminTotalImages.textContent = formatCount(1250911);
  if (adminTodayUploads) adminTodayUploads.textContent = `${formatCount(18940)}장`;
  if (adminVotingActive) adminVotingActive.textContent = `${formatCount(21)}건`;
  if (adminVotingClosed) adminVotingClosed.textContent = `${formatCount(5)}건`;
  if (adminPendingReview) adminPendingReview.textContent = `${formatCount(18)}건`;

  if (adminActivityFeed) {
    adminActivityFeed.innerHTML = adminFeedRecords.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  }
}

function parseDateToTime(value = "") {
  const normalized = String(value || "").trim().replaceAll(".", "-");
  const time = new Date(normalized).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function getFilteredAdminUsers() {
  const keyword = adminUserKeyword.trim().toLowerCase();
  const filter = adminUserFilter || "all";

  return adminUsers.filter((user) => {
    const matchKeyword = !keyword
      ? true
      : [user.id, user.email, user.nickname, user.role].some((value) =>
          String(value).toLowerCase().includes(keyword)
        );

    let matchFilter = true;
    if (filter === "verified") matchFilter = Boolean(user.verified);
    else if (filter === "unverified") matchFilter = !user.verified;
    else if (filter === "admin") matchFilter = user.role === "관리자";
    else if (filter === "active") matchFilter = user.status === "정상";
    else if (filter === "suspended") matchFilter = user.status === "정지";

    return matchKeyword && matchFilter;
  });
}

function renderAdminUserTable() {
  if (!adminUserTableBody) return;
  const rows = getFilteredAdminUsers();

  if (!rows.length) {
    adminUserTableBody.innerHTML =
      '<tr><td colspan="10" style="text-align:center;color:#6b7d9d;">검색 결과가 없습니다.</td></tr>';
    return;
  }

  adminUserTableBody.innerHTML = rows
    .map((user) => {
      const verifiedText = user.verified ? "완료" : "미인증";
      const verifiedClass = user.verified ? "success" : "pending";
      const userStatusClass = user.status === "정지" ? "block" : "success";
      return `
        <tr>
          <td>${escapeHtml(user.id)}</td>
          <td>${escapeHtml(user.email)}</td>
          <td>${escapeHtml(user.nickname)}</td>
          <td><span class="admin-status-pill ${user.role === "관리자" ? "admin" : "member"}">${escapeHtml(user.role || "일반회원")}</span></td>
          <td><span class="admin-status-pill ${verifiedClass}">${verifiedText}</span></td>
          <td>${escapeHtml(String(user.nftCount))}</td>
          <td>${escapeHtml(user.joinedAt)}</td>
          <td>${escapeHtml(user.lastLogin)}</td>
          <td><span class="admin-status-pill ${userStatusClass}">${escapeHtml(user.status)}</span></td>
          <td><button class="admin-row-btn" type="button" data-admin-open-user="${escapeHtml(user.id)}">보기</button></td>
        </tr>
      `;
    })
    .join("");
}

function renderAdminUserDetail(userId) {
  const user = adminUsers.find((item) => item.id === String(userId)) || adminUsers[0];
  if (!user) return;
  selectedAdminUserId = user.id;

  if (adminUserDetailEmail) adminUserDetailEmail.textContent = user.email;
  if (adminUserDetailStatus) {
    adminUserDetailStatus.textContent = user.status === "정지" ? "정지" : "활성";
    adminUserDetailStatus.classList.remove("success", "block", "pending");
    adminUserDetailStatus.classList.add(user.status === "정지" ? "block" : "success");
  }

  renderDefinitionList(adminUserBasicInfo, [
    { label: "이메일", value: user.email },
    { label: "닉네임", value: user.nickname },
    { label: "권한", value: user.role || "일반회원" },
    { label: "유저 ID", value: user.id },
    { label: "가입일", value: user.joinedAt },
    { label: "마지막 로그인", value: user.lastLogin },
    { label: "최근 로그인 IP", value: user.ip }
  ]);

  if (adminUserRoleSelect) {
    adminUserRoleSelect.value = user.role === "관리자" ? "관리자" : "일반회원";
  }
  if (adminUserStatusSelect) {
    adminUserStatusSelect.value = user.status === "정지" ? "정지" : "정상";
  }

  renderDefinitionList(adminUserAuthInfo, [
    { label: "본인인증", value: user.verified ? "완료" : "미인증" },
    { label: "보유 NFT", value: `${user.nftCount}개` },
    { label: "투표 권한", value: user.voteEligible ? "활성" : "대기" },
    { label: "계정 상태", value: user.status }
  ]);

  renderDefinitionList(adminUserWalletInfo, [
    { label: "지갑 주소", value: user.wallet },
    { label: "연결 방식", value: user.walletType },
    { label: "연결일", value: user.walletLinkedAt }
  ]);

  const relatedLogs = adminImages
    .filter((image) => image.uploader === user.email)
    .slice(0, 4)
    .map(
      (image) => `
        <tr>
          <td>${escapeHtml(image.fileName)}</td>
          <td>${escapeHtml(getAdminStatusLabel(image.status))}</td>
          <td>${escapeHtml(image.uploadedAt)}</td>
        </tr>
      `
    )
    .join("");

  if (adminUserLogTable) {
    adminUserLogTable.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>파일명</th>
            <th>상태</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          ${
            relatedLogs ||
            '<tr><td colspan="3" style="color:#6b7d9d;">최근 로그가 없습니다.</td></tr>'
          }
        </tbody>
      </table>
    `;
  }
}

function getFilteredAdminImages() {
  const keyword = adminImageKeyword.trim().toLowerCase();
  const filtered = adminImages.filter((image) => {
    const matchKeyword = !keyword
      ? true
      : [image.fileName, image.uploader].some((value) =>
          String(value).toLowerCase().includes(keyword)
        );
    const matchFilter = adminImageFilter === "all" ? true : image.status === adminImageFilter;
    return matchKeyword && matchFilter;
  });

  return filtered.sort((a, b) => {
    if (adminImageSort === "oldest") {
      return parseDateToTime(a.uploadedAt) - parseDateToTime(b.uploadedAt);
    }
    if (adminImageSort === "name") {
      return a.fileName.localeCompare(b.fileName, "ko");
    }
    return parseDateToTime(b.uploadedAt) - parseDateToTime(a.uploadedAt);
  });
}

function renderAdminImageTable() {
  if (!adminImageTableBody) return;
  const rows = getFilteredAdminImages();

  if (!rows.length) {
    adminImageTableBody.innerHTML =
      '<tr><td colspan="7" style="text-align:center;color:#6b7d9d;">검색 결과가 없습니다.</td></tr>';
    return;
  }

  adminImageTableBody.innerHTML = rows
    .map((image) => {
      const voteClass = image.voteStatus === "진행중" ? "allow" : "pending";
      return `
        <tr>
          <td><div class="admin-thumb ${escapeHtml(image.thumbClass)}" aria-hidden="true"></div></td>
          <td>${escapeHtml(image.fileName)}</td>
          <td>${escapeHtml(image.uploader)}</td>
          <td>${escapeHtml(image.uploadedAt)}</td>
          <td><span class="admin-status-pill ${getAdminStatusClass(image.status)}">${getAdminStatusLabel(image.status)}</span></td>
          <td><span class="admin-status-pill ${voteClass}">${escapeHtml(image.voteStatus)}</span></td>
          <td><button class="admin-row-btn" type="button" data-admin-open-image="${escapeHtml(image.id)}">보기</button></td>
        </tr>
      `;
    })
    .join("");
}

function renderAdminImageMetrics(metrics) {
  if (!adminImageMetrics) return;
  const rows = [
    { label: "Embedding 유사도", value: `${metrics.embedding}%`, key: "embedding", className: "" },
    { label: "pHash 유사도", value: `${metrics.phash}%`, key: "phash", className: "" },
    { label: "Threshold 결과", value: `${metrics.threshold}%`, key: "threshold", className: "threshold" }
  ];

  adminImageMetrics.innerHTML = rows
    .map(
      (row) => `
        <div class="admin-metric-row">
          <span>${row.label}</span>
          <div class="admin-metric-track ${row.className}"><i style="--value:${row.value}"></i></div>
          <strong>${row.value}</strong>
        </div>
      `
    )
    .join("");
}

function renderAdminImageDetail(imageId) {
  const image = adminImages.find((item) => item.id === String(imageId)) || adminImages[0];
  if (!image) return;
  selectedAdminImageId = image.id;

  if (adminImageDetailName) adminImageDetailName.textContent = image.fileName;
  if (adminImageDetailStatus) {
    adminImageDetailStatus.textContent = getAdminStatusLabel(image.status);
    adminImageDetailStatus.classList.remove("allow", "review", "block");
    adminImageDetailStatus.classList.add(getAdminStatusClass(image.status));
  }

  applyThumbClass(adminImageOriginalThumb, image.thumbClass);
  applyThumbClass(adminImageWatermarkedThumb, image.thumbClass);
  renderAdminImageMetrics(image.metrics);

  renderDefinitionList(adminImageVoteInfo, [
    { label: "투표 상태", value: image.vote.state },
    { label: "투표 ID", value: image.vote.id },
    { label: "찬성 비율", value: `${image.vote.yes}%` },
    { label: "반대 비율", value: `${image.vote.no}%` },
    { label: "남은 기간", value: image.vote.remain }
  ]);

  renderDefinitionList(adminImageChainInfo, [
    { label: "Token ID", value: image.chain.tokenId },
    { label: "Transaction Hash", value: image.chain.txHash },
    { label: "블록 번호", value: image.chain.blockNumber },
    { label: "발행일", value: image.chain.mintedAt },
    { label: "AI 판정", value: image.metrics.decision }
  ]);
}

function getAdminVoteStatusLabel(status = "") {
  return status === "in-progress" ? "진행중" : "종료";
}

function getAdminVoteStatusClass(status = "") {
  return status === "in-progress" ? "allow" : "pending";
}

function getFilteredAdminVotes() {
  const keyword = adminVoteKeyword.trim().toLowerCase();
  const filtered = adminVotes.filter((vote) => {
    const matchKeyword = !keyword
      ? true
      : [vote.id, vote.fileName, vote.uploader].some((value) =>
          String(value).toLowerCase().includes(keyword)
        );
    const matchFilter = adminVoteFilter === "all" ? true : vote.status === adminVoteFilter;
    return matchKeyword && matchFilter;
  });

  return filtered.sort((a, b) => {
    if (adminVoteSort === "oldest") {
      return parseDateToTime(a.startDate) - parseDateToTime(b.startDate);
    }
    if (adminVoteSort === "participants-desc") {
      return b.participants - a.participants;
    }
    if (adminVoteSort === "approval-desc") {
      return b.yes - a.yes;
    }
    return parseDateToTime(b.startDate) - parseDateToTime(a.startDate);
  });
}

function renderAdminVoteTable() {
  if (!adminVoteTableBody) return;
  const rows = getFilteredAdminVotes();

  if (!rows.length) {
    adminVoteTableBody.innerHTML =
      '<tr><td colspan="10" style="text-align:center;color:#6b7d9d;">검색 결과가 없습니다.</td></tr>';
    return;
  }

  adminVoteTableBody.innerHTML = rows
    .map(
      (vote) => `
        <tr>
          <td>
            <button class="admin-link-btn" type="button" data-admin-open-vote="${escapeHtml(vote.id)}">
              ${escapeHtml(vote.id)}
            </button>
          </td>
          <td>
            <div class="admin-list-media">
              <div class="admin-thumb ${escapeHtml(vote.thumbClass)}" aria-hidden="true"></div>
              <div class="admin-list-text">
                <strong>${escapeHtml(vote.fileName)}</strong>
                <span>${escapeHtml(vote.uploader)}</span>
              </div>
            </div>
          </td>
          <td><span class="admin-status-pill ${getAdminVoteStatusClass(vote.status)}">${getAdminVoteStatusLabel(vote.status)}</span></td>
          <td>${escapeHtml(vote.startDate)}</td>
          <td>${escapeHtml(vote.endDate)}</td>
          <td>${escapeHtml(String(vote.yes))}%</td>
          <td>${escapeHtml(String(vote.no))}%</td>
          <td>${escapeHtml(formatCount(vote.participants))}명</td>
          <td><span class="admin-status-pill ${escapeHtml(vote.finalDecisionClass || "pending")}">${escapeHtml(vote.finalDecision)}</span></td>
          <td><button class="admin-row-btn" type="button" data-admin-open-vote="${escapeHtml(vote.id)}">보기</button></td>
        </tr>
      `
    )
    .join("");
}

function renderAdminVoteDetail(voteId) {
  const vote = adminVotes.find((item) => item.id === String(voteId)) || adminVotes[0];
  if (!vote) return;
  selectedAdminVoteId = vote.id;

  if (adminVoteDetailId) adminVoteDetailId.textContent = vote.id;
  if (adminVoteDetailStatus) {
    adminVoteDetailStatus.textContent = getAdminVoteStatusLabel(vote.status);
    adminVoteDetailStatus.classList.remove("allow", "review", "block", "success", "pending");
    adminVoteDetailStatus.classList.add(getAdminVoteStatusClass(vote.status));
  }

  applyThumbClass(adminVoteDetailThumb, vote.thumbClass);

  renderDefinitionList(adminVoteImageInfo, [
    { label: "파일명", value: vote.fileName },
    { label: "이미지 ID", value: vote.imageId },
    { label: "업로더", value: vote.uploader },
    { label: "유사도 최고값", value: vote.topSimilarity }
  ]);

  renderDefinitionList(adminVoteInfo, [
    { label: "진행상태", value: getAdminVoteStatusLabel(vote.status) },
    { label: "시작일", value: vote.startDate },
    { label: "종료일", value: vote.endDate },
    { label: "참여수", value: `${formatCount(vote.participants)}명` },
    { label: "최종 판정", value: vote.finalDecision }
  ]);

  if (adminVoteYesBar) adminVoteYesBar.style.setProperty("--value", `${vote.yes}%`);
  if (adminVoteNoBar) adminVoteNoBar.style.setProperty("--value", `${vote.no}%`);
  if (adminVoteYesText) adminVoteYesText.textContent = `${vote.yes}%`;
  if (adminVoteNoText) adminVoteNoText.textContent = `${vote.no}%`;

  if (adminVoteRelatedTableBody) {
    adminVoteRelatedTableBody.innerHTML = adminVotes
      .map(
        (item) => `
          <tr>
            <td>${escapeHtml(item.id)}</td>
            <td>${escapeHtml(item.fileName)}</td>
            <td><span class="admin-status-pill ${getAdminVoteStatusClass(item.status)}">${getAdminVoteStatusLabel(item.status)}</span></td>
            <td>${escapeHtml(item.startDate)}</td>
            <td>${escapeHtml(item.endDate)}</td>
            <td>${escapeHtml(String(item.yes))}%</td>
            <td>${escapeHtml(String(item.no))}%</td>
            <td>${escapeHtml(formatCount(item.participants))}명</td>
            <td><span class="admin-status-pill ${escapeHtml(item.finalDecisionClass || "pending")}">${escapeHtml(item.finalDecision)}</span></td>
          </tr>
        `
      )
      .join("");
  }
}

function updateAdminUserRole() {
  if (!adminUserRoleSelect) return;
  const user = adminUsers.find((item) => item.id === String(selectedAdminUserId));
  if (!user) return;

  const nextRole = adminUserRoleSelect.value === "관리자" ? "관리자" : "일반회원";
  if (user.role === nextRole) {
    showLoginToast("현재 권한과 동일합니다.", 1500);
    return;
  }

  user.role = nextRole;
  renderAdminUserDetail(user.id);
  renderAdminUserTable();
  showLoginToast(`권한이 ${nextRole}(으)로 변경되었습니다.`, 1700);
}

function updateAdminUserStatus() {
  if (!adminUserStatusSelect) return;
  const user = adminUsers.find((item) => item.id === String(selectedAdminUserId));
  if (!user) return;

  const nextStatus = adminUserStatusSelect.value === "정지" ? "정지" : "정상";
  if (user.status === nextStatus) {
    showLoginToast("현재 상태와 동일합니다.", 1500);
    return;
  }

  user.status = nextStatus;
  if (nextStatus === "정지") {
    user.voteEligible = false;
  } else {
    user.voteEligible = Boolean(user.verified && user.nftCount >= minimumVoteTokenCount);
  }

  renderAdminUserDetail(user.id);
  renderAdminUserTable();
  showLoginToast(`계정 상태가 ${nextStatus}(으)로 변경되었습니다.`, 1700);
}

function setAdminView(view) {
  const viewMap = {
    dashboard: "dashboard",
    users: "users",
    userDetail: "userDetail",
    images: "images",
    imageDetail: "imageDetail",
    votes: "votes",
    voteDetail: "voteDetail"
  };
  const safeView = viewMap[view] ? view : "dashboard";
  currentAdminView = safeView;

  Object.entries(adminViews).forEach(([key, node]) => {
    if (!node) return;
    const isTarget = key === safeView;
    node.hidden = !isTarget;
    node.classList.toggle("is-active", isTarget);
  });

  const navFocusMap = {
    userDetail: "users",
    imageDetail: "images",
    voteDetail: "votes"
  };
  const navFocus = navFocusMap[safeView] || safeView;
  adminViewButtons.forEach((button) => {
    if (!button.classList.contains("admin-nav-btn")) return;
    button.classList.toggle("is-active", button.dataset.adminView === navFocus);
  });

  const titleMap = {
    dashboard: "운영 현황",
    users: "유저 관리",
    userDetail: "유저 상세",
    images: "이미지 관리",
    imageDetail: "이미지 상세",
    votes: "투표 관리",
    voteDetail: "투표 상세"
  };
  if (adminViewTitle) adminViewTitle.textContent = titleMap[safeView] || "관리자";
}

function setupAdminEvents() {
  adminViewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.adminView || "dashboard";
      if (target === "userDetail") {
        renderAdminUserDetail(selectedAdminUserId || adminUsers[0]?.id);
      }
      if (target === "imageDetail") {
        renderAdminImageDetail(selectedAdminImageId || adminImages[0]?.id);
      }
      if (target === "voteDetail") {
        renderAdminVoteDetail(selectedAdminVoteId || adminVotes[0]?.id);
      }
      if (target === "votes") {
        renderAdminVoteTable();
      }
      setAdminView(target);
    });
  });

  adminUserSearchBtn?.addEventListener("click", () => {
    adminUserKeyword = adminUserSearchInput?.value || "";
    adminUserFilter = adminUserTypeFilter?.value || "all";
    renderAdminUserTable();
  });

  adminUserSearchInput?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    adminUserKeyword = adminUserSearchInput?.value || "";
    adminUserFilter = adminUserTypeFilter?.value || "all";
    renderAdminUserTable();
  });

  adminUserApplyBtn?.addEventListener("click", () => {
    adminUserFilter = adminUserTypeFilter?.value || "all";
    renderAdminUserTable();
  });

  adminUserTypeFilter?.addEventListener("change", () => {
    adminUserFilter = adminUserTypeFilter.value || "all";
    renderAdminUserTable();
  });

  adminUserTableBody?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const openButton = target.closest("[data-admin-open-user]");
    if (!openButton) return;
    const userId = openButton.getAttribute("data-admin-open-user");
    if (!userId) return;
    renderAdminUserDetail(userId);
    setAdminView("userDetail");
  });

  adminBackToUsersBtn?.addEventListener("click", () => {
    setAdminView("users");
  });

  adminUserRoleUpdateBtn?.addEventListener("click", updateAdminUserRole);
  adminUserRoleSelect?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      updateAdminUserRole();
    }
  });
  adminUserStatusUpdateBtn?.addEventListener("click", updateAdminUserStatus);
  adminUserStatusSelect?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      updateAdminUserStatus();
    }
  });

  adminImageSearchBtn?.addEventListener("click", () => {
    adminImageKeyword = adminImageSearchInput?.value || "";
    adminImageFilter = adminImageStatusFilter?.value || "all";
    adminImageSort = adminImageSortFilter?.value || "latest";
    renderAdminImageTable();
  });

  adminImageSearchInput?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    adminImageKeyword = adminImageSearchInput?.value || "";
    adminImageFilter = adminImageStatusFilter?.value || "all";
    adminImageSort = adminImageSortFilter?.value || "latest";
    renderAdminImageTable();
  });

  adminImageStatusFilter?.addEventListener("change", () => {
    adminImageFilter = adminImageStatusFilter.value || "all";
    renderAdminImageTable();
  });

  adminImageSortFilter?.addEventListener("change", () => {
    adminImageSort = adminImageSortFilter.value || "latest";
    renderAdminImageTable();
  });

  adminImageTableBody?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const openButton = target.closest("[data-admin-open-image]");
    if (!openButton) return;
    const imageId = openButton.getAttribute("data-admin-open-image");
    if (!imageId) return;
    renderAdminImageDetail(imageId);
    setAdminView("imageDetail");
  });

  adminBackToImagesBtn?.addEventListener("click", () => {
    setAdminView("images");
  });

  adminVoteSearchBtn?.addEventListener("click", () => {
    adminVoteKeyword = adminVoteSearchInput?.value || "";
    adminVoteFilter = adminVoteStatusFilter?.value || "all";
    adminVoteSort = adminVoteSortFilter?.value || "latest";
    renderAdminVoteTable();
  });

  adminVoteSearchInput?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    adminVoteKeyword = adminVoteSearchInput?.value || "";
    adminVoteFilter = adminVoteStatusFilter?.value || "all";
    adminVoteSort = adminVoteSortFilter?.value || "latest";
    renderAdminVoteTable();
  });

  adminVoteStatusFilter?.addEventListener("change", () => {
    adminVoteFilter = adminVoteStatusFilter.value || "all";
    renderAdminVoteTable();
  });

  adminVoteSortFilter?.addEventListener("change", () => {
    adminVoteSort = adminVoteSortFilter.value || "latest";
    renderAdminVoteTable();
  });

  adminVoteTableBody?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const openButton = target.closest("[data-admin-open-vote]");
    if (!openButton) return;
    const voteId = openButton.getAttribute("data-admin-open-vote");
    if (!voteId) return;
    renderAdminVoteDetail(voteId);
    setAdminView("voteDetail");
  });

  adminBackToVotesBtn?.addEventListener("click", () => {
    setAdminView("votes");
  });

  const openSiteButton = document.querySelector("[data-admin-open-site]");
  openSiteButton?.addEventListener("click", () => {
    setActiveTab("home");
  });
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

  if (watermarkCompareLayout) {
    watermarkCompareLayout.classList.remove("mode-portrait", "mode-landscape", "mode-square");
    watermarkCompareLayout.classList.add(`mode-${mode}`);
  }
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

function stopVerifySimulation() {
  if (!verifyTimer) return;
  clearInterval(verifyTimer);
  verifyTimer = null;
}

function setVerifyView(mode = "ready") {
  if (verifyReadyView) verifyReadyView.hidden = mode !== "ready";
  if (verifyRunningView) verifyRunningView.hidden = mode !== "running";
  if (verifySuccessView) verifySuccessView.hidden = mode !== "success";
  if (verifyFailView) verifyFailView.hidden = mode !== "fail";
}

function getVerifyStageStatusByScenario(progress, stageKey, scenario = "success") {
  const clampedProgress = Math.max(0, Math.min(100, Number(progress) || 0));
  const mode = scenario === "fail" ? "fail" : "success";

  if (mode === "success") {
    if (clampedProgress < 35) {
      if (stageKey === "detect") return "running";
      return "pending";
    }
    if (clampedProgress < 75) {
      if (stageKey === "detect") return "done";
      if (stageKey === "token") return "running";
      if (stageKey === "similar") return "skipped";
      return "pending";
    }
    if (clampedProgress < 100) {
      if (stageKey === "detect" || stageKey === "token") return "done";
      if (stageKey === "decision") return "running";
      if (stageKey === "similar") return "skipped";
    }
    if (clampedProgress >= 100) {
      if (stageKey === "similar") return "skipped";
      return "done";
    }
  }

  if (clampedProgress < 30) {
    if (stageKey === "detect") return "running";
    return "pending";
  }
  if (clampedProgress < 55) {
    if (stageKey === "detect") return "failed";
    if (stageKey === "token") return "skipped";
    if (stageKey === "similar") return "running";
    return "pending";
  }
  if (clampedProgress < 100) {
    if (stageKey === "detect") return "failed";
    if (stageKey === "token") return "skipped";
    if (stageKey === "similar") return "done";
    if (stageKey === "decision") return "running";
  }
  if (clampedProgress >= 100) {
    if (stageKey === "detect") return "failed";
    if (stageKey === "token") return "skipped";
    return "done";
  }

  return "pending";
}

function getVerifyStageStatusLabel(status) {
  if (status === "done") return "완료";
  if (status === "running") return "진행 중";
  if (status === "failed") return "실패";
  if (status === "skipped") return "건너뜀";
  return "대기";
}

function setVerifyScenario(mode = "success") {
  verifyScenario = mode === "fail" ? "fail" : "success";
  verifyScenarioButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.verifyScenario === verifyScenario);
  });
}

function renderVerifyState(progress, forcedStatusMap = null) {
  const clampedProgress = Math.max(0, Math.min(100, Number(progress) || 0));
  verifyProgressValueInternal = clampedProgress;

  if (verifyProgressRing) {
    verifyProgressRing.style.setProperty("--progress", clampedProgress.toFixed(2));
  }
  if (verifyProgressValue) {
    verifyProgressValue.textContent = `${Math.round(clampedProgress)}%`;
  }

  let stageText = "워터마크 검출 시도를 진행 중입니다.";

  verifyStepItems.forEach((item, index) => {
    const stage = verifyStageConfig[index];
    if (!stage) return;
    let status =
      forcedStatusMap?.[stage.key] || getVerifyStageStatusByScenario(clampedProgress, stage.key, verifyScenario);

    item.classList.toggle("is-done", status === "done");
    item.classList.toggle("is-running", status === "running");
    item.classList.toggle("is-pending", status === "pending");
    item.classList.toggle("is-failed", status === "failed");
    item.classList.toggle("is-skipped", status === "skipped");

    const stateNode = item.querySelector(".verify-step-state");
    if (stateNode) stateNode.textContent = `[${getVerifyStageStatusLabel(status)}]`;

    if (status === "running") stageText = `${stage.label}을(를) 진행 중입니다.`;
    if (status === "failed" && stage.key === "detect") {
      stageText = "워터마크 검출 실패. 유사 이미지 탐색 단계로 전환했습니다.";
    }
  });

  if (!forcedStatusMap && verifyScenario === "success") {
    if (clampedProgress >= 35 && clampedProgress < 75) {
      stageText = "워터마크 검출 성공. 토큰 연계 정보를 확인 중입니다.";
    } else if (clampedProgress >= 75 && clampedProgress < 100) {
      stageText = "검증 결과를 정리하고 있습니다.";
    }
  }

  if (!forcedStatusMap && verifyScenario === "fail") {
    if (clampedProgress >= 30 && clampedProgress < 55) {
      stageText = "워터마크 검출 실패. 유사 이미지 탐색을 진행 중입니다.";
    } else if (clampedProgress >= 55 && clampedProgress < 100) {
      stageText = "유사도 분석 결과를 바탕으로 최종 검증 결과를 생성 중입니다.";
    }
  }

  if (clampedProgress >= 100 && !forcedStatusMap) {
    stageText =
      verifyScenario === "success"
        ? "워터마크 검출 및 토큰 연계 확인이 완료되었습니다."
        : "워터마크 검출 실패 후 유사 이미지 탐색이 완료되었습니다.";
  }

  if (verifyStatusLine) verifyStatusLine.textContent = stageText;
}

function getCurrentUploaderDisplayName() {
  if (isLoggedIn && userNickname?.textContent) {
    return userNickname.textContent.trim();
  }
  return "게스트";
}

function renderVerifyCandidateMeta() {
  if (verifyCandidateFileName) verifyCandidateFileName.textContent = verifyCandidateMeta.fileName;
  if (verifyCandidateOwner) verifyCandidateOwner.textContent = verifyCandidateMeta.owner;
  if (verifyCandidateDate) verifyCandidateDate.textContent = verifyCandidateMeta.registeredAt;
}

function renderVerifySuccessToken(record) {
  if (!verifySuccessTokenInfo) return;
  const uploader = verifyUploaderName?.textContent?.trim() || getCurrentUploaderDisplayName();
  const registeredAt = verifyRegisteredAt?.textContent?.trim() || formatKoreanDateTime(new Date());
  const rows = [
    { label: "검증자", value: uploader },
    { label: "검증 시각", value: registeredAt },
    { label: "Token ID", value: record.tokenId },
    { label: "네트워크", value: record.network },
    { label: "Content Hash", value: record.contentHash },
    { label: "Transaction Hash", value: record.txHash },
    { label: "체인 기록 시각", value: record.mintedAt }
  ];

  verifySuccessTokenInfo.innerHTML = rows
    .map(
      (row) => `
        <div>
          <dt>${escapeHtml(row.label)}</dt>
          <dd>${escapeHtml(row.value)}</dd>
        </div>
      `
    )
    .join("");
}

function renderVerifyFailInfo() {
  if (!verifyFailMetrics) return;
  verifyFailMetrics.innerHTML = `
    <div class="verify-fail-metric">
      <span>워터마크 검출</span>
      <strong>실패</strong>
    </div>
    <div class="verify-fail-metric">
      <span>유사도(코사인)</span>
      <strong>0.8124 (81.2%)</strong>
    </div>
    <div class="verify-fail-metric">
      <span>pHash Distance</span>
      <strong>5 / Threshold 8</strong>
    </div>
    <div class="verify-fail-metric">
      <span>최종 판단</span>
      <strong>서비스 DB 유사 이미지 후보 1건 발견</strong>
    </div>
  `;
}

function showVerifyResult(mode = verifyScenario) {
  const finalMode = mode === "fail" ? "fail" : "success";
  setVerifyScenario(finalMode);
  const imageSrc = verifyPreviewImage?.src || "";

  if (finalMode === "success") {
    setVerifyView("success");
    if (verifySuccessImage) verifySuccessImage.src = imageSrc;
    const fileName = verifyFileName?.textContent || "verify_sample.png";
    const tokenRecord = createMockMintRecord(fileName);
    renderVerifySuccessToken(tokenRecord);
    showLoginToast("저작물 검증이 완료되었습니다.", 1800);
    return;
  }

  setVerifyView("fail");
  if (verifyFailSourceImage) verifyFailSourceImage.src = imageSrc;
  if (verifyFailCandidateImage) {
    verifyFailCandidateImage.src = mockCandidateImageUrl || imageSrc;
  }
  renderVerifyCandidateMeta();
  renderVerifyFailInfo();
  showLoginToast("워터마크 검출 실패. 유사 이미지 탐색 결과를 확인하세요.", 2100);
}

function startVerifySimulation() {
  if (!verifyDropzone?.classList.contains("has-file")) return;
  stopVerifySimulation();
  setVerifyView("running");
  renderVerifyState(0);

  const totalDurationMs = 7200;
  const tickMs = 160;
  const baseStep = 100 / (totalDurationMs / tickMs);
  verifyProgressValueInternal = 0;

  verifyTimer = setInterval(() => {
    const jitter = Math.random() * 1.05;
    verifyProgressValueInternal = Math.min(100, verifyProgressValueInternal + baseStep + jitter);
    renderVerifyState(verifyProgressValueInternal);

    if (verifyProgressValueInternal >= 100) {
      stopVerifySimulation();
      showVerifyResult(verifyScenario);
    }
  }, tickMs);
}

function setVerifyState(file) {
  if (!verifyDropzone || !verifyEmpty || !verifyContent) return;
  if (!file) {
    stopVerifySimulation();
    verifyDropzone.classList.remove("has-file");
    verifyEmpty.hidden = false;
    verifyContent.hidden = true;
    setVerifyView("ready");
    renderVerifyState(0);
    if (verifyPreviewImage) verifyPreviewImage.removeAttribute("src");
    if (verifyRunningImage) verifyRunningImage.removeAttribute("src");
    if (verifySuccessImage) verifySuccessImage.removeAttribute("src");
    if (verifyFailSourceImage) verifyFailSourceImage.removeAttribute("src");
    if (verifyFailCandidateImage) verifyFailCandidateImage.removeAttribute("src");
    if (verifyFileName) verifyFileName.textContent = "sample.png";
    if (verifyFileMeta) verifyFileMeta.textContent = "0 KB · 준비 완료";
    if (verifyUploaderName) verifyUploaderName.textContent = getCurrentUploaderDisplayName();
    if (verifyRegisteredAt) verifyRegisteredAt.textContent = "-";
    verifyCandidateMeta = {
      fileName: "concept_scene.jpg",
      owner: "artist@verimarka.com",
      registeredAt: "2026.03.18 16:05"
    };
    renderVerifyCandidateMeta();
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

  if (verifyPreviewUrl) {
    URL.revokeObjectURL(verifyPreviewUrl);
    verifyPreviewUrl = null;
  }

  verifyPreviewUrl = URL.createObjectURL(file);
  verifyDropzone.classList.add("has-file");
  verifyEmpty.hidden = true;
  verifyContent.hidden = false;
  setVerifyView("ready");
  renderVerifyState(0);

  if (verifyPreviewImage) verifyPreviewImage.src = verifyPreviewUrl;
  if (verifyRunningImage) verifyRunningImage.src = verifyPreviewUrl;
  if (verifySuccessImage) verifySuccessImage.src = verifyPreviewUrl;
  if (verifyFailSourceImage) verifyFailSourceImage.src = verifyPreviewUrl;
  if (verifyFailCandidateImage) verifyFailCandidateImage.src = mockCandidateImageUrl || verifyPreviewUrl;
  const uploadedAt = formatKoreanDateTime(new Date());
  const uploader = getCurrentUploaderDisplayName();

  if (verifyFileName) verifyFileName.textContent = file.name;
  if (verifyFileMeta) {
    verifyFileMeta.textContent = `${formatFileSize(file.size)} · 준비 완료`;
  }
  if (verifyUploaderName) verifyUploaderName.textContent = uploader;
  if (verifyRegisteredAt) verifyRegisteredAt.textContent = uploadedAt;
  renderVerifyCandidateMeta();
  showLoginToast("검증 이미지 업로드가 완료되었습니다.", 1500);
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

window.applyVerificationProgress = (payload) => {
  const progress = Number(payload?.progress);
  if (!Number.isFinite(progress)) return;
  stopVerifySimulation();
  const isFinished = progress >= 100 || payload?.phase === "result";
  const payloadMode = payload?.resultMode === "fail" ? "fail" : "success";
  setVerifyScenario(payloadMode);

  if (isFinished) {
    renderVerifyState(100, payload?.stageStatus ?? null);
    showVerifyResult(payloadMode);
    return;
  }

  setVerifyView("running");
  renderVerifyState(progress, payload?.stageStatus ?? null);
};

window.applyVerificationResult = (mode = "success") => {
  stopVerifySimulation();
  const normalizedMode = mode === "fail" ? "fail" : "success";
  setVerifyScenario(normalizedMode);
  renderVerifyState(100);
  showVerifyResult(normalizedMode);
};

window.applyVerificationCandidate = (candidate) => {
  if (!candidate) return;
  const candidateUrl = candidate.imageUrl || candidate.url || "";
  const candidateName = candidate.fileName || candidate.name || verifyCandidateMeta.fileName;
  const candidateOwner = candidate.owner || candidate.uploader || candidate.registeredBy || verifyCandidateMeta.owner;
  const candidateDate =
    candidate.registeredAt || candidate.createdAt || candidate.uploadedAt || verifyCandidateMeta.registeredAt;

  verifyCandidateMeta = {
    fileName: candidateName,
    owner: candidateOwner,
    registeredAt: candidateDate
  };
  renderVerifyCandidateMeta();

  if (candidateUrl) {
    mockCandidateImageUrl = candidateUrl;
    if (verifyFailCandidateImage) verifyFailCandidateImage.src = candidateUrl;
  }
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

verifyDropzone?.addEventListener("click", (event) => {
  const isActionButton = event.target instanceof Element
    ? Boolean(event.target.closest("button"))
    : false;
  const isFileSelected = verifyDropzone.classList.contains("has-file");
  if (!isActionButton && !isFileSelected) {
    verifyInput?.click();
  }
});

verifyDropzone?.addEventListener("keydown", (event) => {
  const isFileSelected = verifyDropzone.classList.contains("has-file");
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (!isFileSelected) verifyInput?.click();
  }
});

verifyDropzone?.addEventListener("dragover", (event) => {
  event.preventDefault();
  verifyDropzone.classList.add("is-dragover");
});

verifyDropzone?.addEventListener("dragleave", () => {
  verifyDropzone.classList.remove("is-dragover");
});

verifyDropzone?.addEventListener("drop", (event) => {
  event.preventDefault();
  verifyDropzone.classList.remove("is-dragover");
  const file = event.dataTransfer?.files?.[0];
  if (file) setVerifyState(file);
});

verifyInput?.addEventListener("change", () => {
  const file = verifyInput.files?.[0];
  if (file) setVerifyState(file);
});

changeVerifyFileBtn?.addEventListener("click", () => {
  stopVerifySimulation();
  if (verifyInput) verifyInput.value = "";
  verifyInput?.click();
});

startVerifyBtn?.addEventListener("click", () => {
  if (!verifyDropzone?.classList.contains("has-file")) {
    alert("먼저 검증할 이미지를 업로드해주세요.");
    return;
  }
  if (verifyRegisteredAt) verifyRegisteredAt.textContent = formatKoreanDateTime(new Date());
  if (verifyUploaderName) verifyUploaderName.textContent = getCurrentUploaderDisplayName();
  showLoginToast("저작물 검증을 시작합니다.", 1500);
  startVerifySimulation();
});

verifyScenarioButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setVerifyScenario(button.dataset.verifyScenario || "success");
  });
});

verifyAgainBtn?.addEventListener("click", () => {
  stopVerifySimulation();
  setVerifyView("ready");
  if (verifyInput) verifyInput.value = "";
  verifyInput?.click();
});

verifyFailRetryBtn?.addEventListener("click", () => {
  stopVerifySimulation();
  setVerifyView("ready");
  if (verifyInput) verifyInput.value = "";
  verifyInput?.click();
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
  stopVerifySimulation();
  if (uploadPreviewUrl) {
    URL.revokeObjectURL(uploadPreviewUrl);
    uploadPreviewUrl = null;
  }
  if (verifyPreviewUrl) {
    URL.revokeObjectURL(verifyPreviewUrl);
    verifyPreviewUrl = null;
  }
  revokeWatermarkRenderedUrl();
});

setLoggedOutUI();
setLanguage(currentLanguage);
setupHistoryEvents();
renderHistoryList();
closeHistoryDetail();
renderAdminDashboard();
renderAdminUserTable();
renderAdminImageTable();
renderAdminVoteTable();
renderAdminUserDetail(adminUsers[0]?.id);
renderAdminImageDetail(adminImages[0]?.id);
renderAdminVoteDetail(adminVotes[0]?.id);
setupAdminEvents();
setAdminView("dashboard");
setUploadState(null);
setResultMode("allow");
setVerifyScenario("success");
setVerifyState(null);
setWatermarkCardLayoutByRatio(1);
setActiveTab("home");
