const playbookMenu = document.querySelector(".playbook");
const playbookItems = document.querySelector(".playbook-items");
const backgroundItems = document.querySelector("#background");
const demeanorItems = document.querySelector("#demeanor");
const fightingStyle = document.querySelector("#fighting-style");

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
    console.dir(playerChar);
  });
});

// get background
$(document).ready(function () {
  $(backgroundItems).change(function (e) {
    e.preventDefault();
    let background = $("select#background option:selected").text();
    playerChar.background = background;
    console.dir(playerChar);
  });
});

// get demeanor
$(document).ready(function () {
  $(demeanorItems).change(function (e) {
    e.preventDefault();
    let demeanor = $("select#demeanor option:selected").text();
    playerChar.demeanor = demeanor;
    console.dir(playerChar);
  });
});

// get fighting style
$(document).ready(function () {
  $(fightingStyle).change(function (e) {
    e.preventDefault();
    let fighting = fightingStyle.value;
    console.log(fighting);
  });
});
