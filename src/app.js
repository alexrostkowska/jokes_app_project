const container = document.querySelector(".card-grid");

function renderJoke(joke) {
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

    const btn = document.createElement("button");
    btn.className = "btn-primary";
    btn.textContent = "See more";

    btn.onclick = () => {
        const isNowVisible = punchlineText.classList.toggle("is-visible");
        btn.textContent = isNowVisible ? "Hide" : "See more";
    };

    card.appendChild(cardContent);
    cardContent.appendChild(jokeType);
    cardContent.appendChild(setup);
    cardContent.appendChild(punchlineText);
    cardContent.appendChild(jokeId);
    cardContent.appendChild(btn);

    container.appendChild(card);
}

async function loadJokes() {
    try {
        container.innerHTML = "<p>Ładowanie żartów...</p>";

        const fetchPromises = [
            fetch("https://official-joke-api.appspot.com/random_ten"),
            fetch("https://official-joke-api.appspot.com/random_ten")
        ];

        const responses = await Promise.all(fetchPromises);
        
        for (const response of responses) {
            if (!response.ok) {
                throw new Error("Błąd pobierania danych z API");
            }
        }

        const jokeBatches = await Promise.all(responses.map(res => res.json()));
        const jokes = jokeBatches.flat();

        container.innerHTML = "";
        jokes.forEach(joke => renderJoke(joke));

    } catch (error) {
        container.innerHTML = "<p>Nie udało się pobrać żartów z API.</p>";
        console.error(error);
    }
}

loadJokes();