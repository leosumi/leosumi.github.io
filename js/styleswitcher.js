"use strict";

function setActiveStyleSheet(title) {
    var a;
    for (var i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
        if (a.getAttribute("rel").indexOf("style") != -1 &&
            a.getAttribute("title")
            ) {
            a.disabled = true;
            if (a.getAttribute("title") == title) {
                a.disabled = false;
            }
        }
    }
}

function getActiveStyleSheet() {
    var a;
    for (var i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
        if (a.getAttribute("rel").indexOf("style") != -1 &&
            a.getAttribute("title") &&
            !a.disabled
            ) {
            return a.getAttribute("title");
        }
    }
    return null;
}

function getPreferredStyleSheet() {
    var a;
    for (var i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
        if (a.getAttribute("rel").indexOf("style") != -1 &&
            a.getAttribute("rel").indexOf("alt") == -1 &&
            a.getAttribute("title")
            ) {
            return a.getAttribute("title");
        }
    }
    return null;
}

function createCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
}

window.onload = function() {
    var cookie = readCookie("style");
    var title = cookie ? cookie : getPreferredStyleSheet();
    setActiveStyleSheet(title);
};

window.onunload = function() {
    var title = getActiveStyleSheet();
    createCookie("style", title, 365);
};

var cookie = readCookie("style");
var title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);
