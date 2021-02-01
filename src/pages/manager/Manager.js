import React, {useState, useEffect} from 'react';
import { getOrders, changeStatus } from '../../functions/manager';
import { orderManagerDelete } from '../../functions/orders';
import { useSelector } from 'react-redux';
import Orders from '../admin/Orders';
import { toast } from 'react-toastify';




const Manager = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadOrders()
    },[])

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

    const deleteOrder = (_id) => {
        orderManagerDelete(_id, user.token).then(res => {
            toast.success('Заказ успешно удален');
            loadOrders()
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div className="container-fluid">
            <div style={{position: 'absolute', top: '0%', left: '0%', width: '85vw', height: '8vh', backgroundColor: 'white', zIndex: '20'}}></div>
        <div className="row">
            <div className="col-md-12">
                <h4 className="text-center">Страница Менеджера</h4>
                <h5 className='text-center'>Приветствуем вас {user.name}</h5>
                <Orders orders={orders} handleStatusChange={handleStatusChange} deleteOrder={deleteOrder} />
                <hr />
            </div>
        </div>
    </div>
    )
}

export default Manager
