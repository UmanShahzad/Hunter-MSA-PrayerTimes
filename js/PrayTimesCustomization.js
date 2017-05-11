'use strict';

Date.prototype.stdTimezoneOffset = function() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

Date.prototype.dst = function() {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}

var today = new Date();
var TIMEZONE_OFFSET = -5;

/* Please see http://praytimes.org/manual for details on API usage. */
prayTimes.setMethod('ISNA');
var times = prayTimes.getTimes(today, [40.76812151, -73.9640030], TIMEZONE_OFFSET, today.dst()? 1:0, '12h');

/* These come in float format.
 * Example:
 * 4:30am = 4.5
 * 12pm   = 12.0
 * 4:27pm = 16.45
 * 
 * They are used elsewhere for easy comparison with the current time.
 * 
 * NOTE: PrayerTimes.computeTimes had to be modified slightly for this to work.
 */
var _times = prayTimes.computeTimes();
