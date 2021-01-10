import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCartCheckout from './ProductCartCheckout';
import { userCart } from '../../../functions/user';

const Cart = ({ history }) => {

    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();


    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const saveOrderToDb = () => {
        //console.log('cart', JSON.stringify(cart, null, 4));
        userCart(cart, user.token).then((res) => {
            console.log('CART POST', res);
            if (res.data.ok) {
                history.push('/checkout')
            }
        }).catch(err => console.log('cart save error', err));
    }

    const saveCashOrderToDb = () => {
        //console.log('cart', JSON.stringify(cart, null, 4));
        dispatch({
            type: 'COD',
            payload: true
        });
        userCart(cart, user.token).then((res) => {
            console.log('CART POST', res);
            if (res.data.ok) {
                history.push('/checkout')
            }
        }).catch(err => console.log('cart save error', err));
    }

    const showCartItems = () => (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Фото</th>
                    <th scope="col">Название</th>
                    <th scope="col">Описание</th>
                    <th scope="col">Объём тары в литрах</th>
                    <th scope="col">Цена в тенге</th>
                    <th scope="col">Кол-во</th>
                    <th scope="col">Доступное кол-во на складе</th>
                    <th scope="col">Удалить</th>
                </tr>
            </thead>
            {cart.map((p) => (
                <ProductCartCheckout key={p._id} p={p} />
            ))}
        </table>
    )

    return (
        <div className="container-fluid">
            <h6 className="text-center mt-2">В корзине товаров: {cart.length} </h6>
            <div className="row">
                <div className="col-md-12">
                    {!cart.length ? (
                        <p className="text-center">В корзине нет товаров{"  "}<Link to="/result">перейти к покупкам</Link></p>
                    ) : (
                            showCartItems()
                        )}
                </div>
                <div className="row">
                    <div className="col-md-12 ml-5">

                        <h6>Информация о заказе</h6>
                        <hr />
                        {cart.map((c, i) => (
                            <div key={i}>
                                <div>{c.title} X {c.count} = {c.price * c.count} тенге</div>
                            </div>
                        ))}
                        <hr />
                    На общую сумму: {getTotal()} тенге
                    <hr />
                        {user ? (
                            <>
                                {/* <button
                                className="btn btn-primary btn-sm mt-2"
                                onClick={saveOrderToDb}
                                disabled={!cart.length}
                            >
                                Оформить заказ и оплатить картой
                            </button> */}

                                <button
                                    className="btn btn-primary btn-sm mt-2"
                                    onClick={saveCashOrderToDb}
                                    disabled={!cart.length}
                                >
                                    Оформить заказ
                            </button>
                            </>
                        ) : (
                                <>
                                    <p className="mr-4">Вы не авторизованы</p>
                                    <Link to="/login">Авторизоваться</Link>
                                    <p className="mr-4">либо</p>
                                    <Link to="/register">Зарегистрироваться</Link>
                                </>
                            )}

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Cart
