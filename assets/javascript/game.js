$(document).ready(function() {

    var clickCount = 0;
    var charClicked = "";

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

    //captures the click to see which character was clicked 
    $(".char-div").on("click", function() {
        charClicked = ($(this).attr("value"));
        if (clickCount === 0) {                 //first click sets the attacker
        selectAttacker(charClicked);
        clickCount++;
    } else if (clickCount > 0) {          //remaining clicks select the defender
            charClicked = ($(this).attr("value"));
            selectDefender(charClicked);
    }
    })

    $("attack-btn").on("click", function() {

    })    

});
