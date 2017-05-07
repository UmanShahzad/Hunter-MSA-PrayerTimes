'use strict';

var dropbox = new Dropbox({ accessToken: 'WONT_WORK_UNTIL_YOU_FILL_THIS' });
var FLIER_COUNT;
var fliers = document.getElementById('fliers');
fliers.innerHTML = '';

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
        flier.width, flier.height,
        (window.innerWidth / FLIER_COUNT) - FLIER_COUNT*10, window.innerHeight
    ).width;

    flier.height = calculateAspectRatioFit(
        flier.width, flier.height,
        (window.innerWidth / FLIER_COUNT) - FLIER_COUNT*10, window.innerHeight
    ).height;
}

function getDropboxEntries() {
    dropbox.filesListFolder({ path: ''})
        .then(function(response) {
            console.log(response);
            FLIER_COUNT = response.entries.length;
            createSharedFilesLink(response.entries);
        })
        .catch(function(error) {
            console.log(error);
        });
}

function createSharedFilesLink(files) {
    for (var i = 0; i < files.length; ++i) {
        const id = 'flier' + i;
        var flierUrl;
        dropbox.sharingCreateSharedLink({
            path: files[i].path_display,
            pending_upload: { '.tag': 'file' } 
        })
            .then(function(response) {
                console.log(response);
                displayFlier(response.url, id);
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}

function displayFlier(flierUrl, id) {
    dropbox.sharingGetSharedLinkFile({ url: flierUrl })
        .then(function(data) {
            console.log(data);

            var flier_div = document.createElement('div');
            flier_div.setAttribute('class', 'col-lg-1');
            fliers.appendChild(flier_div);
            
            var flier = document.createElement('img');
            flier.setAttribute('id', id);
            flier.setAttribute('src', URL.createObjectURL(data.fileBlob));
            flier_div.appendChild(flier);
        })
        .catch(function(error) {
            console.log(error);
        });
}

getDropboxEntries();

setTimeout(function () {
    for (var i = 0; i < FLIER_COUNT; ++i) {
        adjustFlierSizeById('flier' + i);
    }

    $(document).ready(function() {
        $('#fliers').slick({
            autoplay: true,
            autoplaySpeed: 3000,
            pauseOnHover: false,
            speed: 2000,
            arrows: false,
            centerMode: false,
            centerPadding: '60px',
            slidesToShow: 3,
            responsive: [ {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }]
        });
    });
}, 3000);

window.onresize = function() {
    for (var i = 0; i < FLIER_COUNT; ++i) {
        adjustFlierSizeById('flier' + i);
    }
}
