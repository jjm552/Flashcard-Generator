var inquirer = require('inquirer');
var fs = require('fs');

// Basic Card deck array and flash-card constructor//
var basicCardDeck = [];
var CreateBasicCard = function(front, back) {
    this.front = front;
    this.back = back;
};
// Clozen deck array and clozen-card constructor//
var clozenCardDeck = [];
var CreateClozenCard = function(full, deleted, partial) {
    this.full = full;
    this.deleted = deleted;
    this.partial = partial;
};

inquirer.prompt([{
    type: "list",
    message: "Please chose to build a type of card or answer a question from a pre-build card: ",
    choices: ["Build a flash-card", "Build a clozen-card", "Answer a flash-card", "Answer a clozen-card"],
    name: "mainUserChoice"
}, ]).then(function(mainUser) {
    console.log(mainUser.mainUserChoice);
    if (mainUser.mainUserChoice == "Build a flash-card") {
        inquirer.prompt([{
            type: "input",
            message: "Please input the front question for your basic flash-card: ",
            name: "basicFlashFront"
        }, {
            type: "input",
            message: "Please input the answer to the question you just input: ",
            name: "basicFlashBack"
        }, ]).then(function(UserInput) {
            var flashCard = new CreateBasicCard(UserInput.basicFlashFront, UserInput.basicFlashBack);
            basicCardDeck.push(flashCard);
            console.log(basicCardDeck);
            var jsonBCDeck = JSON.stringify(basicCardDeck);
            fs.appendFile("basicCardDeck.txt", jsonBCDeck, function(err) {
                if (err) {
                    return console.log("fs error: " + err);
                }
            });
        });
    } else if (mainUser.mainUserChoice == "Build a clozen-card") {
        inquirer.prompt([{
            type: "input",
            message: "Please enter the full text of your question with answer included ie ('George Washington was the First President of the United States'): ",
            name: "clozenFullText"
        }, {
            type: "input",
            message: "Plese enter the text you would like removed from the above statement i.e ('George Washington'): ",
            name: "clozenDeletedText"
        }, ]).then(function(UserInput) {
            if (UserInput.clozenFullText.includes(UserInput.clozenDeletedText)) {
                var clozenPartial = (UserInput.clozenFullText).replace(UserInput.clozenDeletedText, '. . . .');
                console.log(clozenPartial);
                var clozenCard = new CreateClozenCard(UserInput.clozenFullText, UserInput.clozenDeletedText, clozenPartial);
                console.log(clozenCard);
                var jsonCcDeck = JSON.stringify(clozenCard);
                fs.appendFile("clozenCardDeck.txt", jsonCcDeck, function(err) {
                    if (err) {
                        return console.log(err);
                    }
                });
            } else {
                console.log(UserInput.clozenDeletedText + "Doesn't appear to be a part of" + UserInput.clozenFullText);
            }
        });
    } else if (mainUser.mainUserChoice == "Answer a flash-card") {
        console.log("Eventully a Flash-card question will appear here");
    } else if (mainUser.mainUserChoice == "Answer a clozen-card") {
        console.log("Eventully a Clozen-card question will appear here");
    }
});