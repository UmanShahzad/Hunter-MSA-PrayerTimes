'use strict';

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
var currentTimeContent = document.getElementById('current-time-content');

/* Sets the prayer times text. */
//ismakElement.innerHTML = times.ismak;
fajrElement.innerHTML    = times.fajr;
sunriseElement.innerHTML = times.sunrise;
dhuhrElement.innerHTML   = times.dhuhr;
asrElement.innerHTML     = times.asr;
maghribElement.innerHTML = times.maghrib;
ishaElement.innerHTML    = times.isha;
//midnightElement.innerHTML = times.midnight;

function highlightPrayer(hour, minute) {
    var highlightStyle = 'color: #F3E76D; text-shadow: 0 0 2px #F3E76D, 0 0 10px #F3E76D';
    var time = hour + (minute / 60.0);
    if (_times.fajr <= time && time < _times.sunrise) {
        fajrTableHead.setAttribute('style', highlightStyle);
    } else if (_times.sunrise <= time && time < _times.dhuhr) {
        sunriseTableHead.setAttribute('style', highlightStyle);
    } else if (_times.dhuhr <= time && time < _times.asr) {
        dhuhrTableHead.setAttribute('style', highlightStyle);
    } else if (_times.asr <= time && time < _times.maghrib) {
        asrTableHead.setAttribute('style', highlightStyle);
    } else if (_times.maghrib <= time && time < _times.isha) {
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

function zeroPadder(n) {
    n = parseInt(n, 10);
    return (n < 10)? "0" + n : n;
}

function getFormattedTime(time) {
	var hh = time.getHours() % 12 || 12;
	var mm = time.getMinutes();
	var ss = time.getSeconds();
	var period = (hh >= 12 ? "pm" : "am");
    return hh + ":" + zeroPadder(mm) + " " + period;
}

function updateCurrentTimeDisplay(time) {
    currentTimeContent.innerHTML = getFormattedTime(time);
}

function updatePrayerHighlight(time) {
    unhighlightPrayers();
    highlightPrayer(time.getHours(), time.getMinutes());
}

setInterval(function() {
    var now = new Date();
    updatePrayerHighlight(now)
}, 1000*60);
setInterval(function() {
    var now = new Date();
    updateCurrentTimeDisplay(now)
}, 1000);
