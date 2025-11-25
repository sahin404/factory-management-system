import User from "../auth/auth.model"

// get total employees
export const getTotalEmployees = async()=>{
     const total = await  User.countDocuments();
     return total-1;
}