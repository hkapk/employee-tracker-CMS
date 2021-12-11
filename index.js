const inquirer = require ('inquirer');
const mysql = require ('mysql2');
const cTable = require('console.table');
const db = require('./db/connection');


function init() {
    //questions
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
            "Add an employee",
            "Update an employee role",
            "Leave"
        ]
})
    //answers
    .then(function(answers){
        switch (answers.choices) {
            case "Leave":
                db.end();
                break;
            case "View all departments":
                viewDept();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department":
                addDept();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update an employee role":
                updateRole();
                break;

        }
    })
};
// function to view departments
function viewDept() {
    const sql = "SELECT * FROM departments;";
    db.query(sql,
    function(err, res) {
        if (err) throw err
        console.table(res)
        init()
    })
}

//function to view all roles
function viewRoles() {
    const sql = "SELECT * FROM roles;";
    db.query(sql,
    function(err, res) {
        if (err) throw err
        console.table(res)
        init()
    })
}

//function to view all employees
function viewEmployees () {
    const sql = "SELECT * FROM employees;";
    db.query(sql,
    function(err, res) {
        if (err) throw err
        console.table(res)
        init()
    })
}

//function to add a department
function addDept () {
    inquirer.prompt({
        type: "Input",
        message: "Enter the name of the department you want to add",
        name:"dept"
    })
    .then(function(input){
    const dept = input.dept;
    const sql = `INSERT INTO departments (name) VALUES ("${dept}")`;
    db.query(sql, function (err,res) {
        if (err) throw err;
        //console.table(res);
        init();
    });

});
}

//function to add a role
function addRole () {
    inquirer.prompt([{
        type: "input",
        message: "Enter the name of the role you want to add",
        name:"title"
    },
    {
        type:"input",
        message:"What is the salary for the role?",
        name:"salary"
    },
    {
        type:"input",
        message:"What is the department ID for the position?",
        name:"department_id"
    }
])
    
    .then(function(input){
    const title = input.title;
    const salary = input.salary;
    const department_id = input.department_id;
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES ("${title}", "${salary}", "${department_id}")`;
    db.query(sql, function (err,res) {
        if (err) throw err;
        //console.table(res);
        init();
    });

});
}

init();



