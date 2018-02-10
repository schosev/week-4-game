$(document).ready(function() {

    var clickCount = 0;
    var charClicked = "";
    var attackChar = "";
    var defendChar = "";
    var attackHealth = 0;
    var defendHealth = 0;
    var deadDefenders = [];
    var gameStatus = "";
    var defenderIsActive = false;
    var resetButton = $("<button>");
        resetButton.attr("id", "resetBtn");
        resetButton.text("Reset");

    var kenobi = {
        name: "Obi-Wan Kenobi",
        health: 120,
        attack: 6,
        counterAttack: 12,
        isClicked: false,
    }

    var skywalker = {
        name: "Luke Skywalker",
        health: 140,
        attack: 12,
        counterAttack: 4,
        isClicked: false,
    }

    var vader = {
        name: "Darth Vader",
        health: 100,
        attack: 8,
        counterAttack: 24,
        isClicked: false,
    }

    var maul = {
        name: "Darth Maul",
        health: 160,
        attack: 10,
        counterAttack: 8,
        isClicked: false,
    }

    //populate the starting health points
    $("#kenobi-hp").text(kenobi.health);
    $("#skywalker-hp").text(skywalker.health);
    $("#vader-hp").text(vader.health);
    $("#maul-hp").text(maul.health);

    function selectDefender(defender, setAttacker) {
        if (defender.isClicked) return;
        defendChar.isClicked = true;
        $("#p1").text("");
        $("#p2").text("");

        if (defender === kenobi) {
            $("#kenobi-div").appendTo("#defender").css({
                "background-color": "#000000",
                "color": "#ffffff"});
        } else if (defender === skywalker) {
            $("#skywalker-div").appendTo("#defender").css({
                "background-color": "#000000",
                "color": "#ffffff"});
        } else if (defender === vader) {
            $("#vader-div").appendTo("#defender").css({
                "background-color": "#000000",
                "color": "#ffffff"});
        } else if (defender === maul) {
            $("#maul-div").appendTo("#defender").css({
                "background-color": "#000000",
                "color": "#ffffff"});
        }
    }

    function selectAttacker(attacker) {
        if (attacker.isClicked) return;
        attackChar.isClicked = true;
        if (attacker === kenobi) {
            $("#kenobi-div").appendTo("#your-char");
            $("#skywalker-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
            $("#vader-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
            $("#maul-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
        } else if (attacker === skywalker) {
            $("#skywalker-div").appendTo("#your-char");
            $("#kenobi-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
            $("#vader-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
            $("#maul-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
        } else if (attacker === vader) {
            $("#vader-div").appendTo("#your-char");
            $("#kenobi-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
            $("#skywalker-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
            $("#maul-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
        } else if (attacker === maul) {
            $("#maul-div").appendTo("#your-char");
            $("#kenobi-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
            $("#skywalker-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
            $("#vader-div").appendTo("#enemy-attack").css("background-color", "#ff0000");
        }
    }

    function attackHealthCalc(attHealth) {
        attHealth = attHealth - defendChar.counterAttack;
        return attHealth;
    }

    function defenderHealthCalc(defHealth) {
        defHealth = defHealth - attackPower;
        return defHealth;
    }
    
    //determines what to do based on characters health and calls the function to write the html messages.
    function attackDefend(attackObj, defendObj, aPower) {

        //calculates the defenders health after attack
        defendHealth = defenderHealthCalc(defendHealth, attackPower);

        //calculates the attackers health after attack
        if (defendHealth > 0) {
            attackHealth = attackHealthCalc(attackHealth);
        }

        if (defendObj === kenobi) {
            $("#kenobi-hp").text(defendHealth);
        } else if (defendObj === skywalker){
            $("#skywalker-hp").text(defendHealth);
        } else if (defendObj === vader){
            $("#vader-hp").text(defendHealth);
        } else if (defendObj === maul){
            $("#maul-hp").text(defendHealth);
        }

        if (defendHealth <= 0) {
            //new defender logic
            gameStatus = "defenderDead";
            defenderIsActive = false;
            deadDefenders.push(defendObj);

            if (defendObj === kenobi) {
                $("#kenobi-div").hide();
            } else if (defendObj === skywalker){
                $("#skywalker-div").hide();
            } else if (defendObj === vader){
                $("#vader-div").hide();
            } else if (defendObj === maul){
                $("#maul-div").hide();
            }

        } else if (attackHealth <= 0) {
            //game over logic
            gameStatus = "gameover";

        } else {
            //continue attack logic
            gameStatus = "continue";

        }
        if (deadDefenders.length >= 3) {
            gameStatus = "alldefendersDead"
        }

        if (attackObj === kenobi) {
            $("#kenobi-hp").text(attackHealth);
        } else if (attackObj === skywalker){
            $("#skywalker-hp").text(attackHealth);
        } else if (attackObj === vader){
            $("#vader-hp").text(attackHealth);
        } else if (attackObj === maul){
            $("#maul-hp").text(attackHealth);
        }

        writeHtml(gameStatus, defendObj, aPower);
    }

    //write html messages based on attack results
    function writeHtml(gameOptions, dObject, attackPwr,) {

        if (gameOptions === "gameover") {
            $("#p1").text("You have been defeated... GAME OVER!!").css({
                "color": "#ff0000",
                "font-size": "25px"
            });
            $("#p2").text("");
            $("#text-display").show().append(resetButton);

            $("#resetBtn").show().on("click", function() {
                resetGame();
            })
            defenderIsActive = true;
        }else if (gameOptions === "defenderDead") {
            $("#p1").text("You have defeated " + dObject.name + " ,choose another enemy");
            $("#p2").text("");
        }else if (gameOptions === "alldefendersDead") {
            $("#p1").text("You Won!!! GAME OVER!!").css({
                "color": "#00e600",
                "font-size": "25px"
            });
            $("#p2").text("");
            $("#text-display").append(resetButton);

            $("#resetBtn").show().on("click", function() {
                resetGame();
            })
        }else if (gameOptions === "continue") {
            $("#p1").text("You attacked " + dObject.name + " for " + attackPwr + " damage."); 
            $("#p2").text(dObject.name + " attacked you back for " + dObject.counterAttack + " damage.");

        }

    }

    function resetGame () {
        clickCount = 0;
        charClicked = "";
        attackChar = "";
        defendChar = "";
        attackHealth = 0;
        defendHealth = 0;
        deadDefenders = [];
        gameStatus = "";
        defenderIsActive = false;

        kenobi.isClicked = false;
        skywalker.isClicked = false;
        vader.isClicked = false;
        maul.isClicked = false;

        $("#kenobi-div").show().appendTo("#top-selection").css({
            "background-color": "#ffffff",
            "color": "#000000"});
        $("#skywalker-div").show().appendTo("#top-selection").css({
            "background-color": "#ffffff",
            "color": "#000000"});
        $("#vader-div").show().appendTo("#top-selection").css({
            "background-color": "#ffffff",
            "color": "#000000"});
        $("#maul-div").show().appendTo("#top-selection").css({
            "background-color": "#ffffff",
            "color": "#000000"});

        $("#kenobi-hp").text(kenobi.health);
        $("#skywalker-hp").text(skywalker.health);
        $("#vader-hp").text(vader.health);
        $("#maul-hp").text(maul.health);

        $("#p1").text("");
        $("#p1").text("").css({
            "color": "#ffffff",
            "font-size": "100%"
        });
        $("#p2").text("");
        $("#resetBtn").hide();

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
        
        selectAttacker(attackChar);
        clickCount++;
        attackHealth = attackChar.health;
        attackPower = attackChar.attack;
    } else if (clickCount > 0) {          //remaining clicks select the defender
        
        if (defenderIsActive) return;  
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

            if(defendChar === attackChar) return;
            defenderIsActive = true;  
            selectDefender(defendChar, attackChar);
            defendHealth = defendChar.health;
    }
    })

    $("#attack-btn").on("click", function() {
        if (gameStatus === "gameover") return;
        if (!defenderIsActive) return;
        attackDefend(attackChar, defendChar,attackPower);
        attackPower += attackChar.attack;
    })    

    

});
