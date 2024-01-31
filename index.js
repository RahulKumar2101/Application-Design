const fetchData = async (searchTerm) => {
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
};
// fetchData();
const root = document.querySelector(".auto-complete");
root.innerHTML = `
<label><b>Search of Movie</b></label>
 <input class="input" /> 
<div class="dropdown"> 
 <div class="dropdown-menu">
    <div class="dropdown-content results"></div>
 </div>
</div>
`;

const input = document.querySelector("input");
const dropDown=document.querySelector('.dropdown');
const resultsWrapper= document.querySelector('.results');


const onInput = async (event) => {
  const movies = await fetchData(event.target.value);
  if(!movies.length){
    dropDown.classList.remove('is-active');
    return;
  }
  dropDown.classList.add('is-active');
  resultsWrapper.innerHTML=''
  for (let movie of movies) {
    const option = document.createElement("a");
    const imgSrc= movie.Poster === 'N/A' ? '' : movie.Poster;
    option.classList.add('dropdown-item');
    option.innerHTML = `
      <img src="${imgSrc}">
      <h1>${movie.Title}</h1>`;
    resultsWrapper.appendChild(option);
  }
  // movies.map((movie)=>{
  //   const div=document.createElement('div');
  //   div.innerHTML=`
  //    <img src="${movie.Poster}"
  //    <h1>"${movie.Title}</h1>"
  //    `;
  //    document.querySelector("#target").appendChild(div);
  // });
  // console.log(movies);
};
input.addEventListener("input", deBounce(onInput));
document.addEventListener('click',(event)=>{
  if(!root.contains(event.target) ){
    dropDown.classList.remove('is-active');
  }
  }
);
