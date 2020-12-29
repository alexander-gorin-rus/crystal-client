import React from 'react';
import ModalImage from 'react-modal-image';
import imageDefault from '../../../images/image_1.jpg';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { CloseOutlined } from '@ant-design/icons';

const ProductCartCheckout = ({ p }) => {

    let dispatch = useDispatch();

    const handleCount = (e) => {

        let count = e.target.value < 1 ? 1 : e.target.value

        if (count > p.quantity) {
            toast.error(`Максимально доступное количество этого товара: ${p.quantity} единиц`);
            return;
        }


        let cart = [];
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }

            cart.map((product, i) => {
                if (product._id === p._id) {
                    cart[i].count = count
                }
            });

            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: "ADD_TO_CART",
                payload: cart
            })
        }
    }

    const handleRemove = () => {
        let cart = [];
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }

            cart.map((product, i) => {
                if (product._id === p._id) {
                    cart.splice(i, 1)
                }
            });

            localStorage.setItem('cart', JSON.stringify(cart))
            dispatch({
                type: "ADD_TO_CART",
                payload: cart
            })
        }
    }


    return (
        <tbody>
            <tr>
                <td>
                    <div>
                        {p.images.length ? (
                            <ModalImage
                                small={p.images[0].url}
                                large={p.images[0].url}
                            />
                        ) : (
                                <ModalImage
                                    small={imageDefault}
                                    large={imageDefault}
                                />
                            )}
                    </div>
                </td>
                <td className="text-center">{p.title}</td>
                <td className="text-center">{p.description}</td>
                <td className="text-center">{p.volume / 1000}</td>
                <td className="text-center">{p.price}</td>
                <td className="text-center">
                    <input
                        type="number"
                        className="form-control"
                        value={p.count}
                        onChange={handleCount} />
                </td>
                <td className="text-center">{p.quantity}</td>
                <td className="text-center">
                    <CloseOutlined onClick={handleRemove} className="text-danger" style={{ cursor: "pointer" }} />
                </td>
            </tr>
        </tbody>
    )
}

export default ProductCartCheckout
