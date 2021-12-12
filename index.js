const inquirer = require ('inquirer');
const mysql = require ('mysql2');
const cTable = require('console.table');
const db = require('./db/connection');
const { listenerCount } = require('process');


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
    const sql = `SELECT 
    departments.id AS department_id,
    departments.name AS department_name
    FROM departments;`;
    db.query(sql,
    function(err, res) {
        if (err) throw err
        console.table(res)
        init()
    })
}

//function to view all roles
function viewRoles() {
    const sql = `SELECT
    roles.id AS role_id,
    roles.salary,
    title,
    departments.name AS department_name
    FROM roles
    JOIN departments ON roles.department_id = departments.id;`;
    db.query(sql,
    function(err, res) {
        if (err) throw err
        console.table(res)
        init()
    })
}

//function to view all employees
function viewEmployees () {
    const sql = `SELECT
    employees.id AS employee_id, employees.first_name, employees.last_name, roles.salary, departments.name AS department_name,
    roles.title AS job_title
    FROM employees
    JOIN roles ON employees.role_id = roles.id
    JOIN departments ON roles.department_id = departments.id ;`;
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
        console.table("Department Added");
        init();
    });

});
}

//function to add a role
function addRole () {
    inquirer.prompt([
    {
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
        console.table("Role Added");
        init();
    });

});
}


//function to add an employee
function addEmployee () {
    inquirer.prompt([
    {
        type: "input",
        message: "What is the first name of the employee?",
        name:"first_name"
    },
    {
        type:"input",
        message:"What is the last name of the employee?",
        name:"last_name"
    },
    {
        type:"input",
        message:"What is the role id for the employee?",
        name:"role_id"
    },
    {
        type:"input",
        message:"What is the manager ID (enter 'NULL' if no manager)",
        name:"manager_id"
    }
])
    .then(function(input) {
        const first_name = input.first_name;
        const last_name = input.last_name;
        const role_id = input.role_id;
        const manager_id = input.manager_id;

        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
        VALUES ("${first_name}","${last_name}", "${role_id}", "${manager_id}");`
        db.query(sql, function (err,res) {
            if (err) throw err;
            console.table("Employee Added");
            init();
        });
    
    });
    }

//function to update an employee's role
function updateRole() {
    // db.query(`SELECT
    //     employees.first_name, employees.last_name,
    //     FROM employees
    //     JOIN roles ON employees.role_id = roles.id;`, function (err, res) {
            
    //     })
    //const employees = ["Bob", "Joe", "Tom"]
    inquirer.prompt([
        {
        type: "input",
        message: "What is the employee ID for the employee you like to update?",
        name: "role_update_id"
        },
        {
        type: "input",
        message: "What is the new role_id?",
        name:"new_role_id"
        }
    ])
    .then(function(input) {
        const role_update_id = input.role_update_id;
        const new_role_id = input.new_role_id;

        const sql = `UPDATE employees SET role_id = ${new_role_id}
                    WHERE employees.id = ${role_update_id}`
                    db.query(sql, function (err,res) {
                        if (err) throw err;
                        console.table("Employee role updated ");
                        init();
                    });
        
    })
}


init();


