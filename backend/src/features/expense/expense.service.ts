import Balance from "../balance/balance.model";
import Expense from "./expense.model";

// get top 5 expense history
export const getExpense = async () => {
  const result = await Expense.find({}).sort({ createdAt: -1 }).limit(5);

  return result;
};

// Add new expense + update main balance
export const addExpense = async (data: {
  title: string;
  description: string;
  amount: number;
}) => {
  const expense = new Expense(data);
  await expense.save();

  const balance = (await Balance.findOne()) || new Balance({ balance: 0 });
  balance.balance -= data.amount;
  await balance.save();

  return expense;
};

// Update expense + adjust main balance
export const updateExpense = async (id: string, updateData: Partial<{ title: string, description: string, amount: number }>) => {
  const expense = await Expense.findById(id);
  if (!expense) throw new Error("Expense not found");

  // Adjust balance if amount is updated
  if (updateData.amount !== undefined && updateData.amount !== expense.amount) {
    const balance = await Balance.findOne() || new Balance({ balance: 0 });
    balance.balance += (expense.amount - updateData.amount); 
    await balance.save(); 
  }

  Object.assign(expense, updateData);
  await expense.save();

  return expense;
};


// Delete expense + adjust main balance
export const deleteExpense = async (id: string) => {
  const expense = await Expense.findById(id);
  if (!expense) throw new Error("Expense not found");

  const balance = await Balance.findOne() || new Balance({ balance: 0 });
  balance.balance += expense.amount;
  await balance.save();

  await expense.deleteOne();

  return expense;
};