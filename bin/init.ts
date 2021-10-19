import fs from "fs";
import inquirer from "inquirer";
import project from "../package.json";

// Delete open-source files
fs.unlinkSync("LICENSE");
fs.unlinkSync("CONTRIBUTING.md");

// Empty README.md
fs.writeFileSync("README.md", "");

// Create .env file from .env.example
fs.renameSync(".env.example", ".env");

(async () => {
  const answers = await inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "Project Name:",
    },
    {
      name: "version",
      type: "input",
      message: "Version:",
    },
    {
      name: "description",
      type: "input",
      message: "Description:",
    },
    {
      name: "author",
      type: "input",
      message: "Author:",
    },
  ]);

  const newProject = {
    ...project,
    ...answers,
  };

  delete newProject.license;
  delete newProject.repository;
  delete newProject.keywords;

  fs.writeFileSync("package.json", JSON.stringify(newProject));
})();
