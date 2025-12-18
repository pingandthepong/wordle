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
