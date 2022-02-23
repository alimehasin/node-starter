import { User, Prisma } from "@prisma/client";
import { AbilityClass, AbilityBuilder } from "@casl/ability";
import { PrismaAbility } from "@casl/prisma";

type AppAbilityType = PrismaAbility<[string, Prisma.ModelName]>;

const AppAbility = PrismaAbility as AbilityClass<AppAbilityType>;
const { can, cannot, build } = new AbilityBuilder(AppAbility);

export default (user?: User) => {
  // Define the rules here
  // You can fetch the permissions via user.role.permissions or something like this
  // Then you can loop though the permissions and define the cans and the can'ts

  return build();
};
