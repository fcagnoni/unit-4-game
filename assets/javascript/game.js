let characters = [{
    Name: "Homer",
    initialHP: 50,
    currentHP: 50,
    initialAtk: 15,
    currentAtk: 15,
    Counter: 18,
    imgURL: "assets/images/homer.jpg",
    charSelectElementId: "charSelectHomer"
  },
  {
    Name: "Barney",
    initialHP: 70,
    currentHP: 70,
    initialAtk: 13,
    currentAtk: 13,
    Counter: 16,
    imgURL: "assets/images/barney.png",
    charSelectElementId: "charSelectBarney"
  },
  {
    Name: "Carl",
    initialHP: 40,
    currentHP: 40,
    initialAtk: 18,
    currentAtk: 18,
    Counter: 21,
    imgURL: "assets/images/carl.jpg",
    charSelectElementId: "charSelectCarl"
  },
  {
    Name: "Lenny",
    initialHP: 30,
    currentHP: 30,
    initialAtk: 20,
    currentAtk: 20,
    Counter: 24,
    imgURL: "assets/images/lenny.jpg",
    charSelectElementId: "charSelectLenny"
  }
];
let burp = new Audio('assets/audio/burp.mp3');
var defeatedEnemies = [];
var playerDrinker;
var enemyDrinker;
var drinkers = [];
var turnCount;
var winCount;


$(document).ready(function () {
  $("#uWin").hide()
  $("#uLose").hide()
  $("#drinkBtn").hide()
  $("#resetBtn").hide()
  $("#chooseOpponent").hide()
  $("#drinkBtn").click(fight)
  $("#resetBtn").click(reset)

  characters.forEach(function (charDetails) {
    var charCardHTML = buildCard(charDetails);

    $("#charSelectCardGroup").append(charCardHTML);
    $("#" + charDetails.charSelectElementId).click(function () {
      $(this).unbind('click')
      selectChar(charDetails)
      $("#chooseChar").hide()
      $("#chooseOpponent").show()
    });
  });




})

function selectChar(playerCharacter) {
  burp.play()
  playerDrinker = playerCharacter
  renderEnemies();
}

function selectEnemy(character) {
  $("#chooseOpponent").hide()
  burp.play()
  enemyDrinker = character
  characters.forEach(function (charDetails) {
    if (playerDrinker.Name === charDetails.Name) {
      return
    }
    if (enemyDrinker.Name === charDetails.Name) {
      return
    }
    $("#" + charDetails.charSelectElementId).remove()

  })
  $("#drinkBtn").show()



}




function buildCard(character) {
  var cardHTML = `
<div class="card text-center" id="${character.charSelectElementId}" style="width: 10rem;">
<h5 class="card-title">${character.Name}</h5>
<img src="${character.imgURL}" class="card-img-top" alt="${character.Name}">
<div class="card-body">
  <p class="card-text">${character.currentHP}HP</p>
</div>
</div>
`;
  return cardHTML
  
}


function fight() {
  enemyDrinker.currentHP -= playerDrinker.currentAtk
  playerDrinker.currentAtk += playerDrinker.initialAtk

  $("#" + enemyDrinker.charSelectElementId).remove()
  $("#enemyCardGroup").append(buildCard(enemyDrinker));
  
  burp.play()
  if (enemyDrinker.currentHP <= 0) {
    console.log("you win")
    $("#drinkBtn").hide()
    $("#" + enemyDrinker.charSelectElementId).remove()
    defeatedEnemies.push(enemyDrinker.Name)
    renderEnemies();
    $("#chooseOpponent").show()
    if (defeatedEnemies.length === characters.length -1){
      $("#resetBtn").show()
      $("#uWin").show()
      $("#chooseOpponent").hide();
    }
  }
  else {
    playerDrinker.currentHP -= enemyDrinker.Counter
    $("#" + playerDrinker.charSelectElementId).remove()
    $("#charSelectCardGroup").append(buildCard(playerDrinker));
  }

  if (playerDrinker.currentHP <= 0) {
    console.log("you lose")
    $("#drinkBtn").hide()
    $("#resetBtn").show()
    $("#uLose").show()
    $("#chooseOpponent").hide()
  }
}

function reset() {
  burp.play()
  location.reload();
}


function renderEnemies() {
  characters.forEach(function (charDetails) {
    if (defeatedEnemies.includes(charDetails.Name)) {
      return
    }
    

    if (playerDrinker.Name === charDetails.Name) {
      return
    }
    $("#" + charDetails.charSelectElementId).remove()
    var charCardHTML = buildCard(charDetails);
    $("#enemyCardGroup").append(charCardHTML);
    $("#" + charDetails.charSelectElementId).click(function () {
      $(this).unbind('click')
      selectEnemy(charDetails)
    });
  })
}
