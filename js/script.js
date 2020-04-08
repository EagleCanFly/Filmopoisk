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

// inputMovie.onkeydown = clickHandler;

$('#input-movie').keyup(function (event) {
  if (event.keyCode == 13) {
    poster.empty();
    clickHandler();
  }
});

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
    return 0;
  });
  fismsSort.forEach((film, item) => {
    if (film.poster_path === null) return;

    $(`<a href="https://www.kinopoisk.ru/index.php?kp_query=${film.title}" target="_blank"><div class="block block-${item}"></div></a>`).appendTo(poster);

    const block = $(`.block-${item}`);

    $(`<p class="title">${film.title}</p>`).appendTo(block);
    $(`<p class="vote">${film.vote_average}</p>`).appendTo(block);

    const img = document.createElement('img');
    img.style.padding = '10px';
    const posterLink = imageHost + film.poster_path;
    img.src = posterLink
    block.append(img);
  });

};

// Scroll Top Button
$(window).scroll(function () {
  if ($(this).scrollTop() > 40) {
    $('#topBtn').fadeIn();
  } else {
    $('#topBtn').fadeOut();
  }
});

$("#topBtn").click(function () {
  $("html, body").animate({
    scrollTop: 0,
  }, 800);
});


// API part
const getMovie = () => {
  let response = $.ajax(apiHost + searchMovies + `?api_key=${apiKey}&query=${inputMovie.value}&language=ru-RU`);
  return response;
}