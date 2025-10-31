const unblockable = [
  chrome.runtime.getURL("views/settings.html"),
  chrome.runtime.getURL("views/popup.html"),
];

chrome.webNavigation.onDOMContentLoaded.addListener(async (e) => {
  console.log(`you visited this site ${e.url}`);

  const active = await chrome.storage.sync.get("lockInActive");

  const domains = await chrome.storage.sync.get("blockedDomains");

  if (
    active["lockInActive"] &&
    domains["blockedDomains"] &&
    domains["blockedDomains"].filter((domain: string) => e.url.includes(domain))
      .length &&
    !unblockable.includes(e.url)
  ) {
    chrome.tabs.remove(e.tabId);
    chrome.notifications.create({
      title: "LOCK THE HELL IN!",
      message: `You visited ${e.url}.\n\n Regain your focus.`,
      iconUrl: "../images/icon.png",
      type: "basic",
    });
  }
});
