import { Ability, AbilityBuilder, AbilityClass } from "@casl/ability";

export default (user: any) => {
  const AppAbility = Ability as AbilityClass<Ability<[Action, Subject]>>;

  const { can, cannot, build } = new AbilityBuilder(AppAbility);

  if (!user) {
    // Unauthenticated user
  } else if (user.role === "ROOT") {
    can("manage", "all");
  } else {
    cannot("manage", "all");
  }

  return build();
};
