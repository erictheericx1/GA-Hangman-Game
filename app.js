const words = [
  { word: "piano", hint: "tickle the ivories" },
  { word: "guitar", hint: "pluck or strum" },
  { word: "octopus", hint: "an eight-armed sea creature" },
  { word: "helicopter", hint: "a type of aircraft that can take off and land vertically" },
  { word: "cactus", hint: "a type of plant that usually grows in hot and dry areas" },
  { word: "penguin", hint: "a flightless bird that lives in cold regions" },
  { word: "telescope", hint: "a device used to observe distant objects, such as stars and planets" },
  { word: "avocado", hint: "Mexican fruit with a large seed in the middle" },
  { word: "elephant", hint: "the largest land animal" },
  { word: "bicycle", hint: "A vehicle with two wheels propelled by pedals" },
  { word: "chocolate", hint: "A sweet food made from roasted and ground cacao seeds" },
  { word: "pizza", hint: "A savory dish typically made of dough, tomato sauce, cheese, and various toppings" },
  { word: "beach", hint: "A sandy or pebbly area along the shore of a body of water" },
];

let randomIndex = Math.floor(Math.random() * words.length);
let wordObject = words[randomIndex];
let word = wordObject.word;
let hint = wordObject.hint;

const hangmanImages = [
  'images/hangman_0.png',
  'images/hangman_1.png',
  'images/hangman_2.png',
  'images/hangman_3.png',
  'images/hangman_4.png',
  'images/hangman_5.png',
  'images/hangman_6.png',
];

let guessedLetters = [];
let remainingGuesses = 6;

function handleGuess(letter) {
  guessedLetters.push(letter);

  if (!word.includes(letter)) {
    remainingGuesses--;
    updateHangman();
  }

  updateWord();
  updateAlphabetButtons();
  checkGameEnd();
}

const alphabetButtons = document.querySelectorAll(".alphabet button");
alphabetButtons.forEach(button => {
  button.addEventListener("click", () => {
    const letter = button.innerText;
    handleGuess(letter);
  });
});

document.addEventListener("keydown", event => {
  if (/^[a-zA-Z]$/.test(event.key)) {
    const letter = event.key.toLowerCase();
    handleGuess(letter);
  }
  })

const wordElement = document.getElementById("word");
const hintElement = document.getElementById("hint");
const playAgainButton = document.getElementById("playAgain");

function updateWord() {
  let displayWord = "";
  for (let letter of word) {
    if (guessedLetters.includes(letter.toLowerCase())) {
      displayWord += letter + " ";
    } else {
      displayWord += "_ ";
    }
  }
  wordElement.innerText = displayWord;
}

function updateHint() {
  hintElement.innerText = "Hint: " + hint;
}

function updateAlphabetButtons() {
  alphabetButtons.forEach(button => {
    button.disabled = guessedLetters.includes(button.innerText);
  });
}

function updateHangman() {
  const hangmanImage = document.getElementById("hangman");
  hangmanImage.src = hangmanImages[6 - remainingGuesses];
}

function checkGameEnd() {
  if (remainingGuesses === 0) {
    document.body.classList.add("game-over");
    wordElement.innerText = "Oh no!! You Lose! The word was: " + word;
    hintElement.innerText = "";
    playAgainButton.style.display = "block";
    alphabetButtons.forEach(button => button.disabled = true);
  } else if (word.split("").every(letter => guessedLetters.includes(letter))) {
    document.body.classList.add("game-won");
    wordElement.innerText = "You Did it! Great job!";
    hintElement.innerText = "";
    playAgainButton.style.display = "block";
    alphabetButtons.forEach(button => button.disabled = true);
  }
}

function newGame() {
  randomIndex = Math.floor(Math.random() * words.length);
  wordObject = words[randomIndex];
  word = wordObject.word;
  hint = wordObject.hint;
  guessedLetters = [];
  remainingGuesses = 6;
  updateWord();
  updateHint();
  updateAlphabetButtons();
  updateHangman();
  document.body.classList.remove("game-over");
  document.body.classList.remove("game-won");
  playAgainButton.style.display = "none";
}

newGame();

alphabetButtons.forEach(button => {
  button.addEventListener("click", () => {
    const letter = button.innerText;
    guessedLetters.push(letter);
    if (!word.includes(letter)) {
      remainingGuesses--;
      updateHangman();
    }
  });
});

playAgainButton.addEventListener("click", newGame);
