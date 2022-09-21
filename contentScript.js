replaceStart();
window.onload = replacer;

var keys = [] 
var values = [] 
var keys_with_style = []
var classes = []

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
  
  for (var i = 0; i < keys_with_style.length; i++) { 
    find = keys_with_style[i];
    target = classes[i]
    regex = new RegExp(find, "gi");
    const instance = findAndReplaceDOMText(container, {
      preset: 'prose',
      find: regex,
      wrap: 'span', 
      wrapClass: target, 
      forceContext: findAndReplaceDOMText.NON_INLINE_PROSE
    });
  };
}

function replaceStart() {
  chrome.storage.sync.get(['keys', 'values', 'keys_with_style', 'classes'], function(result) {
    if (result.keys && result.values && result.keys_with_style && result.classes) {
      keys = result.keys
      values = result.values
      keys_with_style = result.keys_with_style
      classes = result.classes
    }
  });
}