const searchBtn = document.getElementById('search-btn');
let inputMovie = document.querySelector('#input-movie');
const poster = document.querySelector('.posters');

// Data
const apiHost = 'https://api.themoviedb.org';
const imageHost = 'https://image.tmdb.org/t/p/w300/';
const searchMovies = '/3/search/movie';
const apiKey = 'd497820dd50143376ccc71f1b2148479';


// Functions
searchBtn.addEventListener('click', () => {

    const response = getMovie();
    response.then(onDataReceived);
});

const onDataReceived = (response) => {
    console.log(response);
    poster.innerHTML = '';
    response.results.forEach(film => {
        if (film.poster_path === null) return;
        const img = document.createElement('img');
        img.style.padding = '10px';
        const posterLink = imageHost + film.poster_path;
        img.src = posterLink
        poster.append(img);
    });

};



// API part
const getMovie = () => {
    let response = $.ajax(apiHost + searchMovies + `?api_key=${apiKey}&query=${inputMovie.value}`);
    return response;
}