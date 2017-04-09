var inquirer = require('inquirer');
var BasicCard = require("./Basic.js");
var ClozenCard = require("./Clozen.js");



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
            var flashCard = new BasicCard(UserInput.basicFlashFront, UserInput.basicFlashBack);
            console.log(flashCard.cardBasicFront);
            console.log(flashCard.cardBasicBack);
        });
    } else if (mainUser.mainUserChoice == "Build a clozen-card") {
        inquirer.prompt([{
            type: "input",
            message: "Please enter the full text of your question with answer included ie ('George Washington was the First President of the United States'): ",
            name: "clozenFullText"
        }, {
            type: "input",
            message: "Plese enter the text you would like removed from the above statement i.e ('George Washington'): ",
            name: "clozenPartialText"
        }, ]).then(function(UserInput) {
            console.log(UserInput.clozenFullText);
            console.log(UserInput.clozenPartialText);
        });
    } else if (mainUser.mainUserChoice == "Answer a flash-card") {
        console.log("Eventully a Flash-card question will appear here");
    } else if (mainUser.mainUserChoice == "Answer a clozen-card") {
        console.log("Eventully a Clozen-card question will appear here");
    }
});