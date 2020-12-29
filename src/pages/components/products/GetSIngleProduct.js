import React, { useState, useEffect } from 'react';
import { getProduct, getRelated } from '../../../functions/product';
import DetailedProduct from './DetailedProduct';
import UserProductCard from '../cards/UserProductCard';


const GetSIngleProduct = ({ match }) => {

    const [product, setProduct] = useState({});
    const [related, setRelated] = useState([]);

    const { slug } = match.params

    useEffect(() => {
        loadSingleProduct()
    }, [slug]);

    const loadSingleProduct = () => {
        getProduct(slug).then((res) => {
            setProduct(res.data);
            //load related products
            getRelated(res.data._id).then(res => setRelated(res.data));
        });
    }

    return (
        <div className="container-fluid">
            <div className="row pt-4">
                <DetailedProduct product={product} />
            </div>
            <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <hr />
                    <h4 className="text-primary">
                        Ещё продукция из этой категории
                        </h4>
                    <hr />
                </div>
            </div>
            <div className="container">
                <div className="row pb-4">
                    {related.length ? (
                        related.map((r) => (<div className="col-md-3 p-4" key={r._id}>
                            <UserProductCard product={r} />
                        </div>))
                    ) : (
                            <div className="col-md-12">
                                <h5 className="text-center text-danger">В этой категории пока больше нет товаров</h5>
                            </div>
                        )}
                </div>
            </div>

        </div>
    )
}

export default GetSIngleProduct
