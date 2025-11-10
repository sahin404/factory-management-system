import User from '../auth/auth.model';
import { UpdateEmployeeByAdmin, UpdateEmployeeByEmployee } from './employee.types';

// Get all employees
export async function getAllEmployees() {
    return await User.find({ 
        role: {$ne:'admin'} 
    });
}

// Get single employee by ID
export async function getSingleEmployee(id: string) {
  return await User.findById(id);
}

// Update employee
export async function updateEmployee(id: string, payload: any) {
  return await User.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true }
  );
}

// Delete employee
export async function deleteEmployee(id: string) {
  return await User.findByIdAndDelete(id);
}


