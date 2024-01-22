import { AppDataSource } from "../data-source";
import { User } from "../../models/User";
import { Center } from "../../models/Center";
import { UserRoles } from "../../constants/UserRoles";
import { getManager } from "typeorm";

export const employeeCenterSeeder = async () => {
  try {
    await AppDataSource.initialize();

    const userRepository = AppDataSource.getRepository(User);
    const centerRepository = AppDataSource.getRepository(Center);

    // Obtener tatuadores y centros
    const tattooArtists = await userRepository.find({
      where: {
        role: UserRoles.TATTOOARTIST,
      },
    });

    const centers = await centerRepository.find();

    // Verificar que todas las instancias sean válidas
    if (!tattooArtists || !centers) {
      console.error("Error obtaining instances");
      return;
    }

    // Asignar tatuadores a centros de forma aleatoria
    const values = tattooArtists.map((tattooArtist) => {
        const randomCenter = centers[Math.floor(Math.random() * centers.length)];
        return `(${tattooArtist.id}, ${randomCenter.id})`;
      }).join(',');
  
      // Ejecutar la consulta SQL directamente
      const query = `INSERT INTO employeeCenters (employee_id, center_id) VALUES ${values};`;
      await AppDataSource.query(query);

    // Imprimir mensaje de éxito
    console.log("Seeding employeeCenters successfully completed");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    // Cerrar la conexión con la base de datos, independientemente del resultado
    await AppDataSource.destroy();
  }
};
