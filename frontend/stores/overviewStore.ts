import axiosInstance from '@/lib/api';
import {create} from 'zustand';

interface OverviewState{
    totalEmployees: number;
    totalPresentEmployees:number;
    gettingTotalEmployees:boolean;
    gettingPresentEmployees:boolean;

    getTotalEmployees: ()=>void;
    getPresentEmployees:(date:string)=>void;
}

export const useOverviewStore = create<OverviewState>((set)=>({
    totalEmployees:0,
    totalPresentEmployees:0,
    gettingPresentEmployees:false,
    gettingTotalEmployees:false,

    //get total employees
    getTotalEmployees: async()=>{
        set({gettingTotalEmployees:true})
        try{
            const response = await axiosInstance.get<{data:number}>('/overview/totalEmployees');
            set({totalEmployees:response.data.data});
        }
        catch(err:any){

        }
        finally{
            set({gettingTotalEmployees:false})
        }
    },

    //get present employee
     getPresentEmployees: async (date) => {
        set({ gettingPresentEmployees: true });
        try {
            const response = await axiosInstance.get<{ data: number }>(`/overview/totalPresentEmployees/${date}`);
            set({ totalPresentEmployees: response.data.data });
        } catch (err) {
            console.error("Failed to get present employees", err);
            set({ totalPresentEmployees: 0 });
        } finally {
            set({ gettingPresentEmployees: false });
        }
    },

}))