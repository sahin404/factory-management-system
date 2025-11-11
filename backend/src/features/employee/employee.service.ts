import User from "../auth/auth.model";

// Get all employees
export async function getAllEmployees(searchTerm: string) {
  const filter:any = { role: { $ne: "admin" }};

  if(searchTerm){
    filter.name = {$regex:searchTerm, $options:"i"};
  }

  return await User.find(filter).sort({ createdAt: -1 });
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
