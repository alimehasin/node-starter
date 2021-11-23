import fs from "fs";
import { questions } from "./utils";
import project from "../package.json";

// Delete open-source files
fs.unlinkSync("LICENSE");
fs.unlinkSync("CONTRIBUTING.md");

// Empty README.md
fs.writeFileSync("README.md", "");

// Create .env file from .env.example
fs.renameSync(".env.example", ".env");

// Delete .git
fs.unlinkSync(".git");

async function main() {
  const answers = await questions.getProjectInfo();

  const newProject = {
    ...project,
    ...answers,
  };

  delete newProject.license;
  delete newProject.repository;
  delete newProject.keywords;

  // Write the new JSON into package.json
  fs.writeFileSync("package.json", JSON.stringify(newProject));
}

main();
