import axiosInstance from '@/lib/api';
import {create} from 'zustand';

interface SalaryInformation{
    _id?:string,
    month:string,
    empId:string,
    salaryStatus:string
}

interface SalaryStoreState{
    salaryInformations: SalaryInformation[];
    isLoading:boolean;

    addSalaryInformation: (empId:string, salaryStatus:string, month:string) =>Promise<void>;
}

interface addSalaryInformationState{
    success:boolean,
    message:string,
    data:SalaryInformation[]
}

export const useSalaryStore = create<SalaryStoreState>((set)=>({
    salaryInformations: [],
    isLoading:true,

    addSalaryInformation: async(empId, salaryStatus, month) =>{
        try{
            const response = await axiosInstance.post<addSalaryInformationState>('/salary', {empId, salaryStatus, month});
            if(response.data.success){
                console.log("Successfully save the salary status in db");
            }
            else{
                console.log("An error occured to save add salary information");
            }

        }
        catch(err){
            console.log("An error occured to save add salary information");
        }
    }
}))