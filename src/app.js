const container = document.querySelector(".card-grid");
const jokes =[
    {setup:"Czemu informatycy sie nie myj?"},
    {setup:"Jakie jest ulubione jedzenie informatyka?"},
    {setup:"Czemu w auli B smierdzi?"},
];
container.innerHTML = "";
jokes.forEach(joke => {
    container.innerHTML += `
        <div class="card-style"> 
            <p>${joke.setup}</p>
            <button class="btn-primary">See more</button>
        </div>
    `;
});

