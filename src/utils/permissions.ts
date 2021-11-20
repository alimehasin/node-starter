import { Ability, AbilityBuilder, AbilityClass } from "@casl/ability";

export type Action = "read" | "create" | "update" | "delete" | "manage";
export type Subject = "User" | "all";

export default (user: any) => {
  const AppAbility = Ability as AbilityClass<Ability<[Action, Subject]>>;

  const { can, cannot, build } = new AbilityBuilder(AppAbility);

  if (!user) {
    // Unauthed user
  } else if (user.role === "ROOT") {
    can("manage", "all");
  } else {
    cannot("manage", "all");
  }

  return build();
};
