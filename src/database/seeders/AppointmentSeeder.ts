import { AppDataSource } from "../data-source";
import { Appointment } from "../../models/Appointment";
import { User } from "../../models/User";
import { Center } from "../../models/Center";
import { AppointmentFactory } from "../factories/AppointmentFactory";
import { UserRoles } from "../../constants/UserRoles";
import { Services } from "../../constants/Services";

export const appointmentSeeder = async () => {
  try {
    await AppDataSource.initialize();

    const appointmentRepository = AppDataSource.getRepository(Appointment);
    const userRepository = AppDataSource.getRepository(User);
    const centerRepository = AppDataSource.getRepository(Center);

    // Obtener instancias de User, Center y Service
    const clientUser = await userRepository.findOne({
        where: { 
            role: { id: UserRoles.CLIENT.id } 
        },
    }) as User;

    const employeeUser = await userRepository.findOne({
        where: { 
            role: { id: UserRoles.TATTOOARTIST.id } 
        },
    }) as User;

    const centers = await centerRepository.find();
    const tattooService = Services.TATTOO;
    const piercingService = Services.PIERCING;

    // Verificar que todas las instancias sean válidas
    if (!clientUser || !employeeUser || !centers || !tattooService || !piercingService) {
      console.error("Error obtaining instances");
      return;
    }

    // Crear instancias de Appointment
    const appointmentFactory = new AppointmentFactory(appointmentRepository);

    const appointments = appointmentFactory.createMany(10).map((appointment, index) => {
      appointment.clientUser = clientUser;
      appointment.employeeUser = employeeUser;
      // Asignar valores a modified_by basados en el username de User
      appointment.modified_by = index % 2 === 0 ? clientUser.username : employeeUser.username;

      // Seleccionar un centro aleatorio
      appointment.center = centers[Math.floor(Math.random() * centers.length)];

      // Alternar entre los servicios de tatuajes y piercing
      appointment.service = index % 2 === 0 ? tattooService : piercingService;

      return appointment;
    });

    // Guardar las instancias en la base de datos
    await appointmentRepository.save(appointments);

    // Imprimir mensaje de éxito
    console.log("Seeding appointments successfully completed");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    // Cerrar la conexión con la base de datos, independientemente del resultado
    await AppDataSource.destroy();
  }
};
