const btnEl = document.getElementById("btn");
const jokeEl = document.getElementById("joke");


const url = "https://api.api-ninjas.com/v1/dadjokes?limit=1";
// const apiKey = "xQfZbufC/TKzueAZ8+UlNw==8oBUk0RRn4EsFfJ7";
// Nota si estas viendo esto y planeas usar esta API_KEY no funcionara, pero dejame decirte la buena noticia.
// puedes obtener una apiKey totalmente gratis solo necesitas suscribirte a https://api-ninjas.com/

const options = {
    method: 'GET',
    headers: {
        "X-Api-Key": apiKey
    }
}

async function getJoke(){
    try {
        jokeEl.innerText = "Updating..."
        btnEl.disabled = true;
        btnEl.innerText = "Loading...";
        const response = await fetch(url, options);
        const data = await response.json();
    
        btnEl.disabled = false;
        btnEl.innerText = "Tell me a joke";
        jokeEl.innerText = data[0].joke;
        
    } catch (error) {
        jokeEl.innerText = "An error happened, try again later";
        btnEl.disabled = false;
        btnEl.innerText = "Tell me a joke";
    }
  
    
}


btnEl.addEventListener('click', getJoke);
