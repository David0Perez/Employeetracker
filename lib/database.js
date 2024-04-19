const db = require('./db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');
const { type } = require('os');

const startInquirer = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]).then((answers) => {
        const nextAction = answers.options;
        if(nextAction === 'View all departments.') viewAllDepartments();
        if(nextAction === 'View all roles.') viewAllRoles();
        if(nextAction === 'View all employees.') viewAllEmployees();
        if(nextAction === 'Add a department.') addDepartment();
        if(nextAction === 'Add a role.') addRole();
        if(nextAction === 'Add an employee.') addEmployee();
        if(nextAction === 'Update an employee role.') updateRole();
        if(nextAction === 'Exit') process.exit();
    });
};

const sqlQuery = (err, rows) =>{
    if(err){ throw err; }
    console.table(rows);
    console.log('\n');
    return startInquirer();
};
const viewAllDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) =>{ sqlQuery(err, rows); })
};
const viewAllRoles = () => {
    const sql = `SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id`;
    db.query(sql, (err, rows)=>{ sqlQuery(err, rows); })
};
const viewAllEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id`;
    db.query(sql, (err, rows)=>{ sqlQuery(err, rows); })
};

const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?',
            validate: nameInput =>{
                if(nameInput){
                    return true
                }else{
                    console.log('Please enter a department name.');
                    return false;
                };
                }
            }
        ])
            .then(answer =>{
                const sql = `INSERT INTO department (name) VALUES (?)`;
                db.query(sql, answer.name, (err) =>{
                    if(err) throw err;
                    console.log('Department added.');
                    return viewAllDepartments();
                });
            });
        };

const addRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?',
            validate: titleInput =>{
                if(titleInput){
                    return true
                }else{
                    console.log('Please enter a role title.');
                    return false;
                };
                }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?',
            validate: salaryInput =>{
                if(isNaN(salaryInput)){
                    console.log('Please enter a valid salary.');
                    return false;
                }else{
                    return true;
                }
            }
        }
    ])
    .then(answer =>{
        const params = [answer.title, answer.salary];
        const sql = `SELECT * FROM department`;
        db.query(sql, (err, rows) =>{
            if(err) {
                throw err;
            }
            const departments = rows.map(({name, id}) => ({name: name, value: id}));
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Which department does the role belong to?',
                    choices: departments
                }
            ])
            .then(departmentAnwser =>{
                const department = departmentAnwser.department_id;
                params.push(department);
                const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
                db.query(sql, params, (err) =>{
                    if(err){
                        throw err
                    }
                    console.log('Role added.');
                    return viewAllRoles();
                });
            });
        });
    });
};

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'First name of the employee',
            validate: nameInput =>{
                if(nameInput){
                    return true;
                }else{
                    console.log('Please enter a first name.');
                    return false;
                };
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Last name of the employee',
            validate: nameInput =>{
                if(nameInput){
                    return true;
                }else{
                    console.log('Please enter a last name.');
                    return false;
                };
            }
        }
    ])
    .then(answer =>{
        const params = [answer.first_name, answer.last_name];
        const sql = `SELECT * FROM role`;
        db.query(sql, (err, rows) =>{
            if(err) {
                throw err;
            }
            const roles = rows.map(({title, id}) => ({name: title, value: id}));
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'What is the role of the employee?',
                    choices: roles
                }
            ])
            .then(roleAnswer =>{
                const role = roleAnswer.role_id;
                params.push(role);
                const sql = `SELECT * FROM employee`;
                db.query(sql, (err, rows) =>{
                    if(err){
                        throw err;
                    }
                    const employees = rows.map(({first_name, last_name, id}) => ({name: `${first_name} ${last_name}`, value: id}));
                    employees.unshift({name: 'None', value: null});
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'manager_id',
                            message: 'Who is the manager of the employee?',
                            choices: employees
                        }
                    ])
                    .then(managerAnswer =>{
                        const manager = managerAnswer.manager_id;
                        params.push(manager);
                        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                        db.query(sql, params, (err) =>{
                            if(err) {
                                throw err;
                            }
                            console.log('Employee added.');
                            return viewEmployees();
                        });
                    });
                });
            });
        });
    });
};
const updateRole = () => {
    const sql = `SELECT first_name, last_name, id FROM employee`
    db.query(sql, (err, rows) =>{
        if(err){
            throw err;
        }
        const employees = rows.map(({first_name, last_name, id}) => ({name: `${first_name} ${last_name}`, value: id}));
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'Which employee would you like to update?',
                choices: employees
            }
        ])
        .then(employeeAnswer =>{
            const employee = employeeAnswer.employee_id;
            const params = [employee];
            const sql = `SELECT title, id FROM role`;
            db.query(sql, (err, rows) =>{
                if(err){
                    throw err;
                }
                const roles = rows.map(({title, id}) => ({name: title, value: id}));
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role_id',
                        message: 'What is the new role of the employee?',
                        choices: roles
                    }
                ])
                .then(roleAnswer =>{
                    const role = roleAnswer.role_id;
                    params.unshift(role);
                    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
                    db.query(sql, params, (err) =>{
                        if(err){
                            throw err;
                        }
                        console.log('Employee role updated.');
                        return viewAllEmployees();
                    });
                });
            });
        });
    });
};

module.exports = startInquirer;
