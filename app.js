// the two modules for this would be fs and inquirer
const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");

// this function is running in the background to collect information about the team and git bash is used
async function createTeam(){
    console.log("An application is created to record which people are on the team and then there is a file for view.");

    // Set Variable to hold HTML
    let collectMarkup = "";

    // Variable to hold number of team members
    let numbersOfTeam;

    // First Question to ask to set up loop
    await inquirer.prompt(
        {
            type: "number",
            message: "How many people are in your team?",
            name: "startNumber"
        }
    )
    .then((data) => {

        // there cannot be zero team members
        numbersOfTeam = data.startNumber + 1;
    });
    
    // the git bash should end if there are no team members recorded
    if (numbersOfTeam === 0){
        console.log("There is not a person to record on the team.");
        return;
    }
    
    // the loop will run for each team member so he or she can put information into the application
    for(i = 1; i < numbersOfTeam; i++){

        // Global variables set
        let name;
        let id;
        let role;
        let email;
        let factGiven;

        // the person should enter information based on the question and the responses will be stored in variables
        await inquirer.prompt([ 
            {
                type: "input",
                message: `What is employee (${i})'s name?`,
                name: "name"
            },
            {
                type: "input",
                message: `What is the employee (${i})'s id?`,
                name: "id"
            },
            {
                type: "input",
                message: `What is the employee (${i})'s Email?`,
                name: "email"
            },
            {
                type: "list",
                message: `what the employee (${i})'s role?`,
                name: "role",
                choices: ["Engineer", "Intern", "Manager"]
            }
           
        ])
        .then((data) => {

            
            name = data.name;
            id = data.id;
            role = data.role;
            email = data.email;
            
        });

        // this is like an if else statement that will switch in use when a particular instance occurs
        switch (role){
            case "Manager":

                // if the user is a Manager , then he or she should input the correct number for office
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your Manager's Office Number?",
                        name: "numOffice"
                    },
                    {
                        type:"input",
                        message: `What is one true fact for employee`,
                        name: "factGiven"
                    }
                ])
                .then((data) => {

                    // Create a new object with all avaiable user input data
                    const manager = new Manager(name, id, email, data.numOffice, data.factGiven);

                    // all the html is placed inside a variable for a template
                    appendHTML = fs.readFileSync("templates/manager.html");

                    // Uses eval() to pass template literals from html files
                    // this code acts like body.innerHTML += " more stuff"
                     collectMarkup = collectMarkup + "\n" + eval('`'+ appendHTML +'`');
                });
                break;

            //Steps Similar to Manager but for intern
            case "Intern":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What school is your Intern attending?",
                        name: "schoolName"
                    },
                    {
                        type:"input",
                        message: `What is one true fact for employee`,
                        name: "factGiven"
                    }
                ])
                .then((data) => {
                    const intern = new Intern(name, id, email, data.schoolName, data.factGiven);
                    appendHTML = fs.readFileSync("templates/intern.html");
                    collectMarkup = collectMarkup + "\n" + eval('`'+ appendHTML +'`');
                });
                break;

            //Steps Similar to Manager but for engineer
            case "Engineer":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your Engineer's GitHub?",
                        name: "githubID"
                    },
                    {
                        type:"input",
                        message: `What is one true fact for employee`,
                        name: "factGiven"
                    }
                ])
                .then((data) => {
                    const engineer = new Engineer(name, id, email, data.githubID, data.factGiven);
                    appendHTML = fs.readFileSync("templates/engineer.html");
                    collectMarkup = collectMarkup + "\n" + eval('`'+ appendHTML +'`');
                });
                break;

        } // End of Switch Case

    } // End of For loop

    // Reads main.html and places html in a variable
    const allHTML = fs.readFileSync("templates/main.html");
    
    // Use eval to implement template literals in main.html and places teamHTML inside main template
    collectMarkup = eval('`'+ allHTML +'`');

    // write file to new team.html file
    fs.writeFile("output/team.html", collectMarkup, function(err) {

        if (err) {
          return console.log(err);
        }
      
        console.log("Success, a file is created");
      
      });

    
}


createTeam();