const guessList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter")
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining")
const guessedLetters = document.querySelector(".remaining span");
const guessReply = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

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

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const values = letterInput.value;
    console.log(values);
    letterInput.value = "";
});
