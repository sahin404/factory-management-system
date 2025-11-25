import axiosInstance from '@/lib/api';
import {create} from 'zustand';

interface OverviewState{
    totalEmployees: number;
    gettingTotalEmployees:boolean;

    getTotalEmployees: ()=>void;
}

export const useOverviewStore = create<OverviewState>((set)=>({
    totalEmployees:0,
    gettingTotalEmployees:false,

    //get total employees
    getTotalEmployees: async()=>{
        set({gettingTotalEmployees:true})
        try{
            const response = await axiosInstance.get<{data:{totalEmployee:number}}>('/overview/totalEmployee');
            set({totalEmployees:response.data.data.totalEmployee});
        }
        catch(err:any){

        }
        finally{
            set({gettingTotalEmployees:false})
        }
    }
}))