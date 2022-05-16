const playbookMenu = document.querySelector(".playbook");
const playbookBtn = document.querySelector(".playbook-button");
const playbookItems = document.querySelector(".playbook-items");
const playbookTitle = document.querySelector("#playbook-title");

let playerChar = {};

const saveChar = () => {
  localStorage.setItem("character", JSON.stringify(playerChar));
};

$(playbookBtn).click(function (e) {
  e.preventDefault();
  playbookMenu.classList.toggle("is-active");
});

$(playbookItems).click(function (e) {
  e.preventDefault();
  playbookTitle.innerText = e.target.innerText;
  playbookMenu.classList.toggle("is-active");
  playerChar.playbook = playbookTitle.innerText;
});
