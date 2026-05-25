# JOKES APP

**Nazwa projektu:** Jokes APP – Aplikacja z żartami  
**Przedmiot:** Wprowadzenie do WWW 
**Autor:** Aleksandra Rostkowska, Julia Angielczyk, Aleksandra Wierzbowicz
**Rok akademicki:** 2025/2026  
**Kierunek / Semestr:** Informatyka i Ekonometria, semestr IV  

---

## 1. OPIS PROJEKTU

Projekt **Jokes APP** to responsywna aplikacja służąca do przeglądania, dodawania oraz zarządzania ulubionymi żartami. Pełni funkcję agregatora gotowych żartów jak i również tworzenia i przechowywania własnej twórczości. 

### Technologie i narzędzia:
* **HTML:** Wykorzystany jedynie do zdefiniowania podstawowych metadanych sekcji `<head>` oraz podpięcia skryptów.
* **CSS:** Warstwa prezentacyjna, pozycjonowanie elementów (Flexbox, Grid Layout), animacje i stany interaktywne.
* **JavaScript:** Logika biznesowa, asynchroniczne pobieranie danych (`Fetch API`, `async/await`), mechanizm przechowywania danych (`LocalStorage`) oraz pełna manipulacja strukturą DOM (`document.createElement`, dynamiczne selektory).

---

## 2. Wszystko co musi wiedzieć użytkownik (the more you know)

Aplikacja składa się z trzech głównych widoków, pomiędzy którymi użytkownik porusza się za pomocą górnego paska nawigacyjnego.

### 2.1. Pasek nawigacji (Header)
Znajduje się na samej górze aplikacji i zawiera:
* **Nazwa aplikacji:** „Jokes APP”.
* **Menu Nawigacyjne:** Trzy linki tekstowe: `HOME`, `Form`, `Favourites`. Aktywna strona jest wyróżniona wizualnie (zmieniony kolor tekstu przy użyciu klasy `.active`).
* **Wskaźnik sortowania:** Po prawej stronie znajduje się informacja o bieżącym filtrze widoku: `Sort by: TAGS`(jest jednak to funkcjonalność w budowie - wyłącznie poglądowa).

---

### 2.2. Widok Główny (`index.html` / `app.js`)
Główny widok służący do przeglądania treści.

* **Siatka Kart (`.card-grid`):** Tutaj dynamicznie generowane są karty z żartami. Każda karta reprezentuje pojedynczy żart oraz możliwość interakcji:
* **Tekst żartu (Setup):** Widoczny od razu po załadowaniu.
* **Przycisk „See more”:** Kliknięcie powoduje rozwinięcie karty i wyświetlenie puenty żartu (Punchline) oraz zmianę tekstu przycisku na „Hide”.
* **Przycisk Polubienia (Serduszko ❤️ / 🤍):** Kliknięcie pustego (białego) serduszka (🤍) zapisuje żart w pamięci podręcznej i zmienia ikonę na pełną czerwoną (❤️). Ponowne kliknięcie usuwa żart z ulubionych.
* **Przycisk „Load more”:** Umieszczony pod kartami. Kliknięcie wysyła kolejne asynchroniczne zapytanie do API i dokleja 10 nowych, losowych żartów na koniec listy bez czyszczenia dotychczasowego widoku.

---

### 2.3. Widok Formularza (`form.html` / `form.js`)
Pozwala użytkownikowi na rozbudowę bazy danych o własne wpisy.

* **Formularz (`.joke-form`):** Zawiera trzy wymagane pola walidowane z poziomu przeglądarki (atrybut `required`):
    1.  *Input tekstowy (Joke Type):* Służy do wpisania typu/tagu żartu.
    2.  *Pole tekstowe (Joke Content):* Główna treść (wprowadzenie do żartu).
    3.  *Pole tekstowe (Joke Punchline):* Puenta żartu.
* **Przycisk „Add Joke”:** Zatwierdza formularz, przechwytuje zdarzenie `submit`, zapisuje nowy żart do local Storage i czyści pola formularza. Żart staje się widoczny na stronie głównej w sekcji żartów użytkownika.

---

### 2.4. Widok Ulubionych (`favorites.html` / `favorites.js`)
Zagregowane treści wybrane przez użytkownika.

* **Pasek Statystyk:** Pokazuje liczbę zgromadzonych ulubionych pozycji.
* **Siatka Ulubionych (`#favorites-grid`):** Wyświetla wyłącznie karty oznaczone przez użytkownika serduszkiem. Wygląd kart jest taki sam jak na widok głównym.
* *Dynamiczne usuwanie:* Kliknięcie pełnego serduszka (`❤️`) na tej stronie skutkuje natychmiastowym usunięciem karty z widoku w czasie rzeczywistym (funkcja `card.remove()`).
* *Stan pusty:* W przypadku braku elementów w pamięci, aplikacja automatycznie generuje i wyświetla komunikat: *„Nie masz jeszcze ulubionych żartów.”*

---

## 3. SPECYFIKACJA TECHNICZNA I STRUKTURA DANYCH

### 3.1. Mechanizm przechowywania danych (LocalStorage)
Aplikacja przechowuje stan użytkownika bez użycia baz danych po stronie serwera za pomocą `window.localStorage`. Dane są konwertowane do formatu JSON.
* `favorites`: Tablica z polubionymi żartami.
* `userJokes`: Tablica z żartami dodanymi przez formularz użytkownika.

### 3.2. Struktura Żartu (Data Model)
Zarówno dane pobierane z Official Joke API, jak i generowane przez użytkownika, są standaryzowane i prezentują się następująco:

```json
{
  "id": 123,
  "type": "programming",
  "setup": "Why do programmers wear glasses?",
  "punchline": "Because they can't C#."
}