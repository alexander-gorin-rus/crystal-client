import React from 'react';
import { Drawer, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import imageDefault from '../../../images/image_1.jpg';
import { Link } from 'react-router-dom';


const SideDrawer = () => {

    const dispatch = useDispatch();
    const { drawer, cart } = useSelector((state) => ({ ...state }));

    const imageStyle = {
        width: '100%',
        height: '50px',
        objectFit: 'cover',

    }

    const handleClose = () => {
        dispatch({
            type: "SET_VISIBLE",
            payload: false
        });
    }
    return (
        <Drawer
            className="text-center"
            title={`В корзине продукции ${cart.length} единиц`}
            visible={drawer}
            placement="right"
            closable={false}
            onClose={() => {
                dispatch({
                    type: "SET_VISIBLE",
                    payload: false
                })
            }}
        >
            {cart.map((p) => (
                <div key={p._id} className="row">
                    <div className="col">
                        {p.images[0] ? (
                            <>
                                <img src={p.images[0].url} style={imageStyle} />
                                <p className="text-center bg-secondary text-light">
                                    {p.title} X {p.count}
                                </p>
                            </>

                        ) : (
                                <>
                                    <img src={imageDefault} style={imageStyle} />
                                    <p className="text-center bg-secondary text-light">{p.title} X {p.count} </p>
                                </>
                            )}
                    </div>
                </div>
            ))}
            <Link onClick={handleClose} to="/cart" className="text-center btn btn-primary btn-raised btn-block">
                Перейти в корзину
            </Link>
        </Drawer>
    )
}

export default SideDrawer
