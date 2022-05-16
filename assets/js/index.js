const playbookMenu = document.querySelector(".playbook");
const playbookItems = document.querySelector(".playbook-items");
const backgroundItems = document.querySelector("#background");
const demeanorItems = document.querySelector("#demeanor");
const fightingStyle = document.querySelector("#fighting-style");
const trainingItems = document.querySelector(".training");

let playerChar = JSON.parse(localStorage.getItem("character")) || {};

const saveChar = () => {
  localStorage.setItem("character", JSON.stringify(playerChar));
};

const loadCharData = () => {
  if (playerChar === {}) {
    return false;
  }
  playbookItems.value = playerChar.playbook;
  backgroundItems.value = playerChar.background;
  demeanorItems.value = playerChar.demeanor;
  fightingStyle.value = playerChar.fightingStyle;
  document.getElementById(playerChar.training).checked = true;

  // stats
  // pos
  Object.values(playerChar.posStats).map((stat) => {
    if (document.getElementById(stat) !== null) {
      document.getElementById(stat).checked = true;
    }
  });
  //neg
  Object.values(playerChar.negStats).map((stat) => {
    if (document.getElementById(stat) !== null) {
      document.getElementById(stat).checked = true;
    }
  });
};

// get playbook
$(document).ready(function () {
  $(playbookItems).change(function (e) {
    e.preventDefault();
    let playbook = $("select.playbook-items option:selected").text();
    playerChar.playbook = playbook;
    saveChar();
  });
});

// get background
$(document).ready(function () {
  $(backgroundItems).change(function (e) {
    e.preventDefault();
    let background = $("select#background option:selected").text();
    playerChar.background = background;
    saveChar();
  });
});

// get demeanor
$(document).ready(function () {
  $(demeanorItems).change(function (e) {
    e.preventDefault();
    let demeanor = $("select#demeanor option:selected").text();
    playerChar.demeanor = demeanor;
    saveChar();
  });
});

// get fighting style
$(document).ready(function () {
  $(fightingStyle).change(function (e) {
    e.preventDefault();
    let fighting = fightingStyle.value;
    playerChar.fightingStyle = fighting;
    saveChar();
  });
});

// get training style
$(document).ready(function () {
  $(trainingItems).change(function (e) {
    e.preventDefault();
    console.log(e.target.value);
    let training = e.target.value;
    playerChar.training = training;
    saveChar();
  });
});

// get status effects
//pos
$(document).ready(function () {
  $(".pos-stats").change(function (e) {
    e.preventDefault();
    let posStats = $(".pos-stats:checked").map(function (stat) {
      return this.name;
    });
    if (posStats.length > 0) {
      console.log(posStats);
      playerChar.posStats = posStats;
    } else {
      playerChar.posStats = [];
    }
    saveChar();
  });
});
//neg
$(document).ready(function () {
  $(".neg-stats").change(function (e) {
    e.preventDefault();
    let negStats = $(".neg-stats:checked").map(function (stat) {
      return this.name;
    });
    if (negStats.length > 0) {
      console.log(negStats);
      playerChar.negStats = negStats;
    } else {
      playerChar.negStats = [];
    }
    saveChar();
  });
});

loadCharData();
