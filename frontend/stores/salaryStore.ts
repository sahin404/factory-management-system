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
    getSalaryInformations: (month:string)=>Promise<void>;
}

interface addSalaryInformationState{
    success:boolean,
    message:string,
    data:SalaryInformation[]
}

export const useSalaryStore = create<SalaryStoreState>((set, get)=>({
    salaryInformations: [],
    isLoading:true,

    // get the salary status in database
    getSalaryInformations:async(month)=>{
        set({isLoading:true});
        try{
            const response = await axiosInstance.get<addSalaryInformationState>(`/salary/${month}`);
            set({salaryInformations: response.data.data});
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

            // optimistic save
            set((state)=>({
                salaryInformations:[
                    ...state.salaryInformations.filter((salary)=>salary.empId !== empId),
                    {empId, salaryStatus, month}
                ]

            }))

            // save to database
            const response = await axiosInstance.post<addSalaryInformationState>('/salary', {empId, salaryStatus, month});
            if(response.data.success){
                console.log("Successfully save the salary status in db");
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
            console.log("An error occured to save salary information");
        }
    }
}))