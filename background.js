chrome.runtime.onInstalled.addListener(async () => {
	let keys = ['牛肉漢堡', '豬肉漢堡', '比薩', '漢堡', '變長'];
	let values = ['Beaf Burger', 'Pork Burger', 'Pizza', "🍔", '變長-----------------------------------長'];
	//let keys = ['(?<=我要變成)紅(?=色)'];
	//let values = ['我要變成<span style="color: red">'+'紅'+'</span>色'];
  chrome.storage.sync.set({
      keys: keys,
      values: values
  }, );
});

