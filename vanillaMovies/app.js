const APILINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=48d535576513d4b2de67c8f385646ff9&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=48d535576513d4b2de67c8f385646ff9&query=";

const sectionEl = document.getElementById("section"); 
const formEl = document.getElementById("form");

const inputEl = document.getElementById("query");


returnMovies(APILINK);


function returnMovies(url){
    fetch (url).then(res => res.json())
        .then(data => {
            console.log(data.results);
            data.results.forEach(element => {
                const div_card = document.createElement("div");
                div_card.classList.add("card");

                // const div_row = document.createElement("div");
                // div_row.classList.add("row");

                const div_column = document.createElement("div");
                div_column.classList.add("column");

                const image = document.createElement("img");
                image.classList.add("thumbnail");
                image.setAttribute('id', 'image');

                const title = document.createElement("h3");
                title.setAttribute('id', 'title');
                const center = document.createElement("center");


                title.innerHTML = `${element.title}`;
                image.src = IMG_PATH + element.poster_path;
                image.alt = element.title;
                center.appendChild(image);
                div_card.appendChild(center);
                div_card.appendChild(title);
                div_column.appendChild(div_card);
                // div_row.appendChild(div_column);
                sectionEl.appendChild(div_column);

            });
        });
}


formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    sectionEl.innerHTML = "";

    const searchItem = inputEl.value;

    if(searchItem){
        returnMovies(SEARCHAPI + searchItem)
        inputEl.value = "";
    }

})