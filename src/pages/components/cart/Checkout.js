import React, { useState, useEffect } from 'react'
import { 
    getUserCart, 
    emptyUserCart, 
    saveUserAddress, 
    applyCoupon,
    createCashOrderForUser
} from '../../../functions/user';
import { getHomePage } from '../../../functions/homePage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css"
import WhatsAppWidget from 'react-whatsapp-widget'
import 'react-whatsapp-widget/dist/index.css'



const Checkout = ({ history }) => {

    const dispatch = useDispatch();
    const { user, COD } = useSelector((state) => ({ ...state }));
    const couponTrueOrFalse = useSelector((state) => state.coupon)


    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("");
    const [addressSaved, setAddressSaved] = useState(false);
    const [coupon, setCoupon] = useState('')
    const [homePage, setHomePage] = useState([]);


    //total price after discount
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    const [discountError, setDiscountError] = useState("")

    useEffect(() => {
        getUserCart(user.token).then((res) => {
            //console.log('user cart ', JSON.stringify(res.data, null, 4));
            setProducts(res.data.products);
            setTotal(res.data.cartTotal)
        })
    }, []);

    useEffect(() => {
        getHomePage().then((res) => setHomePage(res.data))
        //console.log(JSON.stringify(homePage, null, 4))
    }, []);

    const saveAddressToDb = () => {
        saveUserAddress(address, user.token).then((res) => {
            if(res.data.ok){
                setAddressSaved(true)
                toast.success('Адрес для доставки успешно сохранен')
            }
        })
    }


    const emptyCart = () => {
        //remove cart from localStorage
        if (typeof window !== 'undefined') {
            localStorage.removeItem('cart');
            history.push('/products')
        }

        //remove cart from redux
        dispatch({
            type: 'ADD_TO_CART',
            payload: []
        });

        //remove cart from backend
        emptyUserCart(user.token)
            .then(res => {
                setProducts([]);
                setTotal(0);
                setTotalAfterDiscount(0);
                setCoupon("")
                dispatch({
                    type: "COUPON_APPLIED",
                    payload: true
                });
                toast.success('Корзина успешно очищена')
            })
    }

    const applyDiscountCoupon = () => {
        console.log('apply discount coupon', coupon)

        applyCoupon(user.token, coupon)
            .then((res) => {
                console.log('DISCOUNT COUPON IS', res.data)
                if (res.data) {
                    setTotalAfterDiscount(res.data);
                    //update redux coupon applied true/false
                    dispatch({
                        type: "COUPON_APPLIED",
                        payload: true
                    });
                }
                //error
                if (res.data.err) {
                    setDiscountError(res.data.err);
                    //update redux coupon applied true/false
                    dispatch({
                        type: "COUPON_APPLIED",
                        payload: false
                    });
                }
            })
    }

    const showAddress = () => (
        <>
            <ReactQuill theme="snow" value={address} onChange={setAddress} />
            <button
                className="btn btn-primary mt-2"
                onClick={saveAddressToDb}
                disabled={address === ''}
                >
                Сохранить адрес
            </button>
        </>
    )

    const showProductSummary = () => (
        <>
            {products.map((p, i) => (
                <div key={i}>
                    <p>
                        {p.product.title} x {p.count} ={" "}
                        {p.product.price * p.count}
                    </p>
                </div>
            ))}
        </>
    )

    const showApplyCoupon = () => (
        <>
            <input
                type="text"
                className="form-control m-4"
                placeholder="Введите название купона"
                onChange={(e) => {
                    setCoupon(e.target.value)
                    setDiscountError("")
                }}
                value={coupon}
            />
            <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">Применить скидочный купон</button>
        </>
    )

    const createCashOrder = () => {
        createCashOrderForUser(user.token, COD, couponTrueOrFalse)
            .then((res) => {
                //console.log("USER CASH ORDER CREATED", res);

                //empty cart from localStorage and redux, reset coupon
                if(typeof window !== 'undefined'){
                    localStorage.removeItem('cart')
                }
                //empty redux
                dispatch({
                    type: "ADD_TO_CART",
                    payload: []
                });

                //empty redux coupon
                dispatch({
                    type: "COUPON_APPLIED",
                    payload: false
                });

                //empty redux COD
                dispatch({
                    type: "COD",
                    payload: false
                });

                //empty cart from backend
                emptyUserCart(user.token)
            .then(res => {
                setProducts([]);
                setTotal(0);
                setTotalAfterDiscount(0);
                setCoupon("")
            })
            });
            setTimeout(() => {
                history.push('/user/history')
            }, 1000)
    }

    return (
        <div className="row mb-5">
            <div className="col-md-6">
                <p className="text-center text-danger mt-3">
                Во избежание задержек с доставкой товара, просим Вас корректно заполнить адрес для доставки, с указанием Вашей компании и номера телефона    
                </p> 
                <br />
                <h4 className="text-center">Адрес Заказчика:</h4>
                <p className="text-center text-info " style={{fontSize: "0.7rem"}}>В произвольной форме</p>
                {showAddress()}
                <hr />
                <h4 className="text-center">Желаете получить скидку?</h4>
                <p style={{fontSize: "0.9rem"}} className="text-center text-danger">Пожалуйста, позвоните менеджеру {homePage.map((h, i) => (<h5 className="text-info" key={i}>{h.phone}</h5>))} для получения персональной скидки</p>
               
                <br />
                {showApplyCoupon()}
                <br />
                {discountError && <p className="bg-danger text-center">{discountError}</p>}
            </div>
            <div className="col-md-6">
                <h4 className="mt-3 text-center">Мой заказ:</h4>
                <hr />
                {showProductSummary()}
                <hr />
                
                <div>
                    {totalAfterDiscount > 0 ? (
                        <p className="bg-success p-2">Скидка по купону "{coupon}" применена. Цена до скидки: {total} тенге. Новая цена со скидкой {totalAfterDiscount}{" "}тенге. Вы сэкономили {total - totalAfterDiscount} тенге</p>
                    ) : (
                        <div>
                            <p>На сумму:</p>
                {total} {" "}тенге
                        </div>
                    )}
                   
                </div>
                <div className="row">
                <div className="col-md-6">
           {COD ? (
                <button
                onClick={createCashOrder}
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
            >
              Отправить заказ
            </button>
           ) : (
            <button
            onClick={() => history.push('/payment')}
            className="btn btn-primary"
            disabled={!addressSaved || !products.length}
        >
          Отправить заказ
        </button>
           )}
          </div>
                    <div className="col-md-6">
                        <button
                            disabled={products.length === 0}
                            onClick={() => emptyCart()}
                            className="btn btn-danger"
                        >Отменить заказ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
