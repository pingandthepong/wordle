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
