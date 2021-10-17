const guessList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const guessReply = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/redrambles/c72ae70504e304519b0e187b0f3dc1a4/raw/72db8cf89b7f5e6f804527c879e800bd6fb0d93c/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const wordIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[wordIndex].trim();
    placeholder(word);
};

getWord();

// Display symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
    const placeLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeLetters.push("●");
    }
   wordInProgress.innerText = placeLetters.join("");
};

// Guess Button that is clicked after each letter is input, clears when clicked
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    guessReply.innerText = "";
    const guess = letterInput.value;
    const checkLetter = valid(guess);
    
    if (checkLetter) {
    makeGuess(guess);
    }
    letterInput.value = "";
});

// Function to check player's input
const valid = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        guessReply.innerText = "Please guess a letter!";
    } else if (input.length > 1) {
        guessReply.innerText = "Please guess just ONE letter!";
    } else if (!input.match(acceptedLetter)) {
        guessReply.innerText = "Please guess a letter!";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        guessReply.innerText = "You already guessed that letter! Try again, silly!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        countGuesses(guess);
        updateLetters();
        updateWordInProgress(guessedLetters);
    }
};

const updateLetters = function () {
    guessList.innerHTML = "";
     for (const guess of guessedLetters) {   
        const li = document.createElement("li");
        li.innerText = guess;
        guessList.append(li);
     }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const showLettersArray = [];
    
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            showLettersArray.push(letter.toUpperCase());
        } else {
            showLettersArray.push("●");
        }        
    }
    wordInProgress.innerText = showLettersArray.join("");
    checkWinner();
};

const countGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        guessReply.innerText = `Oops! The word does not contain ${guess}!`;
        remainingGuesses -= 1;
    } else {
        guessReply.innerText = `Way to go! The word contains the letter ${guess}!`;
    }

    if (remainingGuesses === 0) {
        guessReply.innerHTML = `Aw shucks, no more guesses! The word was <span class="highlight">${upperWord}</span>.`
        startOver();
    } else if (remainingGuesses === 1) {
        remainingSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkWinner = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        guessReply.classList.add("win");
        guessReply.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    
        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remaining.classList.add("hide");
    guessList.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    guessReply.classList.remove("win");
    guessReply.innerText = "";
    guessList.innerHTML = "";
    remainingGuesses = 8;
    guessedLetters = [];
    remainingSpan.innerText = `${remainingGuesses} guesses`;
    getWord();

    guessButton.classList.remove("hide");
    remaining.classList.remove("hide");
    guessList.classList.remove("hide");
    playAgainButton.classList.add("hide");
    
});