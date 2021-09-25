const guessList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter")
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining")
const remainingGuesses = document.querySelector(".remaining span");
const guessReply = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

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
    const values = letterInput.value;
    // checks for single letter
    const checkLetter = valid(values);
    
    if (checkLetter) {
    makeGuess(values);
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

const makeGuess = function (values) {
    // converts the letters all to uppercase
    values = values.toUpperCase();
    if (guessedLetters.includes(values)) {
        guessReply.innerText = "You already guessed that letter! Try again, silly!";
    } else {
        guessedLetters.push(values);
        console.log(guessedLetters);
    }
};