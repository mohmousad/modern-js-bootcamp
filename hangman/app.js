const result = document.querySelector(".result");
const remain = document.querySelector(".remain");

const game1 = new Hangman("Cat dog", 2);

result.textContent = game1.getPuzzle();
remain.textContent = game1.getStatusMsg();

window.addEventListener("keypress", function (e) {
  const guess = String.fromCharCode(e.charCode);
  game1.makeGuess(guess);
  result.textContent = game1.getPuzzle();
  remain.textContent = game1.getStatusMsg();
});
