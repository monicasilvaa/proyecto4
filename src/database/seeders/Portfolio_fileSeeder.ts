import { AppDataSource } from "../data-source";
import { Portfolio } from "../../models/Portfolio";
import { Portfolio_fileFactory } from "../factories/Portfolio_fileFactory";
import { Portfolio_file } from "../../models/Portfolio_file";

export const portfolio_fileSeeder = async () => {
  try {
    // Inicializar la conexión con la base de datos
    await AppDataSource.initialize();

    // Obtener el repositorio de User, Role y Portfolio
    const portfolioRepository = AppDataSource.getRepository(Portfolio);
    const portfolio_fileRepository = AppDataSource.getRepository(Portfolio_file);

     // Crear una instancia de la factory para Portofio
     const portfolio_fileFactory = new Portfolio_fileFactory(portfolio_fileRepository);

    //Obtener todos los portfolios
    const portfolios = await portfolioRepository.find();

    //Crear un array de portfolios files para almacenar los portfolio files a insertar en base de datos 
    const PortfolioFilesArray: Portfolio_file[] = [];

    //Crear una cantidad de imagenes por portfolio
    for (const portfolio of portfolios){
        const portfolio_files = portfolio_fileFactory.createMany(10).map((portfolio_file, index) => {
            portfolio_file.portfolio = portfolio;
            return portfolio_file;
        });

        PortfolioFilesArray.concat(portfolio_files);
    }

    // Guardar instancias de portfolio en la base de datos
    await portfolio_fileRepository.save(PortfolioFilesArray);

    // Imprimir mensaje de éxito
    console.log("Seeding portfolio_file successfully completed");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    // Cerrar la conexión con la base de datos, independientemente del resultado
    await AppDataSource.destroy();
  }
};

