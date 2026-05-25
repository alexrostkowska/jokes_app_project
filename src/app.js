let container;
let favoritesGrid;
let loadMoreBtn;


//zmienia tekst json na tablice js
function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorite(joke) {
    let favorites = getFavorites();
    if (!favorites.some(f => f.id === joke.id)) {
        favorites.push(joke);
        //zapis zmiania obiekt na teskt json
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}

function removeFavorite(id) {
    let favorites = getFavorites();
    favorites = favorites.filter(f => f.id !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function isFavorite(id) {
    return getFavorites().some(f => f.id === id);
}

function renderJoke(joke, isFavoritesPage = false) {
    const card = document.createElement("article");
    card.className = "card-style";
    card.setAttribute("lang", "en");

    const cardContent = document.createElement("div");
    cardContent.className = "card-content";

    const jokeType = document.createElement("p");
    jokeType.className = "joke-type";
    jokeType.textContent = `Type: ${joke.type}`;

    const setup = document.createElement("p");
    setup.textContent = joke.setup;

    const punchlineText = document.createElement("p");
    punchlineText.textContent = joke.punchline;
    punchlineText.className = "punchline";

    const jokeId = document.createElement("p");
    jokeId.textContent = `ID: ${joke.id}`;

    const btnContainer = document.createElement("div");
    btnContainer.className = "btn-container";

    const seeMoreBtn = document.createElement("button");
    seeMoreBtn.className = "btn-primary";
    seeMoreBtn.textContent = "See more";

    seeMoreBtn.onclick = () => {
        const isNowVisible = punchlineText.classList.toggle("is-visible");
        seeMoreBtn.textContent = isNowVisible ? "Hide" : "See more";
    };

    const likeBtn = document.createElement("button");
    likeBtn.className = "btn-like";
    likeBtn.setAttribute("aria-label", "Dodaj do ulubionych");
    likeBtn.innerHTML = isFavorite(joke.id) ? "❤️" : "🤍";

    likeBtn.onclick = () => {
        if (isFavorite(joke.id)) {
            removeFavorite(joke.id);
            likeBtn.innerHTML = "🤍";
            if (isFavoritesPage) {
                card.remove();
                const currentFavGrid = document.querySelector("#favorites-grid");
                if (getFavorites().length === 0 && currentFavGrid) {
                    currentFavGrid.innerHTML = "<p>Nie masz jeszcze ulubionych żartów.</p>";
                }
            }
        } else {
            saveFavorite(joke);
            likeBtn.innerHTML = "❤️";
        }
    };
    
    card.appendChild(cardContent);
    cardContent.appendChild(jokeType);
    cardContent.appendChild(setup);
    cardContent.appendChild(punchlineText);
    cardContent.appendChild(jokeId);

    btnContainer.appendChild(seeMoreBtn);
    btnContainer.appendChild(likeBtn);
    card.appendChild(btnContainer);

    const currentFavGrid = document.querySelector("#favorites-grid");
    const currentMainGrid = document.querySelector(".card-grid:not(#favorites-grid)");

    if (isFavoritesPage && currentFavGrid) {
        currentFavGrid.appendChild(card);
    } else if (currentMainGrid) {
        currentMainGrid.appendChild(card);
    }
}

async function loadJokes(clearContainer = true) {
    const mainContainer = document.querySelector(".card-grid:not(#favorites-grid)");
    if (!mainContainer) return;

    const userJokes = JSON.parse(localStorage.getItem("userJokes")) || [];

    try {
        if (clearContainer) {
            mainContainer.innerHTML = "<p>Ładowanie żartów...</p>";
        }

        const response = await fetch("https://official-joke-api.appspot.com/random_ten");

        if (!response.ok) {
            throw new Error("Błąd pobierania danych z API");
        }

        const apiJokes = await response.json();

        if (clearContainer) {
            const jokes = [...userJokes, ...apiJokes];

            mainContainer.innerHTML = "";
            jokes.forEach(joke => renderJoke(joke));

            renderStats(jokes.length);
        } else {
            apiJokes.forEach(joke => renderJoke(joke));

            const totalJokes = mainContainer.children.length;
            renderStats(totalJokes);
        }

    } catch (error) {
        if (clearContainer) {
            mainContainer.innerHTML = "";

            if (userJokes.length > 0) {
                userJokes.forEach(joke => renderJoke(joke));
            } else {
                mainContainer.innerHTML = "<p>Nie udało się pobrać żartów z API i nie masz jeszcze dodanych własnych żartów.</p>";
            }
        } else {
            alert("Nie udało się pobrać kolejnych żartów.");
        }

        console.error(error);
    }
}
function loadFavorites() {
    const fGrid = document.querySelector("#favorites-grid");
    if (!fGrid) return;

    const favorites = getFavorites();
    fGrid.innerHTML = "";

    renderStats(favorites.length);

    if (favorites.length === 0) {
        fGrid.innerHTML = "<p>Nie masz jeszcze ulubionych żartów.</p>";
    } else {
        favorites.forEach(joke => renderJoke(joke, true));
    }
}

function renderStats(totalJokes) {
    const sContainer = document.querySelector(".stats-container");
    if (!sContainer) return;

    const favoritesCount = getFavorites().length;
    const userJokesCount = JSON.parse(localStorage.getItem("userJokes"))?.length || 0;

    sContainer.innerHTML = `
        
        <p>Favorites: ${favoritesCount}</p>
        <p>Your jokes: ${userJokesCount}</p>
        </br>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('favorites.html')) {
        return; 
    }
    const main = document.createElement('main');
    main.className = 'dashboard-container';

    // nagłówek
    const header = document.createElement('header');
    header.innerHTML = `
        <div class="header-left">
            <h1>Jokes APP</h1>
            <nav class="header-nav">
                <ul>
                    <li><a href="index.html" class="active">HOME</a></li>
                    <li><a href="form.html">Form</a></li>
                    <li><a href="favorites.html">Favourites</a></li>
                </ul>
            </nav>
        </div>
        <div class="header-right">
            <span class="sort-by">Sort by:<strong>TAGS</strong></span>
        </div>
    `;

    //grid z kartami
   const cardGrid = document.createElement('div');
    cardGrid.className = 'card-grid';

    const buttonMore = document.createElement('button');
    buttonMore.id = 'load-more';
    buttonMore.className = 'btn-primary';
    buttonMore.textContent = 'Load more';

    main.appendChild(header);
    main.appendChild(cardGrid);
    main.appendChild(buttonMore);

    document.body.appendChild(main);


    buttonMore.addEventListener("click", function() {
        loadJokes(false);
    });

    loadJokes();
});

