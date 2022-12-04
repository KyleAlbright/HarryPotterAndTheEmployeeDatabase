INSERT INTO department (name)
VALUES ('Principal'), ('Teacher'), ('Groundskeeper'), ('Janator'), ('Intern'), ('Superintendent');

INSERT INTO role (title, salary, department_id)
VALUES 
('Headmaster', 150000.00, 2), 
('Professor', 75000.00, 3), 
('Keeper of Keys', 55000.00, 4), 
('Caretaker', 30000.00, 5), 
('Student Teacher', 20000.00, 6), 
('Minister of Magic', 400000.00, 1);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
('Cornelius', 'Fudge', 6, NULL);
('Albus', 'Dumbledore', 1, 1), 
('Minerva', 'McGonagall', 2, 2), 
('Rubeus', 'Hagrid', 3, NULL), 
('Argus', 'Filch', 4, NULL), 
('Hermine', 'Granger', 5, NULL); 
