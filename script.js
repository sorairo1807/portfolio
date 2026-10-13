const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".main-nav");

function closeMenu() {
  menu.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "メニューを開く");
  menuButton.title = "メニューを開く";
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  if (isOpen) return closeMenu();

  menu.classList.add("is-open");
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "メニューを閉じる");
  menuButton.title = "メニューを閉じる";
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.classList.contains("is-open")) {
    closeMenu();
    menuButton.focus();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
});

window.matchMedia("(min-width: 701px)").addEventListener("change", closeMenu);

document.querySelector(".copy-email").addEventListener("click", async () => {
  const status = document.querySelector(".copy-status");

  try {
    await navigator.clipboard.writeText("kkawanabe@srir.jp");
    status.textContent = "メールアドレスをコピーしました。";
  } catch {
    status.textContent = "メールアドレスを選択してコピーしてください。";

    const range = document.createRange();
    range.selectNodeContents(document.querySelector(".email-row > a"));

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
});
