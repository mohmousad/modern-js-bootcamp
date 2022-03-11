class Hangman {
  constructor(word, remainingGuesses) {
    this.word = word.toLowerCase().split("");
    this.remainingGuesses = remainingGuesses;
    this.guessedLetters = [];
    this.status = "playing";
  }

  updateStatus() {
    const puzzle = this.getPuzzle();
    const wordStr = this.word.join("");
    const isFinished = puzzle === wordStr;
    if (this.remainingGuesses === 0) {
      this.status = "failed";
    } else if (isFinished) {
      this.status = "finished";
    } else {
      this.status = "playing";
    }
    console.log(this.status);
  }

  getPuzzle() {
    let puzzle = "";

    this.word.forEach((letter) => {
      if (this.guessedLetters.includes(letter) || letter === " ") {
        puzzle += letter;
      } else {
        puzzle += "*";
      }
    });

    return puzzle;
  }

  makeGuess(guess) {
    if (this.status === "playing") {
      guess = guess.toLowerCase();

      const isUnique = !this.guessedLetters.includes(guess);
      const isBadGuess = !this.word.includes(guess);
      if (isUnique) {
        this.guessedLetters.push(guess);
      }

      if (isUnique && isBadGuess) {
        this.remainingGuesses--;
      }
      this.updateStatus();
    }
  }

  getStatusMsg() {
    if (this.status === "playing") {
      return `Guesses left: ${this.remainingGuesses}`;
    } else if (this.status === "failed") {
      return `Nice Try, The word was ${this.word.join("")}`;
    } else {
      return "Great Work! You guessed the word";
    }
  }
}
