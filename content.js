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
    grid-template-columns: minmax(0, ${promptRatio}fr) minmax(0, ${answerRatio}fr);
    column-gap: ${gutterSpacing}px;
    padding-inline: ${gutterSpacing}px;
    align-items: start;
    grid-auto-flow: row;
    overflow: visible !important;
    width: 100% !important;
    max-width: 100% !important;
    margin-inline: 0 !important;
    box-sizing: border-box !important;
  }

  .chat-history .conversation-container.message-actions-hover-boundary > user-query,
  .chat-history .conversation-container.message-actions-hover-boundary > .user-query,
  .chat-history .conversation-container.message-actions-hover-boundary > model-response,
  .chat-history .conversation-container.message-actions-hover-boundary > .model-response {
    overflow: visible !important;
    min-width: 0 !important;
  }

  .chat-history {
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding-inline: ${gutterSpacing}px !important;
    overflow: visible !important;
    box-sizing: border-box !important;
  }

  .chat-history .conversation-container.message-actions-hover-boundary > user-query,
  .chat-history .conversation-container.message-actions-hover-boundary > .user-query {
    grid-column: 1;
    min-width: 0 !important;
    justify-self: stretch;
    align-self: stretch;
  }

  .chat-history .conversation-container.message-actions-hover-boundary > model-response,
  .chat-history .conversation-container.message-actions-hover-boundary > .model-response {
    grid-column: 2;
    min-width: 0 !important;
    justify-self: stretch;
    align-self: stretch;
    overflow: visible !important;
  }

  .chat-history .conversation-container.message-actions-hover-boundary user-query,
  .chat-history .conversation-container.message-actions-hover-boundary .user-query,
  .chat-history .conversation-container.message-actions-hover-boundary model-response,
  .chat-history .conversation-container.message-actions-hover-boundary .model-response {
    width: 100% !important;
    align-self: start;
    max-width: 100% !important;
    overflow: visible !important;
    min-width: 0 !important;
  }

  .chat-history .conversation-container.message-actions-hover-boundary user-query,
  .chat-history .conversation-container.message-actions-hover-boundary .user-query,
  .chat-history .conversation-container.message-actions-hover-boundary user-query-content,
  .chat-history .conversation-container.message-actions-hover-boundary .user-query-content,
  .chat-history .conversation-container.message-actions-hover-boundary
    .user-query-container {
    width: 100% !important;
    max-width: 100% !important;
    overflow: visible !important;
    min-width: 0 !important;
  }

  .chat-history .conversation-container.message-actions-hover-boundary .user-query-container,
  .chat-history .conversation-container.message-actions-hover-boundary .query-content,
  .chat-history .conversation-container.message-actions-hover-boundary .horizontal-container,
  .chat-history .conversation-container.message-actions-hover-boundary .query-text {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    overflow: visible !important;
    min-width: 0 !important;
    overflow-wrap: anywhere !important;
    word-break: break-word !important;
  }

  .chat-history .conversation-container.message-actions-hover-boundary
    .user-query-bubble-with-background {
    display: block !important;
    box-sizing: border-box !important;
    overflow: visible !important;
    max-width: 100% !important;
    width: 100% !important;
    position: relative !important;
    z-index: 0 !important;
    margin: 0 !important;
    padding-inline: 12px !important;
    align-self: stretch !important;
  }

  .chat-history .conversation-container.message-actions-hover-boundary .avatar-gutter {
    display: none !important;
    width: 0 !important;
    min-width: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .chat-history .conversation-container.message-actions-hover-boundary
    .horizontal-container {
    display: block !important;
    overflow: visible !important;
    min-width: 0 !important;
    max-width: 100% !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  .chat-history .conversation-container.message-actions-hover-boundary .query-content {
    display: flex !important;
    flex-wrap: wrap !important;
    align-items: flex-start !important;
    gap: 6px 8px !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    overflow: visible !important;
    box-sizing: border-box !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .chat-history .conversation-container.message-actions-hover-boundary
    .query-content
    > .ng-star-inserted:has(.action-button) {
    order: 2 !important;
    flex: 0 0 auto !important;
    align-self: flex-start !important;
  }

  .chat-history .conversation-container.message-actions-hover-boundary
    .user-query-bubble-with-background {
    order: 1 !important;
    flex: 0 0 100% !important;
  }

  .chat-history .conversation-container.message-actions-hover-boundary .query-text,
  .chat-history .conversation-container.message-actions-hover-boundary
    .query-text-line {
    display: block !important;
    white-space: normal !important;
    overflow: visible !important;
    max-width: 100% !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    box-sizing: border-box !important;
  }

  .chat-history .conversation-container.message-actions-hover-boundary
    .presented-response-container,
  .chat-history .conversation-container.message-actions-hover-boundary
    .response-container,
  .chat-history .conversation-container.message-actions-hover-boundary
    .response-container-content,
  .chat-history .conversation-container.message-actions-hover-boundary
    .response-content,
  .chat-history .conversation-container.message-actions-hover-boundary .markdown {
    margin-left: 0 !important;
    margin-inline-start: 0 !important;
    padding-left: 0 !important;
    max-width: 100% !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  .chat-history .conversation-container.message-actions-hover-boundary
    .user-query-container,
  .chat-history .conversation-container.message-actions-hover-boundary .query-content {
    align-items: flex-start !important;
  }

  .chat-history .conversation-container.message-actions-hover-boundary
    user-query,
  .chat-history .conversation-container.message-actions-hover-boundary
    .user-query,
  .chat-history .conversation-container.message-actions-hover-boundary
    user-query-content,
  .chat-history .conversation-container.message-actions-hover-boundary
    .user-query-content,
  .chat-history .conversation-container.message-actions-hover-boundary
    .user-query-container {
    max-width: 100% !important;
    width: 100% !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
  }

  .chat-history .conversation-container.message-actions-hover-boundary
    .query-content {
    padding-inline: 0 !important;
    margin-inline: 0 !important;
    box-sizing: border-box !important;
  }

  ._0f72b0b.ds-scroll-area {
    display: block !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    padding-inline: 0 !important;
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

  ._0f72b0b.ds-scroll-area > .dad65929 .ds-message,
  ._0f72b0b.ds-scroll-area > .dad65929 .ds-markdown,
  ._0f72b0b.ds-scroll-area > .dad65929 .fbb737a4 {
    width: 100% !important;
    max-width: 100% !important;
  }

  ._0f72b0b.ds-scroll-area > ._871cbca {
    width: 66.6667% !important;
    max-width: 66.6667% !important;
    margin-inline: auto !important;
    box-sizing: border-box !important;
  }

  ._0f72b0b.ds-scroll-area > ._871cbca textarea {
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

  main [role="feed"],
  main [data-testid="conversation"],
  main [data-testid="chat-messages"],
  main [data-testid="message-list"] {
    display: grid !important;
    grid-template-columns: ${promptRatio}fr ${answerRatio}fr;
    column-gap: ${gutterSpacing}px;
    padding-inline: ${gutterSpacing}px;
    align-items: start;
  }

  main [role="feed"] > article,
  main [data-testid="conversation"] > article,
  main [data-testid="chat-messages"] > article,
  main [data-testid="message-list"] > article {
    width: 100% !important;
    max-width: 100% !important;
  }

  main [role="feed"] [data-testid="user-message"],
  main [role="feed"] .message.user,
  main [data-testid="conversation"] [data-testid="user-message"],
  main [data-testid="conversation"] .message.user,
  main [data-testid="chat-messages"] [data-testid="user-message"],
  main [data-testid="chat-messages"] .message.user,
  main [data-testid="message-list"] [data-testid="user-message"],
  main [data-testid="message-list"] .message.user {
    grid-column: 1;
    width: 100% !important;
    max-width: 100% !important;
  }

  main [role="feed"] [data-testid="assistant-message"],
  main [role="feed"] .message.assistant,
  main [data-testid="conversation"] [data-testid="assistant-message"],
  main [data-testid="conversation"] .message.assistant,
  main [data-testid="chat-messages"] [data-testid="assistant-message"],
  main [data-testid="chat-messages"] .message.assistant,
  main [data-testid="message-list"] [data-testid="assistant-message"],
  main [data-testid="message-list"] .message.assistant {
    grid-column: 2;
    width: 100% !important;
    max-width: 100% !important;
  }

  body.cw-grok-page .cw-grok-chat {
    display: grid !important;
    grid-template-columns: ${promptRatio}fr ${answerRatio}fr;
    column-gap: ${gutterSpacing}px;
    padding-inline: ${gutterSpacing}px;
    align-items: start;
  }

  body.cw-grok-page .cw-grok-chat > .cw-grok-message {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
  }

  body.cw-grok-page .cw-grok-chat > .cw-grok-message[data-cw-role="user"] {
    grid-column: 1;
  }

  body.cw-grok-page .cw-grok-chat > .cw-grok-message[data-cw-role="assistant"] {
    grid-column: 2;
  }

  .cw-pplx-related .cw-pplx-related-list {
    max-height: 0 !important;
    opacity: 0 !important;
    overflow: hidden !important;
    pointer-events: none !important;
    transition: max-height 200ms ease, opacity 150ms ease;
  }

  .cw-pplx-related.cw-open .cw-pplx-related-list {
    max-height: 1200px !important;
    opacity: 1 !important;
    pointer-events: auto !important;
  }

  .cw-pplx-related .cw-pplx-related-toggle {
    margin-left: auto !important;
    border: 1px solid currentColor !important;
    background: transparent !important;
    padding: 2px 8px !important;
    border-radius: 999px !important;
    font-size: 12px !important;
    line-height: 1.4 !important;
    opacity: 0.75 !important;
  }

  [data-scroll-root] #thread form.group\\/composer {
    width: 66.6667% !important;
    max-width: 66.6667% !important;
    margin-inline: auto !important;
    box-sizing: border-box !important;
  }

  .\\!box-content.flex.flex-col.bg-bg-000 {
    width: 66.6667% !important;
    max-width: 66.6667% !important;
    margin-inline: auto !important;
    box-sizing: border-box !important;
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

function isGrokPage() {
  return (
    (location.hostname === "x.com" || location.hostname === "twitter.com") &&
    location.pathname.startsWith("/i/grok")
  );
}

function findGrokChatContainer() {
  const candidates = Array.from(
    document.querySelectorAll('main [role="log"], main [aria-live="polite"], main [aria-live="assertive"]')
  ).filter((node) => node.children && node.children.length >= 2);
  if (candidates.length === 0) {
    return null;
  }
  return candidates.reduce((best, current) =>
    current.children.length > best.children.length ? current : best
  );
}

function classifyGrokMessage(node, fallbackRole) {
  const testId = (node.getAttribute("data-testid") || "").toLowerCase();
  const aria = (node.getAttribute("aria-label") || "").toLowerCase();
  const text = (node.textContent || "").toLowerCase();
  if (testId.includes("user") || aria.includes("you") || text.startsWith("you")) {
    return "user";
  }
  if (testId.includes("assistant") || testId.includes("grok") || aria.includes("grok")) {
    return "assistant";
  }
  return fallbackRole;
}

function applyGrokLayout() {
  if (!isGrokPage()) {
    return;
  }
  document.body.classList.add("cw-grok-page");
  const container = findGrokChatContainer();
  if (!container) {
    return;
  }
  container.classList.add("cw-grok-chat");
  const items = Array.from(container.children);
  let nextFallback = "user";
  for (const item of items) {
    if (!(item instanceof HTMLElement)) {
      continue;
    }
    item.classList.add("cw-grok-message");
    if (!item.dataset.cwRole) {
      const role = classifyGrokMessage(item, nextFallback);
      item.dataset.cwRole = role;
      nextFallback = role === "user" ? "assistant" : "user";
    }
  }
}

function setupGrokObserver() {
  if (!isGrokPage()) {
    return;
  }
  applyGrokLayout();
  const observer = new MutationObserver(() => {
    applyGrokLayout();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

function isPerplexityPage() {
  return location.hostname.endsWith("perplexity.ai");
}

function setupPerplexityRelatedSpoiler() {
  if (!isPerplexityPage()) {
    return;
  }

  const seen = new WeakSet();

  const enhance = () => {
    const titles = Array.from(document.querySelectorAll("div.font-sans")).filter(
      (el) => el.textContent && el.textContent.trim() === "Related"
    );
    for (const title of titles) {
      const container = title.closest(".gap-y-lg.flex.flex-col");
      if (!container || seen.has(container)) {
        continue;
      }
      const list = container.querySelector(".divide-y.border-t");
      if (!list) {
        continue;
      }
      container.classList.add("cw-pplx-related");
      container.classList.remove("cw-open");
      list.classList.add("cw-pplx-related-list");

      const headerRow = container.querySelector(".flex.items-center.justify-between");
      if (headerRow && !headerRow.querySelector(".cw-pplx-related-toggle")) {
        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "cw-pplx-related-toggle";
        toggle.textContent = "Show";
        toggle.addEventListener("click", () => {
          const isOpen = container.classList.toggle("cw-open");
          toggle.textContent = isOpen ? "Hide" : "Show";
        });
        headerRow.append(toggle);
      }

      seen.add(container);
    }
  };

  enhance();
  const observer = new MutationObserver(() => enhance());
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

setupGrokObserver();
setupPerplexityRelatedSpoiler();
