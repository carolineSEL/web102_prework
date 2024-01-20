/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    games.forEach(game => {


        // create a new div element, which will become the game card
        const gameCard = document.createElement('div');

        // add the class game-card to the list
        gameCard.classList.add('game-card');

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Pledged: $${game.pledged} / Goal: $${game.goal}</p>
            <p>Backers: ${game.backers}</p>
            <img src="${game.img}" alt="${game.name}" class="game-img" />
        `;

        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    });
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalPledged = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + game.pledged; // Sum up the pledged amount
}, 0);
// set inner HTML using template literal
raisedCard.textContent = `$${totalPledged.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// Get the total number of games
const totalNumberOfGames = GAMES_JSON.length;

// set inner HTML
gamesCard.textContent = `${totalNumberOfGames}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/
// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Log the number of unfunded games
    console.log("Number of unfunded games:", unfundedGames.length);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}
// Call the function to see the result in the console
filterUnfundedOnly();

// show only games that do have enough funding
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // Filter to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Log the number of funded games
    console.log("Number of funded games:", fundedGames.length);

    // Use the function we previously created to add the funded games to the DOM
    addGamesToPage(fundedGames);
}
// Call the function to see the result in the console
filterFundedOnly();

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}
// call the function to see the result
showAllGames();

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);

const buttons = document.querySelectorAll('#button-container button');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        buttons.forEach(btn => btn.classList.remove('active-button')); // Remove the class from all buttons
        this.classList.add('active-button'); // Add the class to the clicked button
    });
});

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;
console.log("Number of unfunded games:", unfundedGamesCount);

// create a string that explains the number of unfunded games using the ternary operator
// Total amount raised and number of games
const totalRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);
const totalGames = GAMES_JSON.length;

// Template string with ternary operator for grammatical correctness
const summary = `
A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} games. Currently, 
${unfundedGamesCount} ${unfundedGamesCount === 1 ? 'game remains unfunded' : 'games remain unfunded'}. We need your help to fund these amazing games!
`;

console.log(summary);

// create a new DOM element containing the template string and append it to the description container
// Create a new paragraph element
const paragraph = document.createElement("p");

// Set the content of the paragraph
paragraph.textContent = summary;

// Append the new paragraph to the descriptionContainer
descriptionContainer.appendChild(paragraph);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const mostFundedGameName = document.createElement("p");
mostFundedGameName.textContent = firstGame.name;
// do the same for the runner up item
const secondMostFundedGameName = document.createElement("p");
secondMostFundedGameName.textContent = secondGame.name;
// append top 2 games to respective containers
firstGameContainer.appendChild(mostFundedGameName);
secondGameContainer.appendChild(secondMostFundedGameName);

// Add search bar to search for games
// Function to display a single game card
function displayGameCard(game) {
    const resultsContainer = document.getElementById('search-results-container');
    resultsContainer.innerHTML = ''; // Clear previous results

    const gameCard = document.createElement('div');
    gameCard.classList.add('game-card'); // Add the class 'game-card' to the div

    gameCard.innerHTML = `
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <p>Pledged: $${game.pledged} / Goal: $${game.goal}</p>
        <p>Backers: ${game.backers}</p>
        <img src="${game.img}" alt="${game.name}" class="game-img" />
    `; // Set the inner HTML using the same format as addGamesToPage

    resultsContainer.appendChild(gameCard); // Append the game card to the search results container
}

// Search function
function searchGame() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results-container');

    // Clear previous results if the input is empty
    if (input === '') {
        resultsContainer.innerHTML = '';
        return;
    }

    // Proceed with finding the matched game
    const matchedGame = GAMES_JSON.find(game => game.name.toLowerCase().includes(input));

    if (matchedGame) {
        displayGameCard(matchedGame);
    } else {
        resultsContainer.innerHTML = 'No game found';
    }
}

// Event listener for the search input field
document.getElementById('search-input').addEventListener('input', searchGame);
// Event listener for the search input field
document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchGame();
    }
});