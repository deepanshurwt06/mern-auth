import express from "express";
import { deleteUser, test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/varifyUser.js";

const router = express.Router();

router.get("/",test)
router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken,deleteUser );


export default router