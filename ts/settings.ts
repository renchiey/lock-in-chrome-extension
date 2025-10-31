const saveButton = document.getElementById("save-btn");
const clearButton = document.getElementById("clear-btn");
const textArea = document.getElementById("url-list") as HTMLTextAreaElement;
const info = document.getElementById("info");

async function initSettings() {
  const domains = await chrome.storage.sync.get("blockedDomains");

  if (domains["blockedDomains"]) {
    let text = "";
    for (const domain of domains["blockedDomains"]) {
      text += domain + "\n";
    }

    textArea.value = text;
  }
}

initSettings();

function saveDomains() {
  const domains = textArea.value
    .split("\n")
    .map((domain) => domain.trim())
    .filter((domain) => domain.length > 0);

  chrome.storage.sync.set({ blockedDomains: domains });

  if (info) {
    info.innerText = "Successfully updated blocked domains!";

    setTimeout(() => {
      info.innerText = "";
    }, 3000);
  }
}

function clearDomains() {
  textArea.value = "";

  if (info) info.innerText = "";
}

saveButton?.addEventListener("click", saveDomains);

clearButton?.addEventListener("click", clearDomains);
