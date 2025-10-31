"use strict";
const button = document.getElementById("lock-in-toggle");
const title = document.getElementById("title");
const settings = document.getElementById("settings");
async function initPopup() {
    const obj = await chrome.storage.sync.get("lockInActive");
    if (obj["lockInActive"]) {
        button?.classList.add("btn-active");
        if (title)
            title.innerText = "Lock In Active";
    }
    else {
        button?.classList.add("btn-inactive");
        if (title)
            title.innerText = "Lock In Inactive";
    }
}
initPopup();
button?.addEventListener("click", async () => {
    const obj = await chrome.storage.sync.get("lockInActive");
    if (obj["lockInActive"]) {
        chrome.storage.sync.set({ lockInActive: false });
        button.classList.add("btn-inactive");
        button.classList.remove("btn-active");
        if (title)
            title.innerText = "Lock In Inactive";
    }
    else {
        chrome.storage.sync.set({ lockInActive: true });
        button.classList.add("btn-active");
        button.classList.remove("btn-inactive");
        if (title)
            title.innerText = "Lock In Active";
        const tabs = await chrome.tabs.query({});
        const blocked = await chrome.storage.sync.get("blockedDomains");
        // close all blocked sites
        if (blocked["blockedDomains"]) {
            blocked["blockedDomains"].forEach((domain) => {
                tabs.forEach((tab) => {
                    if (tab.url?.includes(domain)) {
                        chrome.tabs.remove(tab.id);
                    }
                });
            });
        }
    }
});
settings?.addEventListener("click", () => {
    chrome.tabs.create({
        url: chrome.runtime.getURL("views/settings.html"),
    });
});
//# sourceMappingURL=popup.js.map