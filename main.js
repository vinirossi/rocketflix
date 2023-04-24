const button = document.querySelector('#btn-api');
button.addEventListener('click', getMovie);

const API_KEY = '05a3995c770d59c3207d3a7ddda370a2';
const API_READ_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWEzOTk1Yzc3MGQ1OWMzMjA3ZDNhN2RkZGEzNzBhMiIsInN1YiI6IjY0MzQ3YjhmYTEzNTMzMDBkNGY2NmIxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JMYee8mpI6DNWhKbh1gGRW1opEStEUNTdddbL75wYh8';
const LANGUAGE = 'pt-BR';

function getMovie() {
    const movieId = Math.floor(Math.random() * 1000);
    const apiURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${LANGUAGE}`;
    fetch(apiURL)
        .then(response => response.json())
        .then(movie => showMovie(movie))
        .catch(error => {
          console.error('Erro na requisição da API:', error);
          getError();
        });
}

function showMovie(movie) {
  if(!movie.title) {
    getError();
    return;
  }
  const poster = document.querySelector('#content-left');
  poster.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
  `;
  const filmTitle = document.querySelector('#content-right');
  filmTitle.innerHTML = `
    <h2>${movie.title}</h2>
    <p>${movie.overview}</p>
  `;
}

function getError() {
  const poster = document.querySelector('#content-left');
  const filmTitle = document.querySelector('#content-right');
  poster.innerHTML = `
    <img src="./assets/screen_error.svg" alt="Filme não encontrado">`;
  filmTitle.innerHTML = `
    <h2>Ops, houve um erro na busca pelo filme. Por favor, tente novamente mais tarde.</h2>`;
  throw new Error('Erro na requisição da API');
}