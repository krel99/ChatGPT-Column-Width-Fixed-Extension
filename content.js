const DEFAULT_SETTINGS = {
  sideBySideEnabled: true,
  promptRatio: 2,
  answerRatio: 3,
  gutterSpacing: 24,
};

const STYLE_ID = "chatgpt-column-width-side-by-side-style";

function clampRatio(value, fallback) {
  const number = Number.parseInt(value, 10);
  if (Number.isNaN(number) || number <= 0) {
    return fallback;
  }
  return Math.min(number, 10);
}

function clampSpacing(value, fallback) {
  const number = Number.parseInt(value, 10);
  if (Number.isNaN(number) || number < 0) {
    return fallback;
  }
  return Math.min(number, 80);
}

function buildSideBySideCss(settings) {
  if (!settings.sideBySideEnabled) {
    return "";
  }

  const promptRatio = clampRatio(settings.promptRatio, DEFAULT_SETTINGS.promptRatio);
  const answerRatio = clampRatio(settings.answerRatio, DEFAULT_SETTINGS.answerRatio);
  const gutterSpacing = clampSpacing(
    settings.gutterSpacing,
    DEFAULT_SETTINGS.gutterSpacing
  );

  return `@media (min-width: 1200px) {
  [data-scroll-root] #thread [role="presentation"] .flex.flex-col.text-sm.pb-25 {
    display: grid !important;
    grid-template-columns: ${promptRatio}fr ${answerRatio}fr;
    column-gap: ${gutterSpacing}px;
    padding-inline: ${gutterSpacing}px;
  }

  [data-scroll-root] #thread article[data-turn="user"],
  [data-scroll-root] #thread article[data-turn="assistant"] {
    width: 100% !important;
  }

  [data-scroll-root] #thread article[data-turn="user"] {
    grid-column: 1;
  }

  [data-scroll-root] #thread article[data-turn="assistant"] {
    grid-column: 2;
  }

  [data-scroll-root] #thread article[data-turn="user"] .user-message-bubble-color {
    max-width: 100% !important;
    width: 100% !important;
  }

  [data-scroll-root] #thread article[data-turn="assistant"] .markdown {
    max-width: 100% !important;
  }
}
`;
}

function ensureStyleElement() {
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ID;
    document.head.append(style);
  }
  return style;
}

function applySettings(settings) {
  const style = ensureStyleElement();
  style.textContent = buildSideBySideCss(settings);
}

function loadSettings() {
  return chrome.storage.sync.get(DEFAULT_SETTINGS).then((settings) => ({
    ...DEFAULT_SETTINGS,
    ...settings,
  }));
}

loadSettings().then(applySettings);

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "sync") {
    return;
  }

  const nextSettings = { ...DEFAULT_SETTINGS };
  for (const [key, change] of Object.entries(changes)) {
    nextSettings[key] = change.newValue;
  }
  applySettings(nextSettings);
});
