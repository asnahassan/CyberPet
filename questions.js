let selectionQuestions = [
    {
        type: 'list',
        name: 'typeOfPet',
        message: 'What type of pet do you want to adopt?',
        choices: ['Dog', 'Cat', 'Rabbit']
    },
    {
        type: 'input',
        name: 'petName',
        message: 'What is the name of your Cyber pet?',
        validate: (name)=>{
            if (name == "") { return "you must select a name for your pet"}
            return true
        }
    }
]

let gameInformation = [
    {
         type: 'confirm',
         name: 'gameRules',
         message: 'Great job adopting your first cyber pet! Make sure that you keep your cyber pets hunger and thirst levels below 100, and excitement above 0 to not lose your cyber pet! Press Y to continue'
     },
     {
         type:'confirm',
         name:'stats',
         message:'Here are you stats to begin with. Press Y to continue'
     }
]

module.exports = {
    selectionQuestions:selectionQuestions,
    gameInformation:gameInformation
}