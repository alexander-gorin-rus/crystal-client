import React from 'react';
import ShowPaymentInfo from '../user/ShowPaymentInfo';

const Orders = ({ orders, handleStatusChange, deleteOrder }) => {

    const showOrdersInTable = (order) => {
        return (
            <table className="table table-bordered" style={{ width: "100vw" }}>
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Название товара</th>
                        <th scope="col">Номенклатурный номер</th>
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
                            <td>{p.product.nn}</td>
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

    const deleteOrderHandler = (_id) => {
        const answer = window.confirm('Макс, ты точно хочешь удалить этот заказ?')
        if (answer) {
            deleteOrder(_id)
        }

    }

    return (
        <>
            {orders.map((order) => (
                <>
                <div key={order._id} className="row pb-5">
                    {order.orderStatus === "Deleted" ? 

                        (<button 
                            className="bg-danger" 
                            style={{ width: "150px", marginLeft: "auto", marginRight: "auto" }} 
                            onClick={() => deleteOrderHandler(order._id)}>
                                Удалить заказ
                        </button>) : (<p></p>)}
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
                                    <option value="Deleted">Deleted</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {showOrdersInTable(order)}
                    <br />
                    <br />
                </div>
                {/* <Link to={`/admin/invoice/${order._id}`}>Просмотреть заказ в форме накладной</Link> */}
                </>
            ))}

        </>
    )
}

export default Orders
