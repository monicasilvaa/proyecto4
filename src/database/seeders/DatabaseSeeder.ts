import { appointmentSeeder } from "./AppointmentSeeder";
import { businessHourSeeder } from "./BusinessHourSeeder";
import { centerSeeder } from "./CenterSeeder";
import { roleSeeder } from "./RoleSeeder";
import { serviceSeeder } from "./ServiceSeeder";
import { userSeeder } from "./UserSeeder";





(async () => {
    await roleSeeder();
    await userSeeder();
    await serviceSeeder();
    await centerSeeder();
    await businessHourSeeder();
    await appointmentSeeder(); 
})();