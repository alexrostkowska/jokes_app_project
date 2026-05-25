document.addEventListener('DOMContentLoaded', () => {
    if (!window.location.pathname.includes('favorites.html')) {
        return;
    }
    const main = document.createElement('main');
    main.className = 'dashboard-container';

    const header = document.createElement('header');
    header.innerHTML = `
        <div class="header-left">
            <h1>Jokes APP</h1>
            <nav class="header-nav">
                <ul>
                    <li><a href="index.html">HOME</a></li>
                    <li><a href="form.html">Form</a></li>
                    <li><a href="favorites.html" class="active">Favourites</a></li>
                </ul>
            </nav>
        </div>
        <div class="header-right">
            <span class="sort-by">Sort by:<strong>TAGS</strong></span>
        </div>
    `;
    main.appendChild(header);

    const statsContainer = document.createElement('div');
    statsContainer.className = 'stats-container';
    main.appendChild(statsContainer);

    favoritesGrid = document.createElement('div');
    favoritesGrid.className = 'card-grid';
    favoritesGrid.id = 'favorites-grid';
    main.appendChild(favoritesGrid);

    document.body.appendChild(main);

    loadFavorites();
});

function loadFavorites() {
    if (!favoritesGrid) return;

    const favorites = getFavorites();
    favoritesGrid.innerHTML = "";

    renderStats(favorites.length);

    if (favorites.length === 0) {
        favoritesGrid.innerHTML = "<p>Nie masz jeszcze ulubionych żartów.</p>";
    } else {
        favorites.forEach(joke => renderJoke(joke, true));
    }
}