import { Router } from "express";
import { updateAttendanceController } from "./attendance.controller";

const attendanceRouter = Router();


attendanceRouter.post("/update", updateAttendanceController);

export default attendanceRouter;