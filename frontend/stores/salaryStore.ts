import axiosInstance from '@/lib/api';
import {create} from 'zustand';

interface SalaryInformationState{
     _id?:string,
    name:string,
    email:string, 
    salary:number,
    month:string,
    salaryStatus:string
}

interface SalaryInformationsState{
    success:boolean,
    message?:string,
    data:SalaryInformationState[]
}

interface SalaryStoreState{
    salaryInformations: SalaryInformationState[];
    isLoading:boolean;
    fetched:boolean;

    addSalaryInformation: (empId:string, salaryStatus:string, month:string) =>Promise<void>;
    getSalaryInformations: (month:string)=>Promise<void>;
}


export const useSalaryStore = create<SalaryStoreState>((set, get)=>({
    salaryInformations: [],
    isLoading:false,
    fetched:false,
    // get the salary status in database
    getSalaryInformations:async(month)=>{
        const {fetched} = get();
        if(fetched){
            // Data is already cached
        } else {
            set({isLoading:true});
        }
        try{
            const response = await axiosInstance.get<SalaryInformationsState>(`/salary/${month}`);
            set({salaryInformations: response.data.data, fetched:true});
   
        }
        catch(err){
            console.log('An error occured to fetching salary information.');
        }
        finally{
            set({isLoading:false});
        }
    },

    // save the salary status in database
    addSalaryInformation: async(empId, salaryStatus, month) =>{
        const prevState = get().salaryInformations;

        try{
            // save to database
            const response = await axiosInstance.post<SalaryInformationsState>('/salary', {empId, salaryStatus, month});
            if(response.data.success){
                // console.log("Successfully save the salary status in db");
                set({ fetched: false });
            }
            else{
                // rollback
                set({ salaryInformations: prevState });
                console.log("An error occured to save salary information");
            }

        }
        catch(err){
            // rollback
            set({ salaryInformations: prevState });
            console.log("An error occured to save salary information.");
        }
    }
}))