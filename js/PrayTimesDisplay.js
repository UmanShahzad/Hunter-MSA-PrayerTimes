'use strict';

const MILLIS_IN_MINUTE = 1000*60;

var fajrElement      = document.getElementById('fajr');
var fajrTableHead    = document.getElementById('fajr-th');
var sunriseElement   = document.getElementById('sunrise');
var sunriseTableHead = document.getElementById('sunrise-th');
var dhuhrElement     = document.getElementById('dhuhr');
var dhuhrTableHead   = document.getElementById('dhuhr-th');
var asrElement       = document.getElementById('asr');
var asrTableHead     = document.getElementById('asr-th');
var maghribElement   = document.getElementById('maghrib');
var maghribTableHead = document.getElementById('maghrib-th');
var ishaElement      = document.getElementById('isha');
var ishaTableHead    = document.getElementById('isha-th');

fajrElement.innerHTML    = times.fajr;
sunriseElement.innerHTML = times.sunrise;
dhuhrElement.innerHTML   = times.dhuhr;
asrElement.innerHTML     = times.asr;
maghribElement.innerHTML = times.maghrib;
ishaElement.innerHTML    = times.isha;

async function highlightPrayer(nowHour, nowMinute) {
    var highlightStyle = 'color: #F3E76D; text-shadow: 0 0 2px #F3E76D, 0 0 10px #F3E76D';

    if (nowHour == fajrRaw.hour && nowMinute == fajrRaw.minute) {
        fajrTableHead.setAttribute('style', highlightStyle);
    } else if (nowHour == sunriseRaw.hour && nowMinute == sunriseRaw.minute) {
        sunriseTableHead.setAttribute('style', highlightStyle);
    } else if (nowHour == dhuhrRaw.hour && nowMinute == dhuhrRaw.minute) {
        dhuhrTableHead.setAttribute('style', highlightStyle);
    } else if (nowHour == asrRaw.hour && nowMinute == asrRaw.minute) {
        asrTableHead.setAttribute('style', highlightStyle);
    } else if (nowHour == maghribRaw.hour && nowMinute == maghribRaw.minute) {
        maghribTableHead.setAttribute('style', highlightStyle);
    } else if (nowHour == ishaRaw.hour && nowMinute == ishaRaw.minute) {
        ishaTableHead.setAttribute('style', highlightStyle);
    } else {
        // We choose sunrise as the default because usually the screen and browser
        // will startup in the morning, after sunrise but before dhuhr.
        sunriseTableHead.setAttribute('style', highlightStyle);
    }
}

// Check for a highlight update every minute.
setInterval(function () {
    var now = new Date();
    highlightPrayer(now.getHours(), now.getMinutes());
}, MILLIS_IN_MINUTE);
