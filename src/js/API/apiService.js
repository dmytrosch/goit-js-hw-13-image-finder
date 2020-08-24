const BASE_URL = 'https://pixabay.com/api/';

export default function fetchImages({
    searchValue,
    page,
    API_KEY,
    resultsPerPage,
}) {
    const queryPreferences = `?image_type=photo&orientation=horizontal&q=${searchValue}&page=${page}&per_page=${resultsPerPage}&key=${API_KEY}`;
    return fetch(BASE_URL + queryPreferences)
        .then(response => response.json())
        .then(data => data.hits)
        
}
