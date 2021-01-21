import React from 'react';



const ShowPaymentInfo = ({ order }) => {


    let classes = [];
    if (order.orderStatus === "Not processed") {
        classes.push("textred")
    }
    if (order.orderStatus === "Processing") {
        classes.push("textyellow")
    }
    if (order.orderStatus === "Delivered") {
        classes.push("textgreen")
    }
    if (order.orderStatus === "Deleted") {
        return (
            <>
                <p>Дата заказа: {new Date(order.paymentIntent.created).toLocaleString()}.</p>
                <p>ID заказа: {order.paymentIntent.id}{" "}</p>
                <p>Сумма: {order.paymentIntent.amount}{" "}тенге.</p>
                <p>Адрес: {order.paymentIntent.address}</p>
                <p style={{ background: '#ddf502' }} className="text-center m-3 textInfo">Заказ отменен клиентом, <br /> либо успешно выполнен и готов к удалению из базы данных</p>
            </>

        )
    }



    return (
        <div  >
            <p >
                <span>Дата заказа: {new Date(order.paymentIntent.created).toLocaleString()}.</span>
                <br />
                <span>ID заказа: {order.paymentIntent.id}{" "}</span>
                <br />
                <span>Сумма: {order.paymentIntent.amount}{" "}тенге.</span>
                <br />
                <span>Форма оплаты: {order.paymentIntent.payment_method_types[0]}.</span>
                <br />
                <span>Способ оплаты: {order.paymentIntent.status}.</span>
                <br />
                <span>Адрес доставки: {order.paymentIntent.address}.</span>
                <br />
                <br />
                <span className={classes.join(' ')} style={{ background: "black", padding: "6px" }}>СТАТУС ЗАКАЗА: {order.orderStatus}.</span>
            </p>

        </div>
    )
}

export default ShowPaymentInfo
