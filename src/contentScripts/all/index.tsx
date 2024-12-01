import './style.less';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fillForm') {
    const data = request.data;
    for (const field in data) {
      const input = document.querySelector(`[name="${field}"]`) as HTMLInputElement;
      if (input) input.value = data[field];
    }
    sendResponse({ status: 'success' });
  }
});

