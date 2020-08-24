import fetchImages from './API/apiService';
import createMarkUp from './createMarkUp';
import openImageOverlay from './overlay';
import '../css/grid-gallery.css';
import notifications from './notifications';

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

const ioOptions = {
    rootMargin: '800px',
};

const io = new IntersectionObserver(onEntry, ioOptions);

refs.searchForm.addEventListener('submit', searchFormHandler);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnHandler);
refs.gallery.addEventListener('click', onImageClickHandler);

function searchFormHandler(event) {
    event.preventDefault();
    queryObject.searchValue = event.target.elements.query.value;
    if (queryObject.searchValue) {
        clearPreviousResult();
        getImagesList();
    } else {
        notifications.emptyQueryError();
    }
}

async function onLoadMoreBtnHandler() {
    queryObject.page++;
    await getImagesList();
    scroll();
}

function scroll() {
    const coordY = window.scrollY + window.innerHeight - 98;
    const scrollOptions = {
        top: coordY,
        behavior: 'smooth',
    };
    window.scrollTo(scrollOptions);
}

function onImageClickHandler(event) {
    event.preventDefault();
    if (event.target.nodeName === 'IMG') {
        const id = event.target.dataset.id;
        openImageOverlay(id);
    }
}

async function getImagesList() {
    const data = await fetchImages(queryObject).catch(error =>
        notifications.fetchError(error),
    );
    if (data) {
        if (data.length > 0) {
            writeResponseToLocalStorage(data);
            createMarkUp(data, refs.gallery);
            if (!refs.searchForm.classList.contains('search-form--fixed-top')) {
                refs.searchForm.classList.add('search-form--fixed-top');
            }
            refs.loadMoreBtn.classList.add('btn-load-more--vissible');
            io.observe(refs.loadMoreBtn);
        } else {
            notifications.alertNoResult();
        }
    }
}

function writeResponseToLocalStorage(data) {
    const prevStringValue = localStorage.getItem('responseObj');
    const prevObjValue = JSON.parse(prevStringValue);
    if(prevObjValue){
        data.push(...prevObjValue)
    }
    const string = JSON.stringify(data);
    localStorage.setItem('responseObj', string);
}
function clearPreviousResult() {
    queryObject.page = 1;
    refs.gallery.innerHTML = '';
    localStorage.removeItem('responseObj');
}

function onEntry(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            queryObject.page++;
            getImagesList();
        }
    });
}
