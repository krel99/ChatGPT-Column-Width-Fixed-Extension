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

  #chat-message-container {
    display: grid !important;
    grid-template-columns: ${promptRatio}fr ${answerRatio}fr;
    column-gap: ${gutterSpacing}px;
    padding-inline: ${gutterSpacing}px;
  }

  #chat-message-container .qwen-chat-message-user,
  #chat-message-container .qwen-chat-message-assistant {
    width: 100% !important;
  }

  #chat-message-container .qwen-chat-message-user {
    grid-column: 1;
  }

  #chat-message-container .qwen-chat-message-assistant {
    grid-column: 2;
  }

  #chat-message-container .chat-user-message,
  #chat-message-container .chat-response-message-right {
    max-width: 100% !important;
    width: 100% !important;
  }

  .flex-1.flex.flex-col.px-4.max-w-3xl.mx-auto.w-full {
    display: grid !important;
    grid-template-columns: ${promptRatio}fr ${answerRatio}fr;
    column-gap: ${gutterSpacing}px;
    padding-inline: ${gutterSpacing}px;
  }

  .flex-1.flex.flex-col.px-4.max-w-3xl.mx-auto.w-full
    [data-test-render-count]:has([data-testid="user-message"]) {
    grid-column: 1;
  }

  .flex-1.flex.flex-col.px-4.max-w-3xl.mx-auto.w-full
    [data-test-render-count]:has(.font-claude-response) {
    grid-column: 2;
  }

  .flex-1.flex.flex-col.px-4.max-w-3xl.mx-auto.w-full
    [data-test-render-count] {
    width: 100% !important;
  }

  .flex-1.flex.flex-col.px-4.max-w-3xl.mx-auto.w-full
    [data-testid="user-message"],
  .flex-1.flex.flex-col.px-4.max-w-3xl.mx-auto.w-full .font-claude-response {
    max-width: 100% !important;
    width: 100% !important;
  }

  .chat-history .conversation-container.message-actions-hover-boundary {
    display: grid !important;
    grid-template-columns: ${promptRatio}fr ${answerRatio}fr;
    column-gap: ${gutterSpacing}px;
    padding-inline: ${gutterSpacing}px;
  }

  .chat-history .conversation-container.message-actions-hover-boundary > user-query {
    grid-column: 1;
  }

  .chat-history .conversation-container.message-actions-hover-boundary > model-response {
    grid-column: 2;
  }

  .chat-history .conversation-container.message-actions-hover-boundary user-query,
  .chat-history .conversation-container.message-actions-hover-boundary model-response {
    width: 100% !important;
  }

  ._0f72b0b.ds-scroll-area {
    display: grid !important;
    grid-template-columns: ${promptRatio}fr ${answerRatio}fr;
    column-gap: ${gutterSpacing}px;
    padding-inline: ${gutterSpacing}px;
  }

  ._0f72b0b.ds-scroll-area > .dad65929 {
    grid-column: 1;
  }

  ._0f72b0b.ds-scroll-area > ._4f9bf79 {
    grid-column: 2;
  }

  ._0f72b0b.ds-scroll-area > ._871cbca {
    grid-column: 1 / -1;
  }

  ._0f72b0b.ds-scroll-area .ds-message,
  ._0f72b0b.ds-scroll-area .ds-markdown {
    width: 100% !important;
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
