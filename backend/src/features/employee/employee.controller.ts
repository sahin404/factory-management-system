import { Request, Response } from 'express';
import {
  getAllEmployees,
  getSingleEmployee,
  deleteEmployee,
  updateEmployeeByEmployee,
  updateEmployeeByAdmin
} from './employee.service';

// Get all employees
export async function getAllEmployeeController(req: Request, res: Response) {
  try {
    const employees = await getAllEmployees();
    res.status(200).json({
        success:true,
        message: "Fetched employees successfully.",
        data: employees
    });
  } catch (error) {
    res.status(500).json({ success:false, message: 'Failed to fetch employees' });
  }
}

// Get single employee
export async function getSingleEmployeeController(req: Request, res: Response) {
  try {
    const employee = await getSingleEmployee(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({
        success:true,
        data: employee
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch employee' });
  }
}

// Delete employee
export async function deleteEmployeeController(req: Request, res: Response) {
  try {
    const deleted = await deleteEmployee(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ 
        success:true,
        message: 'Employee deleted successfully' 
    });

  } catch (error) {
    res.status(500).json({ message: 'Failed to delete employee' });
  }
}

// Update employee name (employee only)
export async function updateEmployeeByEmployeeController(req: Request, res: Response) {
  try {
    const updated = await updateEmployeeByEmployee(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({
        success:true,
        data:updated
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update employee' });
  }
}

// Update employee (admin/manager)
export async function updateEmployeeByAdminController(req: Request, res: Response) {
  try {
    const updated = await updateEmployeeByAdmin(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({
        success:true,
        data:updated
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update employee' });
  }
}
