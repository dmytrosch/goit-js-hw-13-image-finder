import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import imageCardTemplate from '../templates/imageCardTemplate.hbs';

export default function openImageOverlay(id) {
    const data = getImageObjectFromLocalStorage(id);
    const markUp = imageCardTemplate(data);
    const instance = basicLightbox.create(markUp);
    instance.show();
}

function getImageObjectFromLocalStorage(id) {
    const string = localStorage.getItem('responseObj');
    const objArr = JSON.parse(string);
    const imageObj = objArr.find(obj => obj.id == id);
    return imageObj;
}
