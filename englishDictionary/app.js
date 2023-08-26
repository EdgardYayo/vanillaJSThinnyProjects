const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainer = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchApi(word){

    try { 
        infoTextEl.style.display = "block";
        meaningContainer.style.display = "none";
        infoTextEl.innerText = `Searching the meaning of ${word}`;     
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        
        const result = await fetch(url).then((res) => res.json());
       
        infoTextEl.style.display = "none";
        meaningContainer.style.display = "block";
        audioEl.style.display = "inline-flex";

        if(result.title){
            titleEl.innerText = result.title;
            meaningEl.innerText = result.message
            audioEl.style.display = "none";
        } else {
            titleEl.innerText = result[0].word;
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
            audioEl.src = result[0].phonetics[0].audio || result[0].phonetics[1].audio;

        }

    } catch (error) {
        console.log(error);
        infoTextEl.innerText = "An error happened, try again later";
    }

}



inputEl.addEventListener('keyup', (e) => {
    if(e.target.value && e.key == "Enter"){
        fetchApi(e.target.value);
    }
});