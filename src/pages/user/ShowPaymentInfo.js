import React from 'react';



const ShowPaymentInfo = ({ order, deleteOrder }) => {


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
    if (order.orderStatus === "Canceled") {
        return (
            <>
                <p>Дата заказа: {new Date(order.paymentIntent.created).toLocaleString()}.</p>
                <p>ID заказа: {order.paymentIntent.id}{" "}</p>
                <p>Сумма: {order.paymentIntent.amount}{" "}тенге.</p>
                <p>Адрес: {order.paymentIntent.address}</p>
                <p className="bg-danger m-3">Заказ отменен</p>
            </>

        )
    }



    return (
        <div  >
            {/* { order.orderStatus === "Delivered" ||
                order.orderStatus === "Canceled" ? (<button className="bg-danger" onClick={deleteOrder}>Удалить заказ</button>) : (<p></p>)} */}
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
