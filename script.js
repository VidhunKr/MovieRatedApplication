
// http://www.omdbapi.com/?i=tt3896198&apikey=70527f13
const movieSeachBox=document.getElementById("movie-search-box")
const searchList=document.getElementById("search-list")
const resultGrid=document.getElementById("result-grid")

 async function loadMovies(searchTerm){
    const URL=`https:www.omdbapi.com/?s=${searchTerm}&page=1&apikey=70527f13`
  const res=await fetch(`${URL}`)
  const data=await res.json()
 //console.log(data.Search);
if(data.Response == "True")displayMovieList(data.Search)
 }
 function findMovies(){
    let searchTerm=(movieSeachBox.value).trim()
    console.log(searchTerm);
if(searchTerm.length>0){
   searchList.classList.remove('hide-search-list')
   loadMovies(searchTerm)
 }else{
    searchList.classList.add('hide-search-list')
    console.log(searchTerm);
 }
 }

 function displayMovieList(movies){
     searchList.innerHTML=" ";
     for(let i=0; i<movies.length; i++){
       let movieListItem= document.createElement('div')
      console.log(movieListItem);
        movieListItem.dataset.id=movies[i].imdbID
        movieListItem.classList.add("search-list-item")
        if(movies[i].poster!=  "N/A")
            moviePoster=movies[i].Poster
        else
        moviePoster="./broken-image.png"

        movieListItem.innerHTML=`
          <div class="search-item-image">
                    <img src=" ${moviePoster}" alt="">
                </div>
                <div class="search-info">
                    <h3>${movies[i].Title}</h3>
                    <p>${movies[i].Year}</p>
                </div>`
            searchList.appendChild(movieListItem)
      }
      
      loadMovieDetails()
  }
function loadMovieDetails(){
    const searchListMovies= searchList.querySelectorAll(".search-list-item");
    searchListMovies.forEach(movie=>{
        movie.addEventListener("click",async()=>{
        //console.log(movie.dataset.id);
        searchList.classList.add('hide-search-list')
        movieSeachBox.value=""
        const result= await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=70527f13`)
        const movieDetails=await result.json()
       // console.log(movieDetails);
       displayMovieDetails(movieDetails)
        })
    })
    
}
function displayMovieDetails(details){
    resultGrid.innerHTML=
    ` <div class="movie-poster">
                    <img src="${(details.Poster != "N/A") ? details.Poster:"Images/broken-image.png"}" alt="Movie">
                 </div>
                 <div class="movie-info">
                    <h3 class="movie-title"> ${details.Title}</h3>
                    <ul class="movie-mic-info">
                        <li class="year">Year: ${details.Year}</li>
                    <li class="rating">Rating: ${details.Rated}</li>
                    <li class="released">Released: ${details.Released}</li>
                    </ul>
                    <p class="genre"><b>Genre:  </b>${details.Genre}</p>
                    <p class="writer"><b>writer: </b>${details.Writer}</p>
                    <p class="actor"><b>Actors: </b>${details.Actors}</p><br>
                    <p class="plot"><b>Plot: </b>${details.Plot}</p><br>
                    <p class="languages"><b>Languages: </b>${details.Languages}</p><br>
                    <p class="awards"><b><i class="fas fa-award"></i></b>${details.Awards}r</p>
                </div>`

                window.addEventListener("click",(event)=>{
                    if(event.target.className != "form-control"){
                        searchList.classList.add("hide-search-list")
                    }
                })
}




