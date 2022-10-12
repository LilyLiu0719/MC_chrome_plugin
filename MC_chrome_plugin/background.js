/*
function getCurrentTabId(callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}

function sendMessageToContentScript(message, callback)
{
	getCurrentTabId((tabId) =>
	{
		chrome.tabs.sendMessage(tabId, message, function(response)
		{
			if(callback) callback(response);
		});
	});
}

chrome.action.onClicked.addListener((tab) => {
  sendMessageToContentScript('start', (response) => {
    if(response) console.log(response);
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  sendMessageToContentScript('start', (response) => {
    if(response) console.log(response);
  });
});
*/
const url = chrome.runtime.getURL('data/data.json');
fetch(url).then( response => {
  if (response.status !== 200) {
    console.log('Looks like there was a problem. Status Code: ' + response.status);
    return;
  }
  response.json().then( data => {
    const order = Object.keys(data).sort((a, b) => b.length - a.length)
    chrome.storage.local.set({ data: data, order: order });
  });
}).catch( err => {
  console.log('Fetch Error:', err);
});

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
        var headers = details.requestHeaders || [];
        headers.push({
                  "name": "Cache-Control",
                  "value": "no-cache"
              });
        return {requestHeaders: headers};
  },
  {
        urls: [
                  "*://test.domain.tv/*",
                  "*://domain.tv/*"
              ]
  },
  []
);
