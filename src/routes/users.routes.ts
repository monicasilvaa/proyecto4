import express from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middlewares/auth";
import { isClient } from "../middlewares/isClient";
import { isTattooArtist } from "../middlewares/isTattooArtist";

// -----------------------------------------------------------------------------

const router = express.Router();
const userController = new UserController();

router.get("/", userController.getAll);
router.get("/profile/:id", userController.getById);
router.get("/myAppointments", auth, isClient, userController.getClientAppointments);
router.get("/tattooArtistAppointments", auth, isTattooArtist, userController.getEmployeeAppointments);

router.patch("/profile/:id", userController.update);

router.post("/", userController.create);

router.delete("/:id", userController.delete);

export default router;