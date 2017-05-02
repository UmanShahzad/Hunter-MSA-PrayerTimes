'use strict';

var FLIER_COUNT = 4;

 /**
  * FROM: http://stackoverflow.com/a/14731922
  * Conserve aspect ratio of the orignal region. Useful when shrinking/enlarging
  * images to fit into a certain area.
  *
  * @param {Number} srcWidth Source area width
  * @param {Number} srcHeight Source area height
  * @param {Number} maxWidth Fittable area maximum available width
  * @param {Number} maxHeight Fittable area maximum available height
  * @return {Object} { width, height }
  */
function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth*ratio, height: srcHeight*ratio };
 }

/**
 * Adjust the size of a flier to look well on the screen.
 * @param {Number} id The id of the flier, ranging from 1 to 4, inclusive.
 */
function adjustFlierSizeById(id) {
    var flier = document.getElementById(id);

    flier.width = calculateAspectRatioFit(
        flier.naturalWidth, flier.naturalHeight,
        (window.innerWidth / FLIER_COUNT) - FLIER_COUNT*10, window.innerHeight
    ).width;

    flier.height = calculateAspectRatioFit(
        flier.naturalWidth, flier.naturalHeight,
        (window.innerWidth / FLIER_COUNT) - FLIER_COUNT*10, window.innerHeight
    ).height;
}


document.getElementById('fliers').innerHTML = '';
for (var i = 1; i <= FLIER_COUNT; ++i) {
    document.getElementById('fliers').innerHTML += `
        <div class="col-lg-3">
            <img id="flier${i}" src="../../../${i}.jpg" />
        </div>
    `;
}


setTimeout(function () {
    adjustFlierSizeById('flier1');
    adjustFlierSizeById('flier2');
    adjustFlierSizeById('flier3');
    adjustFlierSizeById('flier4');
}, 1);

window.onresize = function() {
    for (var i = 1; i <= FLIER_COUNT; ++i) {
        adjustFlierSizeById(i);
    }
}
