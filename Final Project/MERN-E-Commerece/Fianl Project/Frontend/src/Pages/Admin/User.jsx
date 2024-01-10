import React from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from './../../Components/Layout/adminMenu';

const User = () => {
  return (
    <Layout title= {"Dashboard - All Users"}>
        <div>
            <AdminMenu/>
    <div>  All users </div>
        </div>
    </Layout>
  )
}

export default User
