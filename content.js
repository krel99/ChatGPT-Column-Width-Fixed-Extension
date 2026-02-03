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

  .flex-1.flex.flex-col.px-4.max-w-3xl.mx-auto.w-full
    [data-test-render-count]:has([data-testid="user-message"])
    .group.relative.inline-flex {
    max-width: 100% !important;
    width: 100% !important;
  }

  .flex-1.flex.flex-col.px-4.max-w-3xl.mx-auto.w-full
    [data-test-render-count]:has([data-testid="user-message"])
    .mb-1.mt-6 {
    margin-top: 0 !important;
  }

  .chat-history .conversation-container.message-actions-hover-boundary {
    display: grid !important;
    grid-template-columns: ${promptRatio}fr ${answerRatio}fr;
    column-gap: ${gutterSpacing}px;
    padding-inline: ${gutterSpacing}px;
    align-items: start;
    overflow: visible !important;
    width: 100% !important;
    max-width: 100% !important;
    margin-inline: 0 !important;
  }

  .chat-history {
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding-inline: 0 !important;
    overflow: visible !important;
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
    align-self: start;
    max-width: 100% !important;
    overflow: visible !important;
  }

  .chat-history .conversation-container.message-actions-hover-boundary user-query,
  .chat-history .conversation-container.message-actions-hover-boundary user-query-content,
  .chat-history .conversation-container.message-actions-hover-boundary
    .user-query-container {
    width: 100% !important;
    max-width: 100% !important;
    overflow: visible !important;
  }

  .chat-history .conversation-container.message-actions-hover-boundary .user-query-container,
  .chat-history .conversation-container.message-actions-hover-boundary .query-content,
  .chat-history .conversation-container.message-actions-hover-boundary
    .user-query-bubble-with-background,
  .chat-history .conversation-container.message-actions-hover-boundary .horizontal-container,
  .chat-history .conversation-container.message-actions-hover-boundary .query-text {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    overflow: visible !important;
  }

  .chat-history .conversation-container.message-actions-hover-boundary
    .user-query-bubble-with-background {
    display: block !important;
    box-sizing: border-box !important;
    overflow: visible !important;
  }

  ._0f72b0b.ds-scroll-area {
    display: block !important;
  }

  ._0f72b0b.ds-scroll-area > .dad65929 {
    display: grid !important;
    grid-template-columns: ${promptRatio}fr ${answerRatio}fr;
    column-gap: ${gutterSpacing}px;
    padding-inline: ${gutterSpacing}px;
    align-items: start;
  }

  ._0f72b0b.ds-scroll-area > .dad65929 > ._9663006 {
    grid-column: 1;
  }

  ._0f72b0b.ds-scroll-area > .dad65929 > ._4f9bf79 {
    grid-column: 2;
  }

  ._0f72b0b.ds-scroll-area > ._871cbca {
    grid-column: 1;
    width: 100% !important;
    max-width: 100% !important;
    justify-self: stretch;
  }

  ._0f72b0b.ds-scroll-area .ds-message,
  ._0f72b0b.ds-scroll-area .ds-markdown,
  ._0f72b0b.ds-scroll-area .fbb737a4 {
    width: 100% !important;
    max-width: 100% !important;
  }

  ._0f72b0b.ds-scroll-area ._871cbca ._020ab5b,
  ._0f72b0b.ds-scroll-area ._871cbca textarea {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }

  .isolate.mx-auto.flex.flex-col.max-w-threadContentWidth
    > [role="tabpanel"]
    > .flex.flex-col.gap-y-lg {
    display: grid !important;
    grid-template-columns: ${promptRatio}fr ${answerRatio}fr;
    column-gap: ${gutterSpacing}px;
    padding-inline: ${gutterSpacing}px;
    align-items: start;
  }

  .isolate.mx-auto.flex.flex-col.max-w-threadContentWidth
    > [role="tabpanel"]
    > .flex.flex-col.gap-y-lg
    > :first-child {
    grid-column: 1;
  }

  .isolate.mx-auto.flex.flex-col.max-w-threadContentWidth
    > [role="tabpanel"]
    > .flex.flex-col.gap-y-lg
    > :nth-child(2) {
    grid-column: 2;
  }

  .isolate.mx-auto.flex.flex-col.max-w-threadContentWidth
    > [role="tabpanel"]
    > .flex.flex-col.gap-y-lg
    > :first-child,
  .isolate.mx-auto.flex.flex-col.max-w-threadContentWidth
    > [role="tabpanel"]
    > .flex.flex-col.gap-y-lg
    > :nth-child(2) {
    width: 100% !important;
    max-width: 100% !important;
  }

  .css-175oi2r[style*="flex-direction: column"]:has(
      > .css-175oi2r > .css-175oi2r.r-1awozwy.r-13qz1uu
    ) {
    display: grid !important;
    grid-template-columns: ${promptRatio}fr ${answerRatio}fr;
    column-gap: ${gutterSpacing}px;
    padding-inline: ${gutterSpacing}px;
    align-items: start;
  }

  .css-175oi2r[style*="flex-direction: column"]:has(
      > .css-175oi2r > .css-175oi2r.r-1awozwy.r-13qz1uu
    )
    > .r-4qtqp9 {
    grid-column: 1 / -1;
  }

  .css-175oi2r[style*="flex-direction: column"]:has(
      > .css-175oi2r > .css-175oi2r.r-1awozwy.r-13qz1uu
    )
    > :nth-child(2) {
    grid-column: 1;
  }

  .css-175oi2r[style*="flex-direction: column"]:has(
      > .css-175oi2r > .css-175oi2r.r-1awozwy.r-13qz1uu
    )
    > :nth-child(3) {
    grid-column: 2;
  }

  .css-175oi2r[style*="flex-direction: column"]:has(
      > .css-175oi2r > .css-175oi2r.r-1awozwy.r-13qz1uu
    )
    > :nth-child(2),
  .css-175oi2r[style*="flex-direction: column"]:has(
      > .css-175oi2r > .css-175oi2r.r-1awozwy.r-13qz1uu
    )
    > :nth-child(3) {
    width: 100% !important;
    max-width: 100% !important;
  }

  .css-175oi2r[style*="flex-direction: column"]:has([data-testid="follow_ups_list"]) {
    display: grid !important;
    grid-template-columns: ${promptRatio}fr ${answerRatio}fr;
    column-gap: ${gutterSpacing}px;
    padding-inline: ${gutterSpacing}px;
    align-items: start;
  }

  .css-175oi2r[style*="flex-direction: column"]:has([data-testid="follow_ups_list"])
    > .r-4qtqp9 {
    grid-column: 1 / -1;
  }

  .css-175oi2r[style*="flex-direction: column"]:has([data-testid="follow_ups_list"])
    > :nth-child(2) {
    grid-column: 1;
  }

  .css-175oi2r[style*="flex-direction: column"]:has([data-testid="follow_ups_list"])
    > :nth-child(3) {
    grid-column: 2;
  }

  .css-175oi2r[style*="flex-direction: column"]:has([data-testid="follow_ups_list"])
    > :nth-child(2),
  .css-175oi2r[style*="flex-direction: column"]:has([data-testid="follow_ups_list"])
    > :nth-child(3) {
    width: 100% !important;
  }

  .css-175oi2r[style*="flex-direction: column"]:has(> .r-13qz1uu[style*="min-height"]) {
    display: grid !important;
    grid-template-columns: ${promptRatio}fr ${answerRatio}fr;
    column-gap: ${gutterSpacing}px;
    padding-inline: ${gutterSpacing}px;
    align-items: start;
  }

  .css-175oi2r[style*="flex-direction: column"]:has(> .r-13qz1uu[style*="min-height"])
    > .r-4qtqp9 {
    grid-column: 1 / -1;
  }

  .css-175oi2r[style*="flex-direction: column"]:has(> .r-13qz1uu[style*="min-height"])
    > :nth-child(2) {
    grid-column: 1;
  }

  .css-175oi2r[style*="flex-direction: column"]:has(> .r-13qz1uu[style*="min-height"])
    > :nth-child(3) {
    grid-column: 2;
  }

  .css-175oi2r[style*="flex-direction: column"]:has(> .r-13qz1uu[style*="min-height"])
    > :nth-child(2),
  .css-175oi2r[style*="flex-direction: column"]:has(> .r-13qz1uu[style*="min-height"])
    > :nth-child(3) {
    width: 100% !important;
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
