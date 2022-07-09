const playbookMenu = document.querySelector(".playbook");
const playbookItems = document.querySelector(".playbook-items");
const backgroundItems = document.querySelector("#background");
const demeanorItems = document.querySelector("#demeanor");
const fightingStyle = document.querySelector("#fighting-style");
const trainingItems = document.querySelector(".training");
const stats = {
  creativity: document.querySelector("select[name='creativity']"),
  focus: document.querySelector("select[name='focus']"),
  harmony: document.querySelector("select[name='harmony']"),
  passion: document.querySelector("select[name='passion']"),
};

let playerCharData = async () => {
  const res = await fetch(`/api/user/data`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  return data || {};
};

const saveChar = async () => {
  const res = await fetch(`/api/user/data`, {
    method: "POST",
    body: JSON.stringify(playerChar),
    headers: { "Content-Type": "application/json" },
  });
};

let playerChar;

const loadCharData = () => {
  console.log(playerChar);
  if (Object.entries(playerChar).length > 0) {
    $("#name").val(playerChar.name);
    playbookItems.value = playerChar.playbook;
    backgroundItems.value = playerChar.background;
    demeanorItems.value = playerChar.demeanor;
    playerChar.fightingStyle
      ? (fightingStyle.value = playerChar.fightingStyle)
      : (fightingStyle.value = "");
    if (playerChar.training) {
      document.getElementById(playerChar.training).checked = true;
    }

    // statuses
    // pos
    if (playerChar.posStats.length > 0) {
      playerChar.posStats.map((stat) => {
        if (document.getElementById(stat) !== null) {
          document.getElementById(stat).checked = true;
        }
      });
    }
    //neg
    if (playerChar.negStats.length > 0) {
      playerChar.negStats.map((stat) => {
        if (document.getElementById(stat) !== null) {
          document.getElementById(stat).checked = true;
        }
      });
    }
    // stat values
    playerChar.stats ? playerChar.stats : (playerChar.stats = {});
    stats.creativity.value = playerChar.stats.creativity;
    stats.focus.value = playerChar.stats.focus;
    stats.harmony.value = playerChar.stats.harmony;
    stats.passion.value = playerChar.stats.passion;
    // fatigue
    $("#fatigue-counter").text($("#fatigue-range").val());
    if (playerChar.fatigue) {
      playerChar.fatigue.map((marker) => {
        if (document.querySelector(`input[name='${marker}']`)) {
          document.querySelector(`input[name='${marker}']`).checked = true;
        }
      });
    }

    // balance
    if (
      document.querySelector(`[name='balance'][value='${playerChar.balance}']`)
    ) {
      document.querySelector(
        `[name='balance'][value='${playerChar.balance}']`
      ).checked = true;
    }
  }

  // conditions
  if (playerChar.conditions) {
    playerChar.conditions.map(function (condition) {
      if (document.querySelector(`#${condition}`)) {
        document.querySelector(`#${condition}`).checked = true;
      }
    });
  }

  // playbook
  loadPlaybook(playerChar.playbook);

  // moves
  if (playerChar.moves) {
    playerChar.moves.map(function (move) {
      if (document.querySelector(`.moves[name="${move}"`)) {
        document.querySelector(`.moves[name="${move}"`).checked = true;
      }
    });
  }
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
    loadPlaybook(playerChar.playbook);
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
    playerChar.posStats = [];
    let posStats = $(".pos-stats:checked").map(function (stat) {
      playerChar.posStats.push(this.name);
    });
    saveChar();
  });
});
//neg
$(document).ready(function () {
  $(".neg-stats").change(function (e) {
    e.preventDefault();
    playerChar.negStats = [];
    let negStats = $(".neg-stats:checked").map(function (stat) {
      playerChar.negStats.push(this.name);
    });
    saveChar();
  });
});

// get stats
// creativity
$(document).ready(function () {
  $(stats.creativity).change(function (e) {
    e.preventDefault();
    let creativityStat = $("select[name='creativity'] option:selected").text();
    playerChar.stats.creativity = creativityStat;
    saveChar();
  });
});
// focus
$(function () {
  $(stats.focus).change(function (e) {
    e.preventDefault();
    let focusStat = $("select[name='focus'] option:selected").text();
    playerChar.stats.focus = focusStat;
    saveChar();
  });
});
// harmony
$(function () {
  $(stats.harmony).change(function (e) {
    e.preventDefault();
    let harmonyStat = $("select[name='harmony'] option:selected").text();
    playerChar.stats.harmony = harmonyStat;
    saveChar();
  });
});
// passion
$(function () {
  $(stats.passion).change(function (e) {
    e.preventDefault();
    let passionStat = $("select[name='passion'] option:selected").text();
    playerChar.stats.passion = passionStat;
    saveChar();
  });
});

// get fatigue
$(function () {
  $(".fatigue-markers").change(function (e) {
    e.preventDefault();
    $("#fatigue-counter").text(e.target.value);
    // playerChar.fatigue = [];
    // let fatigue = $(".fatigue-markers:checked").map(function (marker) {
    //   playerChar.fatigue.push(this.name);
    // });
    // saveChar();
  });
});

// get balance
$(function () {
  $("input[name='balance']").change(function (e) {
    e.preventDefault();
    playerChar.balance = this.value;
    saveChar();
  });
});

// get conditions
$(function () {
  $(".conditions").change(function (e) {
    e.preventDefault();
    playerChar.conditions = [];
    let conditions = $(".conditions:checked").map(function (condition) {
      playerChar.conditions.push(this.id);
    });
    saveChar();
  });
});

// fill playbook details

// playbook data
const adamant = () => {
  if (!playerChar.adamant) {
    playerChar.adamant = {};
  }

  let lodestar = $("#lodestar");
  // load lodestar
  playerChar.adamant.lodestar
    ? lodestar.val(playerChar.adamant.lodestar)
    : lodestar.val("");

  //save lodestar
  $(document).ready(function () {
    lodestar.change(function (e) {
      e.preventDefault();
      playerChar.adamant.lodestar = lodestar.val();

      saveChar();
    });
  });
};

// save playbook moves
$(document).ready(function () {
  $(".moves").change(function (e) {
    e.preventDefault();
    playerChar.moves = [];
    let moves = $(".moves:checked").map(function (move) {
      playerChar.moves.push(this.name);
    });
    saveChar();
  });
});

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

(async function () {
  playerChar = await playerCharData();
  loadCharData();
})();
