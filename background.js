chrome.runtime.onInstalled.addListener(async () => {
	let keys = ['牛肉漢堡', '豬肉漢堡', '比薩', '漢堡', '變長'];
	let values = ['Beaf Burger', 'Pork Burger', 'Pizza', "🍔", '變長-----------------------------------長'];
	let keys_with_style = ['(?<=我要變成)紅(?=色)'];
	let classes = ['red'];
  chrome.storage.sync.set({
      keys: keys,
      values: values, 
      keys_with_style: keys_with_style,
      classes: classes
  }, );
});

