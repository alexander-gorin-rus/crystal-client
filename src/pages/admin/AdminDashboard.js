import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import { getOrders, changeStatus } from '../../functions/admin';
import { useSelector } from 'react-redux';
import Orders from './Orders';
import { toast } from 'react-toastify';

const AdminDashboard = () => {

    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadOrders()
    }, [])

    const loadOrders = () => getOrders(user.token).then((res) => {
        //console.log(JSON.stringify(res.data, null, 4))
        setOrders(res.data)
    })

    const handleStatusChange = (orderId, orderStatus) => {
        changeStatus(orderId, orderStatus, user.token).then((res) => {
            toast.success('Статус заказа изменен');
            loadOrders();
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4 className="text-center">Страница Администратора</h4>
                    <Orders orders={orders} handleStatusChange={handleStatusChange} />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
