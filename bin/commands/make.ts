import { Command } from "commander";
import { PrismaClient } from "@prisma/client";
import { actions, inquiries } from "../utils";

const program = new Command();
const prisma = new PrismaClient();

program
  .command("atom")
  .argument("<name>", "section name")
  .option("-crud", "Create a CRUD atom", false)
  .action(async (name, { Crud }) => {
    await actions.makeAtom(name, Crud);
  });

program.command("root-user").action(async () => {
  // Get information
  const answers = await inquiries.rootUser(prisma);

  // Create root user
  actions.createRootUser(prisma, answers);

  // Disconnect prisma
  await prisma.$disconnect();
});

program.parse(process.argv);
