const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

// UnSplash API
let initialCount = 5;
const apiKey = config.api_Key;
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

// Slow network 
function updateAPI(picCount){
    apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
}

// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper Function
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {

        // Create <a> element to link to UnSplash
        const item = document.createElement('a');
        setAttributes(item, {
            href : photo.links.html,
            target : '_blank'
        });

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// GET Photos from UnSplash
async function getPhotos(){
    try{
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
        if(isInitialLoad){
            updateAPI(30);
            isInitialLoad = false;
        }
    }catch(error){
        console.log(error);
    }
}

// Scroll event
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        ready = false;
        getPhotos(); 
    }
});

// Onload
getPhotos();



// Comments Section...
// item.setAttribute('href', photo.links.html);
// item.setAttribute('target', '_blank');
// img.setAttribute('src', photo.urls.regular);
// img.setAttribute('alt', photo.alt_description);
// img.setAttribute('title', photo.alt_description);