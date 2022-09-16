window.onload = replacer;
replaceStart();

var keys = [] 
var values = [] 

String.prototype.replaceArray = function(find, replace) {
  var replaceString = this;
  var regex; 
  for (var i = 0; i < find.length; i++) {
  regex = new RegExp(find[i], "gi");
  replaceString = replaceString.replace(regex, replace[i]);
  }
  return replaceString;
  };

function replacer() {
  var elements = document.getElementsByTagName('*');
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    for (var j = 0; j < element.childNodes.length; j++) {
      var node = element.childNodes[j];
      if (node.nodeType == 3) {
        var text = node.nodeValue;
        var replacedText = text.replaceArray(keys, values)
        if (replacedText !== text) {
          element.innerHTML = replacedText;
          //element.replaceChild(document.createTextNode(replacedText), node);
        }
      }             
    }
  }
}

function replaceStart() {
  chrome.storage.sync.get(['keys', 'values'], function(result) {
  console.log("loaded")
  console.log(result)
  if (result.keys && result.values) {
    keys = result.keys
    values = result.values
  }
  console.log('Loading ReplaceR');
  });
}