'use strict';

document.getElementById('fliers').innerHTML = '';

for (var i = 1; i <= 4; ++i) {
    document.getElementById('fliers').innerHTML += `
        <div class="col-lg-3">
            <img id="flier${i}" src="../../../${i}.jpg" width="${window.innerWidth / 4}px" height="${window.innerHeight}px"/>
        </div>
    `;
}

window.onresize = function() {
    for (var i = 1; i <= 4; ++i) {
        document.getElementById('flier'+i).width  = window.innerWidth / 4;
        document.getElementById('flier'+i).height = window.innerHeight;
    }
}
