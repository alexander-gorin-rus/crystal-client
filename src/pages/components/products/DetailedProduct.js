import React, { useState } from 'react';
import { Card, Tooltip } from 'antd';
//import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import DefaultImage from '../../../images/image_1.jpg'
import ProductListItems from './ProductListItems';
//import { showAverage } from '../../../functions/rating';
import _ from 'lodash';
import { useDispatch } from 'react-redux';

// Rating modal disabled
// import StarRating from 'react-star-ratings';
// import RatingModal from '../modal/RatingModal';




const DetailedProduct = ({ product }) => {

    const dispatch = useDispatch();

    //const { user, cart } = useSelector((state) => ({ ...state }))

    const [tooltip, setTooltip] = useState('Добавить в корзину');

    const {
        title,
        images,
        //_id
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
            <div className="col-md-5" >
                {images && images.length ? (
                    <Carousel showArrows={true} autoPlay infiniteLoop >
                        {images && images.map((i) => <img src={i.url} key={i.public_id} alt="product" />)}
                    </Carousel>
                ) : (
                        <Card
                            cover={
                                <img src={DefaultImage}
                                    className="pb-4" alt="product_image" />

                            }
                        />
                    )}

            </div>
            <div className="col-md-7">
                <h4 className="bg-info p-3 text-center">{title}</h4>

                {/* Rating section disabled */}
                {/* <h6 className="text-center">Рейтинг продукта:</h6>
                {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : 
                (<p className="text-center text-warning" style={{ fontSize: "0.7rem" }}>Этому товару рейтинг пока не выставлен. Вы можете приобрести этот продукт и поставить ему оценку</p>)} */}
                <Card
                    actions={[
                        <>
                            <Tooltip title={tooltip}>
                                <div onClick={handleAddToCart}>
                                    <>
                                        {product.quantity === 0 ? (
                                            <p>Этот товар на складе отсутствует</p>
                                        ) : (
                                            <>
                                                <ShoppingCartOutlined className="text-danger" /> <br />
                                                <p style={{ color: "red" }}>Добавить в корзину</p>
                                            </>
                                        )}
                                        
                                    </>
                                </div>
                            </Tooltip>

                            {/* <Link to="/">
                                <HeartOutlined className="text-info" /> <br /> <p className="text-warning">Добавить в отложенные покупки</p>
                            </Link> */}
                        </>
                    ]}
                >

                    <ProductListItems product={product} />
                </Card>
            </div>
        </>
    )
}

export default DetailedProduct
