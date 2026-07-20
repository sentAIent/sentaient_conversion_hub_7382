chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "analyze-legal-eagle",
        title: "Analyze with Legal Eagle",
        contexts: ["selection"]
    });
    // Open side panel on action click
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => console.error(error));
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "analyze-legal-eagle" && info.selectionText) {
        // Save text to storage and open the side panel inside the current tab (e.g., Google Docs)
        chrome.storage.local.set({ selectedText: info.selectionText }, () => {
            chrome.sidePanel.open({ windowId: tab.windowId });
        });
    }
});
