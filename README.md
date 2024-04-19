# Employeetracker

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
The Application enables the user through an easier database management interface known as CMS (Content Management Systems) to interact with information stored in databases. 

## Table of Contents:
- [The Challenge](#Challenges-Faced)
- [Usage Information](#Usage-Information)
- [Installation Process](#Installation-Process)
- [Built With](#Built-With)
- [Mock-Up](#Mock-Up)
- [License](#License)
- [Author](#Author)

## Challenges Faced
Generating a database responsive to the User input by itself, had to structure the code over 3 times and definetely needed to look for tutorials that gave me some guidance about how to go through the overall challenge.


## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Installation Process
Being an interactive user application, packages such as Inquirer needed to be installed in our terminal.

1. Clone the repository created on Github on your VSC code to start working on it.
2. Install the following through CLI:
- Node JS.
- Inquirer 8.2.4 version.
- MySql
- Express JS.
3. Open the integrated terminal, run `node server.js` and start answering the prompted questions.

## Usage Instructions
By answering the questions prompted on your terminal, the user will be able to customize the database structured, in that way he will be able to have a better control on the employees information.

Being the user who's running the application, he'll have access to either grab information from the database or update it.

## Built With
- Visual Studio Code VSC for code edition.
- JavaScript.
- Node JS.
- Express JS
- Inquirer 8.2.4 version.
- MySQL

## Mock Up
[Descriptive Video]

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Author
[David Perez](https://github.com/David0Perez)