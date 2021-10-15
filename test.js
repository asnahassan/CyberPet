let inquirer = require('inquirer');
let questions = require('./questions')
// const { type } = require('os');

// let typeOfPet;
let newPet;

class Pet {

    constructor(name){
        this._name = name;
        this.hunger = 40;
        this.thirst = 40;
        this.excitement = 5;
        this.tiredness = 40;
    }

    get name(){
        return this._name
    }
    
    feed(){
        this.hunger -= randomNumberGen()
        this.tiredness += randomNumberGen()*2
        this.excitement += randomNumberGen()
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'feedMessage',
                message: `${this.name} had a meal`
            }
        ]).then(()=>{
            this.showStats()
        })
        
    }

    drink(){
        this.thirst -= randomNumberGen()
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'drinkMessage',
                message: `${this.name} had a drink`
            }
        ]).then(()=>{
            this.showStats()
        })
    }
    
    play(){        
        this.excitement += randomNumberGen() 
        this.thirst += randomNumberGen()
        this.hunger += randomNumberGen()
        this.tiredness += randomNumberGen()*2
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'playMessage',
                message: `${this.name} gets excited playing with you`
            }
        ]).then(()=>{
            this.showStats()
        })
    }

    sleep(){
        this.tiredness = 0
        this.thirst += randomNumberGen()
        this.hunger += randomNumberGen()
        this.excitement -= randomNumberGen()
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'sleepMessage',
                message: `${this.name} is fast asleep`
            }
        ]).then(()=>{
            this.showStats()
        })
    }

    showStats(){
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'currentStats',
                message:`${this.name} current hunger levels are ${this.hunger}
                    thirst levels are ${this.thirst}
                    excitement levels are ${this.excitement} 
                    tiredness levels are ${this.tiredness}. Press Y to continue`
            }
        ]).then((answer)=> {
            if (answer.currentStats === true){
                if (this.excitement <= 0) {
                    inquirer.prompt([
                        {
                            type: 'confirm',
                            name: 'gameEndExcitement',
                            message:`${this.name} has abandoned you from boredom! Make sure to play with your pet.`
                        }
                    ]).then(()=>{
                        gameEnd()
                    })
                    
                } else if(this.thirst >= 100){
                    inquirer.prompt([
                        {
                            type: 'confirm',
                            name: 'gameEndThirst',
                            message:`${this.name} has abandoned you from thirst! Make sure to water with your pet.`
                        }
                    ]).then(()=>{
                        gameEnd()
                    })
                } else if (this.hunger >= 100){
                    inquirer.prompt([
                        {
                            type: 'confirm',
                            name: 'gameEndHunger',
                            message:`${this.name} has abandoned you from boredom! Make sure to feed your pet.`
                        }
                    ]).then(()=>{
                        gameEnd()
                    })
                } else if (this.tiredness >= 60){
                    inquirer.prompt([
                        {
                            type: 'confirm',
                            name: 'tiredness',
                            message:`${this.name} got too tired and fell asleep!`
                        }
                    ]).then(()=>{
                        this.sleep()
                    })
                } else {
                    this.choices()
                }
            }
        }).catch((err)=>{
            console.log(err)
        })

        
    }

    start(){
        inquirer.prompt(questions.gameInformation).then(() => {
            this.showStats();
        }).catch((err)=> {
            console.log(err);
        })
    }

}

class Dog extends Pet {
    
    constructor (name){
        super(name);
        this.weight = 80
        
    }

    choices(){
        inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: `What would you like to do with ${this.name}`,
                    choices: ['Feed', 'Drink', 'Wrestle', `Bark`, `Go on a Walk`, `Sleep`]
                }
        ]).then((answer)=> {
            switch (answer.action){
                case "Feed":
                    this.feed();
                    break;
                case "Drink":
                    this.drink();
                    break;
                case "Wrestle":
                    this.play();
                    break;
                case "Bark":
                    this.bark();
                    break;
                case "Go on a Walk":
                    this.walk();
                    break;
                case "Sleep":
                    this.sleep()
                    break;
                default:
                    return
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    bark(){
        this.excitement += Math.floor(Math.random()*10+1)
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'barkMessage',
                message: `WOOFWOOF!`
            }
        ]).then(()=>{
            this.showStats()
        })
        
    }
    walk(){
        
        this.hunger += Math.floor(Math.random()*10+1)*2
        this.tiredness += Math.floor(Math.random()*10+1)*2
        this.excitement += Math.floor(Math.random()*10+1)
        this.thirst += Math.floor(Math.random()*10+1)*2
        this.weight -= Math.floor(Math.random()*10+1)

        inquirer.prompt([
            {
                type: 'confirm',
                name: 'walkMessage',
                message: `You took ${this.name} on a walk`
            }
        ]).then(()=>{
            this.showStats()
        })
    }
}


class Rabbit extends Pet {

    constructor (name){
        super(name)
        this.weight = 20
        this.lovesCarrots = true
    }

    choices(){
        inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    choices: ['Feed', 'Drink', 'Play', 'Hop', 'Sleep']
                }
        ]).then(answer=>{

            switch (answer.action){
                case "Feed":
                    this.feed();
                    break;
                case "Drink":
                    this.drink();
                    break;
                case "Play":
                    this.play();
                    break;
                case "Hop":
                    this.hop();
                    break;
                case "Sleep":
                    this.sleep()
                    break;
                default:
                    return
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    hop(){
        // alert(`${this.name} hops around the garden`)
        this.tiredness += randomNumberGen()*2
        this.excitement += randomNumberGen()
        this.thirst += randomNumberGen()*2
        this.weight -= randomNumberGen()

        inquirer.prompt([
            {
                type: 'confirm',
                name: 'hopMessage',
                message: `${this.name} hops around the garden`
            }
        ]).then(()=>{
            this.showStats()
        })
    }
}

class Cat extends Pet {

    constructor (name){
        super(name)
        this.weight = 25

    }

     choices(){
        inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    choices: ['Feed', 'Drink', 'Play', 'Purr', 'Sleep']
                }
        ]).then(answer=>{

            console.log(answer)

            switch (answer.action){
                case "Feed":
                    this.feed();
                    break;
                case "Drink":
                    this.drink();
                    break;
                case "Play":
                    this.play();
                    break;
                case "Purr":
                    this.purr();
                    break;
                case "Sleep":
                    this.sleep()
                    break;
                default:
                    return
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    purr(){
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'purMessage',
                message: `PURR`
            }
        ]).then(answer=>{
          this.showStats()
        })
    }
}

const game = () => {

    inquirer.prompt(questions.selectionQuestions)
    .then((answer)=> {
        selection(answer)
    }).catch(err => {
        console.log(err)
    })
   
 }

const gameEnd = () => {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'restartGame',
            message: `Press enter to restart the game`
        }
    ]).then(answer => {
        if (answer.restartGame == true){ 
            delete Pet;
            game();
            
        }
        console.log(answer)
    }).catch(err => {
        console.log(err)
    })
    
    
}

const selection = (answer) => {
    if (answer.typeOfPet == "Cat") { 
        newPet = new Cat (`${answer.petName}`);
        console.log('new pet created')    
        newPet.start(); 
    } 
    else if (answer.typeOfPet == "Dog") { 
        newPet = new Dog(`${answer.petName}`); 
        newPet.start(); 
    }
    else if (answer.typeOfPet == "Rabbit") { 
        newPet = new Rabbit(`${answer.petName}`); 
        newPet.start();
    }
}

const randomNumberGen = () => {
    return Math.floor(Math.random()*10+1)
}
game();
