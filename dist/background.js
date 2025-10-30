"use strict";
const unblockable = [
    "chrome-extension://mgpjfgpnhmkodcfhphdcchrome-extension://mgpjfgpnhmkodcfhphdcjkpenaakijnj/views/settings.html",
];
chrome.webNavigation.onDOMContentLoaded.addListener(async (e) => {
    console.log(`you visited this site ${e.url}`);
    const active = await chrome.storage.sync.get("lockInActive");
    const domains = await chrome.storage.sync.get("blockedDomains");
    if (active["lockInActive"] &&
        domains["blockedDomains"] &&
        domains["blockedDomains"].filter((domain) => e.url.includes(domain))
            .length &&
        !unblockable.includes(e.url)) {
        chrome.tabs.remove(e.tabId);
        chrome.notifications.create({
            title: "Naughty Boy",
            message: `You visited ${e.url}. \n\nLock the hell in!`,
            iconUrl: "../images/icon.png",
            type: "basic",
        });
    }
});
//# sourceMappingURL=background.js.map