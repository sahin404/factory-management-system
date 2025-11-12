import { Request, Response } from "express";
import { getAttendance, updateAttendance } from "./attendance.service";


// Get attendances for a specific date
export const getAttendanceController = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ success: false, message: "Date is required" });

    const attendances = await getAttendance(date as string);
    res.status(200).json({ success: true, message:"Successfully fetched.", data: attendances });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update attendance
export const updateAttendanceController = async (req: Request, res: Response) => {
  const { employeeId, status, date } = req.body;

  try {
    if (!employeeId || !status || !date) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    if (!["present", "absent", "leave"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const updated = await updateAttendance(employeeId, status as "present" | "absent" | "leave", date);

    return res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      data: updated,
    });
  } catch (error: any) {
    console.error("Error updating attendance:", error.message || error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating attendance",
    });
  }
};
