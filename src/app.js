const container = document.querySelector(".card-grid:not(#favorites-grid)");
const favoritesGrid = document.querySelector("#favorites-grid");

function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorite(joke) {
    let favorites = getFavorites();
    if (!favorites.some(f => f.id === joke.id)) {
        favorites.push(joke);
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
    likeBtn.innerHTML = isFavorite(joke.id) ? "❤️" : "🤍";

    likeBtn.onclick = () => {
        if (isFavorite(joke.id)) {
            removeFavorite(joke.id);
            likeBtn.innerHTML = "🤍";
            if (isFavoritesPage) {
                card.remove();
                if (getFavorites().length === 0) {
                    favoritesGrid.innerHTML = "<p>Nie masz jeszcze ulubionych żartów.</p>";
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

    if (isFavoritesPage && favoritesGrid) {
        favoritesGrid.appendChild(card);
    } else if (container) {
        container.appendChild(card);
    }
}

async function loadJokes() {
    if (!container) return;

    const userJokes = JSON.parse(localStorage.getItem("userJokes")) || [];

    try {
        container.innerHTML = "<p>Ładowanie żartów...</p>";

        const response = await fetch("https://official-joke-api.appspot.com/random_ten");

        if (!response.ok) {
            throw new Error("Błąd pobierania danych z API");
        }

        const apiJokes = await response.json();

        const jokes = [...userJokes, ...apiJokes];

        container.innerHTML = "";
        jokes.forEach(joke => renderJoke(joke));

    } catch (error) {
        container.innerHTML = "";

        if (userJokes.length > 0) {
            userJokes.forEach(joke => renderJoke(joke));
        } else {
            container.innerHTML = "<p>Nie udało się pobrać żartów z API i nie masz jeszcze dodanych własnych żartów.</p>";
        }

        console.error(error);
    }
}

function loadFavorites() {
    if (!favoritesGrid) return;

    const favorites = getFavorites();
    favoritesGrid.innerHTML = "";

    if (favorites.length === 0) {
        favoritesGrid.innerHTML = "<p>Nie masz jeszcze ulubionych żartów.</p>";
    } else {
        favorites.forEach(joke => renderJoke(joke, true));
    }
}


if (container) {
    loadJokes();
} else if (favoritesGrid) {
    loadFavorites();
} 