chrome.contextMenus.create({
    title: "Style options:",
    contexts:["page"]
});

chrome.contextMenus.create({
    title: "  - Colour escalation 1",
    contexts:["page"],
    onclick: function1
});

chrome.contextMenus.create({
    title: "  - Colour escalation 2",
    contexts:["page"],
    onclick: function2
});

chrome.contextMenus.create({
    title: "  - Darkmode",
    contexts:["page"],
    onclick: function3
});

chrome.contextMenus.create({
    title: "  - Random Font Color",
    contexts:["page"],
    onclick: function4
});

chrome.contextMenus.create({
    title: "  - Kill images",
    contexts:["page"],
    onclick: function5
});

chrome.contextMenus.create({
    title: "  - Make website naked (disable css)",
    contexts:["page"],
    onclick: function17
});

chrome.contextMenus.create({
    title: "Social media pages options (instagram/tiktok/discord):",
    contexts:["page"]
});

chrome.contextMenus.create({
    title: "  - Download/View profile picture of this profile",
    contexts:["page"],
    onclick: function30
});

chrome.contextMenus.create({
    title: "  - Download/View picture of this post",
    contexts:["page"],
    onclick: function28
});

chrome.contextMenus.create({
    title: "  - Download/View video of this post",
    contexts:["page"],
    onclick: function29
});

chrome.contextMenus.create({
    title: "  - Download/View video of this insta story",
    contexts:["page"],
    onclick: function33
});

chrome.contextMenus.create({
    title: "  - Download/View last discord emoji in chat",
    contexts:["page"],
    onclick: function34
});

chrome.contextMenus.create({
    title: "Misc options:",
    contexts:["page"]
});

chrome.contextMenus.create({
    title: "  - Visit download page of this extension",
    contexts:["page"],
    onclick: function6
});

chrome.contextMenus.create({
    title: "  - Search on social media sites (must have marked something for use)",
    contexts:["page"]
});

chrome.contextMenus.create({
    title: "  - Translate (must have marked something for use)",
    contexts:["page"]
});

chrome.contextMenus.create({
    title: "Translate (with google translator)",
    contexts:["selection"],
    onclick: function27
});

chrome.contextMenus.create({
    title: "Search on:",
    contexts:["selection"]
});

chrome.contextMenus.create({
    title: "  - Instagram (MAYBE have to be logged in)",
    contexts:["selection"],
    onclick: function7
});

chrome.contextMenus.create({
    title: "  - Reddit",
    contexts:["selection"],
    onclick: function9
});

chrome.contextMenus.create({
    title: "  - Github",
    contexts:["selection"],
    onclick: function10
});

chrome.contextMenus.create({
    title: "  - Tiktok (this website NEEDS cookie usage permission)",
    contexts:["selection"],
    onclick: function8
});

chrome.contextMenus.create({
    title: "  - Youtube",
    contexts:["selection"],
    onclick: function13
});

chrome.contextMenus.create({
    title: "  - Twitch (this website NEEDS cookie usage permission)",
    contexts:["selection"],
    onclick: function25
});

chrome.contextMenus.create({
    title: "  - Steam (this website NEEDS cookie usage permission)",
    contexts:["selection"],
    onclick: function18
});

chrome.contextMenus.create({
    title: "  - Spotify (this website NEEDS cookie usage permission)",
    contexts:["selection"],
    onclick: function19
});

chrome.contextMenus.create({
    title: "  - Twitter",
    contexts:["selection"],
    onclick: function14
});

chrome.contextMenus.create({
    title: "  - Facebook",
    contexts:["selection"],
    onclick: function15
});

chrome.contextMenus.create({
    title: "  - Snapchat",
    contexts:["selection"],
    onclick: function20
});

chrome.contextMenus.create({
    title: "  - Vk",
    contexts:["selection"],
    onclick: function21
});

chrome.contextMenus.create({
    title: "  - Linkedin",
    contexts:["selection"],
    onclick: function22
});

chrome.contextMenus.create({
    title: "  - Telegram",
    contexts:["selection"],
    onclick: function23
});

chrome.contextMenus.create({
    title: "  - Tinder",
    contexts:["selection"],
    onclick: function24
});

chrome.contextMenus.create({
    title: "  - Mixxer",
    contexts:["selection"],
    onclick: function26
});

chrome.contextMenus.create({
    title: "  - Uplay (HAVE to be logged in)",
    contexts:["selection"],
    onclick: function31
});

chrome.contextMenus.create({
    title: "  - All above",
    contexts:["selection"],
    onclick: functionAllSearches
});

chrome.contextMenus.create
({
    title: "  - Disable scripts in source code",
    contexts:["page"],
    onclick: function16
});


chrome.contextMenus.create
({
    title: "Inject menu (menu is only graphical)",
    contexts:["page"],
    onclick: function11
});

chrome.contextMenus.create
({
    title: "Uninject menu",
    contexts:["page"],
    onclick: function12
});

chrome.contextMenus.create
({
    title: "Start Tab Sync",
    contexts:["page"],
    onclick: function35
});

chrome.contextMenus.create
({
    title: "Stop Tab Sync",
    contexts:["page"],
    onclick: function36
});

chrome.contextMenus.create
({
    title: "Reading mode",
    contexts:["page"],
    onclick: function37
});



function function1() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, "lsdmodus");  
    });
}

function function2() 
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, "überdosis");  
    });
}

function function3() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, "darkmode");  
    });
}

function function4() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, "rndmtextfarbe");  
    });
}

function function5() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, "killimages");  
    });
}

function function6() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, "visitmclicker");  
    });
}

function function7(selectedText) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var name = selectedText.selectionText;
        var sendMsg = "searchOnInsta" + name;
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
}

function function8(selectedText) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var name = selectedText.selectionText;
        var sendMsg = "searchOnTiktok" + name;
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
}

function function9(selectedText) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var name = selectedText.selectionText;
        var sendMsg = "searchOnReddit" + name;
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
}

function function10(selectedText) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var name = selectedText.selectionText;
        var sendMsg = "searchOnGithub" + name;
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
}

function function11() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, "injectMenu");  
    });
}

function function12() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, "uninjectMenu");  
    });
}

function function13(selectedText) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var name = selectedText.selectionText;
        var sendMsg = "searchOnYoutube" + name;
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
}

function function14(selectedText) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var name = selectedText.selectionText;
        var sendMsg = "searchOnTwitter" + name;
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
}

function function15(selectedText) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var name = selectedText.selectionText;
        var sendMsg = "searchOnFacebook" + name;
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
}

function function16() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, "deleteScripts");  
    });
}

function function17() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, "deleteCss");  
    });
}

function function18(selectedText) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var name = selectedText.selectionText;
        var sendMsg = "searchOnSteam" + name;
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
}

function function19(selectedText) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var name = selectedText.selectionText;
        var sendMsg = "searchOnSpotify" + name;
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
}

function function20(selectedText) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var name = selectedText.selectionText;
        var sendMsg = "searchOnSnapchat" + name;
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
}

function function21(selectedText) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var name = selectedText.selectionText;
        var sendMsg = "searchOnVk" + name;
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
}

function function22(selectedText) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var name = selectedText.selectionText;
        var sendMsg = "searchOnLinkedin" + name;
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
}

function function23(selectedText) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var name = selectedText.selectionText;
        var sendMsg = "searchOnTelegram" + name;
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
}

function function24(selectedText) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var name = selectedText.selectionText;
        var sendMsg = "searchOnTinder" + name;
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
}

function function25(selectedText) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var name = selectedText.selectionText;
        var sendMsg = "searchOnTwitch" + name;
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
}

function function26(selectedText) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var name = selectedText.selectionText;
        var sendMsg = "searchOnMixxer" + name;
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
}

function function27(selectedText) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var name = selectedText.selectionText;
        var sendMsg = "translate" + name;
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
}

function function28() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var sendMsg = "getInstaPic";
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
     
}

function function29() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var sendMsg = "getInstaVid";
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
     
}

function function30() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var sendMsg = "getInstaPicOfUser";
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
     
}

function function31(selectedText) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var name = selectedText.selectionText;
        var sendMsg = "searchOnUplay" + name;
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
}

function function33() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var sendMsg = "getInstaStory";
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
     
}

function functionAllSearches (selectedText) 
{
    function7(selectedText); 
    function9(selectedText); 
    function10(selectedText); 
    function8(selectedText); 
    function13(selectedText); 
    function19(selectedText); 
    function17(selectedText); 
    function14(selectedText); 
    function15(selectedText);    
    function20(selectedText);
    function21(selectedText);
    function22(selectedText);
    function23(selectedText);
    function24(selectedText);
    function25(selectedText);
    function26(selectedText);
    function31(selectedText);
}

function saveImgAlert() 
{
    setTimeout(function() 
    {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var sendMsg = "saveImgAlert";
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
        });
    }, 500);
}

function saveVidAlert() 
{
    setTimeout(function() 
    {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var sendMsg = "saveVidAlert";
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
        });
    }, 500);
}

function function34() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var sendMsg = "getLastEmoji";
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
}

chrome.commands.onCommand.addListener(function(command) {
    if (command == "toggle-feature") {
      console.log("openMenu");  
      function11();
    }
    else {console.log(command);}
  });

  
function time() {
    var date = new Date();
        var hours = date.getHours(); hours = numVal(hours, 2);
        var mins = date.getMinutes(); mins = numVal(mins, 2);
        var secs = date.getSeconds(); secs = numVal(secs, 2);
        var ms = date.getMilliseconds(); ms = numVal(ms, 3);
        var timeStamp = " [" + hours + ':' + mins + ':' + secs + ':' + ms + "]"
        return timeStamp;
    }

    function numVal(x, n) 
        {
            x = x.toString();
            while(x.length != n) 
            { x = '0' + x; }
            return x;
        }

  function function35() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        w2gStatus = 1;
        sendW2gStatus(tabs[0].id);
        log("start Tab Sync in Tab id: " + tabs[0].id, "orange");
      });
  }
  
  function function36() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        w2gStatus = 0;
        w2gStatusInterval = 0;
        sendW2gStatus(tabs[0].id);
        log("stop Tab Sync in Tab id: " + tabs[0].id, "red");
      });
  }
  
function log(str, color, size) {
    str = str + time();
    if(color != undefined && size != undefined) {console.log("%c"+str, "color: " + color + "; font-style: italic; font-size: "+size+"px");}
    else if(color != undefined) {console.log("%c"+str, "color: " + color + "; font-style: italic;");}
    else if(size != undefined) {console.log("%c"+str, "font-style: italic; font-size: "+size+"px");}
    else {console.log(str);}
}


var w2gStatus = 0;
var w2gStatusInterval = 0;
var w2gTabId;
var w2gRoom;

function sendW2gStatus(tabId, type) {
    //log("Type: " + type + ", Room: " + w2gRoom + ", w2gStatus : " + w2gStatus + ", w2gStatusInt: " + w2gStatusInterval, "orange")
    if(w2gStatus == 0) {
        var sendMsg = "stopW2g";
        chrome.tabs.sendMessage(tabId, sendMsg);
    }
    else if(type == 2 && Number.isInteger(w2gRoom) && w2gStatusInterval == 1) {
        var sendMsg = "keepW2g" + w2gRoom;
        //log(sendMsg, "orange");
        chrome.tabs.sendMessage(tabId, sendMsg);
        setTimeout(function() {sendW2gStatus(tabId, 2);}, 100);
    }
    else if(w2gStatus == 1) {
        var sendMsg = "startW2g";
        w2gTabId = tabId;
        chrome.tabs.sendMessage(tabId, sendMsg);
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        /*log(sender.tab ?
            "from a content script: url = " + sender.tab.url + ", tab id = " + sender.tab.id:
            "from the extension");*/
    if(request.w2g) 
    {
        request.w2g = request.w2g.toString();
        if(request.w2g.includes("stop")) {w2gStatus = 0; log("Tab Sync stop", "red"); w2gStatusInterval = 0; w2gTabId = 0; w2gRoom = 0;}
        else {
            w2gRoom = Number(request.w2g); log("Room: " + w2gRoom, "lime"); 
            if(w2gStatusInterval == 0) {w2gStatusInterval = 1; sendW2gStatus(w2gTabId, 2); log(w2gTabId + ", " +2, "orange");}
            else {log("ERR: Tab Sync Interval: " + w2gStatusInterval, "red");}
        }
    }
    else {log("REQ: " + request, "red")}
    });

    log("Sebs extension backgroundscript successfully loaded!", "lime");

    function hotkeyW2g() {
        if(w2gStatus == 0) {function35();}
        else if(w2gStatus == 1) {function36(); w2gStatus = 0;  w2gStatusInterval = 0;}
    }
    
chrome.commands.onCommand.addListener(function(command) {
    if(command == "w2g") {hotkeyW2g();}
  });

  const defaultFilters = [
	"*://*.doubleclick.net/*",
	"*://partner.googleadservices.com/*",
	"*://*.googlesyndication.com/*",
	"*://*.google-analytics.com/*",
	"*://creative.ak.fbcdn.net/*",
	"*://*.adbrite.com/*",
	"*://*.exponential.com/*",
	"*://*.quantserve.com/*",
	"*://*.scorecardresearch.com/*",
    "*://*.zedo.com/*",
    "*://googleads.g.doubleclick.net/pagead/*",
    "*://youtube.com/pagead/*",
    //"*://*.google.*/pagead/*",
    "*://ad.youtube.com/*",
    "*://*.googlesyndication.com/*",
    "*://*/youtube.com/ad_companion",
    //"*://*.youtube.com/yts/jsbin/*", //infos + empfehlungen
    //www.youtube.com/yts/jsbin/desktop_polymer_inlined_html_polymer_flags-vfl66JsAa/* // "  "
    "*://*.youtube.com/pcs/*",
    "*://pagead2.googlesyndication.com/*",
    "*://www.youtube.com/pagead/*",
    "*://static.doubleclick.net/*/*",
    //"*://*.googlevideo.com/*", // video ansich
    "*://adservice.google.de/adsid/*",
    "*://*.amazon-adsystem.com/*",
    "*://*.google.com/js/bg/*",
    "*://*.youtube.com/api/stats/*",
    "http://www.youtube.com/ptracking?*",
    "https://www.youtube.com/ptracking?*",
    "http://www.youtube.com/get_video_info?*",
    "https://www.youtube.com/get_video_info?*",
    "*://*.doubleclick.net/*",
    "*://*.youtube.com/pagead/*",
    "*://*.google.com/pagead/*",
    "*://*.googlesyndication.com/*",
    "*://static.doubleclick.net/*",
    "*://*.doubleclick.net/pagead/*",
    "*://*.google.de/pagead/*",
    "*://googleads.g.doubleclick.net/pagead/*",
]

chrome.webRequest.onBeforeRequest.addListener(
    function(details) { return { cancel: true }},
    { urls: defaultFilters },
    ["blocking"]
)

function function37() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var sendMsg = "readingMode";
        chrome.tabs.sendMessage(tabs[0].id, sendMsg);  
    });
}