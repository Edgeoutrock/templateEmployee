const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, schoolName, factGiven){

        super(name, id, email);

        this.schoolName = schoolName;
        this.factGiven = factGiven;
    }
    getSchool(){
        return this.schoolName;
    }
    getRole(){
        return "Intern";
    }
    getFact(){
        return this.factGiven;
    }
}

module.exports = Intern;