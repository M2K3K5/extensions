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
        x[i].style.backgroundColor = "black";  
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
var y = 0;

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
var y = 0;

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
    window.location.href = "https://m2k3k5.github.io/moneyclicker/"; 
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

function injectMenu() 
{
    var menuElements = "<div id='SebExtensionMenuDiv' style='background-color: #333; color: lime; width: 230px; height: auto; margin: 0px; padding: 0px; float: right; z-index: 99; position: fixed; right: 10px; top: 10px;'>    <header id='SebExtensionHeader' style='height: 47px; width: 100%; background-image: url(https://raw.githubusercontent.com/M2K3K5/extensions/gh-pages/Impulse%2020%20by%20seb.jpg); background-size: 100%; background-repeat: no-repeat; margin-bottom: 0px;'></header>    <h6 style='text-align: center; margin: 1px 0px 1px 0px; padding: 0px; color: lime;'>Seb's Mod Menu</h6>    <div id='SebExtensionMenuContentDiv' style='padding: 0px 10px 0px 10px; background-color: #222; margin-top: 0px; width: 200px; height: auto; margin-left: 5px; border-radius: 3px; font-size: 80%; '>                           <p style='margin-top: 0px; padding: 0px;margin-block-start: 0em; margin-block-end: 0em;'>LSD mode</p>            <p>Colour escalation</p>            <p>Darkmode</p>            <p>Random font color</p>            <p>Kill images</p>            <p>Money Clicker</p>            <p style='margin-block-end: 0em;'>Search marked text on several social media pages</p>                   </div>    <footer id='SebExtensionFooter' style='background-image: url(https://raw.githubusercontent.com/M2K3K5/extensions/gh-pages/icon2.png); background-size: 6%; background-repeat: no-repeat; width: 100%; height: 15px; margin: 2px 107px 0px 107px;'></footer></div>";
    document.body.innerHTML += menuElements;
}