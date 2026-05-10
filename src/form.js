const form = document.querySelector(".joke-form");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const jokeType = document.querySelector("#joke-type").value;
    const jokeContent = document.querySelector("#joke-content").value;
    const jokePunchline = document.querySelector("#joke-punchline").value;

    const newJoke = {
        id: Date.now(),
        type: jokeType,
        setup: jokeContent,
        punchline: jokePunchline
    };

    let userJokes = JSON.parse(localStorage.getItem("userJokes")) || [];

    userJokes.push(newJoke);

    localStorage.setItem("userJokes", JSON.stringify(userJokes));

    window.location.href = "index.html";
});