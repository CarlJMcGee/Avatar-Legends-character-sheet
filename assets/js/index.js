const playbookMenu = document.querySelector(".playbook");
const playbookItems = document.querySelector(".playbook-items");
const backgroundItems = document.querySelector("#background");
const demeanorItems = document.querySelector("#demeanor");
const fightingStyle = document.querySelector("#fighting-style");
const trainingItems = document.querySelector(".training");

let playerChar = localStorage.getItem("character")
  ? JSON.parse(localStorage.getItem("character"))
  : {};

const saveChar = () => {
  localStorage.setItem("character", JSON.stringify(playerChar));
};

const loadCharData = () => {
  if (Object.entries(playerChar).length > 0) {
    $("#name").val(playerChar.name);
    playbookItems.value = playerChar.playbook;
    backgroundItems.value = playerChar.background;
    demeanorItems.value = playerChar.demeanor;
    playerChar.fightingStyle
      ? (fightingStyle.value = playerChar.fightingStyle)
      : (fightingStyle.value = "");
    document.getElementById(playerChar.training).checked = true;

    // stats
    // pos
    if (playerChar.posStats) {
      Object.values(playerChar.posStats).map((stat) => {
        if (document.getElementById(stat) !== null) {
          document.getElementById(stat).checked = true;
        }
      });
    }
    //neg
    if (playerChar.negStats) {
      Object.values(playerChar.negStats).map((stat) => {
        if (document.getElementById(stat) !== null) {
          document.getElementById(stat).checked = true;
        }
      });
    }
  }

  // playbook
  // loadPlaybook(playerChar.playbook);
};

// get name
$(function () {
  $("#name").change(function (e) {
    e.preventDefault();
    let name = $("#name").val();
    playerChar.name = name;
    saveChar();
  });
});

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

// fill playbook details

// playbook data
const adamant = () => {
  // details
  var details = document.createElement("p");
  details.className = "column";
  details.innerHTML = `There's only one person you often let past your emotional walls. <br/>
<span class="has-text-weight-bold">Name your lodestar</span> (choose a PC to start):<input type: "text"> 
<br/>
<br/>
You can shift your lodestar to someone new when they <span class="has-text-weight-bold">guide and comfort</span>
you and you open up to them, or when you guide and comfort them and 
they open up to you. If you do choose to shift your lodestar, clear a condition. 
<br/> 
<br/>
When you <span class="has-text-weight-bold">shut down someone vulnerable to harsh words or icy silence</span>, 
shift your balance toward Results and roll with Results. On a hit, they mark a 
condition and you may clear the same condition. On a 10+, they also cannot 
shift your balance or <span class="has-text-weight-bold">call you out</span> for the rest of the scene. On a miss, they 
have exactly the right retort; mark a condition and they shift your balance. 
You cannot use this on your lodestar. 
<br/>
<br/>
When your lodestar <span class="has-text-weight-bold">shifts your balance or calls you out</span>, you cannot resist 
it. Treat an NPC lodestar calling you out as if you rolled a 10+, and a PC 
lodestar calling you out as if they rolled a 10+. 
<br/>
<br/>
When you <span class="has-text-weight-bold">consult your lodestar for advice on a problem</span> (or permission to 
use your preferred solution), roll with Restraint. On a 10+ take all three; on 
a 7-9 they choose two:
<br/>
• You see the wisdom of their advice. They shift your balance; follow their 
advice and they shift your balance again. 
<br/>
• The conversation bolsters you. Clear a condition or 2-fatigue.
<br/>
• They feel at ease offering their opinion. They clear a condition or 
2-fatigue.
<br/>
<br/>
On a miss, something about their advice infuriates you. Mark a condition or 
have the GM shift your balance twice.`;

  document.querySelector("#playbook-details").append(details);
};

// playbook
const loadPlaybook = (playbook) => {
  switch (playbook) {
    case "The Adamant":
      adamant();
      break;

    case "The Bold":
      bold();
      break;

    case "The Guardian":
      guardian();
      break;

    case "The Hammer":
      hammer();
      break;

    case "The Icon":
      icon();
      break;

    case "The Idealist":
      idealist();
      break;

    case "The Pillar":
      pillar();
      break;

    case "The Prodigy":
      prodigy();
      break;

    case "The Rogue":
      rouge();
      break;

    case "The Successor":
      successor();
      break;

    case "The Destined":
      destined();
      break;

    case "The Elder":
      elder();
      break;

    case "The Foundling":
      foundling();
      break;

    case "The Razor":
      razor();
      break;

    default:
      break;
  }
};

loadCharData();

adamant();
