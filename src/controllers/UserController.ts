import { Controller } from "./Controller";
import { Request, Response } from "express";
import { User } from "../models/User";
import { AppDataSource } from "../database/data-source";
import { UserRoles } from "../constants/UserRoles";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { Role } from "../models/Role";
import { Center } from "../models/Center";

// -----------------------------------------------------------------------------

export class UserController implements Controller {
   async getAll(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const userRepository = AppDataSource.getRepository(User);

         let { page, skip } = req.query;

         let currentPage = page ? +page : 1;
         let itemsPerPage = skip ? +skip : 10;

         const [allUsers, count] = await userRepository.findAndCount({
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
            select: {
               username: true,
               email: true,
               id: true,
            },
         });
         res.status(200).json({
            count,
            skip: itemsPerPage,
            page: currentPage,
            results: allUsers,
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while getting users",
         });
      }
   }

   //Listar todos los clientes registrados (Superadmin)
   async getAllRegisteredClients(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const userRepository = AppDataSource.getRepository(User);

         let { page, skip } = req.query;

         let currentPage = page ? +page : 1;
         let itemsPerPage = skip ? +skip : 10;

         const [allUsers, count] = await userRepository.findAndCount({
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
            select: {
               username: true,
               email: true,
               id: true,
            },
            where: {
               role: UserRoles.CLIENT
            }
         });
         res.status(200).json({
            count,
            skip: itemsPerPage,
            page: currentPage,
            results: allUsers,
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while getting users",
         });
      }
   }

   async getById(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;

         const userRepository = AppDataSource.getRepository(User);
         const user = await userRepository.findOneBy({
            id: id,
         });

         if (!user) {
            return res.status(404).json({
               message: "User not found",
            });
         }

         res.status(200).json(user);
      } catch (error) {
         res.status(500).json({
            message: "Error while getting user",
         });
      }
   }

   //Listar tatuadores

   async getTattooArtistList(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const userRepository = AppDataSource.getRepository(User);

         let { page, skip } = req.query;

         let currentPage = page ? +page : 1;
         let itemsPerPage = skip ? +skip : 10;

         const [allTattooArtists, count] = await userRepository.findAndCount({
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
            select: {
               username: true,
               email: true,
               id: true,
            },
            where: {
               role: UserRoles.TATTOOARTIST
            },
            relations:{
               portfolios: true
            }
         });
         res.status(200).json({
            count,
            skip: itemsPerPage,
            page: currentPage,
            results: allTattooArtists,
         });

      } catch (error) {
         res.status(500).json({
            message: "Error while getting Tattoo Artists",
         });
      }
   }

   async create(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const data = req.body;

         const userRepository = AppDataSource.getRepository(User);
         const newUser = await userRepository.save(data);
         res.status(201).json(newUser);
      } catch (error) {
         res.status(500).json({
            message: "Error while creating user",
         });
      }
   }

   //Listar tatuadores por centro
  async getTattooArtistsByCenter(req: Request, res: Response): Promise<void | Response<any>> {
   try {
     
     const centerId = +req.params.centerId;

     const centerRepository = AppDataSource.getRepository(Center);

     const center = await centerRepository.findOne({
       where: {
         id: centerId
       },
       relations: {
         users: true
       }
     });

     if (!center) {
         return res.status(400).json({
            message: "Center not found",
         });
      }

     res.status(200).json(center.users);
   } catch (error) {
     res.status(500).json({
       message: "Error while getting tattoo artists by center",
     });
   }
 }


   //Crear nuevo Tattoo Artist (Superadmin)
   async createTattooArtist(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const { username, password, email, first_name, last_name, birthday_date, phone } = req.body;
         const userRepository = AppDataSource.getRepository(User);

         const newUser: User = {
            username,
            email,
            password_hash: bcrypt.hashSync(password, 10),
            first_name,
            last_name,
            birthday_date,
            phone,
            role: UserRoles.TATTOOARTIST,
         };

         await userRepository.save(newUser);

         res.status(StatusCodes.CREATED).json({
            message: "Tattoo Artist created successfully",
         });
      } catch (error) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error while creating tattoo artists",
         });
      }
   }
   async update(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;
         const data = req.body;

         const userRepository = AppDataSource.getRepository(User);
         
         const user = await userRepository.findOneBy({
            id: id,
         });

         if (!user) {
            return res.status(404).json({
               message: "User not found",
            });
         }

         await userRepository.update({ id: id }, data);

         res.status(202).json({
            message: "User updated successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while updating user",
         });
      }
   }

   //Otorgar roles a un usuario
   async updateUserRole(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;
         const data = req.body;

         const userRepository = AppDataSource.getRepository(User);
         const roleRepository = AppDataSource.getRepository(Role);

         const user = await userRepository.findOneBy({
            id: id,
         });

         if (!user) {
            return res.status(404).json({
               message: "User not found",
            });
         }

         const role = await roleRepository.findOneBy({
            id: data.role,
         }) as Role;

         user.role = role;

         await userRepository.update({ id: id }, user);

         res.status(202).json({
            message: "User role updated successfully",            
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while updating user role"
         });
      }
   }

   //Eliminar usuarios (superadmin)
   async delete(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;

         const userRepository = AppDataSource.getRepository(User);
         await userRepository.delete(id);

         res.status(200).json({
            message: "User deleted successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while deleting user",
         });
      }
   }

   async getClientAppointments(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const userId = +req.tokenData.userId;

         const userRepository = AppDataSource.getRepository(User);
         const user = await userRepository.findOne({
            where: {
               id: userId
            },
            relations: {
               clientAppointments: true
            }
         });

         if (!user) {
            return res.status(404).json({
               message: "User not found",
            });
         }

         const clientAppointments = user.clientAppointments;

         res.status(200).json({
            userId: user.id,
            clientAppointments,
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while getting employeeAppointments",
         });
      }
   }

   async getEmployeeAppointments(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const userId = +req.tokenData.userId;

         const userRepository = AppDataSource.getRepository(User);
         const user = await userRepository.findOne({
            where: {
               id: userId
            },
            relations: {
               employeeAppointments: true
            }
         });

         if (!user) {
            return res.status(404).json({
               message: "User not found",
            });
         }

         const employeeAppointments = user.employeeAppointments;

         res.status(200).json({
            userId: user.id,
            employeeAppointments,
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while getting employeeAppointments",
         });
      }
   }
}