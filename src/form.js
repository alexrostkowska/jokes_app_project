document.addEventListener('DOMContentLoaded', () => {
    const main = document.createElement('main');
    main.className = 'dashboard-container';

    //nagłówek
    const header = document.createElement('header');
    header.className = 'dashboard-header';

    const headerLeft = document.createElement('div');
    headerLeft.className = 'header-left';

    const h1 = document.createElement('h1');
    h1.textContent = 'Jokes APP';

    const nav = document.createElement('nav');
    nav.className = 'header-nav';

    const ul = document.createElement('ul');

    const navItems = [
        { text: 'HOME', href: 'index.html', active: false },
        { text: 'Forms', href: 'form.html', active: true },
        { text: 'Favourites', href: 'favorites.html', active: false }
    ];

    navItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.href;
        a.textContent = item.text;
        if (item.active) {
            a.className = 'active';
        }
        li.appendChild(a);
        ul.appendChild(li);
    });

    nav.appendChild(ul);
    headerLeft.appendChild(h1);
    headerLeft.appendChild(nav);

    const headerRight = document.createElement('div');
    headerRight.className = 'header-right';

    const sortBySpan = document.createElement('span');
    sortBySpan.className = 'sort-by';
    sortBySpan.textContent = 'Sort by:';

    const strongTags = document.createElement('strong');
    strongTags.textContent = 'TAGS';

    sortBySpan.appendChild(strongTags);
    headerRight.appendChild(sortBySpan);

    header.appendChild(headerLeft);
    header.appendChild(headerRight);

    //formularz
    const formContainer = document.createElement('div');
    formContainer.className = 'form-container';

    const form = document.createElement('form');
    form.action = '#';
    form.method = 'post';
    form.className = 'joke-form';

    const labelType = document.createElement('label');
    labelType.htmlFor = 'joke-type';
    labelType.textContent = 'Joke Type:';

    const inputType = document.createElement('input');
    inputType.type = 'text';
    inputType.id = 'joke-type';
    inputType.name = 'joke-type';
    inputType.required = true;

    const labelContent = document.createElement('label');
    labelContent.htmlFor = 'joke-content';
    labelContent.textContent = 'Joke Content:';

    const textareaContent = document.createElement('textarea');
    textareaContent.id = 'joke-content';
    textareaContent.name = 'joke-content';
    textareaContent.rows = 4;
    textareaContent.required = true;

    const labelPunchline = document.createElement('label');
    labelPunchline.htmlFor = 'joke-punchline';
    labelPunchline.textContent = 'Joke Punchline:';

    const textareaPunchline = document.createElement('textarea');
    textareaPunchline.id = 'joke-punchline';
    textareaPunchline.name = 'joke-punchline';
    textareaPunchline.rows = 3;
    textareaPunchline.required = true;

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'btn-primary';
    submitBtn.textContent = 'Add Joke';

    form.appendChild(labelType);
    form.appendChild(inputType);
    form.appendChild(labelContent);
    form.appendChild(textareaContent);
    form.appendChild(labelPunchline);
    form.appendChild(textareaPunchline);
    form.appendChild(submitBtn);

    formContainer.appendChild(form);

    main.appendChild(header);
    main.appendChild(formContainer);

    document.body.appendChild(main);

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


});

