import fetchImages from './API/apiService';
import createMarkUp from './createMarkUp';
import openImageOverlay from './overlay';
//импортнуть инфинит скролл

const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('#load-more'),
};
const queryObject = {
    searchValue: null,
    page: 1,
    API_KEY: '18005645-026721a3bcbfec7c434912a10',
    resultsPerPage: 12,
};

refs.searchForm.addEventListener('submit', searchFormHandler);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnHandler);
refs.gallery.addEventListener('click', onImageClickHandler);

function searchFormHandler(event) {
    event.preventDefault();
    queryObject.searchValue = event.target.elements.query.value;
    clearPreviousResult();
    getImagesList();
}

function onLoadMoreBtnHandler() {
    queryObject.page++;
    getImagesList();
}

function onImageClickHandler(event) {
    event.preventDefault();
    if (event.target.nodeName === 'IMG') {
        const id = event.target.dataset.id;
        openImageOverlay(id);
    }
}

async function getImagesList() {
    const data = await fetchImages(queryObject);
    writeResponseToLocalStorage(data);
    createMarkUp(data, refs.gallery);
}

function writeResponseToLocalStorage(data) {
    const string = JSON.stringify(data);
    localStorage.setItem('responseObj', string);
}
function clearPreviousResult() {
    queryObject.page = 1;
    refs.gallery.innerHTML = '';
    localStorage.removeItem('responseObj');
}
