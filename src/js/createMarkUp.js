import searchResultTemplate from '../templates/imagesSearchResult.hbs';

export default function createMarkUp(data, parent) {
    const markUp = searchResultTemplate(data);
    parent.insertAdjacentHTML('beforeend', markUp);
}
