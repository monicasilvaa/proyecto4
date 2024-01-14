import express from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middlewares/auth";
import { isClient } from "../middlewares/isClient";
import { isTattooArtist } from "../middlewares/isTattooArtist";
import { isSuperadmin } from "../middlewares/isSuperadmin";

// -----------------------------------------------------------------------------

const router = express.Router();
const userController = new UserController();

router.get("/", userController.getAll);
router.get("/tattooArtists", userController.getTattooArtistList);

router.get("/profile/:id",auth, userController.getById);
router.get("/myAppointments", auth, isClient, userController.getClientAppointments);
router.get("/tattooArtistAppointments", auth, isTattooArtist, userController.getEmployeeAppointments);
router.get("/registeredClients", auth, isSuperadmin, userController.getAllRegisteredClients);

router.patch("/profile/:id",auth, userController.update);
router.patch("/changeUserRole/:id",auth, isSuperadmin, userController.updateUserRole);

router.post("/registerTattooArtist",auth, isSuperadmin, userController.createTattooArtist);

router.delete("/:id",auth, isSuperadmin, userController.delete);

export default router;