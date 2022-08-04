const baseURL = 'https://api.themoviedb.org/3'
const key = '?api_key=7f65f07a5ffa52563f8a6b45d629f577'
const imageURL = 'https://image.tmdb.org/t/p/w500/'
const API_URL = `${baseURL}/movie/top_rated${key}&sort_by=popularity.desc`
const sortByGenre = `${baseURL}/discover/movie${key}&with_genres=`
const baseURLdata = `https://api.themoviedb.org/3/movie/`
//variables id DOM declaration
const navGenreSection = document.getElementById('navGenreSection')
const displayGenres = document.getElementById('genresDisplay')
const mainContainer = document.getElementById('mainContainer')
const mainCarousel = document.querySelector('#carouselUpcoming')
const moviesResults = document.getElementById('resultsMovies')
const movieDetailsShow = document.getElementById('movieDetails')
const castMovie = document.getElementById('castMovie')

const formSearch = document.getElementById('formSearch')
const searchMovie = document.getElementById('searchBar')

const getGenres = async () => {
    try {
        const response = await fetch(`${baseURL}/genre/movie/list${key}`)
        if (response.status === 200) {
            const data = await response.json();
            data.genres.forEach(genre => {
                var genreDisplay = document.createElement('li')
                genreDisplay.innerHTML = `
                <a class="dropdown-item text-info" href="#" onclick="filterByGenre(${genre.id})">${genre.name}</a>
                `
                navGenreSection.append(genreDisplay)
            });

        }
    } catch (error) {
        console.log(error)
    }


}


async function filterByGenre(genreID) {
    const response = await fetch(`${sortByGenre}${genreID}`)
    const data = await response.json()
    showMovies(data.results)

}

const carouselUpcomingFunction = async () => {

    try {
        const response = await fetch(`${baseURL}/movie/upcoming${key}`)
        //verify the response status
        if (response.status === 200) {
            const data = await response.json();
            data.results.forEach(movie => {
                const carouselMoviesUpcoming = document.createElement('div')
                carouselMoviesUpcoming.classList.add('carousel-item')
                carouselMoviesUpcoming.innerHTML = `
                    <img src="${imageURL}${movie.poster_path}" class="d-block w-100" alt="...">
                `
                mainCarousel.appendChild(carouselMoviesUpcoming);
            });
        } else if (response.status == 401) {
            clearMainSection();
            const errorMessage = document.createElement('div')
            errorMessage.classList.add('container')
            errorMessage.innerHTML = `
                <div class="row">
                    <div class="col-12">
                        <p class="fs-1 pt-5 text-danger text-center fw-bolder">Error: ${response.status}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <p class="fs-1 pt-5 text-white text-center fw-bolder">Something went wrong. API Key invalid</p>
                    </div>
                </div>
            `
            mainContainer.appendChild(errorMessage)
        } else if (response.status == 404) {
            clearMainSection();
            const errorMessage = document.createElement('div')
            errorMessage.classList.add('container')
            errorMessage.innerHTML = `
                <div class="row">
                    <div class="col-12">
                        <p class="fs-1 pt-5 text-danger text-center fw-bolder">Error: ${response.status}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <p class="fs-1 pt-5 text-white text-center fw-bolder">Something went wrong. Results were not found</p>
                    </div>
                </div>
            `
            mainContainer.appendChild(errorMessage)
        } else {

        }

    } catch (error) {
        console.log(error)
    }

}

function getMovies(url) {
    fetch(url).then(response => response.json()).then(data => {

        showMovies(data.results)
    })
}
function clearShowMovies() {
    moviesResults.innerHTML = ''
    movieDetailsShow.innerHTML = ''
    castMovie.innerHTML = ''
}

function clearMainSection() {
    mainContainer.innerHTML = ''
}

async function movieDetails(movieId) {
    try {
        const response = await fetch(`${baseURLdata}${movieId}${key}`)
        console.log(response)
        if (response.status === 200) {
            const data = await response.json();
            clearShowMovies();
            const printDOM = document.createElement('div')
            printDOM.classList.add('row', 'text-white')
            printDOM.innerHTML = `
            <div class="col-4">
                    <img src="${imageURL}${data.poster_path}" alt="">
                </div>
                <div class="col-8">
                    <div class="row">
                        <div class="col">
                            <h1 class="m-2 text-center pt-3">${data.title}</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <p class="m-2 pt-5">${data.overview}</p>
                        </div>
                    </div>
                </div
                
            `
            movieDetailsShow.append(printDOM)
        }
        castMovies(movieId)

    } catch (error) {
        console.log(error)
    }

}

async function castMovies(movieId) {
    console.log(movieId)
    try {
        const response = await fetch(`${baseURL}/movie/${movieId}/credits${key}`)
        if (response.status === 200) {
            const data = await response.json();
            console.log(data)
            data.cast.forEach(actor => {
                const showCast = document.createElement('div')
                showCast.classList.add('col', 'text-white', 'pt-5')
                showCast.innerHTML = `
               <img src="${imageURL}${actor.profile_path}" alt="${actor.character}">
                <h5 class="text-center pt-2">${actor.name}</h5>
                `
                castMovie.append(showCast)
            })

        }
    } catch (error) {
        console.log(error)
    }

    //castMovie.append()
}

function showMovies(data) {
    let movies = ''
    let i = 0;
    clearShowMovies();
    data.forEach(movie => {
        if (i < 15) {
            movies += `
            
        <div class='col mb-3' onclick = 'movieDetails(${movie.id})'>
            <div class="card bg-black flex-row border border-danger  border-3">
                <div class="w-50">
                    <a href="" id="movieInfo"><img class='img-fluid' src= '${imageURL}${movie.poster_path}'></a>
                </div>
                <div class="card-body">
                    <a href="#" id="movieInfo" class="bg-info text-center fs-4"><p class='title text-info'>${movie.title}</p></a>
                    <p class="text-transparent text-center fs-5"> . </p>
                    <p class="text-white text-center fs-5">Vote average:</p>
                    <p class="text-center text-danger fs-2">${movie.vote_average}</p>
                </div>
                
            </div> 
        </div>
        `
            moviesResults.innerHTML = movies
            i++
        }
    })
}

formSearch.addEventListener('submit', (e) =>{
    e.preventDefault();
    dataSearch.movieName = inputName.value.toLowerCase();
    filterMovies();
})

async function filterMovies(){
    const response = await fetch(`${baseURL}/search/movie${key}&query=${queryData}`)
    console.log(response)
}

/*
 fetch:

 1. para buscar peliculas por nombre:

...search/movie?api_key=7f65f07a5ffa52563f8a6b45d629f577&query=The+Curse+of+the+Black+pearl
{baseURL}/search/movie${key}&query=${queryData}

*/
//execute functions
getGenres();
carouselUpcomingFunction();
getMovies(API_URL);