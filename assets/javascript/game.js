$(document).ready(function() {

    var clickCount = 0;
    var charClicked = "";
    var attackChar = "";
    var defendChar = "";
    var attackHealth = 0;
    var defendHealth = 0;

    var kenobi = {
        name: "Obi-Wan Kenobi",
        health: 120,
        attack: 6,
        counterAttack: 12,
    }

    var skywalker = {
        name: "Luke Skywalker",
        health: 140,
        attack: 12,
        counterAttack: 4,
    }

    var vader = {
        name: "Darth Vader",
        health: 100,
        attack: 8,
        counterAttack: 24,
    }

    var maul = {
        name: "Darth Maul",
        health: 160,
        attack: 10,
        counterAttack: 8,
    }

    //populate the starting health points
    $("#kenobi-hp").text(kenobi.health);
    $("#skywalker-hp").text(skywalker.health);
    $("#vader-hp").text(vader.health);
    $("#maul-hp").text(maul.health);

    function selectDefender(defender) {
        if (defender === "kenobi") {
            $("#kenobi-div").appendTo("#defender").css({
                "background-color": "#000000",
                "color": "#ffffff"});
            $("#kenobi-div").removeAttr("value");
        } else if (defender === "skywalker") {
            $("#skywalker-div").appendTo("#defender").css({
                "background-color": "#000000",
                "color": "#ffffff"});
            $("#skywalker-div").removeAttr("value");
        } else if (defender === "vader") {
            $("#vader-div").appendTo("#defender").css({
                "background-color": "#000000",
                "color": "#ffffff"});
            $("#vader-div").removeAttr("value");
        } else if (defender === "maul") {
            $("#maul-div").appendTo("#defender").css({
                "background-color": "#000000",
                "color": "#ffffff"});
            $("#maul-div").removeAttr("value");
        }
    }

    function selectAttacker(attacker) {
        if (attacker === "kenobi") {
            $("#kenobi-div").appendTo("#your-char");
            $("#skywalker-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
            $("#vader-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
            $("#maul-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
            $("#kenobi-div").removeAttr("value");
        } else if (attacker === "skywalker") {
            $("#skywalker-div").appendTo("#your-char");
            $("#kenobi-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
            $("#vader-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
            $("#maul-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
            $("#skywalker-div").removeAttr("value");
        } else if (attacker === "vader") {
            $("#vader-div").appendTo("#your-char");
            $("#kenobi-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
            $("#skywalker-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
            $("#maul-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
            $("#vader-div").removeAttr("value");
        } else if (attacker === "maul") {
            $("#maul-div").appendTo("#your-char");
            $("#kenobi-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
            $("#skywalker-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
            $("#vader-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
            $("#maul-div").removeAttr("value");
        }
    }

    //var kenobi = {
    //    health: 120,
    //    attack: 6,
    //    counterAttack: 12,
    //}
    function attackHealthCalc(attHealth) {
        attHealth = attHealth - defendChar.counterAttack;
        return attHealth;
    }

    function defenderHealthCalc(defHealth) {
        defHealth = defHealth - attackPower;
        return defHealth;
    }
    
    function attackDefend(attackObj, aHealth, defendObj, dHealth, aPower) {
        console.log("dHealth: " + dHealth);
        console.log("aHealth: " + aHealth);

        if (dHealth <= 0) {
            //new defender logic
            var gameStatus = "defenderDead";
            if (defendObj === kenobi) {
                $("#kenobi-div").hide();
            } else if (defendObj === skywalker){
                $("#skywalker-div").hide();
            } else if (defendObj === vader){
                $("#vader-div").hide();
            } else if (defendObj === maul){
                $("#maul-div").hide();
            }
            //writeHtml(gameStatus);

        } else if (aHealth <= 0) {
            //game over logic
            var gameStatus = "gameover";
            //writeHtml(gameStatus);

        } else {
            //continue attack logic
            var gameStatus = "continue";
            //writeHtml(gameStatus);

        }
        writeHtml(gameStatus, defendObj, aPower);
    }

    function writeHtml(gameOptions, dObject, attackPwr,) {
        var resetButton = $("<button>");
        resetButton.attr("id", "resetBtn");
        resetButton.text("Reset");
        
        if (gameOptions === "gameover") {
            $("#p1").text("You have been defeated... GAME OVER!!");
            $("#p2").text("");
            $("#defender").append(resetButton);
        }else if (gameOptions === "defenderDead") {
            //need logic to send defenderName variable
            $("#p1").text("You have defeated " + dObject.name + " ,choose another enemy");
            $("#p2").text("");
        }else if (gameOptions === "alldefendersDead") {
            $("#p1").text("You Won!!! GAME OVER!!");
            $("#p2").text("");
            $("#defender").append(resetButton);
        }else if (gameOptions === "continue") {
            //need logic for all 3 variables
            $("#p1").text("You attacked " + dObject.name + " for " + attackPwr + " damage."); 
            $("#p2").text(dObject.name + " attacked you back for " + dObject.counterAttack + " damage.");

        }

    }

    //captures the click to see which character was clicked 
    $(".char-div").on("click", function() {
        charClicked = ($(this).attr("value"));
        if (clickCount === 0) {                 //first click sets the attacker
            if (charClicked === "kenobi") {
                attackChar = kenobi;
            } else if (charClicked === "skywalker") {
                attackChar = skywalker;
            } else if (charClicked === "vader") {
                attackChar = vader;
            }
            else if (charClicked === "maul") {
                attackChar = maul;
            }
        //attackChar = charClicked;
        selectAttacker(charClicked);
        clickCount++;
        //attackHealth = attackChar.health - defendChar.counterAttack;
        attackHealth = attackChar.health;
        attackPower = attackChar.attack;
    } else if (clickCount > 0) {          //remaining clicks select the defender
            charClicked = ($(this).attr("value"));
            if (charClicked === "kenobi") {
                defendChar = kenobi;
            } else if (charClicked === "skywalker") {
                defendChar = skywalker;
            } else if (charClicked === "vader") {
                defendChar = vader;
            }
            else if (charClicked === "maul") {
                defendChar = maul;
            }
            //defendChar = charClicked;
            selectDefender(charClicked);
            defendHealth = defendChar.health;
    }
    })

    $("#attack-btn").on("click", function() {
        console.log("attacker: " + attackChar);
        console.log("defender: " + defendChar);
        
        attackHealth = attackHealthCalc(attackHealth);
        defendHealth = defenderHealthCalc(defendHealth, attackPower);
        console.log("attack health: " + attackHealth);
        console.log("defender health: " + defendHealth);
        attackDefend(attackChar, attackHealth, defendChar, defendHealth, attackPower);
        attackPower += attackChar.attack;
    })    

});
