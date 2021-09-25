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
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const wordIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[wordIndex].trim();
    placeholder(word);
};

getWord();

// Display our symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
    const placeLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeLetters.push("●");
    }
   wordInProgress.innerText = placeLetters.join("");
};

placeholder(word);

// Guess Button that is clicked after each letter is input, clears when clicked

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    // empty message paragraph
    guessReply.innerText = "";
    // gets what's put in input box
    const guess = letterInput.value;
    // checks for single letter
    const checkLetter = valid(guess);
    
    if (checkLetter) {
    makeGuess(guess);
    }
    letterInput.value = "";
});

// Function to check player's input
const valid = function (input) {
    const acceptedLetter = /[a-z/A-Z]/;
    // is input empty?
    if (input.length === 0) {
        guessReply.innerText = "Please guess a letter!";
    } else if (input.length > 1) {
        // put in more than one letter?
        guessReply.innerText = "Please guess just ONE letter!";
    } else if (!input.match(acceptedLetter)) {
        //guessed non letter thingy?
        guessReply.innerText = "Please guess a letter!";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    // converts the letters all to uppercase
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
    //empty innerHTML of ul where guessed letters will display
    guessList.innerHTML = "";
    //create new list item for each letter inside guessedLetters array
     for (const guess of guessedLetters) {   
        const li = document.createElement("li");
        li.innerText = guess;
        guessList.append(li);
     }
};

const updateWordInProgress = function (guessedLetters) {
    //changes word variable to uppercase, splits the word into a string
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const showLettersArray = [];
    
    //check if wordArray contains any guessed letters, if yes, 
    //update circle symbol to correct letter
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
        guessReply.innerText = `Oops! The word doesn't contain ${guess}!`;
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