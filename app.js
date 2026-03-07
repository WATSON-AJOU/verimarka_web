const tabs = document.querySelectorAll(".tab");
const pageByTab = {
  home: "page-home",
  add: "page-add",
  verify: "page-home",
  history: "page-home"
};
const appPages = {
  home: document.getElementById("page-home"),
  add: document.getElementById("page-add")
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
const logoutBtn = document.getElementById("logoutBtn");
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
const uploadPreviewImage = document.getElementById("uploadPreviewImage");
const analysisPreviewImage = document.getElementById("analysisPreviewImage");
const analysisProgressRing = document.getElementById("analysisProgressRing");
const analysisProgressValue = document.getElementById("analysisProgressValue");
const analysisStatusLine = document.getElementById("analysisStatusLine");
const analysisSteps = Array.from(document.querySelectorAll(".analysis-step"));
const analysisResultImage = document.getElementById("analysisResultImage");
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
let currentLanguage = "ko";
let currentResultMode = "allow";
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
const analysisStageConfig = [
  { key: "embedding", label: "의미 기반 임베딩 분석", start: 0, end: 28 },
  { key: "pixel", label: "픽셀 정밀 비교", start: 28, end: 57 },
  { key: "search", label: "기존 등록 콘텐츠 탐색", start: 57, end: 84 },
  { key: "decision", label: "최종 판정 생성", start: 84, end: 100 }
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
    subtitle: "유사 후보가 감지되어 추가 검토가 필요합니다.",
    similarity: "0.7421",
    similarityPercent: "74.2%",
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

function setUploadPreviewMode(mode = "ready") {
  if (uploadReadyView) uploadReadyView.hidden = mode !== "ready";
  if (analysisRunningView) analysisRunningView.hidden = mode !== "running";
  if (analysisResultView) analysisResultView.hidden = mode !== "result";
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

  if (analysisResultView) {
    analysisResultView.dataset.result = normalizedMode;
  }
  if (analysisResultBadge) analysisResultBadge.textContent = config.badge;
  if (analysisResultTitle) analysisResultTitle.textContent = config.title;
  if (analysisResultSubtitle) analysisResultSubtitle.textContent = config.subtitle;
  if (analysisResultSimilarity) analysisResultSimilarity.textContent = config.similarity;
  if (analysisResultSimilarityPercent) {
    analysisResultSimilarityPercent.textContent = config.similarityPercent;
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

function setUploadState(file) {
  if (!uploadDropzone || !uploadPreview || !uploadEmpty) return;
  if (!file) {
    stopAnalysisSimulation();
    uploadDropzone.classList.remove("has-file");
    uploadEmpty.hidden = false;
    uploadPreview.hidden = true;
    setUploadPreviewMode("ready");
    setResultMode("allow");
    renderAnalysisState(0);
    if (uploadPreviewImage) uploadPreviewImage.removeAttribute("src");
    if (analysisPreviewImage) analysisPreviewImage.removeAttribute("src");
    if (analysisResultImage) analysisResultImage.removeAttribute("src");
    if (uploadFileName) uploadFileName.textContent = "sample.png";
    if (uploadFileMeta) uploadFileMeta.textContent = "0 KB · 준비 완료";
    if (analysisResultFileName) analysisResultFileName.textContent = "sample.png";
    if (analysisResultFileMeta) analysisResultFileMeta.textContent = "0 KB · 2026.03.07 00:00";
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
  stopAnalysisSimulation();
  if (uploadPreviewImage) uploadPreviewImage.src = uploadPreviewUrl;
  if (analysisPreviewImage) analysisPreviewImage.src = uploadPreviewUrl;
  if (analysisResultImage) analysisResultImage.src = uploadPreviewUrl;
  if (uploadFileName) uploadFileName.textContent = file.name;
  if (uploadFileMeta) {
    uploadFileMeta.textContent = `${formatFileSize(file.size)} · ${formatKoreanDateTime(new Date())}`;
  }
  if (analysisResultFileName) analysisResultFileName.textContent = file.name;
  if (analysisResultFileMeta && uploadFileMeta) {
    analysisResultFileMeta.textContent = uploadFileMeta.textContent;
  }
  showLoginToast("이미지 업로드가 완료되었습니다.", 1600);

  uploadDropzone.classList.add("has-file");
  uploadEmpty.hidden = true;
  uploadPreview.hidden = false;
  setResultMode("allow");
  setUploadPreviewMode("ready");
  renderAnalysisState(0);
}

function showAuthPanel(target) {
  const isSignup = target === "signup";
  loginPanel?.classList.toggle("is-active", !isSignup);
  signupPanel?.classList.toggle("is-active", isSignup);
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

function setLoggedInUI(nickname) {
  const safeNickname = nickname?.trim() ? nickname.trim() : "사용자";
  if (userNickname) userNickname.textContent = `${safeNickname}님`;
  if (userSession) userSession.hidden = false;
  if (guestActions) guestActions.hidden = true;
}

function setLoggedOutUI() {
  if (userSession) userSession.hidden = true;
  if (guestActions) guestActions.hidden = false;
  if (userNickname) userNickname.textContent = "게스트";
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
  document.body.classList.add("modal-open");
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
  document.body.classList.remove("modal-open");
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
  uploadInput?.click();
});

pickAnotherFileBtn?.addEventListener("click", () => {
  stopAnalysisSimulation();
  uploadInput?.click();
});

startRegisterBtn?.addEventListener("click", () => {
  if (!uploadDropzone?.classList.contains("has-file")) {
    alert("먼저 업로드할 이미지를 선택해주세요.");
    return;
  }
  showLoginToast("저작물 등록 요청이 접수되었습니다.", 2200);
  startAnalysisSimulation();
});

cancelAnalysisBtn?.addEventListener("click", () => {
  stopAnalysisSimulation();
  setUploadPreviewMode("ready");
  uploadInput?.click();
});

goHomeBtn?.addEventListener("click", () => {
  stopAnalysisSimulation();
  setActiveTab("home");
});

resultModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setResultMode(button.dataset.resultMode || "allow");
  });
});

resultPrimaryBtn?.addEventListener("click", () => {
  const config = resultModeConfig[currentResultMode] || resultModeConfig.allow;
  if (currentResultMode === "reject") {
    setUploadPreviewMode("ready");
    uploadInput?.click();
    showLoginToast(config.primaryToast, 1800);
    return;
  }
  showLoginToast(config.primaryToast, 1800);
});

resultSecondaryBtn?.addEventListener("click", () => {
  setUploadPreviewMode("ready");
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
    setLoggedInUI(nickname);
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
  setLoggedInUI(nicknameFromEmail);
  signupForm?.reset();
  closeLoginModal();
  showLoginToast("로그인 완료했습니다.", 2000);
});

logoutBtn?.addEventListener("click", () => {
  setLoggedOutUI();
});

loginModal?.addEventListener("click", (event) => {
  if (event.target === loginModal) {
    closeLoginModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (loginModal && !loginModal.hidden) {
      closeLoginModal();
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

setLoggedOutUI();
setLanguage(currentLanguage);
setResultMode("allow");
setActiveTab("home");
