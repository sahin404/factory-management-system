"use client"

import { useOverviewStore } from "@/stores/overviewStore"
import { useEffect } from "react";

const TotalEmployeesCard = () => {
  const {totalEmployees, getTotalEmployees, gettingTotalEmployees} = useOverviewStore();

  useEffect(()=>{
    getTotalEmployees();
  },[])

  // todo: skeleton

  return (
    <div className='bg-black text-white'>{totalEmployees}</div>
  )
}

export default TotalEmployeesCard