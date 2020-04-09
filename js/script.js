const searchBtn = document.getElementById('search-btn');
let inputMovie = document.querySelector('#input-movie');
const poster = $('.posters');

// Data
const apiHost = 'https://api.themoviedb.org';
const imageHost = 'https://image.tmdb.org/t/p/w300/';
const searchMovies = '/3/search/movie';
const apiKey = 'd497820dd50143376ccc71f1b2148479';


// Functions

const responseHandler = () => {
  const response = getMovie();
  response.then(onDataReceived);

};

function sort(card, response) {
  const sort = document.getElementsByName('Sort');
  for (let i = 0; i < sort.length; i++) {
    if (sort[0].checked) {
      return card.sortByPopularity(response);
    } else if (sort[1].checked) {
      return card.sortByVotes(response);
    }
  }
}

const onDataReceived = (response) => {
  console.log(response);
  poster.innerHTML = '';
  const card = new MovieCard;
  sortedMovies = sort(card, response);
  card.renderPoster(sortedMovies);
};

// Click/Keydown handlers 
$('#input-movie').keyup(function (event) {
  if (event.keyCode == 13) {
    poster.empty();
    responseHandler();
  }
});

searchBtn.addEventListener('click', () => {
  poster.empty();
  responseHandler();
});

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