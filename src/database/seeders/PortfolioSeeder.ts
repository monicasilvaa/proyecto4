import { AppDataSource } from "../data-source";
import { User } from "../../models/User";
import { Role } from "../../models/Role";
import { Portfolio } from "../../models/Portfolio";

import { PortfolioFactory } from "../factories/PortfolioFactory";
import { PortfolioName } from "../../constants/PortfolioName";
import { UserRoles } from "../../constants/UserRoles";

export const portfolioSeeder = async () => {
  try {
    // Inicializar la conexión con la base de datos
    await AppDataSource.initialize();

    // Obtener el repositorio de User, Role y Portfolio
    const userRepository = AppDataSource.getRepository(User);
    const roleRepository = AppDataSource.getRepository(Role);
    const portfolioRepository = AppDataSource.getRepository(Portfolio);

     // Crear una instancia de la factory para Portofio
     const portfolioFactory = new PortfolioFactory(portfolioRepository);

    //Obtener el role employee
    const role = await roleRepository.findOne({
        where: { 
            name: "tattoo artist"
        },
    }) as Role;

    //Obtener todos los usuarios con el rol establecido en la constante role
    const employeeUsers = await userRepository.findBy({
        role: { id: role.id },
    }) as User[];

    //Crear un array de portfolios para almacenar los portfolios a insertar en base de datos 
    const PortfolioArray: Portfolio[] = [];

    //Recorrer todos los tatuadores para crear un portfolio a cada uno
    for (const employeeUser of employeeUsers){
        const portfolio = portfolioFactory.createMany(1);
        portfolio[0].name = PortfolioName.GALLERY(employeeUser);
        portfolio[0].employee_user = employeeUser;

        PortfolioArray.push(portfolio[0]);
    }

    // Guardar instancias de portfolio en la base de datos
    await portfolioRepository.save(PortfolioArray);

    // Imprimir mensaje de éxito
    console.log("Seeding portfolio successfully completed");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    // Cerrar la conexión con la base de datos, independientemente del resultado
    await AppDataSource.destroy();
  }
};

