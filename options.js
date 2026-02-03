const DEFAULT_SETTINGS = {
  sideBySideEnabled: true,
  promptRatio: 2,
  answerRatio: 3,
};

const sideBySideEnabled = document.getElementById("sideBySideEnabled");
const promptRatio = document.getElementById("promptRatio");
const answerRatio = document.getElementById("answerRatio");
const ratioDisplay = document.getElementById("ratioDisplay");

function clampRatio(value, fallback) {
  const number = Number.parseInt(value, 10);
  if (Number.isNaN(number) || number <= 0) {
    return fallback;
  }
  return Math.min(number, 10);
}

function updateRatioDisplay(promptValue, answerValue) {
  ratioDisplay.textContent = `${promptValue} : ${answerValue}`;
}

function applySettings(settings) {
  sideBySideEnabled.checked = settings.sideBySideEnabled;
  promptRatio.value = settings.promptRatio;
  answerRatio.value = settings.answerRatio;
  updateRatioDisplay(settings.promptRatio, settings.answerRatio);
}

function saveSettings() {
  const nextSettings = {
    sideBySideEnabled: sideBySideEnabled.checked,
    promptRatio: clampRatio(promptRatio.value, DEFAULT_SETTINGS.promptRatio),
    answerRatio: clampRatio(answerRatio.value, DEFAULT_SETTINGS.answerRatio),
  };

  promptRatio.value = nextSettings.promptRatio;
  answerRatio.value = nextSettings.answerRatio;
  updateRatioDisplay(nextSettings.promptRatio, nextSettings.answerRatio);

  chrome.storage.sync.set(nextSettings);
}

chrome.storage.sync.get(DEFAULT_SETTINGS).then((settings) => {
  applySettings({ ...DEFAULT_SETTINGS, ...settings });
});

sideBySideEnabled.addEventListener("change", saveSettings);
promptRatio.addEventListener("input", saveSettings);
answerRatio.addEventListener("input", saveSettings);
