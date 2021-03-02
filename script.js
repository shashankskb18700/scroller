const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0;
let totalImage = 0;

let photosArray = [];

let count = 5;
const apiKey = "NX6Bgo_utS3VXDcea98ry5zBF225ymNKXFqPAdqbTJE";

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all imgae is loaded 
function imageloaded() {
  
  imagesLoaded++;
  if (imagesLoaded === totalImage) {
    ready = true;
    loader.hidden = true;
    count = 30;
    
  }
}
function displayPhotos() { 
  imagesLoaded = 0
  totalImage = photosArray.length;
  
  photosArray.forEach((photo) => {
    //creating <a> n link to unsplash 
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');

    //creatin <img> attribute 
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);
    img.addEventListener('load',imageloaded)
    //put <img> inside <a> then put both inside image container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

async function getPhotos() {

  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    
    
    displayPhotos();
  } catch (error) {
    //catch error
  } 
}
//checking scroll event 
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
   
    getPhotos();
    
  }
  
})

//On load
getPhotos();