import React from 'react';
//import { CheckCircleOulined, CloseCircleFilled } from '@ant-design/icons';
import ShowPaymentInfo from '../user/ShowPaymentInfo';

const Orders = ({ orders, handleStatusChange, deleteOrder }) => {

    const showOrdersInTable = (order) => {
        return (
            <table className="table table-bordered" style={{ width: "100vw" }}>
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Название товара</th>
                        <th scope="col">Цена</th>
                        <th scope="col">Объём тары в литрах</th>
                        <th scope="col">Количество</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

    return (
        <>
            {orders.map((order) => (
                <div key={order._id} className="row pb-5">
                    { order.orderStatus === "Canceled" ? (<button className="bg-danger" style={{ width: "150px", marginLeft: "auto", marginRight: "auto" }} onClick={() => deleteOrder(order._id)}>Удалить заказ</button>) : (<p></p>)}
                    <div className="btn btn-block">
                        <ShowPaymentInfo order={order} />
                        <div className="row">
                            <div className="col-md-4">
                                Статус заказа
                        </div>
                            <div className="col-md-8">
                                <select
                                    onChange={e => handleStatusChange(order._id, e.target.value)}
                                    className="form-control"
                                    defaultValue={order.orderStatus}
                                    name="status"
                                >
                                    <option value="Not processed">Not Processed</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Canceled">Canceled</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {showOrdersInTable(order)}
                    <br />
                    <br className="bg-danger" />
                </div>
            ))}

        </>
    )
}

export default Orders
