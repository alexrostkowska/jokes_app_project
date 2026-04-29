const container = document.querySelector(".card-grid");
const jokes =[
    {setup:"Czemu informatycy sie nie myja?", punchline:"Bo ich ulubiony protokół to SOAP, ale boją się go zaimplementować."},
    {setup:"Jakie jest ulubione jedzenie informatyka?", punchline:"Ciasteczka"},
    {setup:"Czemu w auli B smierdzi?", punchline:"Bo ktoś zostawił otwarty socket i cały smród z internetu wleciał do środka."},
];

// proste ale nieefektywne rozwiazanie, bo wywołujemy pętle i czytamy cały container za każdym razem
// container.innerHTML = "";
// jokes.forEach(joke => {
//     container.innerHTML += `
//         <div class="card-style"> 
//             <p>${joke.setup}</p>
//             <button class="btn-primary">See more</button>
//         </div>
//     `;
// });

jokes.forEach(joke => {
    // wrappery cards

    const card = document.createElement('article');
    card.className = 'card-style';
    card.setAttribute('lang', 'pl');

    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    // add setup
    const p = document.createElement('p');
    p.textContent = joke.setup;

    const punchlineText = document.createElement('p');
    punchlineText.textContent = joke.punchline;
    punchlineText.className = 'punchline';

    // add button
    const btn = document.createElement('button');
    btn.className = 'btn-primary';
    btn.textContent = 'See more';

    // add btn function
    btn.onclick = () => {
        const isNowVisible = punchlineText.classList.toggle('is-visible');
        btn.textContent = isNowVisible ? 'Hide' : 'See more';
    };

    // Add/Merge everything
    card.appendChild(cardContent);
    cardContent.appendChild(p);
    cardContent.appendChild(punchlineText);
    cardContent.appendChild(btn);
    container.appendChild(card);
});

