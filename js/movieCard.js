function MovieCard () {

};

MovieCard.prototype = {
    sortByPopularity: function (response) {
        const sortedMovies = response.results.sort(function (a, b) {
            if (a.popularity < b.popularity) {
                return 1;
            }
            if (a.popularity > b.popularity) {
                return -1;
            }
            return 0;
        });
        return sortedMovies;
    },
    sortByVotes: function (response) {
        const sortedMovies = response.results.sort(function (a, b) {
            if (a.vote_average < b.vote_average) {
                return 1;
            }
            if (a.vote_average > b.vote_average) {
                return -1;
            }
            return 0;
        });
        return sortedMovies;
    },
    renderPoster: function (arrayOfMovies) {
        arrayOfMovies.forEach((film, item) => {
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
    }
}