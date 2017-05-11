'use strict';

const MILLIS_IN_MINUTE = 1000*60;

//var ismakElement   = document.getElementById('ismak');
//var ismakTableHead = document.getElementById('ismak-th');
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
//var midnightElement = document.getElementById('midnight');
//var midnightTableHead = document.getElementById('midnight-th');

/* Sets the prayer times text. */
//ismakElement.innerHTML = times.ismak;
fajrElement.innerHTML    = times.fajr;
sunriseElement.innerHTML = times.sunrise;
dhuhrElement.innerHTML   = times.dhuhr;
asrElement.innerHTML     = times.asr;
maghribElement.innerHTML = times.maghrib;
ishaElement.innerHTML    = times.isha;
//midnightElement.innerHTML = times.midnight;

function highlightPrayer(nowHour, nowMinute) {
    unhighlightPrayers();
    var highlightStyle = 'color: #F3E76D; text-shadow: 0 0 2px #F3E76D, 0 0 10px #F3E76D';
    var now = nowHour + (nowMinute / 60.0);
    if (_times.fajr <= now && now < _times.sunrise) {
        fajrTableHead.setAttribute('style', highlightStyle);
    } else if (_times.sunrise <= now && now < _times.dhuhr) {
        sunriseTableHead.setAttribute('style', highlightStyle);
    } else if (_times.dhuhr <= now && now < _times.asr) {
        dhuhrTableHead.setAttribute('style', highlightStyle);
    } else if (_times.asr <= now && now < _times.maghrib) {
        asrTableHead.setAttribute('style', highlightStyle);
    } else if (_times.maghrib <= now && now < _times.isha) {
        maghribTableHead.setAttribute('style', highlightStyle);
    } else {
        ishaTableHead.setAttribute('style', highlightStyle);
    }
}

function unhighlightPrayers() {
    fajrTableHead.removeAttribute('style');
    sunriseTableHead.removeAttribute('style');
    dhuhrTableHead.removeAttribute('style');
    asrTableHead.removeAttribute('style');
    maghribTableHead.removeAttribute('style');
    ishaTableHead.removeAttribute('style');
}

// Check for a highlight update every minute.
setInterval(function () {
    var now = new Date();
    highlightPrayer(now.getHours(), now.getMinutes());
}, MILLIS_IN_MINUTE);
