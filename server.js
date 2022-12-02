const express = require("express");
const mysql = require("mysql2");
const cTable = require(console.table);
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
  console.log(`Connected to the employees_db database.`)
);

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
      name: choice,
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
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    promptQuestions();
  });
}
//Queries all from the role table
function viewAllRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
    promptQuestions();
  });
}

function addDept() {
  inquirer.prompt([
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
  ]);
}

function addEmp() {}

function addDept() {}

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
