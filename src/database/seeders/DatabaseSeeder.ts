import { roleSeeder } from "./RoleSeeder";
import { serviceSeeder } from "./ServiceSeeder";
import { userSeeder } from "./UserSeeder";





(async () => {
    await roleSeeder();
    await userSeeder();
    await serviceSeeder();
})();