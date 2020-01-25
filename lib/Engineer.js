const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, githubID, factGiven){

        super(name, id, email);

        this.githubID = githubID;
        this.factGiven = factGiven;
    }
    getGithub(){
        return this.githubID;
    }
    getRole(){
        return "Engineer";
    }
    getFact(){
        return this.factGiven;
    }
}

module.exports = Engineer;