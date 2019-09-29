// // Characters
// // create data for all the characters, with their names, type, weaknesses, health, and attack moves(name, attack stat, maximum)

//strongest to weakest Digimon: Millenniummon, Imperialdramon, Susanoomon, Apocalymon, Khaosmon
//strongest to weakest Pokemon: Rayquaza, Arceus, Giratina, Palkia, Dialga

//Database section      ==================================================
//game state    ===================================================================
var gameState = {
  userCharacter: '',
  rivalCharacter: '',
  characterDB: [{
      name: 'Imperialdramon',
      hp: 400,
      attack: 8,
      defense: 4,
      level: 4,
      levelDisplay: '100,000,000',
      img: './img/strongest_digimon/1Imperialdramon_Paladin_Mode.gif'
    },
    {
      name: 'Apocalymon',
      hp: 200,
      attack: 4,
      defense: 8,
      level: 2,
      levelDisplay: '100,000',
      img: './img/strongest_digimon/1Apocalymon.gif'
    },
    {
      name: 'Susanoomon',
      hp: 300,
      attack: 6,
      defense: 6,
      level: 3,
      levelDisplay: '1,000,000',
      img: './img/strongest_digimon/1SUSANOOMON.gif'
    },
    {
      name: 'Khaosmon',
      hp: 100,
      attack: 2,
      defense: 10,
      level: 1,
      levelDisplay: '10,000',
      img: './img/strongest_digimon/1UltimateKhaosmon.gif'
    },
    {
      name: 'Millenniummon',
      hp: 500,
      attack: 10,
      defense: 2,
      level: 5,
      levelDisplay: '100,000,000,000',
      img: './img/strongest_digimon/1ZEEDMILLENNIUMMON.gif'
    },
    {
      name: 'Arceus',
      hp: 400,
      attack: 8,
      defense: 4,
      level: 4,
      levelDisplay: '100,000,000',
      img: './img/strongest_pokemon/1arceus.gif'
    },
    {
      name: 'Dialga',
      hp: 100,
      attack: 2,
      defense: 10,
      level: 1,
      levelDisplay: '10,000',
      img: './img/strongest_pokemon/1dialga.gif'
    },
    {
      name: 'Giratina',
      hp: 300,
      attack: 6,
      defense: 6,
      level: 3,
      levelDisplay: '1,000,000',
      img: './img/strongest_pokemon/1giratina-origin.gif'
    },
    {
      name: 'Palkia',
      hp: 200,
      attack: 4,
      defense: 8,
      level: 2,
      levelDisplay: '100,000',
      img: './img/strongest_pokemon/1palkia.gif'
    },
    {
      name: 'Rayquaza',
      hp: 500,
      attack: 10,
      defense: 2,
      level: 5,
      levelDisplay: '100,000,000,000',
      img: './img/strongest_pokemon/1rayquaza-mega.gif'
    },
  ],

  elements: {
    charEl: document.querySelector('.select-screen').querySelectorAll('.character'),
    battleScreenEl: document.getElementById('battle-screen'),
    attackBtnsEl: document.getElementById('battle-screen').querySelectorAll('.attack')
  },

  init: function () {
    //elements section   =============================================================
    // console.log(gameState.elements.attackBtnsEl);

    //loop for character selection    =======================================================
    var i = 0;
    while (i < gameState.elements.charEl.length) {
      //function applied to each characters on the screen selection mode  ====================
      gameState.elements.charEl[i].onclick = function () {
        //names that are selected in select mode   =============================================
        var characterName = this.dataset.character;
        //targeting the images in battle mode     =============================================
        var player1Img = document.querySelector('.player1').getElementsByTagName('img');
        var player2Img = document.querySelector('.player2').getElementsByTagName('img');

        //store player1 character into game state database      ===================================
        gameState.userCharacter = characterName;

        //computer randomly selects character  =====================================================
        gameState.computerPick();
        //battle screen appears after player 1 selects character    ================================
        gameState.elements.battleScreenEl.classList.toggle('active');
  
        //accessing database from the selected player1 character    ==================================
        gameState.currentUserCharacter = gameState.characterDB.filter(function (character) {
          return character.name == gameState.userCharacter;
        });

        player1Img[0].src = gameState.currentUserCharacter[0].img;

        //accessing database from the selected computer character    ==================================
        gameState.currentRivalCharacter = gameState.characterDB.filter(function (character) {
          return character.name == gameState.rivalCharacter;
        });

        player2Img[0].src = gameState.currentRivalCharacter[0].img;

        //name and level changes after selection is made===============================
        document.getElementById('name1').innerHTML = gameState.currentUserCharacter[0].name;
        document.getElementById('name2').innerHTML = gameState.currentRivalCharacter[0].name;
        document.getElementById('level1').innerHTML = gameState.currentUserCharacter[0].levelDisplay;
        document.getElementById('level2').innerHTML = gameState.currentRivalCharacter[0].levelDisplay;
        // console.log(gameState.currentUserCharacter)
        // console.log(gameState.currentRivalCharacter)

        gameState.currentUserCharacter[0].health = gameState.calcInitHealth(gameState.currentUserCharacter);

        gameState.currentUserCharacter[0].originalHealth = gameState.calcInitHealth(gameState.currentUserCharacter);

        gameState.currentRivalCharacter[0].health = gameState.calcInitHealth(gameState.currentRivalCharacter);
        // console.log(gameState);

        gameState.currentRivalCharacter[0].originalHealth = gameState.calcInitHealth(gameState.currentRivalCharacter);
        // console.log(gameState);
      };
      i++;
    };

    var a = 0;
    while (a < gameState.elements.attackBtnsEl.length) {
      gameState.elements.attackBtnsEl[a].onclick = function () {
        var attackName = this.dataset.attack;
        gameState.currentUserAttack = attackName;
        gameState.play(attackName, gameState.computerAttack());
      };
      a++;
    };
  },

  computerAttack: function () {
    var attacks = ['rock', 'paper', 'scissors'];
    return attacks[gameState.randomNumber(0, 3)];
  },

  calcInitHealth: function (user) {
    return ((0.20 * Math.sqrt(user[0].level)) * user[0].defense) * user[0].hp;
  },

  attackMove: function (attack, level, stack, critical, enemy, attacker) {
    // console.log(enemy.name + ' before: ' + enemy.health);
    var attackAmount = ((attack * level) * (stack + critical));
    enemy.health = enemy.health - attackAmount;

    var userHP = document.querySelector('.player1').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside');

    var compHP = document.querySelector('.player2').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside');

    if (enemy.owner == 'user') {
      var minusPercent = ((enemy.health) * 100 / enemy.originalHealth);
      // console.log(userHP)
      userHP.style.width = ((minusPercent < 0) ? 0 : minusPercent) + '%';
    } else {
      var minusPercent = ((enemy.health) * 100 / enemy.originalHealth);
      // console.log(userHP)
      compHP.style.width = ((minusPercent < 0) ? 0 : minusPercent) + '%';
    } 
    gameState.checkWinner(enemy, attacker);
    // console.log('attack = ' + attackAmount);
    // console.log(enemy.name + ' after: ' + enemy.health);
  },

  checkWinner: function (enemy, attacker) {
    if (enemy.health <= 0) {
      // console.log('Congratulations! You are the WINNER!! ' + attacker.name);
    };
  },

  randomNumber: function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },

  computerPick: function () {
    do {
      gameState.rivalCharacter = gameState.elements.charEl[gameState.randomNumber(0, 10)].dataset.character;
      // console.log('looping ' + gameState.rivalCharacter)
    }
    while (gameState.userCharacter == gameState.rivalCharacter) 
  },

  play: function (userAttack, computerAttack) {
    var currentUserCharacter = gameState.currentUserCharacter[0];
    var currentRivalCharacter = gameState.currentRivalCharacter[0];
    currentUserCharacter.owner = 'user';
    currentRivalCharacter.owner = 'computer';
    switch (userAttack) {
      case 'rock':
        // console.log('I picked: ' + userAttack);
        // console.log('Computer picked: ' + computerAttack);
        if (computerAttack == 'paper') {
          if (currentUserCharacter.health >= 1 && currentRivalCharacter.health >= 1) {
            //user
            gameState.attackMove(currentUserCharacter.attack, currentUserCharacter.level, .8, .5, currentRivalCharacter, currentUserCharacter);
            if (currentRivalCharacter.health >= 1) {
              //computer
              gameState.attackMove(currentRivalCharacter.attack, currentRivalCharacter.level, .8, 2, currentUserCharacter, currentRivalCharacter);
              // console.log('Paper beats Rock You lose.');
            };
          };

        };
        if (computerAttack == 'scissors') {
          if (currentUserCharacter.health >= 1 && currentRivalCharacter.health >= 1) {
            //user
            gameState.attackMove(currentUserCharacter.attack, currentUserCharacter.level, .8, 2, currentRivalCharacter, currentUserCharacter);
            if (currentRivalCharacter.health >= 1) {
              //computer
              gameState.attackMove(currentRivalCharacter.attack, currentRivalCharacter.level, .8, .5, currentUserCharacter, currentRivalCharacter);
              // console.log('Rock beats Scissors You win!');
            };
          };
        };
        if (computerAttack == 'rock') {
          if (currentUserCharacter.health >= 1 && currentRivalCharacter.health >= 1) {
            //user
            gameState.attackMove(currentUserCharacter.attack, currentUserCharacter.level, .8, 1, currentRivalCharacter, currentUserCharacter);
            if (currentRivalCharacter.health >= 1) {
              //computer
              gameState.attackMove(currentRivalCharacter.attack, currentRivalCharacter.level, .8, 1, currentUserCharacter, currentRivalCharacter);
              // console.log('Both of you lose.');
            };
          };
        };
        break;
      case 'paper':
        // console.log('I picked: ' + userAttack);
        // console.log('Computer picked: ' + computerAttack);
        if (computerAttack == 'scissors') {
          if (currentUserCharacter.health >= 1 && currentRivalCharacter.health >= 1) {
            //user
            gameState.attackMove(currentUserCharacter.attack, currentUserCharacter.level, .8, .5, currentRivalCharacter, currentUserCharacter);
            if (currentRivalCharacter.health >= 1) {
              //computer
              gameState.attackMove(currentRivalCharacter.attack, currentRivalCharacter.level, .8, 2, currentUserCharacter, currentRivalCharacter);
              // console.log('Scissors beats Paper You lose.');
            };
          };
        };
        if (computerAttack == 'rock') {
          if (currentUserCharacter.health >= 1 && currentRivalCharacter.health >= 1) {
            //user
            gameState.attackMove(currentUserCharacter.attack, currentUserCharacter.level, .8, 2, currentRivalCharacter, currentUserCharacter);
            if (currentRivalCharacter.health >= 1) {
              //computer
              gameState.attackMove(currentRivalCharacter.attack, currentRivalCharacter.level, .8, .5, currentUserCharacter, currentRivalCharacter);
              // console.log('Paper beats Rock You win!');
            };
          };
        };
        if (computerAttack == 'paper') {
          if (currentUserCharacter.health >= 1 && currentRivalCharacter.health >= 1) {
            //user
            gameState.attackMove(currentUserCharacter.attack, currentUserCharacter.level, .8, 1, currentRivalCharacter, currentUserCharacter);
            if (currentRivalCharacter.health >= 1) {
              //computer
              gameState.attackMove(currentRivalCharacter.attack, currentRivalCharacter.level, .8, 1, currentUserCharacter, currentRivalCharacter);
              // console.log('Both of you lose.');
            };
          };
        };
        break;
      case 'scissors':
        // console.log('I picked: ' + userAttack);
        // console.log('Computer picked: ' + computerAttack);
        if (computerAttack == 'rock') {
          if (currentUserCharacter.health >= 1 && currentRivalCharacter.health >= 1) {
            //user
            gameState.attackMove(currentUserCharacter.attack, currentUserCharacter.level, .8, .5, currentRivalCharacter, currentUserCharacter);
            if (currentRivalCharacter.health >= 1) {
              //computer
              gameState.attackMove(currentRivalCharacter.attack, currentRivalCharacter.level, .8, 2, currentUserCharacter, currentRivalCharacter);
              // console.log('Rock beats Scissors. You lose.');
            };
          };
        };
        if (computerAttack == 'paper') {
          if (currentUserCharacter.health >= 1 && currentRivalCharacter.health >= 1) {
            //user
            gameState.attackMove(currentUserCharacter.attack, currentUserCharacter.level, .8, 2, currentRivalCharacter, currentUserCharacter);
            if (currentRivalCharacter.health >= 1) {
              //computer
              gameState.attackMove(currentRivalCharacter.attack, currentRivalCharacter.level, .8, .5, currentUserCharacter, currentRivalCharacter);
              // console.log('Scissors beats Paper. You win!');
            };
          };
        };
        if (computerAttack == 'scissors') {
          if (currentUserCharacter.health >= 1 && currentRivalCharacter.health >= 1) {
            //user
            gameState.attackMove(currentUserCharacter.attack, currentUserCharacter.level, .8, 1, currentRivalCharacter, currentUserCharacter);
            if (currentRivalCharacter.health >= 1) {
              //computer
              gameState.attackMove(currentRivalCharacter.attack, currentRivalCharacter.level, .8, 1, currentUserCharacter, currentRivalCharacter);
              // console.log('Both of you lose.');
            };
          };
        };
        break;
    };
  }
};
gameState.init()