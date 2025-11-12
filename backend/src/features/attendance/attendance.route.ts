import { Router } from "express";
import { getAttendanceController, updateAttendanceController } from "./attendance.controller";

const attendanceRouter = Router();

attendanceRouter.get("/", getAttendanceController);
attendanceRouter.post("/update", updateAttendanceController);

export default attendanceRouter;