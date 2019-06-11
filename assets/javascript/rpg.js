//Create Variables
var arrHeros = [];
var arrVillains = [];

var gameStatus = 0
var wins = 0

var $btnAttack = $("#btnAttack")
var $btnReset = $("#btnReset")
var $challengers = $("#challengers")
var $defendersHeaderRow = $("#defendersHeaderRow")
var $gameBoard = $("#gameBoard")
var $instructions = $(".js_instructions")
var $report1 = $("#report1")
var $report2 = $("#report2")

var Big_Mac 
var Whopper
var Wendys 
var Chalupa 
var Salmon_Roll 
var Chow_Mein 
var challenger

$("#btnAttack").on("click",function(){
   
    battle(challenger,defender);
    
})

$("#btnReset").on("click", function(){    

    //resetGame();
    populateCharacterArrays();
    resetGame(arrHeros.slice(0),arrVillains.slice(0))

})

populateCharacterArrays();
resetGame(arrHeros.slice(0),arrVillains.slice(0))
//resetGame()


function battle(challenger, defender){
    debugger;
    //  console.log("START")
    //  console.log(challenger)
    //  console.log(defender)
    
    //Determine Strength and Power of Attacker
    let playerStrength = (challenger.healthPoints * .01)
    let playerPower = challenger.attackPower
    let playerAttack = Math.floor(challenger.experience * playerPower * playerStrength) 

    // var Hero_Attack = arrHeroAttack
    var arrHeroAttack = [" with patty slap ", " with sesame seed bomb ", " with condiment burst "]
    var randomAttack = Math.floor(Math.random() * arrHeroAttack.length)
    
    $report1.text(challenger.name + " attacked " + defender.name + "" + arrHeroAttack[randomAttack] + " for " + playerAttack + " points of damage.")

    //Apply Damage to Defender
    defender.healthPoints -= playerAttack
    let $defenderHeathDisplay = $(".js_defenderHealth")
    $defenderHeathDisplay.text("Health: " + defender.healthPoints)
    

    if(defender.healthPoints > 0){

        if (defender.healthPoints < 80) {
            $defenderHeathDisplay.removeClass("bg-success")
            $defenderHeathDisplay.addClass("bg-warning text-dark")
        }

        //Apply Counter Attack
        let defenderStrength =  (defender.healthPoints * .01)
        let defenderAttack = Math.floor(defender.counterAttackPower * defenderStrength) 
     
        challenger.healthPoints -= defenderAttack

        let challengerHeathDisplay = $(".js_challengerHealth")
        challengerHeathDisplay.text("Health: " + challenger.healthPoints)

        //var Salmon_Roll_Attack = arrSalmon_Roll_Attack
        var randomAttack = Math.floor(Math.random() * defender.attacks.length)
        
        $report2.text(defender.name + " attacked you back with " + defender.attacks[randomAttack] +  " for " + defenderAttack + " points of damage.")


        if (challenger.healthPoints <= 0) {
            //Player Defeated
            //console.log("GAME OVER!")
    
            gameStatus = 1
            challengerHeathDisplay.removeClass("bg-success bg-warning")
            challengerHeathDisplay.addClass("bg-danger")
            challengerHeathDisplay.text("Health: 0")
                      
            $(".js_challenger").addClass("challenger-defeated")
            $instructions.text(challenger.name.toUpperCase() + " was defeated by " + defender.name.toUpperCase())
                                  
            $btnAttack.addClass("display_none");
            $btnReset.removeClass("display_none");

        } else {
            //Increment Player Power for next round
            playerPower = playerPower + 5
            challenger.attackPower = playerPower
            if (challenger.healthPoints < 80 && challenger.healthPoints > 0){
                challengerHeathDisplay.removeClass("bg-success")
                challengerHeathDisplay.addClass("bg-warning text-dark")
            }        
        }  
    }else{
        //console.log("YOU WIN!")

        //Increment Wins
        wins = ++wins  
        var $badge =  $(".badge")
        $badge.html("<strong>" + wins + "</strong>");
        $report2.empty();
        
        
        //Clear Defender and Remove Attack button
        $("#defender").empty()
        $btnAttack.addClass("display_none");

        if(wins < 3 && challenger.healthPoints > 0){
            //Increment Player Power for next round
            playerPower = playerPower + 5
            challenger.attackPower = playerPower
            challenger.experience = challenger.experience + .25
            $instructions.text(challenger.name.toUpperCase() + " WINS! Choose next opponent!")
                      
        }else{
            $btnReset.removeClass("display_none");
         
            $instructions.text(challenger.name.toUpperCase() + " UNDEFEATED CHAMPION!")
        }

    }
         
    //  console.log(challenger)
    //  console.log(defender)
    //  console.log(playerPower)
    //  console.log("END")
}

//Character Prototype
function Character(name, imagePath, attackPower,counterAttackPower, attacks){
    this.name = name;
    this.imagePath = imagePath;
    this.attackPower = attackPower;
    this.counterAttackPower = counterAttackPower;
    this.healthPoints = 100;
    this.experience = 1;
    this.attacks = attacks;
}

//Create Character Bootstrap Cards
//panel = row/area; position = position within area
function createCard(character, panel, position) {
    
    newCard = $("<div>")
    newCard.addClass("card bg-dark text-light text-center mb-2")
    newCardHeader = $("<div>")
    newCardHeader.appendTo(newCard)
    newCardBody = $("<div>")
    newCardBody.addClass("card-body")   
    newCardBody.appendTo(newCard)
    newImage = $("<img>")
    newImage.attr("src", "assets/images/" + character.imagePath)
    newImage.appendTo(newCardBody)
   
    newCardHeader
        .addClass("card-header bg-info")
        .text(character.name.toUpperCase())

    if (panel == "defender") {
        
        newCard.addClass("js_defender")

        let newCardFooter = $("<div>")
        newCardFooter
            .addClass("card-footer bg-success js_defenderHealth p-1")
            .text("Health: " + character.healthPoints)        
        newCardFooter.appendTo(newCard)

    } else if (panel == "challenger") {
        newCard.addClass("js_challenger")
        newBadge = $("<div>")
        newBadge.addClass("badge")
        newBadge.appendTo(newCardHeader)
        let newCardFooter = $("<div>")
        newCardFooter
            .addClass("card-footer bg-success js_challengerHealth p-1")
            .text("Health: " + character.healthPoints)
        newCardFooter.appendTo(newCard)
    }

    newCard.appendTo(position)
     
    if (panel == "character") {
        
        $(position).on("click", function () {
            let arrDefenders = []
            //
            switch (character.name) {
                case "Wendy's":
                case "Whopper":
                case "Big Mac":
                    arrDefenders = arrVillains
                    break;
                case "Chalupa":
                case "Salmon Sushi Roll":
                case "Chow Mein":
                    arrDefenders = arrHeros
                    break;
            }

            $defendersHeaderRow.removeClass("display_none")
            challenger = selectCharacter(character.name)
            createCard(challenger, "challenger", "#challenger")
            
            $(".js_character").remove();
            
            for (var i = 1; i < 4; i++) {
                $newSection = $("<section>")
                $newSection
                    .attr("id", "defender" + i)
                    .addClass("col col-md-3 js_defender")

                $newSection.appendTo($challengers)

            }

            $gameBoard.removeClass("display_none");           
            populateDefenders(arrDefenders.slice(0));

        })

    } else if (panel == "defenders") {

        $instructions.text("Choose opponent to fight!")
       
        $(position).on("click", function () {
            

            if ($(".js_defenderHealth")[0]){
                $instructions.text("Oponent selected; please click ATTACK button.")
                
            }else{
                $instructions.text("Click Attack button to fight!")
                defender = selectCharacter(character.name)
                createCard(defender, "defender", "#defender")
                $(this).empty();
                $btnAttack.removeClass("display_none");
                $report1.empty();
                $report2.empty();
                $(window).scrollTop($("#top").offset().top);
                if(wins=="2"){
                    $defendersHeaderRow.addClass("display_none")
                }
               
            }
          
            
            
        })

    }

}

function populateCharacterArrays(){
    arrHeros = []
    arrHeros.push(Big_Mac = new Character("Big Mac", "Big_Mac.jpg", 32, 20))
    arrHeros.push(Whopper = new Character("Whopper", "Whopper.jpg", 33, 30))
    arrHeros.push(Wendys = new Character("Wendy's", "Wendy_s.jpg", 34, 75))
    arrVillains = []
    arrVillains.push(Chalupa = new Character("Chalupa", "Chalupa.jpg", 34, 75,  [' shell smash ', " beef burn ", " sizzeling splash "]))
    arrVillains.push(Salmon_Roll = new Character("Salmon Sushi Roll", "Salmon_Sushi_Roll.jpg", 32, 20, [' rice dart ', " seaweed wrap ", " gave you Salmonella "]))
    arrVillains.push(Chow_Mein = new Character("Chow Mein", "Chow_Mein.jpg", 33, 30,  [' noodle whip ', " noodle noose ", " poisoned noodle soup "]))
}

function populateDefenders(arrDefenders) {
    //Randomly Arrange Defenders
    for (var i = 1; i <= 3; i++) {
        let charIdx = Math.floor(Math.random() * arrDefenders.length)
        let character = arrDefenders[charIdx]
        createCard(character, "defenders", "#defender" + i)
       
        arrDefenders.splice(charIdx, 1)
    }
}

function resetGame(Heros,Villains) {
    gameStatus=0
    wins=0
                
    $(".js_defenders").empty()
    $(".js_challenger").remove()
    $(".js_defender").remove()
    $report1.empty();
    $report2.empty();
    $gameBoard.addClass("display_none")
    $btnAttack.addClass("display_none")
    $btnReset.addClass("display_none")
          
    $challengers.empty()
    
    for(var i = 1; i < 5;i++){
        $newSection = $("<section>")
        $newSection
            .attr("id", "character" + i)
            .addClass("col col-md-3 js_character")
        $newSection.appendTo($challengers)
    }
    
    //populateCharacterArrays()
   
    $instructions.addClass("text-center text-light mt-4 p-4 bg-dark")
    $instructions.text("Choose your Champion!")

    //Randomly Select 2 Heros
    for (var i = 1; i < 3; i++) {
        charIdx = Math.floor(Math.random() * Heros.length)
        var character = Heros[charIdx]
        createCard(character,"character","#character" + i)
        Heros.splice(charIdx, 1)
    }
    //Randomly Select 2 Villains
    for (var i = 3; i < 5; i++) {
        let charIdx = Math.floor(Math.random() * Villains.length)
        var character = Villains[charIdx]
        createCard(character,"character","#character" + i)
        Villains.splice(charIdx, 1)
    }
    //Repopulate Charcter Arrays For Later Use
    //populateCharacterArrays()
    
   
  
}

//Select Character When User Selects Image
function selectCharacter(characterName) {

    switch (characterName) {
        case "Wendy's":
            character = Wendys 
            break;
        case "Whopper":
            character = Whopper
            break;
        case "Big Mac":
            character = Big_Mac
            break;
        case "Chalupa":
            character = Chalupa         
            break;
        case "Salmon Sushi Roll":
            character = Salmon_Roll          
            break;
        case "Chow Mein":
            character = Chow_Mein            
            break;
    }
  
    return character
}










//TESTING PURPOSES ONLY BELOW

function testSimulator(attacker, defender1, defender2, defender3){

    while(gameStatus==0 && wins==0){
        battle(attacker,defender1)
        //debugger;

    }
    while(gameStatus==0 && wins==1){
        battle(attacker,defender2)
        //debugger;

    }
    while(gameStatus==0 && wins==2){
        battle(attacker,defender3)
        //debugger;
    }

}