import React, { useEffect, useState } from 'react';


const ShowPaymentInfo = ({ order }) => {
    return (
        <div>
            <p>
                <span>Дата заказа: {new Date(order.paymentIntent.created).toLocaleString()}.</span>{" / "}
                <span>Сумма: {order.paymentIntent.amount}{" "}тенге.</span>{" / "}
                <span>Форма оплаты: {order.paymentIntent.payment_method_types[0]}.</span>{" / "}
                <span>Способ оплаты: {order.paymentIntent.status}.</span>{" / "}
                <span>Адрес доставки: {order.paymentIntent.address}.</span>{" / "}
                <br />
                <span className="badge bg-primary text-white">СТАТУС ЗАКАЗА: {order.orderStatus}.</span>{" / "}
            </p>
        </div>
    )
}

export default ShowPaymentInfo
