// set up dependencies
const mysql = require("mysql2");
require("console.table");
const inquirer = require("inquirer");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "Bluecoats02!",
    database: "employees_db",
  },
  console.log('\x1b[33m%s\x1b[0m',"                     _ __\r\n        ___                             | \'  \\\r\n   ___  \\ \/  ___         ,\'\\_           | .-. \\        \/|\r\n   \\ \/  | |,\'__ \\  ,\'\\_  |   \\          | | | |      ,\' |_   \/|\r\n _ | |  | |\\\/  \\ \\ |   \\ | |\\_|    _    | |_| |   _ \'-. .-\',\' |_   _\r\n\/\/ | |  | |____| | | |\\_|| |__    \/\/    |     | ,\'_`. | | \'-. .-\',\' `. ,\'\\_\r\n\\\\_| |_,\' .-, _  | | |   | |\\ \\  \/\/    .| |\\_\/ | \/ \\ || |   | | \/ |\\  \\|   \\\r\n `-. .-\'| |\/ \/ | | | |   | | \\ \\\/\/     |  |    | | | || |   | | | |_\\ || |\\_|\r\n   | |  | || \\_| | | |   \/_\\  \\ \/      | |`    | | | || |   | | | .---\'| |\r\n   | |  | |\\___,_\\ \/_\\ _      \/\/       | |     | \\_\/ || |   | | | |  \/\\| |\r\n   \/_\\  | |           \/\/_____\/\/       .||`      `._,\' | |   | | \\ `-\' \/| |\r\n        \/_\\           `------\'        \\ |   AND        `.\\  | |  `._,\' \/_\\\r\n                                       \\|       THE          `.\\                                    _                               \r\n  ___ _ __ ___  _ __ | | ___  _   _  ___  ___         \r\n \/ _ \\ \'_ ` _ \\| \'_ \\| |\/ _ \\| | | |\/ _ \\\/ _ \\        \r\n|  __\/ | | | | | |_) | | (_) | |_| |  __\/  __\/        \r\n \\___|_| |_| |_| .__\/|_|\\___\/ \\__, |\\___|\\___|        \r\n               |_|            |___\/                   \r\n                _       _        _                    \r\n             __| | __ _| |_ __ _| |__   __ _ ___  ___ \r\n            \/ _` |\/ _` | __\/ _` | \'_ \\ \/ _` \/ __|\/ _ \\\r\n           | (_| | (_| | || (_| | |_) | (_| \\__ \\  __\/\r\n            \\__,_|\\__,_|\\__\\__,_|_.__\/ \\__,_|___\/\\___|\r\n                                                     " )
);


promptQuestions();

//-------------------------code goes here -----------------------------
// initializing the questions
function promptQuestions() {
  inquirer
    .prompt({
      message: "Please select what you would like to do.",
      type: "list",
      choices: [
        "View all departments",
        "Add a department",
        "View all roles",
        "Add a role",
        "View all employees",
        "Add an employee",
        "Update an employee role",
        "QUIT",
      ],
      name: "choice",
    })
    .then((answers) => {
      console.log(answers.choice);

      // Switch statement to get the correct function tied to the correct response
      switch (answers.choice) {
        case "View all departments":
          viewAllDept();
          break;

        case "Add a department":
          addDept();
          break;

        case "View all roles":
          viewAllRoles();
          break;

        case "Add a role":
          addRole();
          break;

        case "View all employees":
          viewAllEmp();
          break;

        case "Add an employee":
          addEmp();
          break;

        case "Update an employee role":
          updateEmp();
          break;

        default:
          db.end();
          break;
      }
    });
}
// Queries all from the department table
function viewAllDept() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    promptQuestions();
  });
}
//Queries all from the employee table
function viewAllEmp() {
  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, title, name AS department_name, salary, CONCAT(manager.first_name, ' ',manager.last_name) AS manager_name FROM employee 
  JOIN role ON employee.role_id = role.id
  JOIN department ON department.id = role.department_id
  LEFT JOIN employee AS manager ON employee.manager_id = manager.id`,
    function (err, results) {
      console.table(results);
      promptQuestions();
    }
  );
}
//Queries all from the role table
function viewAllRoles() {
  db.query(`SELECT role.id, role.title, department.name AS department, role.salary FROM department LEFT JOIN role ON department.id = role.department_id ORDER BY department.id`, function (err, results) {
    console.table(results);
    promptQuestions();
  });
}

function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department you would like to add?",
        validate: (deptCheck) => {
          if (deptCheck) {
            return true;
          } else {
            console.log(
              "What is the name of the department you would like to add?"
            );
            return false;
          }
        },
      },
    ])
    .then(function (res) {
      db.query(
        "INSERT INTO department (name) VALUES (?)",
        [res.department],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          console.log("Department added!");
          promptQuestions();
        }
      );
    });
}

function addEmp() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
        validate: (firstNameCheck) => {
          if (firstNameCheck) {
            return true;
          } else {
            console.log("What is the employee's first name?");
            return false;
          }
        },
      },

      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
        validate: (lastNameCheck) => {
          if (lastNameCheck) {
            return true;
          } else {
            console.log("What is the employee's last name?");
            return false;
          }
        },
      },

      {
        type: "number",
        name: "roleId",
        message: "What is the employee's role ID?",
        validate: (roleIdCheck) => {
          if (roleIdCheck) {
            return true;
          } else {
            console.log("What is the employee's role ID?");
            return false;
          }
        },
      },

      {
        type: "number",
        name: "managerId",
        message:
          "What is the employee's Manager ID? If the employee doesn't need one, leave blank.",
      },
    ])
    .then(function (res) {
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [res.firstName, res.lastName, res.roleId, res.managerId],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          console.log("Employee Added")
        }
      );
      promptQuestions();
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "What is the name of the role you would like to add?",
        validate: (roleTitleCheck) => {
          if (roleTitleCheck) {
            return true;
          } else {
            console.log("What is the name of the role you would like to add?");
            return false;
          }
        },
      },

      {
        type: "number",
        name: "roleSalary",
        message: "What is the salary of this new role?",
        validate: (roleSalaryCheck) => {
          if (roleSalaryCheck) {
            return true;
          } else {
            console.log("What is the salary of this new role?");
            return false;
          }
        },
      },

      {
        type: "number",
        name: "departmentId",
        message: "What is the department ID for this new role?",
        validate: (deptIdCheck) => {
          if (deptIdCheck) {
            return true;
          } else {
            console.log("What is the department ID for this new role?");
            return false;
          }
        },
      },
    ])
    .then(function (res) {
      db.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [res.roleTitle, res.roleSalary, res.departmentId],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          console.table("Role Added");
        }
      );
      promptQuestions();
    });
}

function updateEmp() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "nameSearch",
        message: "Please type last name of employee you would like to update.",
        validate: (nameSearchCheck) => {
          if (nameSearchCheck) {
            console.log("test");  return true; 
          } else {
            console.log(
              "Please type last name of employee you would like to update."
            );
            return false;
          }
        },
      },

      {
        type: "number",
        name: "updateRoleId",
        message: "Please enter a new role Id for employee chosen",
        validate: (updateRoleIdCheck) => {
          if (updateRoleIdCheck) {
            return true;
          } else {
            console.log("Please enter a new role Id for employee chosen");
            return false;
          }
        },
      },
    ]); console.log("test")
    .then (function (res) {
      db.query(
        "UPDATE employee SET role_id = ? WHERE last_name = ?",
        [res.nameSearch, res.updateRoleId],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          console.log("Employee info updated!");
        }
     
      );
      promptQuestions();
    }) .catch((error) => {
      console.log(error) 
    })
  
   
}


