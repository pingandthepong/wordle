const ANSWER = "APPLE";
let attempts = 0;
let index = 0;

export function initCloseButton() {
  const closeBtn = document.querySelector(".close-btn");
  if (!closeBtn) return;

  closeBtn.addEventListener("click", (e) => {
    e.target.parentElement.classList.remove("show");
  });
}

export function initReplayButton() {
  const replayBtn = document.querySelector(".replay-btn");
  if (!replayBtn) return;

  replayBtn.addEventListener("click", () => {
    location.reload();
  });
}

export function startTimer(timer) {
  const startTime = new Date();

  const setTime = () => {
    const currentTime = new Date();
    const timeDiff = new Date(currentTime - startTime);
    const minutes = timeDiff.getMinutes().toString().padStart(2, "0");
    const seconds = timeDiff.getSeconds().toString().padStart(2, "0");

    document.querySelector("#timer").innerText = `TIME ${minutes}:${seconds}`;
  };

  return setInterval(setTime, 1000);
}

export function nextLine() {
  if (attempts === 5) {
    gameOver(false);
  }

  attempts++;
  index = 0;
}

export function gameOver(result) {
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
}

export function handleBackspace() {
  if (index > 0) {
    const preBoard = document.querySelector(
      `.board-column[data-index="${attempts}${index - 1}"]`
    );

    preBoard.innerText = "";
  }
  if (index !== 0) index--;
}

export function handleEnterKey(e) {
  let correctCount = 0;

  for (let i = 0; i < 5; i++) {
    const block = document.querySelector(
      `.board-column[data-index="${attempts}${i}"]`
    );
    const userAnswer = block.innerText;
    const ANSWERLetter = ANSWER[i];
    const keyBoard = document.querySelector(
      `.keyboard-row button[data-key="${userAnswer.toLowerCase()}"] `
    );

    if (userAnswer === ANSWERLetter) {
      correctCount++;
      block.classList.add("correct");
      keyBoard.classList.add("correct");
    } else if (ANSWER.includes(userAnswer)) {
      block.classList.add("includes");
      keyBoard.classList.add("includes");
    } else {
      block.classList.add("not-correct");
      keyBoard.classList.add("not-correct");
    }
  }

  if (correctCount === 5) gameOver(true);
  else nextLine();
}

function mainLogic(e, key) {
  // 입력되는 곳
  const board = document.querySelector(
    `.board-column[data-index="${attempts}${index}"]`
  );
  // test
  console.log(` attempts: ${attempts} | index: ${index}`);

  if (index < 5 && attempts < 6 && key === "ENTER")
    alert("영문 다섯 글자를 모두 입력해주세요.");
  else if (key === "BACKSPACE") handleBackspace();
  else if (index === 5) {
    if (key === "ENTER") handleEnterKey(e);
    else return;
  } else if (/^[a-zA-Z]$/.test(key)) {
    // a ~ z 영문만 입력 가능
    board.innerText = key;
    index++;
  }
}

export function handleKeyDown(e) {
  const key = e.key.toUpperCase();

  mainLogic(e, key);
}

export function handleKeyBoardClick() {
  const keyBoards = document.querySelector("footer");
  if (!keyBoards) return;

  keyBoards.addEventListener("click", (e) => {
    const target = e.target.dataset.key?.toUpperCase();
    if (!target) return;

    mainLogic(e, target);
  });
}
