import Expense from "./expense.model"

//get expense
export const getExpense = async() =>{
    const res = await Expense.find().sort({createdAt:-1}).limit(10);
    return res;
}
