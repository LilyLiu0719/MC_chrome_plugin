replaceStart();
window.onload = replacer;

var keys = [] 
var values = [] 

function replacer() {
	var container = document.body;
  var find;
  var target;
  
  for (var i = 0; i < keys.length; i++) { 
    find = keys[i];
    target = values[i]
    regex = new RegExp(find, "gi");
    const instance = findAndReplaceDOMText(container, {
      preset: 'prose',
      find: regex,
      //wrap: 'span', 
      //wrapClass: 'red', 
      replace: function(portion) {
        called = true;
        console.log(portion);
        var el = document.createElement('span');
        el.innerHTML = target;
        return target;
      },
      forceContext: findAndReplaceDOMText.NON_INLINE_PROSE
    });
  };
}

function replaceStart() {
  chrome.storage.sync.get(['keys', 'values'], function(result) {
  if (result.keys && result.values) {
    keys = result.keys
    values = result.values
  }
  });
}