import { Request, Response } from "express";
import { LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { DaysOfWeek } from "../constants/BusinessHours";
import { AppDataSource } from "../database/data-source";
import { Appointment } from "../models/Appointment";
import { BusinessHour } from "../models/BusinessHour";
import { Center } from "../models/Center";
import { Service } from "../models/Service";
import { User } from "../models/User";
import { Controller } from "./Controller";

// -----------------------------------------------------------------------------

export class AppointmentController implements Controller {
   async getAll(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const appointmentRepository = AppDataSource.getRepository(Appointment);

         let { page, skip } = req.query;

         let currentPage = page ? +page : 1;
         let itemsPerPage = skip ? +skip : 10;

         const [allAppointments, count] = await appointmentRepository.findAndCount({
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
            relations: {
               employeeUser: true,
               clientUser: true,
               service:true,
               center: true
            },
            select: {
               id: true,
               appointment_date: true
            },
         });

         res.status(200).json({
            count,
            skip: itemsPerPage,
            page: currentPage,
            results: allAppointments,
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while getting appointments",
         });
      }
   }

   async getById(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;

         const appointmentRepository = AppDataSource.getRepository(Appointment);
         
         const appointment = await appointmentRepository.findOne({
            where: {
               id: id
            },
            relations: {
               employeeUser: true,
               clientUser: true,
               service:true,
               center: true
            }
         });

         if (!appointment) {
            return res.status(404).json({
               message: "Appointment not found",
            });
         }

         res.status(200).json(appointment);
      } catch (error) {
         res.status(500).json({
            message: "Error while getting appointment",
         });
      }
   }

   async create(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const data = req.body;
         
         const appointmentRepository = AppDataSource.getRepository(Appointment);
         const centerRepository = AppDataSource.getRepository(Center);
         const serviceRepository = AppDataSource.getRepository(Service);
         const userRepository = AppDataSource.getRepository(User);
         const businessHourRepository = AppDataSource.getRepository(BusinessHour);

         data.appointment_date = new Date(data.appointment_date);

         //Se obtiene el Center usando el data.center (id de centro) recibido en la petición
         data.center = await centerRepository.findOneBy({
            id: data.center
         }) as Center;

         const appointmentTime = data.appointment_date.getHours() + ":" + data.appointment_date.getMinutes() + ":00";

         const businessHours = await businessHourRepository.find({
            relations: {
               center: true
            },
            where: {
               center: data.center,
               openingTime: LessThanOrEqual(appointmentTime),
               closingTime: MoreThanOrEqual(appointmentTime),
               dayOfWeek: DaysOfWeek[data.appointment_date.getDay()]
            }
         }) as BusinessHour[];

         if (businessHours.length <= 0) {
            return res.status(400).json({
               message: "Appointment time not available",
            });
         }

         //Se obtiene el Service usando el data.service (id de servicio) recibido en la petición
         data.service = await serviceRepository.findOneBy({
            id: data.service
         }) as Service;
         
         data.clientUser = await userRepository.findOneBy({
            id: data.clientUser
         }) as User;

         data.employeeUser = await userRepository.findOneBy({
            id: data.employeeUser
         }) as User;

         //Se verifica si el tattoo Artist recibido tiene alguna cita para la fecha recibida
         const employeeAvailable = await appointmentRepository.find({
            relations: {
               employeeUser: true
            },
            where: {
               employeeUser: data.employeeUser,
               appointment_date: data.appointment_date
            }
         }) as Appointment[];

         //En caso de existir una cita devolvemos error
         if (employeeAvailable.length > 0) {
            return res.status(400).json({
               message: "Tattoo Artist not available to selected date",
            });
         }

         const newAppointment = await appointmentRepository.save(data);
         res.status(201).json(newAppointment);
      } catch (error) {
         res.status(500).json({
            message: "Error while creating appointment" + error,
         });
      }
   }

   async update(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;
         const data = req.body;

         const appointmentRepository = AppDataSource.getRepository(Appointment);
         const centerRepository = AppDataSource.getRepository(Center);
         const serviceRepository = AppDataSource.getRepository(Service);
         const userRepository = AppDataSource.getRepository(User);
         const businessHourRepository = AppDataSource.getRepository(BusinessHour);

         const appointment = await appointmentRepository.findOneBy({
            id: id,
         });

         if (!appointment) {
            return res.status(404).json({
               message: "Appointment not found" + id,
            });
         }

         if (data.appointment_date) {
            data.appointment_date = new Date(data.appointment_date);
          }
         //Se obtiene el Center usando el data.center (id de centro) recibido en la petición
         data.center = await centerRepository.findOneBy({
            id: data.center
         }) as Center;

         const appointmentTime = data.appointment_date.getHours() + ":" + data.appointment_date.getMinutes() + ":00";

         const businessHours = await businessHourRepository.find({
            relations: {
               center: true
            },
            where: {
               center: data.center,
               openingTime: LessThanOrEqual(appointmentTime),
               closingTime: MoreThanOrEqual(appointmentTime),
               dayOfWeek: DaysOfWeek[data.appointment_date.getDay()]
            }
         }) as BusinessHour[];

         if (businessHours.length <= 0) {
            return res.status(400).json({
               message: "Appointment time not available",
            });
         }

         //Se obtiene el Service usando el data.service (id de servicio) recibido en la petición
         data.service = await serviceRepository.findOneBy({
            id: data.service
         }) as Service;
         
         data.clientUser = await userRepository.findOneBy({
            id: data.clientUser
         }) as User;

         data.employeeUser = await userRepository.findOneBy({
            id: data.employeeUser
         }) as User;


         //Se verifica si el tattoo Artist recibido tiene alguna cita para la fecha recibida
         const employeeAvailable = await appointmentRepository.find({
            relations: {
               employeeUser: true
            },
            where: {
               employeeUser: data.employeeUser,
               appointment_date: data.appointment_date
            }
         }) as Appointment[];

         //En caso de existir una cita devolvemos error
         if (employeeAvailable.length > 0) {
            return res.status(400).json({
               message: "Tattoo Artist not available to selected date",
            });
         }

         await appointmentRepository.update({ id: id }, data);

         res.status(202).json({
            message: "Appointment updated successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while updating appointment" + error,
         });
      }
   }

   async delete(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;

         const appointmentRepository = AppDataSource.getRepository(Appointment);
         await appointmentRepository.delete(id);

         res.status(200).json({
            message: "Appointment deleted successfully",
         });
      } catch (error) {
         res.status(500).json({
            message: "Error while deleting appointment",
         });
      }
   }
}