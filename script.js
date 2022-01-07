const ApiKey='ba592c4f1ff11ec336df09cac992dd56';
const ApiUrl="https://api.themoviedb.org/3/movie/latest?api_key=ba592c4f1ff11ec336df09cac992dd56&language=en-US";

const IMGPATH="https://image.tmdb.org/t/p/w1280";
const RandImg=document.getElementById('random-movies');
const SearchBtn=document.getElementById('search');
const searchTerm=document.getElementById('searchValue');
const SearchApi= "https://api.themoviedb.org/3/search/movie?api_key=ba592c4f1ff11ec336df09cac992dd56&language=en-US&page=1&include_adult=true&query=";
//upcomingURL
const upcomingURL="https://api.themoviedb.org/3/movie/upcoming?api_key=ba592c4f1ff11ec336df09cac992dd56&language=en-US&page=1";
const UpcomingEL=document.getElementById('Upcoming');
//NowPlaying
const noWPlayingURL="https://api.themoviedb.org/3/movie/now_playing?api_key=ba592c4f1ff11ec336df09cac992dd56&language=en-US&page=1";
const NowPLayingEl=document.getElementById('NowPlaying')
//TopRated
const TopRatedURL="https://api.themoviedb.org/3/movie/top_rated?api_key=ba592c4f1ff11ec336df09cac992dd56&language=en-US&page=1";
const TopRatedEL=document.getElementById('TopRated')
//Popular
const PopularURL="https://api.themoviedb.org/3/movie/popular?api_key=ba592c4f1ff11ec336df09cac992dd56&language=en-US&page=1";
const PopuplarEL=document.getElementById('Latest');
//movies-information
const moviesPopup = document.getElementById("movies-popup");
const moviesInfoEl = document.getElementById("movies-info");
const popupCloseBtn = document.getElementById("close-pop-up");
const movieInfo=document.getElementById("movie-info");



getMovies(upcomingURL);
async function getMovies(url) {
    const resp=await fetch(url);
    const respData=await resp.json();
    console.log('length',respData.results.length);
     
  ShowMovies(respData.results);
    
}
//getMovies();

function ShowMovies(movies){
    RandImg.innerHTML=``;
    console.log(movies);
  
    movies.forEach(movie=>{
        const movieEL=document.createElement("div");
        movieEL.classList.add('card');
        movieEL.innerHTML=`
  <img src="${IMGPATH+movie.poster_path}" class="card-img-top" alt="${movie.title}">
  <div class="card-body">
    <h3 class="card-text">${movie.title} </h3>  <span class="${getClassByRate(movie.vote_average)}"> ${movie.vote_average}</spam>
    
  
  </div>
    `;
       RandImg.appendChild(movieEL);
      movieEL.addEventListener('click',()=>{
            movieInfoUpadate(movie);
      }); 
    });
}


SearchBtn.addEventListener('click',(e)=>{
            e.preventDefault();
    const SearchMve=searchTerm.value;
    console.log(SearchApi+SearchMve);
    if(SearchMve){
          getMovies(SearchApi+SearchMve);
          searchTerm.value="";
        
        //  console.log(SearchApi+searchTerm);
        
    }
});

function Upcoming() {
    getMovies(upcomingURL);
    
    PopuplarEL.classList.remove('active');
    TopRatedEL.classList.remove('active');
    NowPLayingEl.classList.remove('active');
}
function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}
function Latest(){
getMovies(PopularURL);
PopuplarEL.classList.add('active');
TopRatedEL.classList.remove('active');
    NowPLayingEl.classList.remove('active');
    UpcomingEL.classList.remove('active');
}
function TopRated(){
getMovies(TopRatedURL);
TopRatedEL.classList.add('active');
NowPLayingEl.classList.remove('active');
    UpcomingEL.classList.remove('active');
    PopuplarEL.classList.remove('active');
}
function NowPlaying(){
getMovies(noWPlayingURL);
NowPLayingEl.classList.add('active');
PopuplarEL.classList.remove('active');
  NowPLayingEl.classList.remove('active');
    UpcomingEL.classList.remove('active');
}

//"https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";
function movieInfoUpadate(movies){
  //movieInfo.innerHTML='';
    
    const movieInf=document.createElement('div');
    console.log(movies);
    movieInfo.innerHTML=` 
    
            
          <h1 class="text-center">${movies.original_title}</h1>
          <img src="${IMGPATH+movies.poster_path}"   alt="${movies.title}" class="movie-img" >
      
          <h2 class="test-center">Overview:</h2>
          <p>
            ${
                movies.overview
            }
          </p>
          <h3>${movies.release_date}</h3>
          
          
          
          
          
               

       
          `;
    movieInfo.appendChild(movieInf);
    moviesPopup.classList.remove('hidden');
    

}

popupCloseBtn.addEventListener('click',()=>{
  moviesPopup.classList.add('hidden');
});