import { initCloseButton } from "./utils.js";
import { initReplayButton } from "./utils.js";
import { startTimer } from "./utils.js";

// ==================================================
// # 요구사항
//
// DONE 1. 5글자 단어 (존재하는 단어가 아니어도 됨)
// DONE 2. 6번의 시도 가능
// DONE 3. 존재하면 노란색, 위치도 맞으면 초록색
// DONE 4. 게임 종료 판단
// 5. (추가) 상단에 게임 시간 표시
// 6. (선택) 키보드에도 동일하게 표시
// 7. (선택) 키보드 클릭으로도 입력
// ==================================================

const ANSWER = "APPLE";
let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const nextLine = () => {
    if (attempts === 5) {
      gameOver(false);
    }

    attempts++;
    index = 0;
  };

  const gameOver = (result) => {
    window.removeEventListener("keydown", handleKeyDown);
    clearInterval(timer);

    const printTimeEl = document.querySelector(".total-time");
    printTimeEl.innerText = document.querySelector("#timer").innerText;

    if (result) {
      document.querySelector(".game-over").classList.add("show");
    } else {
      document.querySelector(".game-over").classList.add("show");
      document.querySelector(".game-over .title").innerText = "Lose 😭";
    }
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBoard = document.querySelector(
        `.board-column[data-index="${attempts}${index - 1}"]`
      );

      preBoard.innerText = "";
    }
    if (index !== 0) index--;
  };

  const handleEnterKey = () => {
    let correctCount = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index="${attempts}${i}"]`
      );
      const userAnswer = block.innerText;
      const ANSWERLetter = ANSWER[i];

      if (userAnswer === ANSWERLetter) {
        correctCount++;
        block.classList.add("correct");
      } else if (ANSWER.includes(userAnswer)) {
        block.classList.add("includes");
      } else {
        block.classList.add("not-correct");
      }
    }

    if (correctCount === 5) gameOver(true);
    else nextLine();
  };

  const handleKeyDown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;

    const board = document.querySelector(
      `.board-column[data-index="${attempts}${index}"]`
    );

    if (key === "BACKSPACE") handleBackspace();
    else if (index < 4 && attempts < 6 && keyCode === 13)
      alert("영문 다섯 글자를 모두 입력해주세요.");
    else if (index === 5) {
      if (keyCode === 13) handleEnterKey();
      else return;
    } else if (/^[a-zA-Z]$/.test(key)) {
      // a ~ z 영문만 입력 가능
      board.innerText = key;
      index++;
    }

    // test
    // console.log(`key: ${key} keyCode: ${keyCode}`);
  };

  window.addEventListener("keydown", handleKeyDown);

  timer = startTimer();
  initCloseButton();
  initReplayButton();
}

appStart();
