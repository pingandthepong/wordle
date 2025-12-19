import { initCloseButton } from "./utils.js";
import { initReplayButton } from "./utils.js";
import { startTimer } from "./utils.js";
import { nextLine } from "./utils.js";
import { handleKeyDown } from "./utils.js";
import { handleEnterKey } from "./utils.js";
import { handleBackspace } from "./utils.js";
import { handleKeyBoardClick } from "./utils.js";

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

let timer;

function appStart() {
  window.addEventListener("keydown", handleKeyDown);
  handleKeyBoardClick();

  timer = startTimer();

  initCloseButton();
  initReplayButton();
}

appStart();
