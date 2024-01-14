import express from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middlewares/auth";
import { isClient } from "../middlewares/isClient";
import { isTattooArtist } from "../middlewares/isTattooArtist";

// -----------------------------------------------------------------------------

const router = express.Router();
const userController = new UserController();

router.get("/", userController.getAll);
router.get("/tattooArtists", userController.getTattooArtistList);

router.get("/profile/:id",auth, userController.getById);
router.get("/myAppointments", auth, isClient, userController.getClientAppointments);
router.get("/tattooArtistAppointments", auth, isTattooArtist, userController.getEmployeeAppointments);

router.patch("/profile/:id",auth, userController.update);

router.post("/",auth, userController.create);

router.delete("/:id",auth, userController.delete);

export default router;