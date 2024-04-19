USE employeetracker_db;

DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
    id INT NOT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
);

CREATE TABLE roles (
    id INT NOT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) CONSTAINT fk_department REFERENCES departments ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    CONSTAINT fk_department FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
    CONSTAINT fk_department FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);