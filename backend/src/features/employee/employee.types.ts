export interface UpdateEmployeeByEmployee {
  name: string;
}

export interface UpdateEmployeeByAdmin {
  name?: string;
  email?: string;
  role?: 'employee' | 'manager' | 'admin' | 'accountant';
  salary?: number;
  isActive?: boolean;
}