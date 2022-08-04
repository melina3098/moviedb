const fila = document.querySelector('.contenedor-carousel');
const peliculas = document.querySelectorAll('.pelicula');
const flechaIzq = document.getElementById('flecha-izq');
const flechaDer = document.getElementById('flecha-der');
const baseURL = 'https://api.themoviedb.org/3'
const key = '?api_key=7f65f07a5ffa52563f8a6b45d629f577'
const imageURL = 'https://image.tmdb.org/t/p/w500/'
const mainCarousel = document.querySelector('#carouselUpcoming')

//carousel estrenos

const carouselUpcomingFunction = async () => {

    try {
        const response = await fetch(`${baseURL}/movie/upcoming${key}`)
        console.log(response)

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
        }

    } catch (error) {
        console.log(error)
    }


}


//event listener para flecha derecha 

flechaDer.addEventListener('click', () =>{
    fila.scrollLeft += fila.offsetWidth;

    //para cambiar el indicador si se cambia con las flechas
    const indicatorActive = document.querySelector('.indicadores .active');
    if(indicatorActive.nextSibling){
        indicatorActive.nextSibling.classList.add('active')
        indicatorActive.classList.remove('active')
    }
})

flechaIzq.addEventListener('click', () =>{
    fila.scrollLeft -= fila.offsetWidth;

    //para cambiar el indicador si se cambia con las flechas
    const indicatorActive = document.querySelector('.indicadores .active');
    if(indicatorActive.previousSibling){
        indicatorActive.previousSibling.classList.add('active')
        indicatorActive.classList.remove('active')
    }

})

//paginacion

const numeroPag = Math.ceil(peliculas.length/5); //ceil redondea hacia arriba

for(let i = 0; i < numeroPag; i++){
    const indicador = document.createElement('button');
    if(i === 0){
        indicador.classList.add('active')
    }

    document.querySelector('.indicadores').appendChild(indicador);
    indicador.addEventListener('click' , (e) => {
        fila.scrollLeft = i * fila.offsetWidth;
        document.querySelector('.indicadores .active').classList.remove('active')
        e.target.classList.add('active')
    })
}

//hover

peliculas.forEach((pelicula) =>{
    pelicula.addEventListener('mouseenter', (e)=>{
        const element = e.currentTarget;
        setTimeout(() =>{
            peliculas.forEach(pelicula => pelicula.classList.remove('hover'))
            element.classList.add('hover')
        },100)
    })
})

fila.addEventListener('mouseleave', () =>{
    peliculas.forEach(pelicula => pelicula.classList.remove('hover'))
})

carouselUpcomingFunction();