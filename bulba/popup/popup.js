function listen(eventType, selector, callback) {
    document.querySelector(selector).addEventListener(eventType, callback);
  }
  
  async function sendMessageToContentScript(message) {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    const response = await chrome.tabs.sendMessage(tab.id, message);
    // You can do something with response from the content script here
    console.log(response);
  }
  
  listen("change", "#enable", (e) =>
    // Send a message to the content script with the current value of the checkbox
    sendMessageToContentScript({ replace: e.target.checked })
  );
  