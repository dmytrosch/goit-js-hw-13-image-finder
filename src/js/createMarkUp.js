import searchResultTemplate from '../templates/imagesSearchResult.hbs';

export default function createMarkUp(data, parent) {
    console.log(data);
    const markUp = searchResultTemplate(data);
    parent.insertAdjacentHTML('beforeend', markUp);
}
