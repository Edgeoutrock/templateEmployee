const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, numOffice, factGiven){

        super(name, id, email);

        this.numberOffice = numOffice;
        this.factGiven = factGiven;
        
    }
    getOfficeNumber(){
        return this.numberOffice;
    }
    getRole(){
        return "Manager";
    }
    getFact(){
        return this.factGiven;
    }
}

module.exports = Manager;