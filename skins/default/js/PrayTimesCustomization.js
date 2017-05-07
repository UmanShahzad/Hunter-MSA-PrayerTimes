'use strict';

/* Please see http://praytimes.org/manual for details on API usage. */
prayTimes.setMethod('ISNA');
var times = prayTimes.getTimes(new Date(), [40.7685, 73.9646], 5, 1, '12h');

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
var _times     = prayTimes.computeTimes();
