const inquirer = require('inquirer');
const fs = require('fs');
const generateHtml = require('./util/generateHtml');
const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const team = [];


const addManager =() => {
    inquirer.prompt([
        {
            name: "name",
            message: "What is the name of the team's Manager?",
            type: "input",
        },
        {
            name: "email",
            message: "What is the Manager's email address?",
            type: "input",
        },
        {
            name: "id",
            message: "What is the Manager's id number?",
            type: "input",
        },
        {
            name: "officeNumber",
            message: "What is the Manager's office number?",
            type: "number",
        },
    ]).then((answers=>{
        let manager = new Manager(answers.name, answers.email, answers.id, answers.officeNumber)
        team.push(manager)
        start()
    }))
};

const start = ()=>{
    inquirer
    .prompt([
        {
            type: "list",
            name: "role",
            message: "What kind of role would you like to add?",
            choices: ["Engineer", "Intern", "Employee", "Finish Team"]
        },
    ]).then((ans) => {
        if(ans.role==="Engineer"){
            addEngineer();
        } else if (ans.role==="Employee"){
            addEmployee();
        } else if (ans.role==="Intern"){
            addIntern();
        } else {
            makeFile();
        }
    })
}

const addEmployee = ()=>{
    inquirer.prompt([
        {
            name: "name",
            message: "What is the employee's name?",
            type: "input",
            },
            {
            name: "id",
            message: "What is the employee's ID?",
            type: "number",
            },
            {
            name: "email",
            message: "What is the employee's email?",
            type: "input",
            },
            {
            name: "role",
            message: "What is the employee's role ?",
            type: "input"
            }
    ]).then(ans=> {
        let employee = new Employee(ans.name, ans.id, ans.email, ans.role);
        team.push(employee);
        start();
    })
}
const addIntern = ()=>{
    inquirer.prompt([
        {
            name: "name",
            message: "What is the intern's name?",
            type: "input",
            },
            {
            name: "id",
            message: "What is the intern's ID?",
            type: "number",
            },
            {
            name: "email",
            message: "What is the intern's email?",
            type: "input",
            },
            {
            name: "school",
            message: "What is the intern's school?",
            type: "input"
            }
    ]).then(ans=> {
        let intern = new Intern(ans.name, ans.id, ans.email, ans.school);
        team.push(intern);
        start();
    })
}
const addEngineer = ()=>{
    inquirer.prompt([
        {
            name: "name",
            message: "What is the engineer's name?",
            type: "input",
            },
            {
            name: "id",
            message: "What is the engineer's ID?",
            type: "number",
            },
            {
            name: "email",
            message: "What is the engineer's email?",
            type: "input",
            },
            {
            name: "github",
            message: "What is the engineer's GitHub username?",
            type: "input"
            }
    ]).then(ans=> {
        let engineer = new Engineer(ans.name, ans.id, ans.email, ans.github);
        team.push(engineer);
        start();
    })
}

const makeFile = (fileName, data) => {
    fs.writeFile('./index.html', generateHtml(team), "UTF-8", (err) => {
        console.log("Success!")
       if(err){
          throw err;
       }
    })
 }
addManager()