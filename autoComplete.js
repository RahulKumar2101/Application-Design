const createAutoComplete = ({root,renderOption,onOptionSelect,onInputValue,fetchData}) => {
    root.innerHTML = `
     <label><b>Movie</b></label>
       <input class="input" /> 
        <div class="dropdown"> 
            <div class="dropdown-menu">
             <div class="dropdown-content results">
            </div>
        </div>
        </div>
    `;

    const input = root.querySelector("input");
    const dropDown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');


    const onInput = async (event) => {
        const items = await fetchData(event.target.value);
        // console.log(event.target.value);
        if (!items.length) {
            dropDown.classList.remove('is-active');
            return;
        }
        dropDown.classList.add('is-active');
        resultsWrapper.innerHTML = ''
        for (let item of items) {
            const option = document.createElement("a");
            option.classList.add('dropdown-item');
            option.innerHTML =renderOption(item) ;
            option.addEventListener('click', () => {
                dropDown.classList.remove('is-active');
                input.value = onInputValue(item);
                onOptionSelect(item);
            })

            resultsWrapper.appendChild(option);
        }
        // console.log(movies);
    };
    input.addEventListener("input", deBounce(onInput));
    document.addEventListener('click', (event) => {
        if (!root.contains(event.target)) {
            dropDown.classList.remove('is-active');
        }
    }
    );

};