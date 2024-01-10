import React from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from './../../Components/Layout/userMenu';

const Order = () => {
  return (
    <Layout title = {"Your - Orders"}>
        <div>
            <UserMenu/>
            <div className='text-2xl font-semibold'>All Orders</div>
        </div>
    </Layout>
  )
}

export default Order
