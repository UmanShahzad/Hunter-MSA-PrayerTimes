'use strict';

var dropbox;
readTextFile('http://127.0.0.1:8000/apikey', function (request) {
    dropbox = new Dropbox({
        accessToken: request.responseText.replace(/(\r\n|\n|\r)/gm, '')
    });
    getDropboxEntries('/fliers');
    getDropboxEntries('/announcements');
});

var SECONDS_UNTIL_ADJUSTMENTS = 30;
var CAROUSEL_ELEMENT_COUNT;
var carousel = document.getElementById('carousel');
var text_content = document.getElementById('text-content');
carousel.innerHTML = '';
text_content.innerHTML = '';

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
function adjustCarouselElementSizeById(id) {
    var flier = document.getElementById(id);

    flier.width = calculateAspectRatioFit(
        flier.naturalWidth, flier.naturalHeight,
        screen.width, screen.height - 400
    ).width;

    flier.height = calculateAspectRatioFit(
        flier.naturalWidth, flier.naturalHeight,
        screen.width, screen.height - 400
    ).height;
}

function getDropboxEntries(dropbox_path) {
    dropbox.filesListFolder({ 
        path: dropbox_path
    }).then(function(response) {
        console.log(response);
        if (dropbox_path == '/fliers') {
            CAROUSEL_ELEMENT_COUNT = response.entries.length;
        }
        createSharedFilesLink(dropbox_path, response.entries);
    }).catch(function(error) {
        console.log(error);
    });
}

function createSharedFilesLink(path, files) {
    if (path == '/fliers') {
        for (var i = 0; i < files.length; ++i) {
            const id = 'carousel-' + i;
            dropbox.sharingCreateSharedLink({
                path: files[i].path_display,
                pending_upload: { '.tag': 'file' } 
            }).then(function(response) {
                console.log(response);
                displayElementOnCarousel(response.url, id);
            }).catch(function(error) {
                console.log(error);
            });
        }
    } else {
        dropbox.sharingCreateSharedLink({
            path: files[0].path_display,
            pending_upload: { '.tag': 'file' } 
        }).then(function(response) {
            console.log(response);
            displayTextContent(response.url);
        }).catch(function(error) {
            console.log(error);
        });
    }
}

function displayElementOnCarousel(flierUrl, id) {
    dropbox.sharingGetSharedLinkFile({
        url: flierUrl
    }).then(function(data) {
        console.log(data);
        var flier = document.createElement('img');
        flier.setAttribute('id', id);
        flier.setAttribute('src', URL.createObjectURL(data.fileBlob));
        flier.setAttribute('style', 'margin: 0px 30px 0px 0px;');
        carousel.appendChild(flier);
    }).catch(function(error) {
        console.log(error);
    });
}

function displayTextContent(textFileUrl) {
    dropbox.sharingGetSharedLinkFile({
        url: textFileUrl
    }).then(function(data) {
        console.log(data)
        readTextFile(URL.createObjectURL(data.fileBlob), function (request) {
            text_content.innerText = request.responseText;
        });
    }).catch(function(error) {
        console.log(error);
    });
}

function readTextFile(file, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", file, true);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200 || request.status == 0) {
                callback(request);
            }
        }
    }
    request.send(null);
}

setTimeout(function () {
    for (var i = 0; i < CAROUSEL_ELEMENT_COUNT; ++i) {
        adjustCarouselElementSizeById('carousel-' + i);
    }

    $(document).ready(function() {
        $('#carousel').slick({
            autoplay: true,
            autoplaySpeed: 0,
            pauseOnHover: false,
            speed: 5000,
            arrows: false,
            centerMode: true,
            centerPadding: '60px',
            infinite: true,
            slidesToShow: 3,
            variableWidth: true
        });
    });
}, SECONDS_UNTIL_ADJUSTMENTS*1000);

window.onresize = function() {
    for (var i = 0; i < CAROUSEL_ELEMENT_COUNT; ++i) {
        adjustCarouselElementSizeById('carousel-' + i);
    }
}
