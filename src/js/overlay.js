import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import imageCardTemplate from '../templates/imageCardTemplate.hbs';

let instance;
let closeBtnRef;

export default function openImageOverlay(id) {
    const data = getImageObjectFromLocalStorage(id);
    const markUp = imageCardTemplate(data);
    instance = basicLightbox.create(markUp);
    instance.show();
    closeBtnRef = document.querySelector('.close-btn');
    closeBtnRef.addEventListener('click', onCloseBtnHandler);
}

function onCloseBtnHandler() {
    instance.close();
    closeBtnRef.removeEventListener('click', onCloseBtnHandler);
}

function getImageObjectFromLocalStorage(id) {
    const string = localStorage.getItem('responseObj');
    const objArr = JSON.parse(string);
    const imageObj = objArr.find(obj => obj.id == id);
    return imageObj;
}
