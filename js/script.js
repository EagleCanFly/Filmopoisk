const searchBtn = document.getElementById('search-btn');
let inputMovie = document.querySelector('#input-movie');
const poster = $('.posters');

// Data
const apiHost = 'https://api.themoviedb.org';
const imageHost = 'https://image.tmdb.org/t/p/w300/';
const searchMovies = '/3/search/movie';
const apiKey = 'd497820dd50143376ccc71f1b2148479';


// Functions

const clickHandler = () => {
    const response = getMovie();
    response.then(onDataReceived);

};

// inputMovie.onkeypress = clickHandler;

searchBtn.addEventListener('click', () => {
    poster.empty();
    clickHandler();
});


const onDataReceived = (response) => {
    console.log(response);
    poster.innerHTML = '';
    const fismsSort = response.results.sort(function (a, b) {
        if (a.popularity < b.popularity) {
          return 1;
        }
        if (a.popularity > b.popularity) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      });
    fismsSort.forEach((film, item) => {
        if (film.poster_path === null) return;
        $(`<div class="block-${item}"></div>`).appendTo(poster);
        const block = $(`.block-${item}`);
        $(`<p class="title">${film.title}</p>`).appendTo(block);
        const img = document.createElement('img');
        img.style.padding = '10px';
        const posterLink = imageHost + film.poster_path;
        img.src = posterLink
        block.append(img);
    });

};



// API part
const getMovie = () => {
    let response = $.ajax(apiHost + searchMovies + `?api_key=${apiKey}&query=${inputMovie.value}`);
    return response;
}