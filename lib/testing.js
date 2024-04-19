const inquirer = require('inquirer');
const mysql = require('mysql2');
const { writeFile, readFile } = require('fs/promises');
const { type } = require('os');
const { default: Choice } = require('inquirer/lib/objects/choice');

// DECLARE CONST FOR EACH CASE
 const sqlDepartments = `SELECT department.id, department.name AS department FROM department`;
 const sqlRoles = `SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id`;
 const sqlEmployees = `SELECT employee.employee_id, employee.first_name, employee.last_name, employee.manager_id, role.title AS role FROM employee LEFT JOIN role ON employee.role_id = role.id`;

 const viewAlldatabase = (sql) => {
    switch (sql) {
        case userInput.departmentsdb:
            sqlDepartment
            break;
        case userInput.rolesdb:
            sqlRoles
            break;
        case userInput.employeesdb:
            sqlEmployees
            break;

        default:
            break;
    };
}
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '42069',
        database: 'employeetracker_db'
    },
    console.log(`Connected to the employeetracker_db database.`)
);
const lengthValidation = (input) => {
    if(input.length > 0){
        db.query(input, (err, results)=>{
            if(err) throw err;
            console.table(results);
            userInput;
        });
        return viewAlldatabase();
    }
};
const userInput = [
    {
        type: 'text',
        name: 'departmentsdb',
        message: 'View all departments',
        validate: lengthValidation
    },
    {
        type: 'text',
        name: 'rolesdb',
        message: 'View all roles',
        validate: lengthValidation
    },
    {
        type: 'text',
        name: 'employeesdb',
        message: 'View all employees',
        validate: lengthValidation
    },
    {
        type: 'text',
        name: 'addDepartment',
        message: 'Add a department',
    },
    {
        type: 'text',
        name: 'addRole',
        message: 'Add a role',
    },
    {
        type: 'text',
        name: 'addEmployee',
        message: 'Add an employee',
    },
    {
        type: 'text',
        name: 'updateEmployee',
        message: 'Update an employee role',
        choices: [
            'Update employee role',
            'Update employee manager'
        ]
    }
];

inquirer.createPromptModule(userInput).then((answers) => {
    console.log(answers);
})