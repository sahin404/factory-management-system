import Balance from "../balance/balance.model";
import Expense from "./expense.model"

// get expense
export const getExpense = async() =>{
    const res = await Expense.find().sort({createdAt:-1}).limit(10);
    return res;
}

// Add expenses
export const addExpense = async(data:{title:string, description:string, amount:number})=>{
    // data: title, description, amount
    data.amount = Number(data.amount);
    const newExpense = new Expense(data);
    await newExpense.save();

    // update the main balance
    const balance = await Balance.findOne();
    if(!balance) throw new Error("Balance record not found!");
    balance.balance -=  data.amount || 0; 
    await balance.save();

    return newExpense;
}
