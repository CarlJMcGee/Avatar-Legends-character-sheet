const playbookMenu = document.querySelector(".playbook");
const playbookItems = document.querySelector(".playbook-items");

let playerChar = {};

const saveChar = () => {
  localStorage.setItem("character", JSON.stringify(playerChar));
};

// get playbook
$(document).ready(function () {
  $(playbookItems).change(function (e) {
    e.preventDefault();
    let playbook = $("select.playbook-items option:selected").text();
    playerChar.playbook = playbook;
    console.log(playerChar);
  });
});

$(document).ready(function () {
  $(".background").change(function (e) {
    e.preventDefault();
    let background = $(background);
  });
});
