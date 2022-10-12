window.onload = replacer();

document.addEventListener('DOMContentLoaded', function() {
  replacer();
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	console.log(request);
  setTimeout(function() {
    sendResponse({status: true});
    replacer();
  }, 1);
});

var data = undefined;
var order = undefined;

const burger_url = chrome.runtime.getURL('images/burger.png');
const pizza_url = chrome.runtime.getURL('images/pizza.png');
const french_url = chrome.runtime.getURL('images/french-fries.png');
const chicken_url = chrome.runtime.getURL('images/chicken-leg.png');

function replaceIcons() {
  console.log('replacing icons');  
  var icons = document.getElementsByClassName('x1b0d499 x1d69dk1');
  if ( !icons ) return;
  var i;
  console.log(icons.length);
  for (i = 0; i < icons.length; i++) {
    if ( icons[i].style.backgroundPosition == "0px -251px" ) {
      icons[i].style.backgroundImage = "url("+burger_url+")";
      icons[i].style.backgroundSize = "contain";
      icons[i].style.backgroundPosition = "0px 0px";
    }
    if ( icons[i].style.backgroundPosition == "0px -213px" ) { 
      icons[i].style.backgroundImage = "url("+pizza_url+")";
      icons[i].style.backgroundSize = "contain";
      icons[i].style.backgroundPosition = "0px 0px";
    }
    if ( icons[i].style.backgroundPosition == "0px -270px" ) { 
      icons[i].style.backgroundImage = "url("+french_url+")";
      icons[i].style.backgroundSize = "contain";
      icons[i].style.backgroundPosition = "0px 0px";
    }
    if ( icons[i].style.backgroundPosition == "-125px -99px" ) { 
      icons[i].style.backgroundImage = "url("+chicken_url+")";
      icons[i].style.backgroundSize = "contain";
      icons[i].style.backgroundPosition = "0px 0px";
    }
  }
}

function replacer() {
  chrome.storage.local.get(['data', 'order'], function(result) {
    console.log('replacing');  
    replaceIcons();
    data = result.data;
    order = result.order;
    //var container = document.body;
    var target;
    var all = document.querySelectorAll("h1,p,h3,h2,a,span");
    //var all = document.getElementsByTagName("p");

    var i = 0;
    //for ( i=0; i<all.length; i++) {
    all.forEach(el => {
      //el = all[i];
      //el = document.body;
      order.forEach( find => {
        target = data[find];
        regex = new RegExp(find, "gi");
        const instance = findAndReplaceDOMText(el, {
          preset: 'prose',
          find: regex,
          wrap: 'span', 
          wrapClass: 'yellow', 
          replace: target, 
          filterElements: function(el) {
            if (el.getAttribute) {
              if (el.getAttribute('class')=='yellow') {
                return false;
              } else {
                return true;
              }
            }
          }
        });
      });
    //};
    });
  });
}

function observeDOMChanges() {
  observer = new MutationObserver(function (mutationsList) {
    for (var mutation of mutationsList) {
      mutation.addedNodes.forEach(node => {
        if (node.childElementCount) {
          order.forEach( find => {
            target = data[find];
            regex = new RegExp(find, "gi");
            const instance = findAndReplaceDOMText(node, {
              preset: 'prose',
              find: regex,
              wrap: 'span', 
              wrapClass: 'yellow', 
              replace: target, 
              filterElements: function(el) {
                if (el.getAttribute) {
                  if (el.getAttribute('class')=='yellow') {
                    return false;
                  } else {
                    return true;
                  }
                }
              }
            });
          });
        }
      })
      replaceIcons();
    };
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

setTimeout(() => {
  observeDOMChanges();
}, 3000);