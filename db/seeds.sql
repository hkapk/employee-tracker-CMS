INSERT INTO departments (name)
VALUES
('Sales'),
('Accounting'),
('IT'),
('Management');

INSERT INTO roles (title, salary, department_id) VALUES
('Salesperson', 40000, 1),
('Accountant', 50000, 2),
('Developer', 90000, 3),
('Manager', 100000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('Reggie', 'Jackson', 1, 2),
('Hank', 'Aaron', 2, 2),
('Chelsea', 'Kapka', 2, 1),
('Jane', 'Dimaggio', 3, 1),
('Mark', 'Hoppis', 3, 1),
('Tom', 'IsEdison', 3, 1),
('Tanya', 'Johsnon', 1, 2),
('Alexis', 'Wastolen', 4, NULL),
('Shawna', 'Yolawna', 3, 2),
('Maggie', 'Piles', 4, NULL);


