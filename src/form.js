const form = document.querySelector(".joke-form");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const jokeType = document.querySelector("#joke-type").value;
    const jokeContent = document.querySelector("#joke-content").value;
    const jokePunchline = document.querySelector("#joke-punchline").value;

    if (
    jokeType.trim() === "" ||
    jokeContent.trim() === "" ||
    jokePunchline.trim() === ""
    ) {
    alert("Wypełnij wszystkie pola!");
    return;
    }
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