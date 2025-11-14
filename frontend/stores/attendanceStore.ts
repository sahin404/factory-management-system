import { create } from "zustand";
import axiosInstance from "@/lib/api";

interface Attendance {
  _id?: string;
  employeeId: string;
  date: string;
  status: "present" | "absent" | "leave";
}

interface attendanceResponse{
    success:boolean,
    message:boolean,
    data:Attendance[]
}

interface AttendanceState {
  attendances: Attendance[];
  isLoading: boolean;
  updateAttendance: (
    employeeId: string,
    status: "present" | "absent" | "leave",
    date: string
  ) => Promise<void>;
  getAllAttendance: (date: string) => Promise<void>;
}

export const useAttendanceStore = create<AttendanceState>((set, get) => ({
  attendances: [],
  isLoading: false,
  

  // get all attendance for specific date
  getAllAttendance: async (date) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get<attendanceResponse>(`/attendance?date=${date}`);
      set({ attendances: res.data.data || [] });
    } catch (err: any) {
      console.log(err.response?.data || err.message);
    } finally {
      set({ isLoading: false });
    }
  },

  // single employee attendance
  updateAttendance: async (employeeId, status, date) => {
    try {
      // optimistic update
      set((state) => ({
        attendances: [
          ...state.attendances.filter((a) => a.employeeId !== employeeId),
          { employeeId, date, status },
        ],
      }));

      const res = await axiosInstance.post<attendanceResponse>(`/attendance/update`, {
        employeeId,
        status,
        date,
      });

      if (res.data?.success) {
      } else {
      }
    } catch (err: any) {
      console.error(err.response?.data || err.message);
    }
  },
  
}));
