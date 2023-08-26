const btnEl = document.getElementById("btn");
const jokeEl = document.getElementById("joke");
const url = "https://api.api-ninjas.com/v1/dadjokes?limit=1";
const options = {
    method: 'GET',
    headers: {
        "X-Api-Key": "xQfZbufC/TKzueAZ8+UlNw==8oBUk0RRn4EsFfJ7"
    }
}

async function getJoke(){
    jokeEl.innerText = "Updating..."
    btnEl.disabled = true;
    btnEl.innerText = "Loading...";
    const response = await fetch(url, options);
    const data = await response.json();

    btnEl.disabled = false;
    btnEl.innerText = "Tell me a joke";
    jokeEl.innerText = data[0].joke;
    
}


btnEl.addEventListener('click', getJoke);
