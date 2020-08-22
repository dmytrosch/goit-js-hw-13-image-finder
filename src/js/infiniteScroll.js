const InfiniteScroll = require('infinite-scroll');

const infScroll = new InfiniteScroll(refs.gallery, {
    // options
    path: function () {
        queryObject.page++;
        return `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${queryObject.searchValue}&page=${queryObject.page}&per_page=${queryObject.resultsPerPage}&key=${queryObject.API_KEY}`;
    },
    append: 'li',
    history: false,
    responseType: 'text',
});

infScroll.on('load', function (response) {
    // parse response into JSON data
    var data = JSON.parse(response);
    // compile data into HTML
    var itemsHTML = data.map(getItemHTML).join('');
    // convert HTML string into elements
    refs.gallery.innerHTML = itemsHTML;
    // append item elements
    var items = proxyElem.querySelectorAll('li');
    infScroll.appendItems(items);
});
