const API_TOKEN = "897b16eb9d89224392f02f69a54ede9e";


export function getFilmsFromApiWithSearchedText (text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page=' + page
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getImageFromApi(name) {
  return 'https://image.tmdb.org/t/p/w500' + name
}

// Récupération du détail d'un film
export function getFilmDetailFromApi (id){
  const url= 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr&query='
  return fetch(url)
  .then((response) => response.json())
  .catch ((error) => console.error(error))
}
