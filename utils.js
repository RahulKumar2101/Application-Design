const deBounce = (func,delay=1000) => {
    let timeOutId;
    return (...args)=>{
        // console.log(args);
      if(timeOutId){
          clearTimeout(timeOutId)
      }
      timeOutId= setTimeout(()=>{
          func.apply(null,args)
      },delay)
    };
  };