import { Router } from "express";
import { getAttendanceController, updateAttendanceController } from "./attendance.controller";
import { verifyManager } from "../../middlewares/managerVerify.middleware";
import { verifyAdmin } from "../../middlewares/adminVerify.middlware";
import { verifyToken } from "../../middlewares/auth.middleware";

const attendanceRouter = Router();

attendanceRouter.get("/", verifyToken, verifyAdmin, verifyManager, getAttendanceController);
attendanceRouter.post("/update",verifyToken, verifyAdmin, verifyManager, updateAttendanceController);

export default attendanceRouter;