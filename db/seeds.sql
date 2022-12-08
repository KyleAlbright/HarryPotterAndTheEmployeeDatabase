INSERT INTO department (name)
VALUES ('Superintendent'), ('Principal'), ('Teacher'), ('Groundskeeper'), ('Janator'), ('Intern');

INSERT INTO role (title, salary, department_id)
VALUES 
('Minister of Magic', 400000.00, 1),
('Headmaster', 150000.00, 2), 
('Professor', 75000.00, 3), 
('Keeper of Keys', 55000.00, 4), 
('Caretaker', 30000.00, 5), 
('Student Teacher', 20000.00, 6); 


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
('Cornelius', 'Fudge', 1, NULL),
('Albus', 'Dumbledore', 2, 1), 
('Minerva', 'McGonagall', 3, 2), 
('Rubeus', 'Hagrid', 4, 3), 
('Argus', 'Filch', 5, 3), 
('Hermine', 'Granger', 6, 3); 
