import User from '../auth/auth.model';
import { UpdateEmployeeByAdmin, UpdateEmployeeByEmployee } from './employee.types';


// Get all employees
export async function getAllEmployees() {
    return await User.find({ 
        role: 'employee' 
    });
}

// Get single employee by ID
export async function getSingleEmployee(id: string) {
  return await User.findById(id);
}

// Delete employee
export async function deleteEmployee(id: string) {
  return await User.findByIdAndDelete(id);
}

// Update employee name (employee only)
export async function updateEmployeeByEmployee(id: string, data: UpdateEmployeeByEmployee) {
  return await User.findByIdAndUpdate(id, { name: data.name }, { new: true });
}

// Update employee (admin/manager can update all fields)
export async function updateEmployeeByAdmin(id: string, data: UpdateEmployeeByAdmin) {
  return await User.findByIdAndUpdate(id, data, { new: true });
}
