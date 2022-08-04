function getMovieDetails(movieId) {

    // window.location.href = '../pages/movieDetails.html'
     movieData(movieId)
     castMovie(movieId)
     clearMainSection()
     async function movieData(movieId){
         try{
             const response = await fetch(`${baseURL}/movie/${movieId}${key}`)
             if(response.status === 200){
                 const data = await response.json();
                 console.log(data.title)
                 const movieInfo2 = ''
                 movieInfo2.innerHTML = `
                 <div class="col">
                     <p>si se pudo</p>
                 </div>
                 
                 `
                 movieData.append(movieInfo2)
 
             }
         }catch(error){
             console.log(error)
         }
     }
 
      async function castMovie(movieId){
          try {
              const cast = await fetch(`${baseURL}/movie/${movieId}/credits${key}`)
              if (cast.status === 200) {
                  const dataCast = await cast.json();
  
                  console.log(dataCast.cast)
                  // let castDetails = ''
                  dataCast.cast.forEach(actor => {
                      console.log(actor.name)
 
                  })
              }
          } catch (error) {
              console.log(error)
          }
      }
}