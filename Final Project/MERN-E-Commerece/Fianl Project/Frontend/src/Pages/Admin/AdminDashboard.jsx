import React from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/adminMenu'
import { useAuth } from '../../context/auth'


const AdminDashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout>
      <div className='text-6xl text-center font-semibold font-orbitron m-3'>ADMIN PANEL</div>
      
        <div className="flex gap-14">
          <div className="w-1/4 h-10 font-2xl"><AdminMenu/></div>
          <div className=' w-2/3 rounded-lg border-2 flex flex-col'>
             <div className='m-3 text-2xl font-semibold'>Admin Name = {auth?.user?.name}</div>
             <div className='m-3 text-2xl font-semibold'>Admin Email = {auth?.user?.email}</div>
             <div className='m-3 text-2xl font-semibold'>Admin Contact = {auth?.user?.address}</div>
            </div>  
          </div>
      
    </Layout>  
  )
}

export default AdminDashboard
