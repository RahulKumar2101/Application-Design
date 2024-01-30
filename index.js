const fetchData = async (searchTerm) => {
  const response = await axios.get(" http://www.omdbapi.com/", {
    params: {
      apiKey: "31fb1427",
      s: searchTerm,
    },
  });
  // console.log(typeof searchTerm);
  console.log(response.data);
};
// fetchData();

const input = document.querySelector("input");

const deBounce = (func,delay=1000) => {
  let timeOutId;
  return (...args)=>{
    if(timeOutId){
        clearTimeout(timeOutId)
    }
    timeOutId= setTimeout(()=>{
        func.apply(null,args)
    },delay)
  };
};

const onInput = (event) => {
    fetchData(event.target.value); 
};
input.addEventListener("input",deBounce(onInput));
