USE employeetracker_db;

INSERT INTO department (name) VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

INSERT INTO roles (title, department_id, salary) VALUES
    ('Software Engineer', 1, 100000),
    ('Accountant', 2, 80000),
    ('Lawyer', 3, 120000),
    ('Salesperson', 4, 60000);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Alice', 'Johnson', 1, NULL),
    ('Bob', 'Smith', 2, 1),
    ('Charlie', 'Brown', 3, 1),
    ('David', 'White', 4, 1),
    ('Eve', 'Black', 1, 2),
    ('Frank', 'Green', 2, 2),
    ('Grace', 'Blue', 3, 2),
    ('Hank', 'Yellow', 4, 2),
    ('Ivy', 'Orange', 1, 3),
    ('Jack', 'Purple', 2, 3),
    ('Kelly', 'Red', 3, 3),
    ('Larry', 'Pink', 4, 3);