import React, { useState, useEffect } from 'react';
import UserNav from '../components/navigation/UserNav';
import { getUserOrders } from '../../functions/user';
import { useSelector } from 'react-redux';
import ShowPaymentInfo from './ShowPaymentInfo';


const History = () => {

    const [orders, setOrders] = useState([]);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadUserOrders()
    }, []);


    const loadUserOrders = () => {
        getUserOrders(user.token).then((res) => {
            //console.log(JSON.stringify(res.data, null, 4));
            setOrders(res.data)
        });
    }

    
    const showOrdersInTable = (order) => {
        return (
            <table className="table table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Название товара</th>
                        <th scope="col">Цена</th>
                        <th scope="col">Объём тары в литрах</th>
                        <th scope="col">Количество</th>
                        <th scope="col">На сумму в KZT</th>
                    </tr>
                </thead>
                <tbody>
                    {order.products.map((p, i) => (
                        <tr key={i}>
                            <td>
                                <b>{p.product.title}</b>
                            </td>
                            <td>{p.product.price}</td>
                            <td>{p.product.volume / 1000}</td>
                            <td>{p.count}</td>
                            <td>{p.count * p.product.price}</td>
                        </tr>
                    ))} 
                </tbody>
            </table>
        )
    }

    const showEachOrders = () =>
        orders.map((order, i) => (
            <div key={i} className="m-5 p-3 card">
                <p>Информация о заказе</p>
                <ShowPaymentInfo order={order} />
                {showOrdersInTable(order)}
            </div>
           
        ))


    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <UserNav />
                    </div>
                    <div className="col text-center mt-3">
                        <h4>{orders.length > 0 ? "Моя история покупок" : "История покупок пуста"}</h4>
                        {showEachOrders()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History
