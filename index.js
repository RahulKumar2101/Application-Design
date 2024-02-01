const AutoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
     <img src="${imgSrc}">
      ${movie.Title} (${movie.Year})
    `;
  },
  onInputValue(movie) {
    return movie.Title;
  },
  async fetchData(searchTerm) {
    const response = await axios.get(" http://www.omdbapi.com/", {
      params: {
        apiKey: "31fb1427",
        s: searchTerm,
      },
    });
    if (response.data.Error) {
      return [];
    }
    return response.data.Search;
  },
};
createAutoComplete({
  ...AutoCompleteConfig,
  root: document.querySelector("#left-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#left-summary"), "left");
  },
});
createAutoComplete({
  ...AutoCompleteConfig,
  root: document.querySelector("#right-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#right-summary"), "right");
  },
});

let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
  const response = await axios.get(" http://www.omdbapi.com/", {
    params: {
      apiKey: "31fb1427",
      i: movie.imdbID,
    },
  });
  summaryElement.innerHTML = movieTemplate(response.data);
  if (side === "left") {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }
  if (leftMovie && rightMovie) {
    runComparison();
  }
};
const runComparison = () => {
  const leftSidestats= document.querySelectorAll('#left-summary .notification');
  const rightSidestats = document.querySelectorAll('#right-summary .notification');
  leftSidestats.forEach((leftStat,index)=>{
    const rightStat= rightSidestats[index];
    const leftSideValue= parseInt(leftStat.dataset.value);
    const rightSideValue=  parseInt(rightStat.dataset.value);
    if(leftSideValue<rightSideValue){
      leftStat.classList.remove('is-primary');
      leftStat.classList.add('is-warning');
    }else{
      rightStat.classList.remove('is-primary');
      rightStat.classList.add('is-warning');
    }
  })
};

const movieTemplate = (movieDetails) => {
  const dollars = parseInt(
    movieDetails.BoxOffice.replace(/\$/g, "").replace(/,/g, "")
  );
  const metascore = parseInt(movieDetails.Metascore);
  const imdbRating = parseFloat(movieDetails.imdbRating);
  const imdbVotes = parseInt(movieDetails.imdbVotes.replace(/,/g, ""));
  const awards = movieDetails.Awards.split(" ").reduce((prev, word) => {
    const value = parseInt(word);
    if (isNaN(value)) {
      return prev;
    } else {
      return prev + value;
    }
  }, 0);
  // console.log(awards);
  return `
  <article class="media"> 
    <figure class="media-left">
     <p class="image">
       <img src="${movieDetails.Poster}"/>
      </p>
    </figure>
    <div class="media-content">
     <div class="content">
       <h1>${movieDetails.Title}</h1>
       <h4>${movieDetails.Genre}</h4>
       <p> ${movieDetails.Plot}</p>
      </div>
    </div> 
  </article> 
  <article data-value= ${awards} class="notification is-primary">
    <p class="title">${movieDetails.Awards}</p>
    <p class="subTitle">Awards</p>
  </article>
  <article data-value= ${dollars} class="notification is-primary">
    <p class="title">${movieDetails.BoxOffice}</p>
    <p class="subTitle">BoxOffice</p>
  </article>
  <article data-value= ${metascore} class="notification is-primary">
    <p class="title">${movieDetails.Metascore}</p>
    <p class="subTitle">Metascore</p>
  </article>
  <article data-value= ${imdbRating} class="notification is-primary">
    <p class="title">${movieDetails.imdbRating}</p>
    <p class="subTitle">imdbRating</p>
  </article>
  <article data-value= ${imdbVotes} class="notification is-primary">
    <p class="title">${movieDetails.imdbVotes}</p>
    <p class="subTitle">imdbVotes</p>
  </article>
  `;
};
