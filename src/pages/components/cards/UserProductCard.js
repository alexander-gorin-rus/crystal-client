import React, { useState, useEffect } from 'react';
import imageDefault from '../../../images/image_1.jpg';
import { Card, Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { showAverage } from '../../../functions/rating';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

const { Meta } = Card

const UserProductCard = ({ product }) => {

    //redux
    const dispatch = useDispatch();
    const { user, cart } = useSelector((state) => ({ ...state }));

    const [tooltip, setTooltip] = useState('Добавить в корзину')

    const {
        title,
        price,
        volume,
        description,
        images,
        slug,
        sold
    } = product

    const handleAddToCart = () => {
        //create cart array
        let cart = [];
        if (typeof window !== 'undefined') {
            //if product in the localStorage
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            //push new product to cart
            cart.push({
                ...product,
                count: 1
            });
            //remove duplicate
            let unique = _.uniqWith(cart, _.isEqual);
            //save to localStorage
            localStorage.setItem('cart', JSON.stringify(unique));
            setTooltip('Добавлено в корзину');

            //add to redux state
            dispatch({
                type: "ADD_TO_CART",
                payload: unique
            });
            dispatch({
                type: "SET_VISIBLE",
                payload: true
            });
        }
    }

    return (
        <>
            {product && product.ratings && product.ratings.length > 0 ? (
                showAverage(product)
            ) : (
                    <p className="text-center text-warning" style={{ fontSize: "0.7rem" }}>
                        Этому товару рейтинг пока не выставлен. Вы можете приобрести этот продукт и поставить ему оценку</p>
                )}
            <Card
                cover={
                    <img src={images && images.length ? images[0].url : imageDefault}
                        style={{ height: '150px', objectFit: "cover" }}
                        className="p-1"
                    />

                }
                actions={[
                    <Link to={`/product/${slug}`} >
                        <EyeOutlined className="text-warning" /> <br /> <p className="text-warning">Подробнее о продукте</p>
                    </Link>,
                    <Tooltip title={tooltip}>
                        <Link onClick={handleAddToCart} disabled={product.quantity < 1}>
                            <br />
                            {product.quantity < 1 ? (
                                "На складе этот товар отсутствует"
                            ) : (
                                    <>
                                        <ShoppingCartOutlined
                                            className="text-danger"
                                        />
                                        <p style={{ color: "red" }}>Добавить в корзину</p>
                                    </>
                                )}
                        </Link>
                    </Tooltip>
                ]}
            >
                <Meta title={title} />
                <div style={{ color: "#3427e8" }}>{description}</div>
                <div><p className="text-danger" style={{ fontSize: "0.9rem", display: "inline" }}>Цена:</p> {price} <p className="text-danger" style={{ fontSize: "0.9rem", display: "inline" }}>тенге</p></div>
                <div className="text-info">Объём тары в литрах : {volume / 1000}</div>
                <div className="text-primary">Количество проданного товара: {sold} единиц</div>
            </Card>
        </>
    )
}

export default UserProductCard