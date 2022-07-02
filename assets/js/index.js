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

    // statuses
    // pos
    if (playerChar.posStats) {
      playerChar.posStats.map((stat) => {
        if (document.getElementById(stat) !== null) {
          document.getElementById(stat).checked = true;
        }
      });
    }
    //neg
    if (playerChar.negStats) {
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
    playerChar.fatigue = [];
    let fatigue = $(".fatigue-markers:checked").map(function (marker) {
      playerChar.fatigue.push(this.name);
    });
    saveChar();
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

  if (document.querySelector(".adamant-details")) {
    return;
  }

  // details
  var details = document.createElement("p");
  details.className = "column adamant-details";
  details.innerHTML = `There's only one person you often let past your emotional walls. <br/>
<span class="has-text-weight-bold">Name your lodestar</span> (choose a PC to start):<input type: "text" id="lodestar"> 
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

  // document.querySelector("#playbook-details").append(details);

  // moves
  $("#playbook-detail-title").text(`The Lodestar`);
  $("#moves-container").append(`  
          <label for="this was a victory" class="checkbox column is-full">
            <input type="checkbox" class="moves" name="this was a victory" id="this was a victory" />
            <span class="is-size-5 is-uppercase">This Was a Victory</span>
            <p>When you reveal that you have sabotaged a building, 
device, or vehicle right as it becomes relevant, mark 
fatigue and roll with Passion . On a hit, your work pays 
off, creating an opportunity for you and your allies 
at just the right time. On a 7-9, the opportunity is 
fleeting—act fast to stay ahead of the consequences. 
On a miss, your action was ill-judged and something or 
someone you care about is hurt as collateral damage.</p>
          </label>

          <label for="takes one to know one" class="checkbox column is-full">
            <input type="checkbox" class="moves" name="takes one to know one" id="takes one to know one" />
            <span class="is-size-5 is-uppercase">Takes One to Know One</span>
            <p>When you verbally needle someone by finding the 
weaknesses in their armor, roll with Focus. On a hit, 
ask 1 question. On a 7-9, they ask 1 of you as well:
<br/>
• What is your principle?
<br/>
• What do you need to prove?
<br/>
• What could shake your certainty?
<br/>
• Whom do you care about more than you let on? 
<br/>
Anyone who lies or stonewalls marks 2-fatigue. On a 
miss, your attack leaves you exposed; they may ask 
you any one question from the list, and you must 
answer honestly.</p>
          </label>

          <label for="no time for feelings" class="checkbox column is-full">
            <input type="checkbox" class="moves" name="no time for feelings" id="no time for feelings" />
            <span class="is-size-5 is-uppercase has-text-">No Time For Feelings</span>
            <p>When you have equal or fewer conditions marked 
than your highest principle, mark fatigue to push 
down your feelings for the rest of the scene and 
ignore condition penalties until the end of the scene. 
When you resist an NPC shifting your balance, 
mark a condition to roll with conditions marked (max 
+4). You cannot then choose to clear a condition by 
immediately proving them wrong.</p>
          </label>

          <label for="i don't hate you" class="checkbox column is-full">
            <input type="checkbox" class="moves" name="i don't hate you" id="i don't hate you" />
            <span class="is-size-5 is-uppercase">i don't hate you</span>
            <p>When you guide and comfort someone in an awk- 
ward, understated, or idiosyncratic fashion, roll with 
Passion instead of Harmony if you mark Insecure or 
Insecure is already marked. </p>
          </label>

          <label for="driven by justice" class="checkbox column is-full">
            <input type="checkbox" class="moves" name="driven by justice" id="driven by justice" />
            <span class="is-size-5 is-uppercase">driven by Justice</span>
            <p>Take +1 to Passion (max +3).</p>
          </label>
`);

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

  // principles
  //save
  playerChar.adamant.principles = [];
  playerChar.adamant.principles.push("Restrant", "Results");
  saveChar();
  // load
  $("h3#principle-1").text(playerChar.adamant.principles[0]);
  $("h3#principle-2").text(playerChar.adamant.principles[1]);
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

loadCharData();
