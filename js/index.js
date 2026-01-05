import { initCloseButton, initReplayButton, updateTime } from "./utils.js";

// ==================================================
// # 요구사항
//
// DONE 1. 5글자 단어 (존재하는 단어가 아니어도 됨)
// DONE 2. 6번의 시도 가능
// DONE 3. 존재하면 노란색, 위치도 맞으면 초록색
// DONE 4. 게임 종료 판단
// DONE 5. (추가) 상단에 게임 시간 표시
// DONE 6. (선택) 키보드에도 동일하게 표시
// DONE 7. (선택) 키보드 클릭으로도 입력
// ==================================================

// ==============================
// Constants
// ==============================
const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;
const allowed = /^[a-zA-Z]$/;
const ANSWER = "APPLE";

// ==============================
// State
// ==============================
let attempts = 0;
let index = 0;
let timer;

// ==============================
// DOM Helpers
// ==============================
const getBlock = (row, col) =>
  document.querySelector(`.board-column[data-index="${row}${col}"]`);

const getKeyboardKey = (key) =>
  document.querySelector(`.keyboard-row button[data-key="${key}"]`);

// ==============================
// Game Control
// ==============================
const gameOver = (isWin) => {
  window.removeEventListener("keydown", handleKeyDown);
  clearInterval(timer);

  document.querySelector(".total-time").innerText =
    document.querySelector("#timer").innerText;

  const gameOverEl = document.querySelector(".game-over");
  gameOverEl.classList.add("show");

  if (!isWin) gameOverEl.querySelector(".title").innerText = "Lose 😭";

  initCloseButton();
  initReplayButton();
};

const nextLine = () => {
  attempts++;
  index = 0;

  if (attempts >= MAX_ATTEMPTS) {
    gameOver(false);
  }
};

// ==============================
// Input Handlers
// ==============================
const handleBackspace = () => {
  if (index === 0) return;

  index--;
  getBlock(attempts, index).textContent = "";
};

const handleEnter = () => {
  if (index < WORD_LENGTH) {
    // if (index < 4 && key === "Enter")
    alert("영문 다섯 글자를 모두 입력해주세요.");
    return;
  }

  let correctCount = 0;

  for (let i = 0; i < WORD_LENGTH; i++) {
    const block = getBlock(attempts, i);
    const letter = block.innerText;
    const answerLetter = ANSWER[i];
    const keyBtn = getKeyboardKey(letter.toLowerCase());

    if (letter === answerLetter) {
      correctCount++;
      block.classList.add("correct");
      keyBtn?.classList.add("correct");
    } else if (ANSWER.includes(letter)) {
      block.classList.add("includes");
      keyBtn?.classList.add("includes");
    } else {
      block.classList.add("not-correct");
      keyBtn?.classList.add("not-correct");
    }
  }

  if (correctCount === WORD_LENGTH) {
    gameOver(true);
  } else {
    nextLine();
  }
};

const handleInput = (key) => {
  // Backspace
  if (key === "Backspace") {
    handleBackspace();
    return;
  }

  // Enter
  if (key === "Enter") {
    handleEnter();
    return;
  }

  // Alphabet input
  if (!allowed.test(key)) return;
  if (index >= WORD_LENGTH) return;

  getBlock(attempts, index).textContent = key;
  index++;
};

// ==============================
// Event Handlers
// ==============================
const handleKeyDown = (e) => handleInput(e.key);

const handleKeyBoardClick = (e) => {
  const key = e.target.dataset?.key;
  if (!key) return;
  handleInput(key);
};

// ==============================
// App Start
// ==============================
function appStart() {
  window.addEventListener("keydown", handleKeyDown);

  const keyBoards = document.querySelector("footer");
  keyBoards.addEventListener("click", handleKeyBoardClick);

  timer = updateTime();
}

appStart();
