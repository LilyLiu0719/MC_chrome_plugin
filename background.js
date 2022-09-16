chrome.runtime.onInstalled.addListener(async () => {
	let keys = ['我要變成紅色'];
	let values = ['我要變成<span style="color: red">'+'紅'+'</span>色'];
    chrome.storage.sync.set({
        keys: keys,
        values: values
    }, function(result) {
        console.log(result);
    });
});

