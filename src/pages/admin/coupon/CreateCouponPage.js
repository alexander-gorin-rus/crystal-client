import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { getCoupons, removeCoupon, createCoupon } from '../../../functions/coupon';
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from '@ant-design/icons'
import AdminNav from '../AdminNav';

const CreateCouponPage = () => {

    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [discount, setDiscount] = useState("");
    const [loading, setLoading] = useState(false);
    const [coupons, setCoupons] = useState([])

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        getCoupons().then(res => setCoupons(res.data));
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        //console.log(name, discount, expiry)
        createCoupon(user.token, { name, discount, expiry })
            .then((res) => {
                getCoupons().then(res => setCoupons(res.data));
                setLoading(false);
                setName('');
                setExpiry('');
                setDiscount('');
                toast.success(`Скидочный купон "${res.data.name}" успешно создан`)
            }).catch((err) => {
                console.log('Error in creating coupon', err)
            })
    }

    const handleRemove = (couponId) => {
        if (window.confirm('Макс, ты точно хочешь удалить это купон?')) {
            removeCoupon(user.token, couponId)
                .then((res) => {
                    getCoupons().then(res => setCoupons(res.data));
                    toast.success(`Макс, ты успешно смыл в унитаз купон "${res.data.name}"`)
                }).catch((err) => {
                    console.log("Error occured in deleting coupon", err)
                })
        }

    }

    return (
        <div className="container-fluid">
            <h4 className="text-center">Скидочные купоны</h4>
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="text-muted">Название купона</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                autoFocus
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Размер скидки</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setDiscount(e.target.value)}
                                value={discount}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Срок действия скидки</label>
                            <br />
                            <DatePicker
                                className="form-control"
                                selected={new Date()}
                                value={expiry}
                                onChange={(date) => setExpiry(date)}
                                required
                            />
                        </div>
                        <button className="btn btn-outline-info">Сохранить</button>
                    </form>
                    <hr />

                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Название</th>
                                <th scope="col">Срок действия до:</th>
                                <th scope="col">Размер скидки в %</th>
                                <th scope="col">Удалить купон</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map((c) => (
                                <tr key={c._id}>
                                    <td>{c.name}</td>
                                    <td>{new Date(c.expiry).toLocaleDateString()}</td>
                                    <td>{c.discount}</td>
                                    <td><DeleteOutlined className="text-danger pointer" onClick={() => handleRemove(c._id)} /></td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CreateCouponPage
