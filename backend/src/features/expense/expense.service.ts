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

//update expense
export const updateExpense = async(data:{id:string, title:string,description:string,amount:number})=>{
    const {id, title, description, amount} = data;
    
    const expense  = await Expense.findById(id);
    if(!expense) throw new Error('Expense is not found!');

    const balance = await Balance.findOne();
    if(!balance) throw new Error('Balance is not found!');

    // update main balance
    balance.balance += expense.amount -amount;
    await balance.save();

    //update expense field
    expense.title = title;
    expense.description = description;
    expense.amount = amount;
    await expense.save();
    
    return expense;
}

//delete expense
export const deleteExpense = async(id:string)=>{
    const result = await Expense.findByIdAndDelete(id);
    if(!result) throw new Error('Expense Not found!');

    //update main balance
    const balance = await Balance.findOne();
    if(!balance) throw new Error('Balance is not found!');

    balance.balance += result.amount;
    balance.save();
    return result;
}