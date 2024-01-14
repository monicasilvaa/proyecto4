import express from "express";
import { UserController } from "../controllers/UserController";

// -----------------------------------------------------------------------------

const router = express.Router();
const userController = new UserController();

router.get("/", userController.getAll);
router.get("/profile/:id", userController.getById);
router.patch("/profile/:id", userController.update);
router.post("/", userController.create);
router.delete("/:id", userController.delete);

export default router;