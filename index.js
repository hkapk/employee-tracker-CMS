const inquirer = require ('inquirer');
const mysql = require ('mysql2');
const cTable = require('console.table');

function init() {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "choices",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee role",
            "Update an employee role"
        ]
    })
};

init();

