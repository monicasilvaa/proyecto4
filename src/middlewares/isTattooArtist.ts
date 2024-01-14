import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserRoles } from "../constants/UserRoles";

export const isTattooArtist = (req: Request, res: Response, next: NextFunction) => {
   const role = req.tokenData.userRole;

   if (role != UserRoles.TATTOOARTIST.name) {
      return res.status(StatusCodes.FORBIDDEN).json({
         message: "You are not allowed to access this resource",
      });
   }

   next();
};