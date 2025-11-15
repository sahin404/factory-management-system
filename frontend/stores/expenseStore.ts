import axiosInstance from '@/lib/api';
import {create} from 'zustand';

interface ExpenseData{
    _id?:string,
    name:string,
    description:string,
    date:string,
    amount:number,
}


interface ExpenseStoreState{
    expenses:ExpenseData[];
    isLoading:boolean;
    isAddingExpense:boolean;
    AddExpense: (value: ExpenseData)=>Promise<void>;
}

const useExpenseStore = create<ExpenseStoreState>((set)=>({
    expenses: [],
    isLoading:true,
    isAddingExpense:false,

    //add expense
    AddExpense: async(expenseData)=>{
        set({isAddingExpense:true});
        try{
            const response = await axiosInstance.post('/expense', expenseData);
        }
        catch(err){

        }
        finally{
            set({isAddingExpense:false});
        }
    }
}))